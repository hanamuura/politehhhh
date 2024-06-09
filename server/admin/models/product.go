package models

import "mime/multipart"

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
}

type ProductFromDB struct {
	ID           uint    `json:"id" gorm:"primary_key"`
	Name         string  `json:"name"`
	Description  []byte  `json:"description"`
	Price        float64 `json:"price"`
	Availability int     `json:"availability"`
}

type CreateProduct struct {
	Name         string                `form:"name"`
	Description  JSONDescription       `form:"description"`
	Price        float64               `form:"price"`
	Availability int                   `form:"availability"`
	Categories   []CreateCategory      `form:"categories[]"`
	Image        *multipart.FileHeader `form:"image"`
}

type CreateCategory struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
