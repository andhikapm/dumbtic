package eventdto

type EventRequest struct {
	Title       string `json:"title" form:"title"`
	Category    string `json:"category" form:"category"`
	Image       string `json:"image" form:"image"`
	StartDate   string `json:"startdate" form:"startdate"`
	EndDate     string `json:"enddate" form:"enddate"`
	Price       int    `json:"price" form:"price"`
	Address     string `json:"address" form:"address"`
	UrlMap      string `json:"urlMap" form:"urlMap"`
	Phone       string `json:"phone" form:"phone"`
	Email       string `json:"email" form:"email"`
	Description string `json:"description" form:"description"`
}
