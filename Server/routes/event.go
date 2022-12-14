package routes

import (
	"Server/handlers"
	"Server/pkg/middleware"
	"Server/pkg/mysql"
	"Server/repositories"
	"time"

	"github.com/gorilla/mux"
)

func EventRoutes(r *mux.Router) {
	eventRepository := repositories.RepositoryEvent(mysql.DB)
	h := handlers.HandlerEvent(eventRepository)

	r.HandleFunc("/events", h.FindEvents).Methods("GET")
	r.HandleFunc("/event/{id}", h.GetEvent).Methods("GET")
	r.HandleFunc("/addevent", middleware.Auth(middleware.UploadFile(h.CreateEvent))).Methods("POST")
	r.HandleFunc("/event/{id}", middleware.Auth(middleware.UploadFile(h.UpdateEvent))).Methods("PATCH")
	r.HandleFunc("/event/{id}", middleware.Auth(h.DeleteEvent)).Methods("DELETE")
	r.HandleFunc("/categoryevent/{category}", h.CatarEvents).Methods("GET")
	r.HandleFunc("/todayevent", h.TodayEvent).Methods("GET")
	r.HandleFunc("/upcomingevent", h.UpcomingEvent).Methods("GET")
	r.HandleFunc("/searchevents", h.SearchEvent).Methods("GET")
}

func CheckStatusEvent(r *mux.Router) {
	eventRepository := repositories.RepositoryEvent(mysql.DB)
	h := handlers.HandlerEvent(eventRepository)

	for range time.Tick(1 * time.Minute) {
		h.CheckingEvent()
	}
}
