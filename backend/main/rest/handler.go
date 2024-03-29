package rest

import (
	"backend/main/dblayer"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

type HandlerInterface interface {
	GetMainPage(c *gin.Context)
	GetBooks(c *gin.Context)
	SignIn(c *gin.Context)
	AddUser(c *gin.Context)
	SignOut(c *gin.Context)
	GetBoards(c *gin.Context)
	GetBoard(c *gin.Context)
	AddBoard(c *gin.Context)
	RemoveBoard(c *gin.Context)
	AddComment(c *gin.Context)
	GetComments(c *gin.Context)
	RemoveComment(c *gin.Context)
}

type Handler struct {
	db dblayer.DBLayer
}

// host.docker.internal
func NewHandler() (HandlerInterface, error) {
	return newHandlerWithParams("mysql", "jaeun:cjswo123@tcp(10.0.0.6:3306)/dohyeong")
}

func newHandlerWithParams(dbName, con string) (HandlerInterface, error) {
	msdb, err := dblayer.NewMysql(dbName, con)
	if err != nil {
		return nil, err
	}
	return &Handler{
		db: msdb,
	}, nil

}

func (h *Handler) GetMainPage(c *gin.Context) {
	log.Println("Main page....")
	fmt.Fprintf(c.Writer, "Main page for secure API!!")
}
