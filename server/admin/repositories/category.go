package repositories

import (
	"admin/web-server/db"
	"admin/web-server/models"
)

type CategoriesRepository struct {
	db *db.DataBase
}


func NewCategoriesRepository(database *db.DataBase) *CategoriesRepository {
	return &CategoriesRepository{db: database}
}

func (cr *CategoriesRepository) GetAll() ([]models.Category, error) {
	query := `select * from categories`

	rows, err := cr.db.Query(query)
	if err != nil {
		return nil, err
	}

	var categories []models.Category
	for rows.Next() {
		var category models.Category
		if err := rows.Scan(
			&category.ID,
			&category.Name,
		); err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	return categories, nil
}

