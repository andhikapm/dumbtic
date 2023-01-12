package models

type Ticket struct {
	ID      int           `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	UserID  int           `json:"user_id" form:"user_id"`
	User    UsersResponse `json:"user" form:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	EventID int           `json:"event_id" form:"event_id"`
	Event   Event         `json:"event" form:"event" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Qty     int           `json:"qty" form:"qty"`
	Status  string        `json:"status" form:"status"`
}

type TicketResponse struct {
	ID      int   `json:"id" form:"id"`
	EventID int   `json:"event_id" form:"event_id"`
	Event   Event `json:"event" form:"event" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Qty     int   `json:"qty" form:"qty"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}
