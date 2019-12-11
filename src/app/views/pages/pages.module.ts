// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// Partials
import { PartialsModule } from "../partials/partials.module";
// Pages
import { CoreModule } from "../../core/core.module";
import { AdminComponent } from "./admin/admin.component";
import { PowercardAddComponent } from "./admin/powercard/powercard-add/powercard-add.component";
import { PowercardListComponent } from "./admin/powercard/powercard-list/powercard-list.component";
import { MaterialModule } from "./admin/material/material.module";
import { PowercardViewComponent } from "./admin/powercard/powercard-view/powercard-view.component";
import { PowercardEditComponent } from "./admin/powercard/powercard-edit/powercard-edit.component";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { GalleryAddComponent } from './admin/gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './admin/gallery/gallery-edit/gallery-edit.component';
import { GalleryViewComponent } from './admin/gallery/gallery-view/gallery-view.component';
import { GalleryListComponent } from './admin/gallery/gallery-list/gallery-list.component';

@NgModule({
	declarations: [
		AdminComponent,
		PowercardAddComponent,
		PowercardListComponent,
		PowercardViewComponent,
		PowercardEditComponent,
		GalleryAddComponent,
		GalleryEditComponent,
		GalleryViewComponent,
		GalleryListComponent
	],
	exports: [MaterialModule],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialModule
	],
	providers: [
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true }
		}
	],
	entryComponents: [PowercardEditComponent]
})
export class PagesModule {}
