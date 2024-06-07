package services

import (
	"admin/web-server/models"
	"admin/web-server/repositories"
	"errors"
	"fmt"
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

func (as *AuthService) Register(user models.User) error {
	existedUser, _ := as.repo.GetUserByUsername(user)
	fmt.Println("user name service: " + existedUser.Username)
	if existedUser.Username == user.Username {
		fmt.Print("qwerqwerqwerqwer")
		return errors.New("user allready exist")
	}
	err := as.repo.Register(user)
	if err != nil {
		return err
	}
	return nil
}

func (as *AuthService) PatchUser(newUser models.User) error {
	return as.repo.PatchUser(newUser)
}