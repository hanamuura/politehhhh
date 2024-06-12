package routes

import (
	"admin/web-server/admin/controllers"

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
		productRoutes.POST("", pr.productsController.CreateProduct)
		productRoutes.DELETE("/:id", pr.productsController.DeleteProduct)
		productRoutes.PUT("", pr.productsController.UpdateProduct)
	}
}
