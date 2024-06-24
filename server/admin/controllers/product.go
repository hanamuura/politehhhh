package controllers

import (
	"admin/web-server/admin/models"
	"admin/web-server/admin/services"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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
	var product models.CreateProduct

	if err := c.ShouldBind(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if len(product.Categories) == 0 {
		c.JSON(400, gin.H{
			"error":   "no categories",
			"product": product,
		})
		return
	}

	dst := fmt.Sprintf("uploads/%s", product.Image.Filename)
	if err := c.SaveUploadedFile(product.Image, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Не удалось сохранить файл",
		})
		return
	}

	if err := pc.service.CreateProduct(product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, product)
}

func (pc *ProductController) DeleteProduct(c *gin.Context) {
	paramId := c.Param("id")
	id, _ := strconv.Atoi(paramId)
	if err := pc.service.DeleteProduct(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func (pc *ProductController) UpdateProduct(c *gin.Context) {
	var product models.UpdateProduct

	if err := c.ShouldBind(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return 
	}

	if len(product.Categories) == 0 {
		c.JSON(400, gin.H{
			"error":   "no categories",
			"product": product,
		})
		return
	}

	err := pc.service.UpdateProduct(product);
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
}
