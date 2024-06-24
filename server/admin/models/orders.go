package models

import "time"

type Order struct {
	ID          uint        `json:"id"`
	OrderDate   time.Time   `json:"order_date"`
	OrderStatus OrderStatus `json:"order_status"`
	ProductID   uint        `json:"product_id"`
}

type OrderStatus struct {
	ID         uint   `json:"id"`
	StatusName string `json:"status_name"`
}

type CreateOrder struct {
	OrderDate time.Time `json:"order_date"`
	StatusID  uint      `json:"status_id"`
	ProductID uint      `json:"product_id"`
	UserID    uint      `json:"user_id"`
}

type AdminOrder struct {
	ID          int       `json:"id"`
	OrderDate   time.Time `json:"order_date"`
	OrderStatus string    `json:"status_name"`
	ProductName string    `json:"product_name"`
	Username    string    `json:"username"`
}

// o.id,
//     	o.order_date,
//     	o.order_status,
//     	os.name,
// 		o.product,
// 		u.username,
