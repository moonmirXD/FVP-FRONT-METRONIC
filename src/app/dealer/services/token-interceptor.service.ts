import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

@Injectable({
	providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
	constructor(private injector: Injector) {}

	intercept(req, next) {
		let authenticationService = this.injector.get(AuthenticationService);
		let tokenizedReq = req.clone({
			setHeaders: {
				Authorization: `${authenticationService.getToken()}`
			}
		});
		return next.handle(tokenizedReq);
	}
}