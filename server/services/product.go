package services

import (
	"admin/web-server/repositories"
	"admin/web-server/models"

	"github.com/go-playground/validator/v10"
)

type ProductService struct {
	repo     *repositories.ProductRepository
	validate *validator.Validate
}

func NewProductService(repository *repositories.ProductRepository) *ProductService {
	return &ProductService{
		repo:     repository,
		validate: validator.New(validator.WithRequiredStructEnabled()),
	}
}

func (ps *ProductService) GetAllProducts() ([]models.Product, error) {
	products, err := ps.repo.GetAllProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) GetProductById(id string) (models.Product, error) {
	product, err := ps.repo.GetProductById(id)
	if err != nil {
		return models.Product{}, err
	}
	return product, nil
}

func (ps *ProductService) GetProductsByCategory(category models.Category) ([]models.Product, error) {
	products, err := ps.repo.GetProductsByCategory(category)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) CreateProductUser(userID int, productID int) (error) {
	err := ps.repo.CreateProductUser(userID, productID)
	if err != nil {
		return err
	}
	return nil
}

func (ps *ProductService) GetProductUser(userID int) ([]models.UserProduct, error) {
	return ps.repo.GetProductUser(userID)
}