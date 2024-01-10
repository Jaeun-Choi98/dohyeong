package rest

import (
	"backend/main/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetBooks(c *gin.Context) {
	if h.db == nil {
		return
	}

	// 첫 요청에만 DB서버에 데이터를 불러옴.
	if utils.GetBooks() == nil {
		newBooks, err := h.db.GetAllBooks()
		utils.SetBooks(newBooks)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	books := utils.GetBooks()
	c.JSON(http.StatusOK, books)
}
