package repositories

import (
	"Server/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	FindTickets() ([]models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	UpdateTicket(ticket models.Ticket) (models.Ticket, error)
	DeleteTicket(ticket models.Ticket) (models.Ticket, error)
	WherePayTicket(ID int) ([]models.Ticket, error)
	MyTicket(ID int) ([]models.Ticket, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTickets() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("User").Preload("Event").Find(&tickets).Error

	return tickets, err
}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("User").Preload("Event").First(&ticket, ID).Error

	return ticket, err
}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Preload("User").Preload("Event").Create(&ticket).Error

	return ticket, err
}

func (r *repository) UpdateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Preload("User").Preload("Event").Save(&ticket).Error

	return ticket, err
}

func (r *repository) DeleteTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Preload("User").Preload("Event").Delete(&ticket).Error

	return ticket, err
}

func (r *repository) WherePayTicket(ID int) ([]models.Ticket, error) {
	var ticket []models.Ticket
	err := r.db.Preload("User").Preload("Event").Where("user_id = ? AND status = ? OR status = ?", ID, "Need Pay", "pending").Find(&ticket).Error
	return ticket, err
}

func (r *repository) MyTicket(ID int) ([]models.Ticket, error) {
	var ticket []models.Ticket
	err := r.db.Preload("User").Preload("Event").Where("user_id = ? AND status = ?", ID, "success").Find(&ticket).Error
	return ticket, err
}
