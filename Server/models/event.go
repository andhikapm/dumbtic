package models

type Event struct {
	ID          int           `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Title       string        `json:"title" form:"title" gorm:"type: varchar(255)"`
	Category    string        `json:"category" form:"category" gorm:"type: varchar(255)"`
	Image       string        `json:"image" form:"image" gorm:"type: varchar(255)"`
	StartDate   string        `json:"startdate" form:"startdate" gorm:"type: varchar(255)"`
	EndDate     string        `json:"enddate" form:"enddate" gorm:"type: varchar(255)"`
	Price       int           `json:"price" form:"price"`
	Address     string        `json:"address" form:"address" gorm:"type: varchar(255)"`
	UrlMap      string        `json:"urlmap" form:"urlmap" gorm:"type: varchar(255)"`
	Phone       string        `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Email       string        `json:"email" form:"email" gorm:"type: varchar(255)"`
	Description string        `json:"description" form:"description" gorm:"type:text"`
	Status      string        `json:"status" form:"status" gorm:"type: varchar(255)"`
	UserID      int           `json:"user_id" form:"user_id"`
	User        UsersResponse `json:"user" form:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
