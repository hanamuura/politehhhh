package controllers

import (
	"admin/web-server/models"
	"admin/web-server/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type ProductController struct {
	service *services.ProductService
}

func NewProductController(producService *services.ProductService) *ProductController {
	return &ProductController{
		service: producService,
	}
}

func (pc *ProductController) GetAllProducts(c *gin.Context) {
	products, err := pc.service.GetAllProducts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, products)
}

func (pc *ProductController) GetProductById(c *gin.Context) {
	id := c.Param("id")
	product, err := pc.service.GetProductById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, product)
}

func (pc *ProductController) CreateProduct(c *gin.Context) {
	var createProductsJSON models.CreateProduct
	err := c.ShouldBindJSON(&createProductsJSON)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := pc.service.CreateProduct(createProductsJSON); err != nil{
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusBadRequest, gin.H{
				"fileds": validationErrors,
			})
		}
	}
}
