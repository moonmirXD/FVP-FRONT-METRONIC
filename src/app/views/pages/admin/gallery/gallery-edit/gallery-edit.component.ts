import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminApiService } from "../../services/adminapi.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { url } from "inspector";
@Component({
	selector: "kt-gallery-edit",
	templateUrl: "./gallery-edit.component.html",
	styleUrls: ["./gallery-edit.component.scss"]
})
export class GalleryEditComponent implements OnInit {
	submitted = false;
	form: any;
	galleryForm: FormGroup;
	editID: any;
	image: any;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this.getId();
		this.galleryForm = this.formBuilder.group({
			postTitle: ["", Validators.required],
			description: ["", Validators.required],
			uploadFile: [""],
			url: ["", Validators.required]
		});
		this.editID = this.route.snapshot.paramMap.get("id");
	}
	imageurl: any;
	getId() {
		let galleryId = this.route.snapshot.paramMap.get("id");
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

	onSubmit() {
		this.submitted = true;
		if (this.galleryForm.invalid) {
			return;
		} else {
			this.adminApiService
				.updateGallery(this.editID, this.galleryForm.value)
				.subscribe(res => {
					console.log(res);
					this.form = res;
					alert("Successfully Updated");

					this.router.navigate(["/gallery-list"]);
				});
		}
	}
}
