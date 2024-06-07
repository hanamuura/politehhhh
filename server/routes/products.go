package routes

import (
	"admin/web-server/controllers"

	"github.com/gin-gonic/gin"
)

type ProductRoutes struct {
	productsController *controllers.ProductController
}

func NewProductRoutes(productController *controllers.ProductController) *ProductRoutes {
	return &ProductRoutes{
		productsController: productController,
	}
}

func (pr *ProductRoutes) RegisterRoutes(r *gin.RouterGroup) {
	productRoutes := r.Group("/products")
	{
		productRoutes.GET("", pr.productsController.GetAllProducts)
		productRoutes.GET("/:id", pr.productsController.GetProductById)
		productRoutes.POST("", pr.productsController.CreateProductUser)
	}
}
