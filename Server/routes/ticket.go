package routes

import (
	"Server/handlers"
	"Server/pkg/middleware"
	"Server/pkg/mysql"
	"Server/repositories"

	"github.com/gorilla/mux"
)

func TicketRoutes(r *mux.Router) {
	ticketRepository := repositories.RepositoryTicket(mysql.DB)
	h := handlers.HandlerTicket(ticketRepository)

	r.HandleFunc("/tickets", h.FindTickets).Methods("GET")
	r.HandleFunc("/ticket/{id}", h.GetTicket).Methods("GET")
	r.HandleFunc("/ticket", middleware.Auth(h.CreateTicket)).Methods("POST")
	r.HandleFunc("/ticket/{id}", middleware.Auth(h.UpdateTicket)).Methods("PATCH")
	r.HandleFunc("/ticket/{id}", middleware.Auth(h.DeleteTicket)).Methods("DELETE")
	r.HandleFunc("/payticket", middleware.Auth(h.PayTickets)).Methods("GET")
	r.HandleFunc("/myticket", middleware.Auth(h.UserTickets)).Methods("GET")
}
