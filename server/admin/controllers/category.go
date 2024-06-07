package controllers

import (
	"admin/web-server/admin/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CategoryController struct {
	service *services.CategoryService
}

func NewCategoriesController(service *services.CategoryService) (*CategoryController) {
	return &CategoryController{
		service: service,
	}
}

func (cc *CategoryController) GetAll(c *gin.Context) {
	res, err := cc.service.GetAll()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, res)
}