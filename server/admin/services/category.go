package services

import (
	"admin/web-server/models"
	"admin/web-server/repositories"
)

type CategoryService struct {
	repo *repositories.CategoriesRepository
}

func NewCategoriesService(repository *repositories.CategoriesRepository) *CategoryService {
	return &CategoryService{
		repo: repository,
	}
}

func (cs *CategoryService) GetAll() ([]models.Category, error) {
	res, err := cs.repo.GetAll();
	if err != nil {
		return nil, err
	}
	return res, nil
}