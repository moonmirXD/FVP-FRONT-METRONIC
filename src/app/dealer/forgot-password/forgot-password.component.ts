import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DealerapiService } from "../services/dealerapi.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;
	submitted = false;

	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,

		private router: Router
	) {}

	ngOnInit() {
		this.forgotPasswordForm = this.fb.group({
			email: ["", [Validators.email, Validators.required]]
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.forgotPasswordForm.invalid) {
			return;
		} else {
			console.log(this.forgotPasswordForm.value);
			this.dealerApi
				.postForgotPassword(this.forgotPasswordForm.value)
				.subscribe(
					(res: any) => {
						alert("Successfully Sent!");
						this.router.navigate(["/dealerlogin"]);
						console.log(res);
					},
					err => {
						console.log(err);
					}
				);
		}
	}
}
