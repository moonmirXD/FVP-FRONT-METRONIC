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
	getPowerCardURL = "http://localhost:3000/powercard/list";
	postPowerCardURL = "http://localhost:3000/powercard/create";
	deletePowerCardURL = "http://localhost:3000/powercard/delete";
	updatePowerCardURL = "http://localhost:3000/powercard/edit";
	editPowerCardURL = "http://localhost:3000/powercard/edit";
	getbyIdPowerCardURL = "http://localhost:3000/powercard/list";
	mockDB = "http://localhost:3000/users";

	postGalleryURL = "http://fvp-back.herokuapp.com/galleryPost";

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
		return this.http
			.post(this.postGalleryURL, form, {
				reportProgress: true,
				observe: "events"
			})
			.pipe(catchError(this.errorMgmt));
	}
	errorMgmt(error: HttpErrorResponse) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
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
