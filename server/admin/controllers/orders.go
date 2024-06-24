package controllers

import (
	"admin/web-server/admin/services"
	"net/http"
	"strconv"

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

func (oc *OrderController) DeleteOrder(c *gin.Context){
	paramID := c.Param("id")
	id, err := strconv.Atoi(paramID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	if err = oc.service.DeleteOrder(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
