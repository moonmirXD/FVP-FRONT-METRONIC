import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DealerapiService } from "../../services/dealerapi.service";
import { MustMatch } from "../../_helpers/must-match-validators";

@Component({
	selector: "kt-personal-details",
	templateUrl: "./personal-details.component.html",
	styleUrls: ["./personal-details.component.scss"]
})
export class PersonalDetailsComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,
		private router: Router
	) {}
	submitted = false;
	personalForm: FormGroup;
	ngOnInit() {
		this.dealerApi.getUsers().subscribe();
		this.personalForm = this.fb.group(
			{
				firstName: ["", Validators.required],
				lastName: ["", Validators.required],
				middleName: ["", Validators.required],
				userName: ["", [Validators.required, Validators.minLength(3)]],
				email: ["", [Validators.email, Validators.required]],
				password: ["", [Validators.required, Validators.minLength(6)]],
				password2: ["", Validators.required],
				contactNumber: ["", Validators.required],
				address: ["", Validators.required],
				onlineStore: [""]
			},
			{
				validator: MustMatch("password", "password2")
			}
		);
	}
	onSubmit() {
		this.submitted = true;
		console.log(this.personalForm.value);
		if (this.personalForm.invalid) {
			return;
		} else {
			this.dealerApi
				.postRegistrationForm(this.personalForm.value)
				.subscribe(
					(res: any) => {
						console.log(res);
						alert("Successfully Registered!");
						this.router.navigate(["/dealerlogin"]);
					},
					err => {
						console.log(err);
						alert("Username or Email is already taken.");
					}
				);
		}
	}
	nextPage() {
		this.router.navigate(["/contact-details"]);
	}
}
