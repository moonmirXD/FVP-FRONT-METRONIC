import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-gallery-view",
	templateUrl: "./gallery-view.component.html",
	styleUrls: ["./gallery-view.component.scss"]
})
export class GalleryViewComponent implements OnInit {
	submitted = false;
	form: any;
	galleryForm: FormGroup;
	editID: any;
	image: any;
	imageurl: any;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
		let galleryId = this.route.snapshot.paramMap.get("id");
		console.log("..");
		this.adminApiService.getGalleryById(galleryId).subscribe((res: any) => {
			this.form = res.data;
			this.image = res.imageData;
			console.log(res);
			const TYPED_ARRAY = new Uint8Array(res.imageData.data);
			const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
			const base64String = btoa(STRING_CHAR);
			this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(
				("data:image/jpg;base64, " || "data:image/png;base64, ") +
					base64String
			);
		});
	}

	onClick() {
		this.router.navigate(["/gallery-list"]);
	}
}
