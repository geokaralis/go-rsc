package users

import (
	"encoding/json"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func HandleUsers(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{ID: 1, Name: "Rebecca Carlson"},
		{ID: 2, Name: "Kevin Holmes"},
	}

	json.NewEncoder(w).Encode(users)
}
