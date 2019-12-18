import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class DealerapiService {
	constructor(private http: HttpClient) {}
	mockDB = "http://localhost:3000/users";
	activateCardURL = "https://fvp-back.herokuapp.com/activate/";
	registerFormURL = "https://fvp-back.herokuapp.com/activate/register";
	postActivateCard(form) {
		return this.http.post(this.activateCardURL, form);
	}
	postRegistrationForm(form) {
		return this.http.post(this.registerFormURL, form);
	}
}
