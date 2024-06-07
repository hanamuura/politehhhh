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
			}
		}

		if entry, ok := productsAsJSON[int(product.ID)]; ok {
			json.Unmarshal(product.Description, &entry.Description)
			productsAsJSON[int(product.ID)] = entry
		}

		if entry, ok := productsAsJSON[int(product.ID)]; ok {
			entry.Categories = append(entry.Categories, models.Category{ID: category.ID, Name: category.Name})
			productsAsJSON[int(product.ID)] = entry
		}
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

func (pr *ProductRepository) CreateProductUser(userID int, productID int) error {
	query := `
		insert into user_product(product_id, user_id) values($1, $2)
	`

	_, err := pr.db.Query(query, userID, productID)
	if err != nil {
		return err
	}
	return nil
}

func (pr *ProductRepository) GetProductUser(userID int) ([]models.UserProduct, error) {
	query := `
		select p.name, p.availability, p.description, p.price, p.id
			from product as p	
		inner join user_product as up on p.id = up.product_id
		where up.user_id = $1
	`

	rows, err := pr.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	var products []models.UserProduct
	for rows.Next() {
		var product models.UserProduct
		var description []byte
		rows.Scan(
			&product.Name,
			&product.Availability,
			&description,
			&product.Price,
			&product.ID,
		)
		json.Unmarshal(description, &product.Description)
		fmt.Println(product.Name)
		products = append(products, product)
	}
	return products, nil
}
