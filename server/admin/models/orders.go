package models

import "time"

type Order struct {
	ID          uint        `json:"id"`
	OrderDate   time.Time   `json:"order_date"`
	OrderStatus OrderStatus `json:"order_status"`
}

type OrderStatus struct {
	ID         uint   `json:"id"`
	StatusName string `json:"status_name"`
}
