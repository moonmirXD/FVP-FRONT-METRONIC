import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
	providedIn: "root"
})
export class AuthdealerGuard implements CanActivate {
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {}
	canActivate(): boolean {
		if (this.authenticationService.loggedinDealer()) {
			return true;
		} else {
			this.router.navigate(["/dealerlogin"]);
			return false;
		}
	}
}
