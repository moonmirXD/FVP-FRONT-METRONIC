import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse
} from "@angular/common/http";
import { tap, delay, map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class DealerapiService {
	constructor(private http: HttpClient, private router: Router) {}

	//Forgot-password
	forgotPasswordURL = "http://localhost:3000/resetPassword";
	resetForgotPasswordURL =
		"http://localhost:3000/resetPassword/changepassword";

	mockDB = "http://localhost:3000/users";

	//Pin
	activateCardURL = "http://localhost:3000/activate"; //Activate Pin
	registerFormURL = "http://localhost:3000/activate/register"; //Register Page

	// Dealer when he/she is loggedIn

	getPowerCardURL = "http://localhost:3000/powercard/list";
	getByIdUserURL = "http://localhost:3200/users";
	updateFormUrl = "http://localhost:3000/dealer/profile/edit";

	// GET URL
	getURL = "http://localhost:3000/dealer/profile";
	getuserURL = "http://localhost:3000/dealer/profile";
	editUserURL = "http://localhost:3000/dealer/profile/edit";

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
