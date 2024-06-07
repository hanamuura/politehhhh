package admin

import (
	"admin/web-server/admin/controllers"
	"admin/web-server/admin/repositories"
	"admin/web-server/admin/routes"
	"admin/web-server/admin/services"
	"admin/web-server/db"
)

func NewApp(database *db.DataBase) (*App, error) {
	// Repositories
	productRepo := repositories.NewProductRepository(database)
	categoriesRepo := repositories.NewCategoriesRepository(database)
	orderRepo := repositories.NewOrderRepository(database)

	// Services
	productService := services.NewProductService(productRepo)
	categoriesService := services.NewCategoriesService(categoriesRepo)
	orderService := services.NewOrderService(orderRepo)

	// Controllers
	productController := controllers.NewProductController(productService)
	categoriesController := controllers.NewCategoriesController(categoriesService)
	orderController := controllers.NewOrderController(orderService)

	// Routes
	productRoutes := routes.NewProductRoutes(productController)
	categoriesRoutes := routes.NewCategoriesRoutes(categoriesController)
	orderRoutes := routes.NewOrderRoutes(orderController)

	return &App{
		ProductRoutes:    productRoutes,
		CategoriesRoutes: categoriesRoutes,
		OrderRoutes:      orderRoutes,
	}, nil
}

type App struct {
	ProductRoutes    *routes.ProductRoutes
	CategoriesRoutes *routes.CategoriesRoutes
	OrderRoutes      *routes.OrderRoutes
}
