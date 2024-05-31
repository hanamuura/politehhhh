package repositories

import (
	"admin/web-server/db"
	"admin/web-server/models"
)

type OrderRepository struct {
	db *db.DataBase
}

func NewOrderRepository(database *db.DataBase) (*OrderRepository) {
	return &OrderRepository{db: database}
}

func (or *OrderRepository) GetAllOrders() ([]models.Order, error) {
	query := `SELECT 
    	o.id, 
    	o.order_date, 
    	o.status_id,
    	os.status_name
	FROM public.order o
	LEFT JOIN public.order_status os ON o.status_id = os.id;`
	rows, err := or.db.Query(query)
	if err != nil {
		return nil, err
	}
	var orders []models.Order
	for rows.Next(){
		var order models.Order
		var orderStatus models.OrderStatus

		if err := rows.Scan(
			&order.ID,
			&order.OrderDate,
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
