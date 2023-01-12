package models

type Transaction struct {
	ID       int            `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	UserID   int            `json:"user_id" form:"user_id"`
	User     UsersResponse  `json:"user" form:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	TicketID int            `json:"ticket_id" form:"ticket_id"`
	Ticket   TicketResponse `json:"ticket" form:"ticket" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Price    int            `json:"price" form:"price"`
	Status   string         `json:"status" form:"status" gorm:"type: varchar(255)"`
}
