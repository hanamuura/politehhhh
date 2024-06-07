package routes

import (
	"admin/web-server/admin/controllers"

	"github.com/gin-gonic/gin"
)

type CategoriesRoutes struct {
	controller *controllers.CategoryController
}

func NewCategoriesRoutes(controller *controllers.CategoryController) *CategoriesRoutes {
	return &CategoriesRoutes{controller: controller}
}

func (cr *CategoriesRoutes) RegisterRoutes(r *gin.RouterGroup) {
	categoryRoutes := r.Group("/categories")
	{
		categoryRoutes.GET("", cr.controller.GetAll)
	}
}
