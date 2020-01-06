import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "kt-online-store-view",
	templateUrl: "./online-store-view.component.html",
	styleUrls: ["./online-store-view.component.scss"]
})
export class OnlineStoreViewComponent implements OnInit {
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
	onEdit() {
		this.router.navigate(["/personal-details/online-store/edit"]);
	}
}
