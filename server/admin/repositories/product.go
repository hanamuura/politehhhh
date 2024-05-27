package repositories

import (
	"admin/web-server/db"
	"admin/web-server/models"
	"encoding/json"
	"fmt"
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
            c.id AS categories_id, c.name AS category_name
        FROM product p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.categories_id = c.id
    `

	rows, err := pr.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var productsAsJSON []models.Product

	for rows.Next() {
		var product models.ProductFromDB
		var category models.Category
		var newProduct models.Product
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
		newProduct.ID = product.ID
		newProduct.Name = product.Name
		err := json.Unmarshal(product.Description, &newProduct.Description)
		if err != nil {
			return nil, err
		}
		newProduct.Price = product.Price
		newProduct.Availability = product.Availability
		newProduct.Categories = append(newProduct.Categories, models.Category{ID: category.ID, Name: category.Name})
		productsAsJSON = append(productsAsJSON, newProduct)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return productsAsJSON, nil
}

func (pr *ProductRepository) CreateProduct(product models.CreateProduct) error {
	fmt.Println("repo: " + product.Name)
	tx, err := pr.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare("INSERT INTO product( name, description, price, availability) VALUES ( $1, $2, $3, $4 ) RETURNING id")
	if err != nil {
		tx.Rollback()
		return err
	}
	defer stmt.Close()

	description, err := json.Marshal(product.Description)
	if err != nil {
		return err
	}

	var lastInsertedID int64
	err = stmt.QueryRow(product.Name, description, product.Price, product.Availability).Scan(&lastInsertedID)
	if err != nil {
		return err
	}
	res := fmt.Sprintf("repo id: %d", lastInsertedID)
	fmt.Print(res)
	if err != nil {
		tx.Rollback()
		return err
	}
	catStmt, err := tx.Prepare("INSERT INTO product_categories(product_id, categories_id) VALUES ($1, $2)")
	if err != nil {
		fmt.Print(err)
		tx.Rollback()
		return err
	}

	for _, cat := range product.Categories {
		catStmt.Exec(lastInsertedID, cat.ID)
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return err
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
	product.Categories, err = pr.GetCategoriesOfProduct(product.ID)
	if err != nil {
		return models.Product{}, err
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
		WHERE c.name = ?
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

	rows, err := pr.db.Query("SELECT c.id, c.name FROM categories c INNER JOIN product_categories pc ON c.id = pc.categories_id WHERE pc.product_id = $1", productID)
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

