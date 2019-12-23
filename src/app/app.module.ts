// Angular
import {
	BrowserModule,
	HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GestureConfig, MatProgressSpinnerModule } from "@angular/material";
import { OverlayModule } from "@angular/cdk/overlay";
// Perfect Scroll bar
import {
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
// Hammer JS
import "hammerjs";
// NGX Permissions
import { NgxPermissionsModule } from "ngx-permissions";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// State
import { metaReducers, reducers } from "./core/reducers";
// Copmponents
import { AppComponent } from "./app.component";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./views/theme/theme.module";
// Partials
import { PartialsModule } from "./views/partials/partials.module";
// Layout Services
import {
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService
} from "./core/_base/layout";
// Auth
import { AuthModule } from "./views/pages/auth/auth.module";
// Config
import { LayoutConfig } from "./core/_config/layout.config";
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from "ngx-highlightjs";
import * as typescript from "highlight.js/lib/languages/typescript";
import * as scss from "highlight.js/lib/languages/scss";
import * as xml from "highlight.js/lib/languages/xml";
import * as json from "highlight.js/lib/languages/json";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./admin/services/token-interceptor.service";
import { DealerLoginComponent } from "./dealer/dealer-login/dealer-login.component";
import { ActivateCardComponent } from "./dealer/activate-card/activate-card.component";
import { AdminComponent } from "./admin/admin.component";
import { DealerRegistrationComponent } from "./dealer/dealer-registration/dealer-registration.component";
import { PersonalDetailsComponent } from "./dealer/dealer-registration/personal-details/personal-details.component";
import { ContactDetailsComponent } from "./dealer/dealer-registration/contact-details/contact-details.component";
import { OnlineStoreComponent } from "./dealer/dealer-registration/online-store/online-store.component";
import { TermsAndAgreementComponent } from "./dealer/dealer-registration/terms-and-agreement/terms-and-agreement.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { AuthGuard } from "./admin/guard/auth.guard";
import { AuthdealerGuard } from "./dealer/guard/authdealer.guard";
import { UniqueUsernameValidatorDirective } from "./dealer/_helpers/unique-username-validator.directive";

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{ name: "typescript", func: typescript },
		{ name: "scss", func: scss },
		{ name: "xml", func: xml },
		{ name: "json", func: json }
	];
}

@NgModule({
	declarations: [
		AppComponent,
		AdminLoginComponent,
		DealerLoginComponent,
		ActivateCardComponent,
		AdminComponent,
		DealerRegistrationComponent,
		PersonalDetailsComponent,
		ContactDetailsComponent,
		OnlineStoreComponent,
		TermsAndAgreementComponent,
		MainNavComponent,
		UniqueUsernameValidatorDirective
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		OverlayModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		ThemeModule,
		ReactiveFormsModule,
		FormsModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule
	],
	exports: [],
	providers: [
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		SplashScreenService,
		AuthGuard,
		AuthdealerGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService],
			multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
