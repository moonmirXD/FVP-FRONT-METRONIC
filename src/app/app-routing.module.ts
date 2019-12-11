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

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("./views/pages/auth/auth.module").then(m => m.AuthModule)
	},

	{
		path: "",
		component: BaseComponent,
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
