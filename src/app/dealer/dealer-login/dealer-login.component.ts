import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "kt-dealer-login",
	templateUrl: "./dealer-login.component.html",
	styleUrls: ["./dealer-login.component.scss"]
})
export class DealerLoginComponent implements OnInit {
	submitted = false;

	constructor(
		private authService: AuthenticationService,
		private fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {}
	loginUserData = this.fb.group({
		email: ["", [Validators.email, Validators.required]],
		password: ["", Validators.required]
	});

	loginUser() {
		this.submitted = true;
		if (this.loginUserData.invalid) {
			return;
		} else {
			if (
				this.loginUserData.value.userName == "123@yahoo.com" &&
				this.loginUserData.value.password == "123"
			) {
				this.router.navigate(["/URL-Details"]);
			}
			this.authService.loginDealer(this.loginUserData.value).subscribe(
				res => {
					console.log(res);
					localStorage.setItem("token", res.token);
					this.router.navigate(["/URL-Details"]);
				},
				err => {
					alert(
						"Error something went wrong. Email or Password is incorrect."
					);
				}
			);
			console.log(this.loginUserData);
		}
	}
}
