import { Subscription } from "rxjs";
// Angular
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// Layout
import { LayoutConfigService, SplashScreenService } from "./core/_base/layout";

@Component({
	selector: "body[kt-root]",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	title = "FVP";
	loader: boolean;
	private unsubscribe: Subscription[] = [];

	constructor(
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private splashScreenService: SplashScreenService
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig("loader.enabled");

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add("kt-page--loaded");
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
