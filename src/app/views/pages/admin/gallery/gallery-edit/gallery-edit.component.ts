import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminApiService } from "../../services/adminapi.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "kt-gallery-edit",
	templateUrl: "./gallery-edit.component.html",
	styleUrls: ["./gallery-edit.component.scss"]
})
export class GalleryEditComponent implements OnInit {
	form: any;
	galleryForm: FormGroup;
	editID: any;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router
	) {}

	ngOnInit() {
		this.getId();
		this.galleryForm = this.formBuilder.group({
			postTitle: ["", Validators.required],
			description: ["", Validators.required],
			uploadFile: ["", Validators.required],
			url: ["", Validators.required]
		});
		this.editID = this.route.snapshot.paramMap.get("id");
	}

	getId() {
		let galleryId = this.route.snapshot.paramMap.get("id");
		this.adminApiService.getGalleryById(galleryId).subscribe((res: any) => {
			this.form = res.data;
		});
	}

	onSubmit() {
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
