package usersdto

import (
	"Server/models"
)

type UserResponse struct {
	ID       int            `json:"id"`
	Name     string         `json:"name" form:"name"`
	Email    string         `json:"email" form:"email"`
	Username string         `json:"username" form:"username"`
	Role     string         `json:"role" form:"role"`
	Birthday string         `json:"birthday" form:"birthday"`
	Phone    string         `json:"phone" form:"phone"`
	Image    string         `json:"image" form:"image"`
	Event    []models.Event `json:"event" form:"event"`
}

type WishResponse struct {
	ID       int            `json:"id"`
	Username string         `json:"username" form:"username"`
	Event    []models.Event `json:"event"`
}
