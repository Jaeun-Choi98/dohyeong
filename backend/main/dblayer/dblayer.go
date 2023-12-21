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

var ErrINVALIDPASSWORD = errors.New("비밀번호가 일치하지 않습니다.")
var ErrEXISTINGEMAIL = errors.New("이미 있는 이메일입니다.")
var ErrEXPIREDSESSION = errors.New("Session expired")
var ErrNOTEXISTINGEMAIL = errors.New("존재하지 않는 이메일입니다.")