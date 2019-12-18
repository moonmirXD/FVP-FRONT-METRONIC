import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AdminApiService {
	constructor(private http: HttpClient, private router: Router) {}
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
	getPowerCard(): Observable<any> {
		return this.http.get<any[]>(this.getPowerCardURL).pipe(
			catchError(err => {
				if (err.status == 403) {
					this.router.navigate(["/adminlogin"]);
					console.log("Session expired");
				} else {
					return throwError(err);
				}
			})
		);
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
	errorHandler(error: HttpErrorResponse) {}
}
