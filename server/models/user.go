package models

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	IsSuper  bool   `json:"is_super"`
}
