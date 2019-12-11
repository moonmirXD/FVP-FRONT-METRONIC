import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AdminApiService {
	constructor(private http: HttpClient) {}
	getPowerCardURL = "https://fvp-back.herokuapp.com/powercard/list";
	postPowerCardURL = "https://fvp-back.herokuapp.com/powercard/create";
	deletePowerCardURL = "https://fvp-back.herokuapp.com/powercard/delete";
	updatePowerCardURL = "https://fvp-back.herokuapp.com/powercard/edit";
	editPowerCardURL = "https://fvp-back.herokuapp.com/powercard/edit";
	getbyIdPowerCardURL = "https://fvp-back.herokuapp.com/powercard/list";
	mockDB = "http://localhost:3000/users";
	postPowerCard(form) {
		return this.http.post(this.postPowerCardURL, form);
	}
	getPowerCard() {
		return this.http.get(this.getPowerCardURL);
	}
	deletePowerCard(id) {
		return this.http.delete(`${this.deletePowerCardURL}/${id}`);
	}
	updatePowerCard(id, form) {
		return this.http.patch(this.updatePowerCardURL + "/" + id, form);
	}
	getByIdPowerCard(id) {
		return this.http.get(`${this.getbyIdPowerCardURL}/${id}`);
	}
	editPowerCard(form) {
		return this.http.post(this.editPowerCardURL, form);
	}
	//gallery
	postGallery(form) {
		return this.http.post(this.mockDB, form);
	}
	getGallery() {
		return this.http.get(this.mockDB);
	}
	deleteGallery(id) {
		return this.http.delete(`${this.mockDB}/${id}`);
	}
	updateGallery(id, form) {
		return this.http.put(this.mockDB + "/" + id, form);
	}
	getById(id) {
		return this.http.get(`${this.mockDB}/${id}`);
	}
}
