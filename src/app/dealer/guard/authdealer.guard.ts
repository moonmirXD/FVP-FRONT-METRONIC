import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { DealerapiService } from "../services/dealerapi.service";

@Injectable({
	providedIn: "root"
})
export class AuthdealerGuard implements CanActivate {
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {}
	canActivate(): boolean {
		if (
			this.authenticationService.loggedinDealer() ||
			this.authenticationService.activateCardAuth()
		) {
			return true;
		} else if (!this.authenticationService.activateCardAuth()) {
			this.router.navigate(["/activate-card"]);
		} else {
			this.router.navigate(["/dealerlogin"]);
			return false;
		}
	}
}
