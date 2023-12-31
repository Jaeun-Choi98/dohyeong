package rest

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func RunAPI(address string) error{
	h,err := NewHandler()
	if err != nil{
		fmt.Print(err)
		return err
	}
	return RunAPIWithHandler(address, h)
}

func RunAPIWithHandler(address string, h HandlerInterface) error{
	r := gin.Default()
	r.Use(MyCustomLogger())

	// 로드 홈페이지
	//r.GET("/", h.GetMainPage)
	
	// 모든 책 정보를 반환
	r.GET("/books", h.GetBooks)

	/*
	사용자 로그인
	GET 방식을 이용할 시, 브라우저에 자동으로 캐시 됨.
	그리고, 데이터 전달 시 쿼리에 데이터를 포함. -> 보안성이 낮음
	POST 방식의 경우, http request 본문(body)에 데이터를 넣어서 전달
	*/
	r.POST("/users/signin", h.SignIn)

	// 사용자 신규 가입
	r.POST("/users/new",h.AddUser)

	/*
	해당 ID의 사용자 로그아웃
	아래 경로는 사용자ID(userId)를 포함.
	':id'는 변수 id를 의미(와일드카드)
	*/
	r.DELETE("/user/signout/:id",h.SignOut)

	// 배포하는 과정에서 nginx를 사용하기로 함. 그래서, 백엔드에서 시작 페이지를 띄워주지 않아도 됨.
	//r.Use(static.Serve("/",static.LocalFile("../../frontend/build", true)))
	
	/*
	모든 게시글을 반환
	*/
	r.GET("/boards", h.GetBoards)

	/*
	해당 ID의 게시글 반환
	*/
	r.GET("/board/:id", h.GetBoard)

	/*
	새로운 게시글 생성
	*/
	r.POST("/boards/new", h.AddBoard)

	/*
	해당 ID의 게시글 삭제
	*/
	r.DELETE("/boards/delete/:id", h.RemoveBoard)
	
	return r.Run(address)
}

func MyCustomLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("************************************")
		c.Next()
		// gin은 기본적으로 로거 미들웨어와 리커버리 미들웨어를 제공해서 아래 코드는 필요가 없지만,
		// 추가 확장을 위한 예시 코드
		status := c.Writer.Status()
		fmt.Println(status)
		fmt.Println("************************************")
	}
}