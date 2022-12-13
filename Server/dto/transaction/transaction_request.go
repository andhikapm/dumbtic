package transactiondto

type TransactionRequest struct {
	UserID   int `json:"-"`
	TicketID int `json:"ticket_id" form:"ticket_id"`
	Price    int `json:"price" form:"price"`
}

type TransactionUpdate struct {
	Status string `json:"status"  gorm:"type:varchar(255)"`
}
