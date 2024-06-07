package routes

import (
	"admin/web-server/controllers"

	"github.com/gin-gonic/gin"
)

type AuthRoutes struct {
	controller *controllers.AuthController
}

func NewAuthRoutes(controller *controllers.AuthController) *AuthRoutes {
	return &AuthRoutes{
		controller: controller,
	}
}

func (ar *AuthRoutes) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/login", ar.controller.Login)
	r.POST("/register", ar.controller.Register)
	r.PATCH("/login", ar.controller.PatchUser)
}
