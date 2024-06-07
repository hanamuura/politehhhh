package controllers

import (
	"admin/web-server/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"strconv"
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
	param := c.Query("user_id")
	if param == "" {
		products, err := pc.service.GetAllProducts()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, products)
		return
	}
	userID, _ := strconv.Atoi(param)
	userProducts, err := pc.service.GetProductUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, userProducts)
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

type CreateUserProduct struct {
	ProductID int `json:"product_id"`
	UserID    int `json:"user_id"`
}

func (pc *ProductController) CreateProductUser(c *gin.Context) {
	var body CreateUserProduct
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	val := strconv.Itoa(body.ProductID)
	fmt.Println("asdfa    :   " + val)
	pc.service.CreateProductUser(body.ProductID, body.UserID)
}
