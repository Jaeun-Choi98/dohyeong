package dblayer

import (
	"backend/main/models"
	"database/sql"
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

func (msdb *MYSQLDB)AddUser(user models.User)(error){
	// AddUser 이전에 DB에 있는 email일 경우, 가입 x -> 디스크 메모리에 접근하기 전에 램 메모리에서 확인할 필요가 있음.
	// 일단은 DB에 직접 조회를 해서 구현.
	if msdb.checkEmail(user.Email) {
		return ErrEXISTINGEMAIL
	}
	hashPassword(&user.Password)
	_,err := msdb.db.Exec("insert into user(email,password,user_name,logged_in,admin) values(?,?,?,?,?)",
	user.Email,user.Password,user.UserName,user.LoggedIn,user.Admin)
	if err != nil{
		return err
	}
	return nil
}

func (msdb *MYSQLDB)checkEmail(email string)(bool){
	var check string
	msdb.db.QueryRow("select email from user where email = ?",email).Scan(&check)
	if check == ""{
		return false
	}
	return true
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
