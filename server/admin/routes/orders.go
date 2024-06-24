package routes

import (
	"admin/web-server/admin/controllers"

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

func (or *OrderRoutes) RegisterRoutes(r *gin.RouterGroup) {
	orderRoutes := r.Group("/orders")
	{
		orderRoutes.GET("", or.controller.GetAllOrders)
		orderRoutes.DELETE("/:id", or.controller.DeleteOrder)
	}
}
