import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private adminLoginUrl: string =
		"https://fvp-back.herokuapp.com/admin/login";
	constructor(private http: HttpClient, private router: Router) {}

	loginAdmin(user) {
		return this.http.post<any>(this.adminLoginUrl, user);
	}
	loggedinAdmin() {
		return !!localStorage.getItem("token");
	}
	getToken() {
		return localStorage.getItem("token");
	}
	logoutAdmin() {
		localStorage.removeItem("token");
		this.router.navigate(["adminlogin"]);
	}
}
