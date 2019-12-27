import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";

@Component({
	selector: "kt-view-contact",
	templateUrl: "./view-contact.component.html",
	styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {
	forms: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService
	) {}

	ngOnInit() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res.data.address);
				console.log(res);
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
