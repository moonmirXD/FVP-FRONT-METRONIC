// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./views/theme/base/base.component";
import { ErrorPageComponent } from "./views/theme/content/error-page/error-page.component";
import { AdminComponent } from "./views/pages/admin/admin.component";
import { PowercardAddComponent } from "./views/pages/admin/powercard/powercard-add/powercard-add.component";
import { PowercardListComponent } from "./views/pages/admin/powercard/powercard-list/powercard-list.component";
import { PowercardViewComponent } from "./views/pages/admin/powercard/powercard-view/powercard-view.component";
import { PowercardEditComponent } from "./views/pages/admin/powercard/powercard-edit/powercard-edit.component";
import { GalleryAddComponent } from "./views/pages/admin/gallery/gallery-add/gallery-add.component";
import { GalleryEditComponent } from "./views/pages/admin/gallery/gallery-edit/gallery-edit.component";
import { GalleryListComponent } from "./views/pages/admin/gallery/gallery-list/gallery-list.component";
import { GalleryViewComponent } from "./views/pages/admin/gallery/gallery-view/gallery-view.component";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { AuthGuard } from "./admin/guard/auth.guard";
import { DealerLoginComponent } from "./dealer/dealer-login/dealer-login.component";
import { ActivateCardComponent } from "./dealer/activate-card/activate-card.component";
import { ContactDetailsComponent } from "./dealer/dealer-registration/contact-details/contact-details.component";
import { OnlineStoreComponent } from "./dealer/dealer-registration/online-store/online-store.component";
import { TermsAndAgreementComponent } from "./dealer/dealer-registration/terms-and-agreement/terms-and-agreement.component";
import { PersonalDetailsComponent } from "./dealer/dealer-registration/personal-details/personal-details.component";
import { AuthdealerGuard } from "./dealer/guard/authdealer.guard";
import { DealersUrlComponent } from "./dealer/dealers-url/dealers-url.component";
import { ViewProfileComponent } from "./dealer/profile/view-profile/view-profile.component";
import { EditProfileComponent } from "./dealer/profile/edit-profile/edit-profile.component";
import { ViewContactComponent } from "./dealer/profile/view-contact/view-contact.component";
import { EditContactComponent } from "./dealer/profile/edit-contact/edit-contact.component";
import { ForgotPasswordComponent } from "./dealer/forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./dealer/forgot-password-reset/forgot-password-reset.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { HomeComponent } from "./home/home.component";
import { OnlineStoreViewComponent } from "./dealer/online-store/online-store-view/online-store-view.component";
import { OnlineStoreUpdateComponent } from "./dealer/online-store/online-store-update/online-store-update.component";
import { HomeProfileComponent } from "./dealer/home-profile/home-profile.component";
const routes: Routes = [
	// { path: "**", redirectTo: "", pathMatch: "full" },
	// { path: "**", redirectTo: "/" },
	{ path: "", component: HomeComponent },
	{ path: "adminlogin", component: AdminLoginComponent },
	{ path: "dealerlogin", component: DealerLoginComponent },

	//dealer-route // activation route
	{ path: "register", component: ActivateCardComponent }, // When activated going to registration route

	//dealer-route Forget Password
	{ path: "forgot-password", component: ForgotPasswordComponent },
	{
		path: "resetpassword/:id/:token",
		component: ForgotPasswordResetComponent
	},
	//Side nav

	{
		path: "sidenav",
		component: MainNavComponent,
		children: []
	},
	//dealer after activation route
	{
		path: "profile-details",
		component: PersonalDetailsComponent,
		canActivate: [AuthdealerGuard]
	},
	{ path: "online-store", component: OnlineStoreComponent },
	{ path: "contact-details", component: ContactDetailsComponent },
	{ path: "terms-and-agreement", component: TermsAndAgreementComponent },
	{
		path: "URL-Details",
		component: DealersUrlComponent,
		canActivate: [AuthdealerGuard]
	},

	//profile of User inside the login
	{
		path: "personal-details/online-store",
		component: OnlineStoreViewComponent,
		canActivate: [AuthdealerGuard]
	},
	{
		path: "personal-details/online-store/edit",
		component: OnlineStoreUpdateComponent,
		canActivate: [AuthdealerGuard]
	},
	{
		path: "personal-details/dealer",
		component: ViewProfileComponent,
		canActivate: [AuthdealerGuard]
	},
	{
		path: "personal-details/contact",
		component: ViewContactComponent,
		canActivate: [AuthdealerGuard]
	},
	{
		path: "personal-details/contact-edit",
		component: EditContactComponent,
		canActivate: [AuthdealerGuard]
	},
	{
		path: "personal-details/dealer-edit",
		component: EditProfileComponent,
		canActivate: [AuthdealerGuard]
	},

	//Home Profile
	{
		path: ":username",
		component: HomeProfileComponent
	},

	{
		path: "auth",
		loadChildren: () =>
			import("./views/pages/auth/auth.module").then(m => m.AuthModule)
	},

	{
		path: "",
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: "admin",
				component: AdminComponent,
				canActivate: [AuthGuard]
			},
			// {
			// 	path: "dashboard",
			// 	loadChildren: () =>
			// 		import("./views/pages/dashboard/dashboard.module").then(
			// 			m => m.DashboardModule
			// 		)
			// },
			// {
			// 	path: "builder",
			// 	loadChildren: () =>
			// 		import("./views/theme/content/builder/builder.module").then(
			// 			m => m.BuilderModule
			// 		)
			// },
			// {
			// 	path: "error/403",
			// 	component: ErrorPageComponent,
			// 	data: {
			// 		type: "error-v6",
			// 		code: 403,
			// 		title: "403... Access forbidden",
			// 		desc:
			// 			"Looks like you don't have permission to access for requested page.<br> Please, contact administrator"
			// 	}
			// },
			//powercard
			{
				path: "admin",
				component: AdminComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "powercard-add",
				component: PowercardAddComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "powercard-list",
				component: PowercardListComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "powercard-view/:id",
				component: PowercardViewComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "powercard-edit/:id",
				component: PowercardEditComponent,
				canActivate: [AuthGuard]
			},

			//gallery
			{
				path: "gallery-add",
				component: GalleryAddComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "gallery-list",
				component: GalleryListComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "gallery-view/:id",
				component: GalleryViewComponent,
				canActivate: [AuthGuard]
			},
			{
				path: "gallery-edit/:id",
				component: GalleryEditComponent,
				canActivate: [AuthGuard]
			},

			//Dealer

			{ path: "error/:type", component: ErrorPageComponent },
			{ path: "", redirectTo: "dashboard", pathMatch: "full" },

			{ path: "**", redirectTo: "dashboard", pathMatch: "full" }
		]
	},

	{ path: "**", redirectTo: "error/403", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
