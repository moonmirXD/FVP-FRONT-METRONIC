import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../../services/dealerapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-online-store-update",
	templateUrl: "./online-store-update.component.html",
	styleUrls: ["./online-store-update.component.scss"]
})
export class OnlineStoreUpdateComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private formBuilder: FormBuilder
	) {}
	forms: any;
	submitted = false;
	profileForm: FormGroup;
	ngOnInit() {
		this.viewData();
		this.profileForm = this.formBuilder.group({
			onlineStore: [""]
		});
	}
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
				this.profileForm.patchValue({
					onlineStore: [this.forms.onlineStore]
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
			this.dealerApiService
				.updateUser(this.profileForm.value)
				.subscribe((res: any) => {
					console.log(res);
					alert("Successfully updated");
				});
		}
	}
}
