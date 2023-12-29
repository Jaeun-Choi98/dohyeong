package utils

import (
	"backend/main/models"
	"sync"
)

var(
	// board-handler 
	boards []models.Board
	boardMu sync.Mutex
	boardLoaded bool
	
	// book-handler
	books []models.Book
	bookMu sync.Mutex
	bookLoaded bool
)

func SetBooks(newValue []models.Book){
	bookMu.Lock()
	defer bookMu.Unlock()
	books = newValue
	bookLoaded = true
}

func GetBooks() []models.Book{
	if !bookLoaded {
		return nil
	}
	return books
}

func SetBoards(newValue []models.Board) {
  boardMu.Lock()         // 잠금 획득
  defer boardMu.Unlock() // 함수가 종료되면 잠금 해제 (defer 사용)
  boards = newValue
	boardLoaded = true
}

func GetBoards() []models.Board{
	if !boardLoaded {
		return nil
	}
  return boards
}
