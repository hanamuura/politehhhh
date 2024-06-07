package controllers

import (
	"admin/web-server/models"
	"admin/web-server/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	service *services.AuthService
}

func NewAuthController(service *services.AuthService) *AuthController {
	return &AuthController{
		service: service,
	}
}

func (ac *AuthController) Login(c *gin.Context) {
	var userFromRequest models.User
	err := c.ShouldBindJSON(&userFromRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	existedUser, err := ac.service.Login(userFromRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, existedUser)
}

func (ac *AuthController) Register(c *gin.Context) {
	var userFromRequest models.User
	err := c.ShouldBindJSON(&userFromRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	err = ac.service.Register(userFromRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}
}

func (ac *AuthController) PatchUser(c *gin.Context) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return 
	}
	if err := ac.service.PatchUser(newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return 
	}
}	