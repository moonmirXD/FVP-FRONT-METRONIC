import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";
import { Observable } from "rxjs/internal/Observable";

@Component({
	selector: "kt-edit-contact",
	templateUrl: "./edit-contact.component.html",
	styleUrls: ["./edit-contact.component.scss"]
})
export class EditContactComponent implements OnInit {
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
		const unamePattern = "^(+d{1,3}[- ]?)?d{10}$";
		this.profileForm = this.formBuilder.group({
			contactNumber: [
				"",
				[Validators.required, Validators.pattern("^[0-9_-]{6,15}$")]
			],
			address: ["", Validators.required]
		});
		this.viewData();
	}
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
				console.log("forms:", this.forms);
				this.profileForm.patchValue({
					contactNumber: [this.forms.contactNumber],
					address: [this.forms.address]
				});
			},
			err => {
				console.log(err);
			}
		);
	}

	onSubmit() {
		this.submitted = true;
		console.log(this.profileForm.value);
		if (this.profileForm.invalid) {
			return;
		} else {
			this.dealerApiService
				.updateUser(this.profileForm.value)
				.subscribe((res: any) => {
					console.log(res);
					console.log("form:" + this.profileForm.value.contactNumber);
					this.forms = res.data;
					alert("Successfully updated");
					this.router.navigate(["personal-details/contact"]);
				});
		}
	}
}
