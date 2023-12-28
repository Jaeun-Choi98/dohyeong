package models

import (
	_ "time"
)

// DB 스키마 테이블
type Book struct{
	BookId int `json:"bookId"`
	ImgUrl string `json:"imgUrl"`
	ImgAlt string `json:"imgAlt"`
	Price int `json:"price"`
	Link string `json:"link"`
	Description string `json:"description"`
	BookName string `json:"bookName"`
}

type User struct{
	UserId int `json:"userId"`
	Email string `json:"email"`
	Password string `json:"password"`
	UserName string `json:"userName"`
	LoggedIn int `json:"loggedIn"`
	Admin int `json:"admin"`
}

type Board struct{
	BoardId int `json:"boardId"`
	Title string `json:"title"`
	Content string `json:"content"`
	WriterName string `json:"writerName"`
}