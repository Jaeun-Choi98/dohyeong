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
	Email string `json:"email" validate:"max=100"`
	Password string `json:"password"`
	UserName string `json:"userName" validate:"max=50"`
	LoggedIn int `json:"loggedIn"`
	Admin int `json:"admin"`
}

type Board struct{
	BoardId int `json:"boardId"`
	Title string `json:"title" validate:"max=100"`
	Content string `json:"content"`
	WriterName string `json:"writerName"`
}

type Comment struct{
	CommentId int `json:"commentId"`
	BoardId int `json:"boardId"`
	UserId int `json:"userId"`
	Content string `json:"content" validate:"max=500"`
	WriterName string `json:"writerName"`
}