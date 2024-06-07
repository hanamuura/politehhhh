package repositories

import (
	"admin/web-server/db"
	"admin/web-server/models"
)

type OrderRepository struct {
	db *db.DataBase
}

func NewOrderRepository(database *db.DataBase) *OrderRepository {
	return &OrderRepository{db: database}
}

func (or *OrderRepository) GetAllOrders() ([]models.Order, error) {
	query := `SELECT 
    	o.id, 
    	o.order_date, 
    	o.order_status,
    	os.name,
		o.product_id
	FROM public.order o
	LEFT JOIN public.order_status os ON o.order_status = os.id;`
	rows, err := or.db.Query(query)
	if err != nil {
		return nil, err
	}
	var orders []models.Order
	for rows.Next() {
		var order models.Order
		var orderStatus models.OrderStatus
		if err := rows.Scan(
			&order.ID,
			&order.OrderDate,
			&order.ProductID,
			&orderStatus.ID,
			&orderStatus.StatusName,
		); err != nil {
			return nil, err
		}
		order.OrderStatus = orderStatus
		orders = append(orders, order)
	}
	return orders, nil
}

func (or *OrderRepository) CreateOrder(order models.CreateOrder) error {
	query := `
		INSERT INTO "order" (order_date, order_status, product, user_id)
		VALUES (NOW(), $1, $2, $3)
	`

	_, err := or.db.Exec(query, order.StatusID, order.ProductID, order.UserID)
	if err != nil {
		return err
	}

	return nil
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
