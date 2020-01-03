import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "kt-view-profile",
	templateUrl: "./view-profile.component.html",
	styleUrls: ["./view-profile.component.scss"]
})
export class ViewProfileComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private router: Router,
		private formBuilder: FormBuilder
	) {}
	forms: any;
	profileForm: FormGroup;
	ngOnInit() {
		this.viewData();
		this.profileForm = this.formBuilder.group({
			lastName: [""],
			firstName: [""],
			middleName: [""],
			password: [""],
			email: [""]
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
}
