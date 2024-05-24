package models

type Product struct {
	ID           uint        `json:"id" gorm:"primary_key"`
	Name         string      `json:"name"`
	Description  interface{} `json:"description"`
	Price        float64     `json:"price"`
	Availability int         `json:"availability"`
	Categories   []Category `json:"categories" gorm:"many2many:product_categories;"`
}
