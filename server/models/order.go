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
	StatusID  uint      `json:"status_id"`
	ProductID uint      `json:"product_id"`
	UserID    uint      `json:"user_id"`
}
