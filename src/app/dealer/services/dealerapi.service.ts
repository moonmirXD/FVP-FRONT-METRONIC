import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { tap, delay, map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class DealerapiService {
	constructor(private http: HttpClient) {}

	//Forgot-password
	forgotPasswordURL = "http://localhost:3000/resetPassword/";

	mockDB = "http://localhost:3200/users";
	activateCardURL = "http://localhost:3000/activate"; //Activate Pin
	registerFormURL = "http://localhost:3000/activate/register"; //Register Page

	// Dealer when he/she is loggedIn

	getPowerCardURL = "http://localhost:3000/powercard/list";
	getByIdUserURL = "http://localhost:3200/users";

	postForgotPassword(form) {
		return this.http.post(this.forgotPasswordURL, form);
	}

	public getUsers() {
		return this.http.get(this.mockDB).pipe(
			map((users: any) => {
				const newUsers = [];
				for (let user of users) {
					const email = user.email;
					newUsers.push({ email: email });
				}
				return newUsers;
			}),
			tap(users => {
				console.log(users);
			})
		);
	}
	getUserByUsername(uName: string) {
		return this.http.get(this.mockDB, {
			params: new HttpParams().set("username", uName)
		});
	}

	getRegisterUsers() {
		return this.http.get(this.mockDB);
	}
	postActivateCard(form) {
		return this.http.post(this.mockDB, form);
	}
	postRegistrationForm(form) {
		return this.http.post(this.mockDB, form);
	}

	//Dealer's URL
	getUserUrl() {
		return this.http.get(this.mockDB);
	}
	getByIdPowerCard(id) {
		return this.http.get(`${this.getByIdUserURL}/${id}`);
	}
}
