package models

type JSONDescription struct {
	Body  string `json:"body"`
	Title string `json:"title"`
}

type Product struct {
	ID           uint            `json:"id" gorm:"primary_key"`
	Name         string          `json:"name"`
	Description  JSONDescription `json:"description"`
	Price        float64         `json:"price"`
	Availability int             `json:"availability"`
	Categories   *[]Category     `json:"categories"`
	Image        *string         `json:"image"`
}

type UserProduct struct {
	ID           uint            `json:"id" gorm:"primary_key"`
	Name         string          `json:"name"`
	Description  JSONDescription `json:"description"`
	Price        float64         `json:"price"`
	Availability int             `json:"availability"`
	Image        string          `json:"image"`
}

type ProductFromDB struct {
	ID           uint    `json:"id" gorm:"primary_key"`
	Name         string  `json:"name"`
	Description  []byte  `json:"description"`
	Price        float64 `json:"price"`
	Availability int     `json:"availability"`
	Image        *string `json:"image"`
}
