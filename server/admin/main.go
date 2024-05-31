package main

import (
	"admin/web-server/controllers"
	"admin/web-server/db"
	"admin/web-server/repositories"
	"admin/web-server/routes"
	"admin/web-server/services"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
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
	productRepository := repositories.NewProductRepository(database)
	productService := services.NewProductService(productRepository)
	productController := controllers.NewProductController(productService)
	productRoutes := routes.NewProductRoutes(productController)
	productRoutes.RegisterRoutes(r)
	categoriesRepository := repositories.NewCategoriesRepository(database)
	categoryService := services.NewCategoriesService(categoriesRepository)
	categoriesController := controllers.NewCategoriesController(categoryService)
	categoriesRoutes := routes.NewCategoriesRoutes(categoriesController)
	categoriesRoutes.RegisterRoutes(r)
	orderRepository := repositories.NewOrderRepository(database)
	orderService := services.NewOrderService(orderRepository)
	orderController := controllers.NewOrderController(orderService)
	orderRoutes := routes.NewOrderRoutes(orderController)
	orderRoutes.RegisterRoutes(r)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
