package controllers

import (
	"admin/web-server/services"
	"net/http"

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