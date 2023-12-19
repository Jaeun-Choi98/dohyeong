package dblayer

import (
	"backend/main/models"
	"errors"
)

type DBLayer interface{
	GetAllBooks()([]models.Book, error)
	AddUser(models.User)(error)
	SignInUser(userName, password string)(models.User,error)
	SignOutUserById(int) error
}

var ErrINVALIDPASSWORD = errors.New("Invalid password")
var ErrEXISTINGEMAIL = errors.New("Existing email")
var ErrEXPIREDSESSION = errors.New("Session expired")