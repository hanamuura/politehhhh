package services

import (
	"admin/web-server/admin/models"
	"admin/web-server/admin/repositories"
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

func (ps *ProductService) CreateProduct(product models.CreateProduct) error {

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

func (ps *ProductService) DeleteProduct(id int) (error) {
	if err := ps.repo.DeleteProduct(id); err != nil {
		return err
	}
	return nil
}

func (ps *ProductService) UpdateProduct(newProduct models.UpdateProduct) error{
	err := ps.repo.UpdateProduct(newProduct)
	if err != nil {
		return err
	}
	return nil
}