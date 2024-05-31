package routes

import (
	"admin/web-server/controllers"

	"github.com/gin-gonic/gin"
)

type CategoriesRoutes struct {
	controller *controllers.CategoryController
}

func NewCategoriesRoutes(controller *controllers.CategoryController) *CategoriesRoutes {
	return &CategoriesRoutes{controller: controller}
}

func (cr *CategoriesRoutes) RegisterRoutes(r *gin.Engine) {
	categoryRoutes := r.Group("/categories")
	{
		categoryRoutes.GET("", cr.controller.GetAll)
	}
}
