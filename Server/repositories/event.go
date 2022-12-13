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
}

func RepositoryEvent(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindEvents() ([]models.Event, error) {
	var events []models.Event
	err := r.db.Find(&events).Error

	return events, err
}

func (r *repository) GetEvent(ID int) (models.Event, error) {
	var event models.Event
	err := r.db.First(&event, ID).Error

	return event, err
}

func (r *repository) CreateEvent(event models.Event) (models.Event, error) {
	err := r.db.Create(&event).Error

	return event, err
}

func (r *repository) UpdateEvent(event models.Event) (models.Event, error) {
	err := r.db.Save(&event).Error

	return event, err
}

func (r *repository) DeleteEvent(event models.Event) (models.Event, error) {
	err := r.db.Delete(&event).Error

	return event, err
}

func (r *repository) WhereCatarEvent(category string) ([]models.Event, error) {
	var event []models.Event
	err := r.db.Where("category = ? AND status = ?", category, "On Progress").Find(&event).Error

	return event, err
}

func (r *repository) OnProgressEvent() ([]models.Event, error) {
	var event []models.Event
	err := r.db.Where("status = ?", "On Progress").Find(&event).Error

	return event, err
}
