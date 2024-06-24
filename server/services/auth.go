package services

import (
	"admin/web-server/models"
	"admin/web-server/repositories"
	"errors"
)

type AuthService struct {
	repo *repositories.AuthRepository
}

func NewAuthService(repo *repositories.AuthRepository) *AuthService {
	return &AuthService{
		repo: repo,
	}
}

func (as *AuthService) Login(user models.User) (models.User, error) {
	existedUser, err := as.repo.Login(user)
	if err != nil {
		return models.User{}, err
	}
	if existedUser.Password != user.Password {
		return models.User{}, err
	}
	return existedUser, nil
}

func (as *AuthService) Register(user models.User) (int, error) {
	existedUser, _ := as.repo.GetUserByUsername(user)
	if existedUser.Username == user.Username {
		return -1, errors.New("user allready exist")
	}
	userID, err := as.repo.Register(user)
	if err != nil {
		return -1, err
	}
	return userID, nil
}

func (as *AuthService) PatchUser(newUser models.User) error {
	return as.repo.PatchUser(newUser)
}
