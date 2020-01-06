import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-online-store-view",
	templateUrl: "./online-store-view.component.html",
	styleUrls: ["./online-store-view.component.scss"]
})
export class OnlineStoreViewComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
	onEdit() {
		this.router.navigate(["/personal-details/online-store/edit"]);
	}
}
