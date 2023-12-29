package rest

import (
	"backend/main/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetBoards(c *gin.Context) {
	if h.db == nil {
		return
	}
	
	// 첫 요청에만 DB 서버에서 데이터를 불러옴.
	if utils.GetBoards() == nil{
		newBoards, err := h.db.GetAllBoards()
		utils.SetBoards(newBoards)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	
	boards := utils.GetBoards()
	c.JSON(http.StatusOK, boards)
}