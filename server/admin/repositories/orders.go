package repositories

import (
	"admin/web-server/admin/models"
	"admin/web-server/db"
)

type OrderRepository struct {
	db *db.DataBase
}

func NewOrderRepository(database *db.DataBase) *OrderRepository {
	return &OrderRepository{db: database}
}

func (or *OrderRepository) GetAllOrders() ([]models.AdminOrder, error) {
	query := `SELECT 
    	o.id, 
    	o.order_date, 
    	os.name,
		p.name,
		u.username
	FROM "order" o
	LEFT JOIN public.order_status os ON o.order_status = os.id
	LEFT JOIN public.custom_user u ON o.user_id = u.id
	LEFT JOIN public.product p ON o.product = p.id`
	rows, err := or.db.Query(query)
	if err != nil {
		return nil, err
	}
	var orders []models.AdminOrder
	for rows.Next() {
		var order models.AdminOrder
		if err := rows.Scan(
			&order.ID,
			&order.OrderDate,
			&order.OrderStatus,
			&order.ProductName,
			&order.Username,
		); err != nil {
			return nil, err
		}
		orders = append(orders, order)
	}
	return orders, nil
}

func (or *OrderRepository) GetUserOrders(userID int) ([]models.Order, error) {
	query := `
		select * from public.order where user_id=$1
	`
	var userOrders []models.Order
	rows, err := or.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var order models.Order
		rows.Scan(
			&order.ID,
			&order.OrderDate,
			&order.OrderStatus,
			&order.ProductID,
		)
		userOrders = append(userOrders, order)
	}
	return userOrders, nil
}

func (or *OrderRepository) DeleteOrder(id int) error {
	query := `delete from "order" where id=$1`
	if _, err := or.db.Exec(query, id); err != nil {
		return err
	}
	return nil
}	