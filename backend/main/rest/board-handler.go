package rest

import (
	"backend/main/models"
	"backend/main/utils"
	"fmt"
	"net/http"
	"strconv"

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

/*
dblayer.GetBoardById(int)(models.Board, error) 함수를 이용할 필요 x
-> GetBoards를 통해 utils.boards에 이미 데이터가 로드되어 있기 때문(사용자는 /boards를 타고 /board/id를 요청하기 때문)
*/
func (h *Handler) GetBoard(c *gin.Context){
	if h.db == nil {
		return
	}

	boards := utils.GetBoards()

	p := c.Param("id")
	id, err := strconv.Atoi(p)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	var board models.Board
	for _, b := range boards{
		if b.BoardId == id{
			board = b
			break
		}
	}
	
	c.JSON(http.StatusOK, board)
}

func (h *Handler)AddBoard(c *gin.Context){
	if h.db == nil {
		return
	}

	var board models.Board
	err := c.ShouldBindJSON(&board)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.db.AddBoard(board)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 새로운 리소스가 생성되어 웹 페이지에 새로운 게시글 데이터를 로드
	newBoards, err := h.db.GetAllBoards()
	utils.SetBoards(newBoards)
	if err != nil {
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, board)
}

func (h *Handler) RemoveBoard(c *gin.Context){
	if h.db == nil {
		return
	}
	p := c.Param("id")
	id, err := strconv.Atoi(p)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = h.db.RemoveBoardById(id)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 리소스에 변화가 생겨 웹 페이지에 새로운 게시글 데이터를 로드
	newBoards, err := h.db.GetAllBoards()
	utils.SetBoards(newBoards)
	if err != nil {
		fmt.Println(err)
		return
	}
}