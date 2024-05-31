package controllers

import (
	"admin/web-server/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	service *services.OrderService
}

func NewOrderController(orderService *services.OrderService) *OrderController {
	return &OrderController{
		service: orderService,
	}
}

func (oc *OrderController) GetAllOrders(c *gin.Context) {
	orders, err := oc.service.GetAllOrders()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, orders)
}