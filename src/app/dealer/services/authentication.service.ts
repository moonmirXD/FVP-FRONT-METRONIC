import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	apiBaseUrl = environment.api_url;
	private dealerLoginUrl: string = `${this.apiBaseUrl}dealer/login`;
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
		this.router.navigate(["/dealerlogin"]);
	}
	activateCardAuth() {
		return !!localStorage.getItem("token");
	}
}
