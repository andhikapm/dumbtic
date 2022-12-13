package usersdto

type UpdateUserRequest struct {
	Name     string `json:"name" form:"name"`
	Email    string `json:"email" form:"email"`
	Birthday string `json:"birthday" form:"birthday"`
	Phone    string `json:"phone" form:"phone"`
	Image    string `json:"image" form:"image"`
}

type AddWishlistRequest struct {
	EventID int `json:"event_id" form:"event_id"`
}
