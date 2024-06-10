package repositories

import (
	"admin/web-server/db"
	"admin/web-server/models"
	"fmt"
)

type AuthRepository struct {
	db *db.DataBase
}

func NewAuthRepository(db *db.DataBase) *AuthRepository {
	return &AuthRepository{
		db: db,
	}
}

func (ar *AuthRepository) Login(user models.User) (models.User, error) {
	existedUser, err := ar.GetUserByUsername(user)
	fmt.Println("username: " + existedUser.Username)
	fmt.Println("username: " + user.Username)
	if err != nil {
		return models.User{}, nil
	}
	return existedUser, nil
}

func (ar *AuthRepository) Register(newUser models.User) error {
	tx, err := ar.db.Begin()
	if err != nil {
		tx.Rollback()
		return err
	}

	stmt, err := tx.Prepare("INSERT INTO custom_user(username, password, email, is_superuser) values ( $1, $2, $3, $4 ) ")
	if err != nil {
		tx.Rollback()
		return err
	}
	defer stmt.Close()

	stmt.QueryRow(newUser.Username, newUser.Password, newUser.Email, newUser.IsSuper)
	
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

func (ar *AuthRepository) GetUserByUsername(user models.User) (models.User, error) {
	var userFromDB models.User

	err := ar.db.QueryRow("select id, username, password, email, is_superuser from custom_user where username=$1", user.Username).
		Scan(&userFromDB.ID, &userFromDB.Username, &userFromDB.Password, &userFromDB.Email, &userFromDB.IsSuper)
	if err != nil {
		fmt.Print(err)
		return models.User{}, err
	}
	fmt.Println("user id from db: " + userFromDB.Username)
	return userFromDB, nil
}

func (ar *AuthRepository) PatchUser(newUser models.User) error {
	query := `
        UPDATE custom_user
        SET
            username=$1,
            password=$2,
            email=$3
        WHERE id=$4
    `
	_, err := ar.db.Exec(query, newUser.Username, newUser.Password, newUser.Email, newUser.ID)
	if err != nil {
		return err
	}
	return nil
}
