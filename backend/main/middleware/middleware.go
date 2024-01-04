package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func MyCustomLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("************************************")
		c.Next()
		fmt.Printf("클라이언트 주소: %s \n",c.ClientIP())
		fmt.Println("************************************")
	}
}

func AuthUserMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization") // 클라이언트에서 헤더로 JWT 전달
		if tokenString == "" {
				fmt.Println("인증되지 않은 요청")
				c.JSON(http.StatusUnauthorized, gin.H{"err": "인증되지 않은 요청"})
				c.Abort()
				return
		}
		// 토큰 블랙리스트에 있는지 확인
		// if _, ok := blacklist[tokenString]; ok {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"message": "유효하지 않은 토큰"})
		// 	c.Abort()
		// 	return
		// }

		// test용 시크릿 키
		secretKey := "JWT_SECRET_KEY"

		token, err := jwt.Parse(strings.Split(tokenString, " ")[1], func(token *jwt.Token) (interface{}, error) {
				return []byte(secretKey), nil
		})

		if err != nil || !token.Valid {
				fmt.Println("유효하지 않은 토큰")
				c.JSON(http.StatusUnauthorized, gin.H{"err": "유효하지 않은 토큰"})
				c.Abort()
				return
		}

		c.Next()
	}
}

func AuthAdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization") // 클라이언트에서 헤더로 JWT 전달
		if tokenString == "" {
			fmt.Println("인증되지 않은 요청")
			c.JSON(http.StatusUnauthorized, gin.H{"err": "인증되지 않은 요청"})
			c.Abort()
			return
		}

		// test용 시크릿 키
		secretKey := "JWT_SECRET_KEY"

		token, err := jwt.Parse(strings.Split(tokenString, " ")[1], func(token *jwt.Token) (interface{}, error) {
			return []byte(secretKey), nil
		})

		if err != nil || !token.Valid {
			fmt.Println("유효하지 않은 토큰")
			c.JSON(http.StatusUnauthorized, gin.H{"err": "유효하지 않은 토큰"})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			admin, exists := claims["admin"]
			if !exists || admin == 0 {
				fmt.Println("유효하지 않은 관리자")
				c.JSON(http.StatusUnauthorized, gin.H{"err": "유효하지 않은 관리자"})
				c.Abort()
				return
			}
		} else {
			fmt.Println("클레임 오류")
			c.JSON(http.StatusUnauthorized, gin.H{"err": "클레임 오류"})
			c.Abort()
			return
		}

		c.Next()
	}
}
