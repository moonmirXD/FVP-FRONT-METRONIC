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
		this.viewData();
		this.profileForm = this.formBuilder.group({
			contactNumber: ["", Validators.required],
			address: ["", Validators.required]
		});
	}
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res.data.address);
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
		if (this.profileForm.invalid) {
			return;
		} else {
		}
	}
}
