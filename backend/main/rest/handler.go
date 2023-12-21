package rest

import (
	"backend/main/dblayer"
	"backend/main/models"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type HandlerInterface interface{
	GetMainPage(c *gin.Context)
	GetBooks(c *gin.Context)
	SignIn(c *gin.Context)
	AddUser(c *gin.Context)
	SignOut(c *gin.Context)
}

type Handler struct{
	db dblayer.DBLayer
}

func NewHandler() (HandlerInterface, error){
	return newHandlerWithParams("mysql","qwe:123qweasdzxc@tcp(host.docker.internal)/dohyeong")
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

func (h *Handler)GetBooks(c *gin.Context){
	if h.db == nil {
		return
	}
	books, err := h.db.GetAllBooks()
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, books)
}

func (h *Handler)SignIn(c *gin.Context){
	if h.db == nil {
		return
	}
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err = h.db.SignInUser(user.Email, user.Password)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *Handler)AddUser(c *gin.Context){
	if h.db == nil {
		return
	}
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = h.db.AddUser(user)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

func(h *Handler) SignOut(c *gin.Context){
	if h.db == nil{
		return
	}
	p := c.Param("id")
	id, err := strconv.Atoi(p)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = h.db.SignOutUserById(id)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}