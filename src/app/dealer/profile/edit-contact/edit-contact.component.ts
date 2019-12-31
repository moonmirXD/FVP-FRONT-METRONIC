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
		this.forms = this.dealerApiService.getUser();
	}

	onSubmit() {
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		} else {
		}
	}
}
