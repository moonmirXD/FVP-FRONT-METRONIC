import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-user-profile",
	templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
	constructor(private router: Router) {}
	
	ngOnInit() {}
	
	logout() {
		this.router.navigate([`auth/login`]);
	}
}
