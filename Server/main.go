package main

import (
	"Server/database"
	"Server/pkg/mysql"
	"Server/routes"
	"fmt"
	"net/http"
	"os"
	"runtime"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	/*
		errEnv := godotenv.Load()
		if errEnv != nil {
			panic("Failed to load env file")
		}*/

	runtime.GOMAXPROCS(2)

	mysql.DatabaseInit()

	database.RunMigration()

	r := mux.NewRouter()

	routes.RouteInit(r.PathPrefix("/dumbtic").Subrouter())

	r.PathPrefix("/uploads").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = os.Getenv("PORT")
	//var port = "5000"
	fmt.Println("server running localhost:" + port)

	http.ListenAndServe(":"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
	//http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
}
