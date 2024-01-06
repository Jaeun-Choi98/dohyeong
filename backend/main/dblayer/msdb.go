package dblayer

import (
	"backend/main/models"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

type MYSQLDB struct{
	db *sql.DB
}

func NewMysql(dbName, con string)(*MYSQLDB, error){
	db, err := sql.Open(dbName,con)
	if err != nil{
		return nil, err
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return &MYSQLDB{db}, err
}

func (msdb *MYSQLDB)CloseMysql(){
	msdb.db.Close()
}

func (msdb *MYSQLDB)GetAllBooks()([]models.Book, error){
	rows, err := msdb.db.Query("select book_id, img_url, img_alt, book_name, price, link, description from book")
	if err != nil{
		return nil, err
	}
	defer rows.Close()

	var books []models.Book
	var book *models.Book
	books = make([]models.Book, 0)
	for rows.Next(){
		book = new(models.Book)
		err := rows.Scan(&book.BookId, &book.ImgUrl, &book.ImgAlt, &book.BookName, &book.Price, &book.Link, &book.Description)
		if err != nil{
			return nil, err
		}
		books = append(books, *book)
	}
	return books, nil
}

// user table
func (msdb *MYSQLDB)AddUser(user models.User)(error){
	// AddUser 이전에 DB에 있는 email일 경우, 가입 x -> 디스크 메모리에 접근하기 전에 램 메모리에서 확인할 필요가 있음.
	// 일단은 DB에 직접 조회를 해서 구현.
	if err := msdb.checkEmailAndName(user.Email, user.UserName); err != nil {
		return err
	}
	hashPassword(&user.Password)
	_,err := msdb.db.Exec("insert into user(email,password,user_name,logged_in,admin) values(?,?,?,?,?)",
	user.Email,user.Password,user.UserName,user.LoggedIn,user.Admin)
	if err != nil{
		return err
	}
	return nil
}

func (msdb *MYSQLDB)checkEmailAndName(email, userName string)(error){
	var check string
	msdb.db.QueryRow("select email from user where email = ?",email).Scan(&check)
	fmt.Println(check != "")
	if check != ""{
		return ErrEXISTINGEMAIL
	}
	msdb.db.QueryRow("select user_name from user where user_name = ?",userName).Scan(&check)
	fmt.Println(check)
	if check != ""{
		return ErrEXISTINGNAME
	}
	return nil
}

func hashPassword(s *string) error{
	
	sBytes := []byte(*s)
	
	//Obtain hashed password
	hashedBytes, err := bcrypt.GenerateFromPassword(sBytes, bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	//update password string with the hashed version
	*s = string(hashedBytes[:])
	return nil
}

func (msdb *MYSQLDB)SignInUser(email, password string)(models.User,error){
	user := &models.User{}
	row := msdb.db.QueryRow("select user_id, email, password, user_name, logged_in, admin from user where email = ?", email).
	Scan(&user.UserId,&user.Email,&user.Password,&user.UserName,&user.LoggedIn,&user.Admin)
	
	if row != nil {
		return *user, ErrNOTEXISTINGEMAIL
	}
	
	if checkPassword(user.Password,password){
		return *user, ErrINVALIDPASSWORD
	}

	_,err := msdb.db.Exec("update user set logged_in=1 where user_id=?",user.UserId)
	if err != nil{
		return *user, err
	}
	// Response를 위한 로그인 처리
	user.LoggedIn = 1
	
	return *user, nil
}

func checkPassword(encryptPass , nonEncryptPass string) bool {
	return bcrypt.CompareHashAndPassword([]byte(nonEncryptPass), []byte(encryptPass)) == nil
}

func (msdb *MYSQLDB)SignOutUserById(id int) error{
	res,err :=msdb.db.Exec("update user set logged_in=0 where user_id=?",id)
	if err != nil{
		return err
	}
	num,_ :=res.RowsAffected()
	if num == 0{
		return ErrEXPIREDSESSION
	}
	return nil
}

// board table
func (msdb *MYSQLDB)GetAllBoards()([]models.Board, error){
	rows, err := msdb.db.Query("select board_id, title, content, writer_name from board")
	if err != nil{
		return nil, err
	}
	defer rows.Close()

	var boards []models.Board
	var board *models.Board
	boards = make([]models.Board, 0)

	for rows.Next(){
		board = new(models.Board)
		err := rows.Scan(&board.BoardId, &board.Title, &board.Content, &board.WriterName)
		if err != nil{
			return nil, err
		}
		boards = append(boards, *board)
	}

	return boards, err
}

func (msdb *MYSQLDB) GetBoardById(id int) (models.Board, error) {
	var board *models.Board
	err := msdb.db.QueryRow("select board_id, title, content, writer_name from board where board_id=?",id).
	Scan(&board.BoardId, &board.Title, &board.Content, &board.WriterName)

	if err != nil{
		return *board, err
	}
	
	return *board, err
}

func (msdb *MYSQLDB) AddBoard(board models.Board) error {
	_,err := msdb.db.Exec("insert into board(title, content, writer_name) values(?,?,?)",
	board.Title, board.Content, board.WriterName)
	if err != nil{
		return err
	}
	return nil
}

func (msdb *MYSQLDB) RemoveBoardById(id int) error {
	_, err :=msdb.db.Exec("delete from board where board_id=?",id)
	if err != nil{
		return err
	}
	
	return nil
}

// comment table
func (msdb *MYSQLDB) AddComment(comment models.Comment) error {
	_,err := msdb.db.Exec("insert into comment(comment_id, board_id, user_id, content, writer_name) values(?,?,?,?,?)",
	comment.CommentId, comment.BoardId, comment.UserId, comment.Content, comment.WriterName)
	if err != nil{
		return err
	}
	return nil
}

func (msdb *MYSQLDB) GetCommentByBoardId(id int) ([]models.Comment, error) {
	rows, err := msdb.db.Query("select comment_id, board_id, user_id, content, writer_name from comment where board_id=?",id)
	if err != nil{
		return nil, err
	}
	defer rows.Close()

	var comments []models.Comment
	var comment *models.Comment
	comments = make([]models.Comment, 0)

	for rows.Next(){
		comment = new(models.Comment)
		err := rows.Scan(&comment.CommentId, &comment.BoardId, &comment.UserId, &comment.Content, &comment.WriterName)
		if err != nil{
			return nil, err
		}
		comments = append(comments, *comment)
	}

	return comments, err
}

func (msdb *MYSQLDB) RemoveCommentById(id int) error {
	_, err :=msdb.db.Exec("delete from comment where comment_id=?",id)
	if err != nil{
		return err
	}
	return nil
}