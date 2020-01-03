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
	forms: any;
	profileForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private router: Router
	) {}

	ngOnInit() {
		this.viewData();
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
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
				this.profileForm.patchValue({
					lastName: [this.forms.lastName],
					firstName: [this.forms.firstName],
					middleName: [this.forms.middleName],
					password: [this.forms.password],
					email: [this.forms.email]
				});
			},
			err => {
				console.log(err);
			}
		);
	}
	onSubmit() {
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		} else {
		}
	}
}
