package repositories

import (
	"admin/web-server/admin/models"
	"admin/web-server/db"
	"encoding/json"
	"strconv"
)

type ProductRepository struct {
	db *db.DataBase
}

func NewProductRepository(database *db.DataBase) *ProductRepository {
	return &ProductRepository{db: database}
}

func (pr *ProductRepository) GetAllProducts() ([]models.Product, error) {
	query := `
        SELECT 
            p.id, p.name, p.description, p.price, p.availability, 
            c.id AS category_id, c.name AS category_name
        FROM product p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.category_id = c.id
    `
	rows, err := pr.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var productsAsJSON = make(map[int]models.Product)

	for rows.Next() {
		var product models.ProductFromDB
		var category models.Category
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Availability,
			&category.ID,
			&category.Name,
		); err != nil {
			return nil, err
		}

		if _, ok := productsAsJSON[int(product.ID)]; !ok {
			productsAsJSON[int(product.ID)] = models.Product{
				ID:           product.ID,
				Name:         product.Name,
				Description:  models.JSONDescription{},
				Price:        product.Price,
				Availability: product.Availability,
				Categories:   &[]models.Category{},
			}
		}

		entry := productsAsJSON[int(product.ID)]
		json.Unmarshal(product.Description, &entry.Description)

		if category.ID != nil && *category.ID != 0 {
			*entry.Categories = append(*entry.Categories, category)
		}

		productsAsJSON[int(product.ID)] = entry
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	products := make([]models.Product, 0, len(productsAsJSON))
	for _, product := range productsAsJSON {
		products = append(products, product)
	}

	return products, nil
}

func (pr *ProductRepository) CreateProduct(product models.CreateProduct) error {
	description, err := json.Marshal(product.Description)
	if err != nil {
		return err
	}

	stmt, err := pr.db.Prepare("INSERT INTO product(name, description, price, availability, image) VALUES ($1, $2, $3, $4, $5) RETURNING id")
	if err != nil {
		return err
	}
	defer stmt.Close()

	var productID int64
	err = stmt.QueryRow(product.Name, description, product.Price, product.Availability, product.Image.Filename).Scan(&productID)
	if err != nil {
		return err
	}

	for _, cat := range product.Categories {
		stmt, err = pr.db.Prepare("INSERT INTO product_categories(product_id, category_id) VALUES ($1, $2)")
		if err != nil {
			return err
		}
		defer stmt.Close()

		_, err = stmt.Exec(productID, cat.ID)
		if err != nil {
			return err
		}
	}

	return nil
}

func (pr *ProductRepository) GetProductById(id string) (models.Product, error) {
	var productFromDB models.ProductFromDB
	var product models.Product
	err := pr.db.QueryRow("SELECT id, name, description, price, availability FROM product WHERE id = $1", id).
		Scan(&product.ID, &product.Name, &productFromDB.Description, &product.Price, &product.Availability)
	if err != nil {
		return models.Product{}, err
	}
	json.Unmarshal(productFromDB.Description, &product.Description)

	categories, err := pr.GetCategoriesOfProduct(product.ID)
	if err != nil {
		return models.Product{}, err
	}

	if product.Categories == nil {
		product.Categories = &categories
	} else {
		*product.Categories = categories
	}

	return product, nil
}

func (pr *ProductRepository) GetProductsByCategory(category models.Category) ([]models.Product, error) {
	tx, err := pr.db.Begin()
	if err != nil {
		return nil, err
	}

	stmt, err := tx.Prepare(`
		SELECT p.id, p.name, p.description, p.price, p.availability
		FROM product p
		JOIN product_categories pc ON p.id = pc.product_id
		JOIN categories c ON pc.categories_id = c.id
		WHERE c.name = $1
	`)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(category.Name)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	defer rows.Close()

	var products []models.Product
	for rows.Next() {
		var product models.Product
		err = rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Availability,
		)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		products = append(products, product)
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	return products, nil
}

func (pr *ProductRepository) GetCategoriesOfProduct(productID uint) ([]models.Category, error) {
	var categories []models.Category

	rows, err := pr.db.Query("SELECT c.id, c.name FROM categories c INNER JOIN product_categories pc ON c.id = pc.category_id WHERE pc.product_id = $1", productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var category models.Category
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}

func (pr *ProductRepository) DeleteProduct(id int) error {
	query := `delete from product where id=$1`

	if _, err := pr.db.Exec(query, id); err != nil {
		return err
	}
	return nil
}

func (pr *ProductRepository) UpdateProduct(newProduct models.UpdateProduct) (models.Product, error) {
	query := `UPDATE product 
		SET name = $1, 
		    description = $2, 
		    price = $3, 
		    availability = $4
		WHERE id = $5`

	description, err := json.Marshal(newProduct.Description)
	if err != nil {
		return models.Product{}, err
	}

	result, err := pr.db.Exec(query, newProduct.Name, description, newProduct.Price, newProduct.Availability, newProduct.ID)
	if err != nil {
		return models.Product{}, err
	}

	err = pr.updateProductCategories(newProduct.ID, newProduct.Categories)
	if err != nil {
		return models.Product{}, err
	}

	updatedID, err := result.LastInsertId()
	if err != nil {
		return models.Product{}, err
	}

	updatedProduct, err := pr.GetProductById(strconv.Itoa(int(updatedID)))
	if err != nil {
		return models.Product{}, err
	}

	return updatedProduct, nil
}

func (pr *ProductRepository) updateProductCategories(productID int, categories []*uint) error {
	tx, err := pr.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec("DELETE FROM product_category WHERE product_id = ?", productID)
	if err != nil {
		return err
	}

	for _, categoryID := range categories {
		if categoryID != nil {
			_, err = tx.Exec("INSERT INTO product_category (product_id, category_id) VALUES (?, ?)", productID, *categoryID)
			if err != nil {
				return err
			}
		}
	}

	return tx.Commit()
}
