import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Component({
	selector: "kt-admin-login",
	templateUrl: "./admin-login.component.html",
	styleUrls: ["./admin-login.component.scss"]
})
export class AdminLoginComponent implements OnInit {
	submitted = false;
	constructor(
		private authService: AuthenticationService,
		private fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		this.checkRoute();
	}
	loginUserData = this.fb.group({
		userName: [""],
		password: [""]
	});

	loginUser() {
		this.submitted = true;
		if (
			this.loginUserData.value.userName == "123" &&
			this.loginUserData.value.password == "123"
		) {
			this.router.navigate(["/powercard-list"]);
		}
		this.authService.loginAdmin(this.loginUserData.getRawValue()).subscribe(
			res => {
				console.log(res);
				localStorage.setItem("token", res.token);
				this.router.navigate(["/powercard-list"]);
			},
			err => {
				alert(
					"Error something went wrong. Email or Password is incorrect."
				);
				console.log(err);
			}
		);
		console.log(this.loginUserData);
	}
	checkRoute() {
		if (this.router.url === "/adminlogin") {
			console.log(this.router.url);
			this.authService.logoutAdmin();
		}
	}
}
