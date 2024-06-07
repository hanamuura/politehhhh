package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type DataBase struct {
	*sql.DB
}

func NewDataBase(connectionString string) (*DataBase, error) {
	fmt.Print("start connection")
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	return &DataBase{db}, nil
}
