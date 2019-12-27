import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";

@Component({
	selector: "kt-view-profile",
	templateUrl: "./view-profile.component.html",
	styleUrls: ["./view-profile.component.scss"]
})
export class ViewProfileComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private router: Router
	) {}
	forms: any;
	ngOnInit() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
			},
			err => {
				console.log(err);
			}
		);
	}
}
