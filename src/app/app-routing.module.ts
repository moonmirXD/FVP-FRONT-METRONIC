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
const routes: Routes = [
	{ path: "adminlogin", component: AdminLoginComponent },
	{ path: "dealerlogin", component: DealerLoginComponent },

	//dealer-route
	{ path: "activate-card", component: ActivateCardComponent }, // When activated going to registration route

	//dealer registration-route
	{ path: "contact-details", component: ContactDetailsComponent },
	{ path: "online-store", component: OnlineStoreComponent },
	{ path: "personal-details", component: PersonalDetailsComponent },
	{ path: "terms-and-agreement", component: TermsAndAgreementComponent },

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
				path: "dashboard",
				loadChildren: () =>
					import("./views/pages/dashboard/dashboard.module").then(
						m => m.DashboardModule
					)
			},
			{
				path: "builder",
				loadChildren: () =>
					import("./views/theme/content/builder/builder.module").then(
						m => m.BuilderModule
					)
			},
			{
				path: "error/403",
				component: ErrorPageComponent,
				data: {
					type: "error-v6",
					code: 403,
					title: "403... Access forbidden",
					desc:
						"Looks like you don't have permission to access for requested page.<br> Please, contact administrator"
				}
			},
			//powercard
			{ path: "admin", component: AdminComponent },
			{ path: "powercard-add", component: PowercardAddComponent },
			{ path: "powercard-list", component: PowercardListComponent },
			{ path: "powercard-view/:id", component: PowercardViewComponent },
			{ path: "powercard-edit/:id", component: PowercardEditComponent },

			//gallery
			{ path: "gallery-add", component: GalleryAddComponent },
			{ path: "gallery-list", component: GalleryListComponent },
			{ path: "gallery-view/:id", component: GalleryViewComponent },
			{ path: "gallery-edit/:id", component: GalleryEditComponent },

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
