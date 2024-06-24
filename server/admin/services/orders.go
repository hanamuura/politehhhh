package services

import (
	"admin/web-server/admin/models"
	"admin/web-server/admin/repositories"

	"github.com/go-playground/validator/v10"
)

type OrderService struct {
	repo     *repositories.OrderRepository
	validate *validator.Validate
}

func NewOrderService(repository *repositories.OrderRepository) *OrderService {
	return &OrderService{
		repo:     repository,
		validate: validator.New(validator.WithRequiredStructEnabled()),
	}
}

func (os *OrderService) GetAllOrders() ([]models.AdminOrder, error){
	orders, err := os.repo.GetAllOrders()
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (os *OrderService) DeleteOrder(id int) error {
	return os.repo.DeleteOrder(id)
}