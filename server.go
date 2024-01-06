package main

import (
	"net/http"
	"os/exec"
)

func renderReactComponent(componentPath string) (string, error) {
	cmd := exec.Command("node", "./rsc/rsc.js", componentPath)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func handler(w http.ResponseWriter, r *http.Request) {
	var componentPath string

	switch r.URL.Path {
	case "/":
		componentPath = "../app/dist/page.js"
	default:
		http.NotFound(w, r)
		return
	}

	renderedHTML, err := renderReactComponent(componentPath)

	if err != nil {
		http.Error(w, "Failed to render component: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(renderedHTML))
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
