import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DealerapiService } from "../services/dealerapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MustMatch } from "../_helpers/must-match-validators";

@Component({
	selector: "kt-forgot-password-reset",
	templateUrl: "./forgot-password-reset.component.html",
	styleUrls: ["./forgot-password-reset.component.scss"]
})
export class ForgotPasswordResetComponent implements OnInit {
	idParameter: any;
	tokenParameter: any;
	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}
	submitted = false;
	forgotPasswordForm: FormGroup;
	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log("params:", params.id, params.token);
			this.idParameter = params.id;
			this.tokenParameter = params.token;
		});
		this.forgotPasswordForm = this.fb.group(
			{
				changePassword: [
					"",
					[Validators.required, Validators.minLength(6)]
				],
				password2: ["", [Validators.required, Validators.minLength(6)]],
				token: [this.tokenParameter],
				id: [this.idParameter]
			},
			{
				validator: MustMatch("changePassword", "password2")
			}
		);
	}

	onSubmit() {
		console.log(this.forgotPasswordForm.value);
		this.submitted = true;
		if (this.forgotPasswordForm.invalid) {
			return;
		} else {
			console.log(this.forgotPasswordForm.value);
			this.dealerApi
				.postResetForgotPassword(this.forgotPasswordForm.value)
				.subscribe(
					(res: any) => {
						alert("Successfully submitted.");
						this.router.navigate(["/dealerlogin"]);
					},
					err => {
						console.log(err);
					}
				);
		}
	}
}
