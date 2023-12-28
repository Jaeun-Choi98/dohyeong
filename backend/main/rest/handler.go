package rest

import (
	"backend/main/dblayer"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

type HandlerInterface interface{
	GetMainPage(c *gin.Context)
	GetBooks(c *gin.Context)
	SignIn(c *gin.Context)
	AddUser(c *gin.Context)
	SignOut(c *gin.Context)
	GetBoards(c *gin.Context)
}

type Handler struct{
	db dblayer.DBLayer
}

// host.docker.internal
// qwe:123qweasdzxc
func NewHandler() (HandlerInterface, error){
	return newHandlerWithParams("mysql","qwe:123qweasdzxc@tcp(10.1.0.7:3306)/dohyeong")
}

func newHandlerWithParams(dbName, con string)(HandlerInterface, error){
	msdb, err := dblayer.NewMysql(dbName, con)
	if err != nil{
		return nil, err
	}
	return &Handler{
		db: msdb,
	},nil

}

func (h *Handler) GetMainPage(c *gin.Context) {
	log.Println("Main page....")
	fmt.Fprintf(c.Writer, "Main page for secure API!!")
}

