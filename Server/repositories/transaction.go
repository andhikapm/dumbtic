package repositories

import (
	"Server/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdatePayment(status string, ID string) error
	GetMyTransaction(ID int) ([]models.Transaction, error)
	GetTransTicket(ID int) (models.Ticket, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction

	err := r.db.Preload("User").Preload("Ticket").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {

	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {

	err := r.db.Preload("User").Preload("Ticket").Save(&transaction).Error

	return transaction, err
}

func (r *repository) UpdatePayment(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").Preload("Ticket").First(&transaction, ID)

	var ticket models.Ticket
	r.db.Preload("User").Preload("Event").First(&ticket, transaction.TicketID)

	ticket.Status = status
	transaction.Status = status

	r.db.Preload("User").Preload("Event").Save(&ticket)
	err := r.db.Preload("User").Preload("Ticket").Save(&transaction).Error

	return err
}

func (r *repository) GetMyTransaction(ID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	//db.Where("name = ?", "jinzhu").First(&user)
	err := r.db.Preload("User").Preload("Ticket").Where("user_id = ?", ID).Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("Event").First(&ticket, ID).Error

	return ticket, err
}
