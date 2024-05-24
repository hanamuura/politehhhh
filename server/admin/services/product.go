package services

import (
	"admin/web-server/models"
	"admin/web-server/repositories"
)

type ProductService struct {
	repo *repositories.ProductRepository
}

func NewProductService(repository *repositories.ProductRepository) *ProductService {
	return &ProductService{repo: repository}
}

func (ps *ProductService) GetAllProducts() ([]models.Product, error) {
	products, err := ps.repo.GetAllProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) CreateProduct(product models.Product) error {
	err := ps.repo.CreateProduct(product)
	if err != nil {
		return err
	}
	return nil
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
