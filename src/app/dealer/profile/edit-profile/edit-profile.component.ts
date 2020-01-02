import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../../services/dealerapi.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-edit-profile",
	templateUrl: "./edit-profile.component.html",
	styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
	submitted = false;
	profileForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private router: Router
	) {}

	ngOnInit() {
		this.profileForm = this.formBuilder.group({
			lastName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			firstName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			middleName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			password: ["", Validators.required],
			email: ["", [Validators.email, Validators.required]]
		});
	}
	onSubmit() {
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		} else {
		}
	}
}
