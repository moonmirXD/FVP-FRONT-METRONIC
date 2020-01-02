import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";
import { Observable } from "rxjs/internal/Observable";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
	selector: "kt-view-contact",
	templateUrl: "./view-contact.component.html",
	styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private formBuilder: FormBuilder
	) {}
	forms: any;
	profileForm: FormGroup;
	ngOnInit() {
		this.viewData();
		this.profileForm = this.formBuilder.group({
			contactNumber: [""],
			address: [""]
		});
	}
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
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
	onEdit() {
		this.router.navigate(["/personal-details/contact-edit"]);
	}
}
