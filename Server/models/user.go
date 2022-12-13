package models

type User struct {
	ID       int     `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Name     string  `json:"name" form:"name" gorm:"type: varchar(255)"`
	Email    string  `json:"email" form:"email" gorm:"type: varchar(255)"`
	Username string  `json:"username" form:"username" gorm:"type: varchar(255)"`
	Password string  `json:"password" form:"password" gorm:"type: varchar(255)"`
	Role     string  `json:"role" form:"role" gorm:"type: varchar(255)"`
	Birthday string  `json:"birthday" form:"birthday" gorm:"type: varchar(255)"`
	Phone    string  `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Image    string  `json:"image" form:"image" gorm:"type: varchar(255)"`
	Event    []Event `json:"event" gorm:"many2many:user_event;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UsersResponse struct {
	ID       int    `json:"id" form:"id"`
	Name     string `json:"name" form:"name"`
	Email    string `json:"email" form:"email"`
	Username string `json:"username" form:"username"`
}

func (UsersResponse) TableName() string {
	return "users"
}
