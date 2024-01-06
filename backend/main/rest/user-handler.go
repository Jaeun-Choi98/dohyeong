package rest

import (
	"backend/main/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func (h *Handler) SignIn(c *gin.Context) {
	
	if h.db == nil {
    return
	}

	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err = h.db.SignInUser(user.Email, user.Password)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 사용자 인증 후 JWT 생성
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	/* 
	사용자 정보
	기본적으로 JWT의 페이로드를 map[string]interface{} 타입으로, 
	Go에서 JSON 표현의 숫자는 기본적으로 float64로 디코딩됨.
	따라서, 페이로드 값이 정수인 경우 인코딩/디코딩 되는 과정에서 float64 값으로 변환될 수 있음.
	정수 1을 사용하는 경우, 디코딩 후에는 1보다 작은 실수 값을 가짐.
	*/
	claims["userName"] = user.UserName 
	claims["admin"] = user.Admin

	// test용 시크릿 키
	secretKey := "JWT_SECRET_KEY"

	// 시크릿 키로 JWT 서명
	tokenString, _ := token.SignedString([]byte(secretKey))

	// 토큰과 사용자 정보를 함께 전달
	c.JSON(http.StatusOK, gin.H{"token": tokenString, 
		"userId": user.UserId,
		"userName": user.UserName,
		"loggedIn": user.LoggedIn,
		"admin": user.Admin,
	})

}

func (h *Handler) AddUser(c *gin.Context) {
	if h.db == nil {
		return
	}
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validate := validator.New()
	if err := validate.Struct(user); err != nil {
		fmt.Println("Validation error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "닉네임은 50글자 이내로 작성해주세요."})
		return
	}

	err = h.db.AddUser(user)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *Handler) SignOut(c *gin.Context) {
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
	err = h.db.SignOutUserById(id)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}