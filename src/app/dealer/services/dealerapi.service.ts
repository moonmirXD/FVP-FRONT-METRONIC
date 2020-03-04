import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse
} from "@angular/common/http";
import { tap, delay, map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment.prod";

@Injectable({
	providedIn: "root"
})
export class DealerapiService {
	apiBaseUrl = environment.api_url;
	constructor(private http: HttpClient, private router: Router) {}

	//Forgot-password
	forgotPasswordURL = `${this.apiBaseUrl}resetPassword`;
	resetForgotPasswordURL = `${this.apiBaseUrl}resetPassword/changepassword`;

	mockDB = "http://localhost:3000/users";

	//Pin
	activateCardURL = `${this.apiBaseUrl}activate`; //Activate Pin
	registerFormURL = `${this.apiBaseUrl}activate/register`; //Register Page

	// Dealer when he/she is loggedIn

	getPowerCardURL = `${this.apiBaseUrl}powercard/list`;
	getByIdUserURL = `${this.apiBaseUrl}users`;
	updateFormUrl = `${this.apiBaseUrl}dealer/profile/edit`;

	// GET URL
	getURL = `${this.apiBaseUrl}dealer/profile`;
	getuserURL = `${this.apiBaseUrl}dealer/profile`;
	editUserURL = `${this.apiBaseUrl}dealer/profile/edit`;

	getUserByUsernameProfileURL = `${this.apiBaseUrl}dealer/profile`;

	postForgotPassword(form) {
		return this.http.post(this.forgotPasswordURL, form);
	}
	postResetForgotPassword(form) {
		return this.http.post(this.resetForgotPasswordURL, form);
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
		return this.http.post(this.activateCardURL, form);
	}
	postRegistrationForm(form) {
		return this.http.post(this.registerFormURL, form);
	}

	//Dealer's URL
	getUserUrl() {
		return this.http.get(this.getURL);
	}
	getUser() {
		return this.http.get(this.getuserURL).pipe(
			catchError(err => {
				if (err.status == 403) {
					this.router.navigate(["/dealerlogin"]);
					console.log("Session expired");
				} else {
					return throwError(err);
				}
			})
		);
	}
	getUserbyUsernameProfile(username: string) {
		return this.http
			.get(`${this.getUserByUsernameProfileURL}/${username}`)
			.pipe(delay(1000));
	}
	updateUser(form) {
		return this.http.patch(this.editUserURL, form);
	}

	updateProfilePicUser(form) {
		return this.http
			.patch(this.editUserURL, form, {
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
}
