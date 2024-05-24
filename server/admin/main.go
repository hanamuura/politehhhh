package main

import (
	"admin/web-server/controllers"
	"admin/web-server/db"
	"admin/web-server/repositories"
	"admin/web-server/routes"
	"admin/web-server/services"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	r := gin.Default()
	database, err := db.NewDataBase("host=localhost port=5432 user=postgres password=postgres dbname=zoo_db sslmode=disable")
	if err != nil {
		return
	}
	productRepository := repositories.NewProductRepository(database)
	productService := services.NewProductService(productRepository)
	productController := controllers.NewProductController(productService)
	productRoutes := routes.NewProductRoutes(productController)
	productRoutes.RegisterRoutes(r)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
