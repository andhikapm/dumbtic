package repositories

import (
	"Server/models"

	"gorm.io/gorm"
)

type EventRepository interface {
	FindEvents() ([]models.Event, error)
	GetEvent(ID int) (models.Event, error)
	CreateEvent(event models.Event) (models.Event, error)
	UpdateEvent(event models.Event) (models.Event, error)
	DeleteEvent(event models.Event) (models.Event, error)
	WhereCatarEvent(category string) ([]models.Event, error)
	OnProgressEvent() ([]models.Event, error)
	GetEventByProgress() ([]models.Event, error)
	FindUserTickets(ID int) ([]models.Ticket, error)
	UpdateUserTicket(ticket models.Ticket) error
}

func RepositoryEvent(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindEvents() ([]models.Event, error) {
	var events []models.Event
	err := r.db.Preload("User").Find(&events).Error

	return events, err
}

func (r *repository) GetEvent(ID int) (models.Event, error) {
	var event models.Event
	err := r.db.Preload("User").First(&event, ID).Error

	return event, err
}

func (r *repository) CreateEvent(event models.Event) (models.Event, error) {
	err := r.db.Create(&event).Error

	return event, err
}

func (r *repository) UpdateEvent(event models.Event) (models.Event, error) {
	err := r.db.Preload("User").Save(&event).Error

	return event, err
}

func (r *repository) DeleteEvent(event models.Event) (models.Event, error) {
	err := r.db.Delete(&event).Error

	return event, err
}

func (r *repository) WhereCatarEvent(category string) ([]models.Event, error) {
	var event []models.Event
	err := r.db.Preload("User").Where("category = ? AND status = ?", category, "On Progress").Find(&event).Error

	return event, err
}

func (r *repository) OnProgressEvent() ([]models.Event, error) {
	var event []models.Event
	err := r.db.Preload("User").Where("status = ?", "On Progress").Find(&event).Error

	return event, err
}

func (r *repository) GetEventByProgress() ([]models.Event, error) {
	var event []models.Event
	err := r.db.Preload("User").Where("status = ?", "On Progress").Find(&event).Error

	return event, err
}

func (r *repository) FindUserTickets(ID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("User").Preload("Event").Where("event_id = ?", ID).Find(&tickets).Error

	return tickets, err
}

func (r *repository) UpdateUserTicket(ticket models.Ticket) error {
	err := r.db.Save(&ticket).Error

	return err
}
