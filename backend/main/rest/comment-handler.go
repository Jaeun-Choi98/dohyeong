package rest

import (
	"backend/main/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func (h *Handler) AddComment(c *gin.Context) {
	if h.db == nil {
		return
	}

	var comment models.Comment
	err := c.ShouldBindJSON(&comment)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validate := validator.New()
	if err := validate.Struct(comment); err != nil {
		fmt.Println("Validation error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "댓글은 500자 이내로 작성해주세요."})
		return
	}

	err = h.db.AddComment(comment)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func (h *Handler) GetComments(c *gin.Context) {
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

	comments, err := h.db.GetCommentByBoardId(id)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, comments)
}

func (h *Handler) RemoveComment(c *gin.Context) {
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
	err = h.db.RemoveCommentById(id)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
