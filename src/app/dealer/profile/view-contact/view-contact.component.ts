import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";
import { Observable } from "rxjs/internal/Observable";

@Component({
	selector: "kt-view-contact",
	templateUrl: "./view-contact.component.html",
	styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService
	) {}
	forms: any;
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
