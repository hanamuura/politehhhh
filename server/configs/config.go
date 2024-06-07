package configs

import (
	"admin/web-server/controllers"
	"admin/web-server/db"
	"admin/web-server/repositories"
	"admin/web-server/routes"
	"admin/web-server/services"
)

func NewApp(db *db.DataBase) *App {
	// Repositories
	productRepo := repositories.NewProductRepository(db)
	authRepo := repositories.NewAuthRepository(db)
	orderRepository := repositories.NewOrderRepository(db)

	// Services
	productService := services.NewProductService(productRepo)
	authService := services.NewAuthService(authRepo)
	orderService := services.NewOrderService(orderRepository)

	//Controllers
	productController := controllers.NewProductController(productService)
	authController := controllers.NewAuthController(authService)
	orderController := controllers.NewOrderController(orderService)

	//Routes
	productRoutes := routes.NewProductRoutes(productController)
	authRoutes := routes.NewAuthRoutes(authController)
	orderRoutes := routes.NewOrderRoutes(orderController)
	return &App{
		ProductRoutes: productRoutes,
		AuthRoutes: authRoutes,
		OrderRoutes: orderRoutes,
	}
}

type App struct {
	ProductRoutes *routes.ProductRoutes
	AuthRoutes *routes.AuthRoutes
	OrderRoutes *routes.OrderRoutes
}