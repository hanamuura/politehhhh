package main

import (
	"admin/web-server/admin"
	"admin/web-server/configs"
	"admin/web-server/db"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	r := gin.Default()

	r.Static("/uploads", "./uploads")

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	database, err := db.NewDataBase("host=localhost port=5432 user=postgres password=postgres dbname=zoo_db sslmode=disable")
	if err != nil {
		return
	}
	adminApp, err := admin.NewApp(database)
	if err != nil {
		return
	}
	v1App := configs.NewApp(database)

	api := r.Group("/api")
	{
		v1App.AuthRoutes.RegisterRoutes(api)
		admin := api.Group("/admin")
		{
			adminApp.CategoriesRoutes.RegisterRoutes(admin)
			adminApp.ProductRoutes.RegisterRoutes(admin)
			adminApp.OrderRoutes.RegisterRoutes(admin)
		}

		v1 := api.Group("/v1")
		{
			v1App.ProductRoutes.RegisterRoutes(v1)
			v1App.OrderRoutes.RegisterRoutes(v1)
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ping",
		})
	})

	r.POST("/upload", func(c *gin.Context) {
		_, fileHeader, err := c.Request.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Не удалось получить файл",
			})
			return
		}

		dst := fmt.Sprintf("uploads/%s", fileHeader.Filename)
		if err := c.SaveUploadedFile(fileHeader, dst); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Не удалось сохранить файл",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Файл успешно загружен",
		})
	})

	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
