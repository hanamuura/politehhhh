package controllers

import (
	"admin/web-server/models"
	"admin/web-server/services"
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

func (oc *OrderController) GetUserOrders(c *gin.Context) {
	userID := c.Query("user_id")
	numUserID, _ := strconv.Atoi(userID)
	userOrders, err := oc.service.GetUserOrders(numUserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, userOrders)
}

func (oc *OrderController) CreateOrder(c *gin.Context) {
	var createOrder models.CreateOrder
	if err := c.ShouldBindJSON(&createOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := oc.service.CreateOrder(createOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
}
