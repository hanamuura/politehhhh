package routes

import (
	"admin/web-server/controllers"

	"github.com/gin-gonic/gin"
)

type OrderRoutes struct {
	controller *controllers.OrderController
}

func NewOrderRoutes(controller *controllers.OrderController) *OrderRoutes {
	return &OrderRoutes{
		controller: controller,
	}
}

func (or *OrderRoutes) RegisterRoutes(r *gin.Engine) {
	orderRoutes := r.Group("/orders")
	{
		orderRoutes.GET("", or.controller.GetAllOrders)
	}
}
