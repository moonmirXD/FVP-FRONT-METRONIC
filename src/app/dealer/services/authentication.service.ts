import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private dealerLoginUrl: string = "http://localhost:3000/dealer/login";
	constructor(private http: HttpClient, private router: Router) {}

	loginDealer(user) {
		return this.http.post<any>(this.dealerLoginUrl, user);
	}
	loggedinDealer() {
		return !!localStorage.getItem("token");
	}
	getToken() {
		return localStorage.getItem("token");
	}
	logoutDealer() {
		localStorage.removeItem("token");
		this.router.navigate(["dealerlogin"]);
	}
	activateCardAuth() {
		return !!localStorage.getItem("token");
	}
}
