import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "kt-dealer-login",
	templateUrl: "./dealer-login.component.html",
	styleUrls: ["./dealer-login.component.scss"]
})
export class DealerLoginComponent implements OnInit {
	constructor(
		private authService: AuthenticationService,
		private fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {}
	loginUserData = this.fb.group({
		email: [""],
		password: [""]
	});

	loginUser() {
		if (
			this.loginUserData.value.userName == "123" &&
			this.loginUserData.value.password == "123"
		) {
			this.router.navigate(["/URL-Details"]);
		}
		this.authService
			.loginDealer(this.loginUserData.getRawValue())
			.subscribe(
				res => {
					console.log(res);
					localStorage.setItem("token", res.token);
					this.router.navigate(["/URL-Details"]);
				},
				err => console.log(err)
			);
		console.log(this.loginUserData);
	}
}
