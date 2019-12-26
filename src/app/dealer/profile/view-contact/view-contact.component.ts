import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-view-contact",
	templateUrl: "./view-contact.component.html",
	styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
	onEdit() {
		this.router.navigate(["/personal-details/contact-edit"]);
	}
}
