package handlers

import (
	eventdto "Server/dto/event"
	dto "Server/dto/result"
	"Server/models"
	"Server/repositories"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"

	"github.com/go-playground/validator/v10"

	"github.com/gorilla/mux"
)

type handlerEvent struct {
	EventRepository repositories.EventRepository
}

func HandlerEvent(EventRepository repositories.EventRepository) *handlerEvent {
	return &handlerEvent{EventRepository}
}

func (h *handlerEvent) FindEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	events, err := h.EventRepository.FindEvents()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var data []models.Event
	for _, s := range events {
		/*
			const longForm = "Mon, 02 Jan 2006 15:04:00 MST"
			aStart, _ := time.Parse(longForm, s.StartDate)
			aEnd, _ := time.Parse(longForm, s.EndDate)*/

		dataGet := models.Event{
			ID:          s.ID,
			Title:       s.Title,
			Category:    s.Category,
			Image:       s.Image,
			StartDate:   s.StartDate,
			EndDate:     s.EndDate,
			Price:       s.Price,
			Address:     s.Address,
			UrlMap:      s.UrlMap,
			Phone:       s.Phone,
			Email:       s.Email,
			Description: s.Description,
			Status:      s.Status,
		}
		data = append(data, dataGet)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerEvent) GetEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var event models.Event
	event, err := h.EventRepository.GetEvent(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	/*
		const longForm = "Mon, 02 Jan 2006 15:04:00 MST"
		aStart, _ := time.Parse(longForm, event.StartDate)
		aEnd, _ := time.Parse(longForm, event.EndDate)*/

	data := models.Event{
		ID:          event.ID,
		Title:       event.Title,
		Category:    event.Category,
		Image:       event.Image,
		StartDate:   event.StartDate,
		EndDate:     event.EndDate,
		Price:       event.Price,
		Address:     event.Address,
		UrlMap:      event.UrlMap,
		Phone:       event.Phone,
		Email:       event.Email,
		Description: event.Description,
		Status:      event.Status,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerEvent) CreateEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	user_ID := int(userInfo["id"].(float64))

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	price, _ := strconv.Atoi(r.FormValue("price"))

	request := eventdto.EventRequest{
		Title:       r.FormValue("title"),
		Category:    r.FormValue("category"),
		StartDate:   r.FormValue("startdate"), //2022-12-08T14:45
		EndDate:     r.FormValue("enddate"),
		Price:       price,
		Address:     r.FormValue("address"),
		UrlMap:      r.FormValue("urlMap"),
		Phone:       r.FormValue("phone"),
		Email:       r.FormValue("email"),
		Description: r.FormValue("description"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var sentImg = ""

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "ThicToc"})

	if filepath != "false" {
		sentImg = resp.SecureURL
	}

	if err != nil {
		fmt.Println(err.Error())
	}

	event := models.Event{
		Title:       request.Title,
		Category:    request.Category,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
		Image:       sentImg,
		Price:       request.Price,
		Address:     request.Address,
		UrlMap:      request.UrlMap,
		Phone:       request.Phone,
		Email:       request.Email,
		Description: request.Description,
		Status:      "On Progress",
		UserID:      user_ID,
	}

	event, err = h.EventRepository.CreateEvent(event)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	event, _ = h.EventRepository.GetEvent(event.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Status: "success", Data: event}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerEvent) UpdateEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	price, _ := strconv.Atoi(r.FormValue("price"))

	request := eventdto.EventRequest{
		Title:       r.FormValue("title"),
		Category:    r.FormValue("category"),
		Price:       price,
		Address:     r.FormValue("address"),
		UrlMap:      r.FormValue("urlMap"),
		Phone:       r.FormValue("phone"),
		Email:       r.FormValue("email"),
		Description: r.FormValue("description"),
	}

	event, err := h.EventRepository.GetEvent(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, _ := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "Buckbug"})

	if request.Title != "" {
		event.Title = request.Title
	}

	if request.Category != "" {
		event.Category = request.Category
	}

	if filepath != "false" {
		event.Image = resp.SecureURL
	}

	if r.FormValue("price") != "" {
		event.Price = request.Price
	}

	if request.Address != "" {
		event.Address = request.Address
	}

	if request.UrlMap != "" {
		event.UrlMap = request.UrlMap
	}

	if request.Phone != "" {
		event.Phone = request.Phone
	}

	if request.Email != "" {
		event.Email = request.Email
	}

	if request.Description != "" {
		event.Description = request.Description
	}

	data, err := h.EventRepository.UpdateEvent(event)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Status: "success", Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerEvent) DeleteEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	event, err := h.EventRepository.GetEvent(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.EventRepository.DeleteEvent(event)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Status: "success", Data: data.ID}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerEvent) CatarEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	category := mux.Vars(r)["category"]

	events, err := h.EventRepository.WhereCatarEvent(category)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var data []models.Event
	for _, s := range events {

		dataGet := models.Event{
			ID:          s.ID,
			Title:       s.Title,
			Category:    s.Category,
			Image:       s.Image,
			StartDate:   s.StartDate,
			EndDate:     s.EndDate,
			Price:       s.Price,
			Address:     s.Address,
			UrlMap:      s.UrlMap,
			Phone:       s.Phone,
			Email:       s.Email,
			Description: s.Description,
			Status:      s.Status,
			User:        s.User,
			UserID:      s.UserID,
		}
		data = append(data, dataGet)

	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerEvent) TodayEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	const longForm = "Mon, 02 Jan 2006 15:04:00 MST"
	const shortForm = "2006-January-02"

	today := time.Now().UTC()
	tomorrow := today.Add(24 * time.Hour)
	tomorrowConv := tomorrow.Format("2006-January-02")
	tomorrowCompare, _ := time.Parse(shortForm, tomorrowConv)

	events, err := h.EventRepository.OnProgressEvent()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var data []models.Event
	for _, s := range events {

		aStart, _ := time.Parse(longForm, s.StartDate)
		aEnd, _ := time.Parse(longForm, s.EndDate)

		dataGet := models.Event{
			ID:          s.ID,
			Title:       s.Title,
			Category:    s.Category,
			Image:       s.Image,
			StartDate:   s.StartDate,
			EndDate:     s.EndDate,
			Price:       s.Price,
			Address:     s.Address,
			UrlMap:      s.UrlMap,
			Phone:       s.Phone,
			Email:       s.Email,
			Description: s.Description,
			Status:      s.Status,
			User:        s.User,
			UserID:      s.UserID,
		}

		if ((today.Unix() <= aStart.Unix()) || (today.Unix() <= aEnd.Unix())) && (aStart.Unix() <= tomorrowCompare.Unix()) {
			data = append(data, dataGet)

		}
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerEvent) UpcomingEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	const longForm = "Mon, 02 Jan 2006 15:04:00 MST"
	const shortForm = "2006-January-02"

	today := time.Now().UTC()
	tomorrow := today.Add(24 * time.Hour)
	tomorrowConv := tomorrow.Format("2006-January-02")
	tomorrowCompare, _ := time.Parse(shortForm, tomorrowConv)

	events, err := h.EventRepository.OnProgressEvent()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var data []models.Event
	for _, s := range events {

		aStart, _ := time.Parse(longForm, s.StartDate)

		dataGet := models.Event{
			ID:          s.ID,
			Title:       s.Title,
			Category:    s.Category,
			Image:       s.Image,
			StartDate:   s.StartDate,
			EndDate:     s.EndDate,
			Price:       s.Price,
			Address:     s.Address,
			UrlMap:      s.UrlMap,
			Phone:       s.Phone,
			Email:       s.Email,
			Description: s.Description,
			Status:      s.Status,
			User:        s.User,
			UserID:      s.UserID,
		}

		if aStart.Unix() >= tomorrowCompare.Unix() {
			data = append(data, dataGet)
		}

	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerEvent) SearchEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	events, err := h.EventRepository.GetEventByProgress()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var dataEvents []models.Event
	for _, s := range events {

		dataGet := models.Event{
			ID:          s.ID,
			Title:       s.Title,
			Category:    s.Category,
			Image:       s.Image,
			StartDate:   s.StartDate,
			EndDate:     s.EndDate,
			Price:       s.Price,
			Address:     s.Address,
			UrlMap:      s.UrlMap,
			Phone:       s.Phone,
			Email:       s.Email,
			Description: s.Description,
			Status:      s.Status,
			User:        s.User,
			UserID:      s.UserID,
		}

		dataEvents = append(dataEvents, dataGet)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: dataEvents}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerEvent) CheckingEvent() {

	const longForm = "Mon, 02 Jan 2006 15:04:00 MST"

	today := time.Now().UTC()
	//today = today.Add(time.Minute * 15)

	events, err := h.EventRepository.OnProgressEvent()
	if err != nil {
		fmt.Println("error OnProgressEvent")
		return
	}

	for _, s := range events {

		aEnd, _ := time.Parse(longForm, s.EndDate)

		if aEnd.Unix() < today.Unix() {
			s.Status = "Close"

			dataGet := models.Event{
				ID:          s.ID,
				Title:       s.Title,
				Category:    s.Category,
				Image:       s.Image,
				StartDate:   s.StartDate,
				EndDate:     s.EndDate,
				Price:       s.Price,
				Address:     s.Address,
				UrlMap:      s.UrlMap,
				Phone:       s.Phone,
				Email:       s.Email,
				Description: s.Description,
				Status:      s.Status,
				User:        s.User,
				UserID:      s.UserID,
			}

			_, err := h.EventRepository.UpdateEvent(dataGet)
			if err != nil {
				fmt.Println("error UpdateEvent")
				return
			}

			tickets, err := h.EventRepository.FindUserTickets(dataGet.ID)
			if err != nil {
				fmt.Println("error FindUserTickets")
				return
			}

			for _, sT := range tickets {
				sT.Status = "Close"

				dataTic := models.Ticket{
					ID:      sT.ID,
					Status:  sT.Status,
					User:    sT.User,
					UserID:  sT.UserID,
					Qty:     sT.Qty,
					EventID: sT.EventID,
					Event:   sT.Event,
				}

				err := h.EventRepository.UpdateUserTicket(dataTic)
				if err != nil {
					fmt.Println("error UpdateUserTicket")
					return
				}

			}

		}
	}
}
