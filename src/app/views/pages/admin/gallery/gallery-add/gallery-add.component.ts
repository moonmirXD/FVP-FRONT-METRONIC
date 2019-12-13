import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-gallery-add",
	templateUrl: "./gallery-add.component.html",
	styleUrls: ["./gallery-add.component.scss"]
})
export class GalleryAddComponent implements OnInit {
	galleryForm: FormGroup;
	imageURL: string;
	// selectedFile: File;
	constructor(
		private formBuilder: FormBuilder,
		private adminApiService: AdminApiService
	) {}

	ngOnInit() {
		this.galleryForm = this.formBuilder.group({
			postTitle: ["", Validators.required],
			description: ["", Validators.required],
			uploadFile: [null, Validators.required],
			url: ["", Validators.required]
		});
	}

	showPreview(event) {
		// this.selectedFile = event.target.files[0];
		// let file = event.target.files[0];
		const file = (event.target as HTMLInputElement).files[0];
		this.galleryForm.patchValue({
			uploadFile: file
		});
		this.galleryForm.get("uploadFile").updateValueAndValidity();
		console.log(typeof file);
		// File Preview
		const reader = new FileReader();
		reader.onload = () => {
			this.imageURL = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	onSubmit() {
		this.adminApiService
			.postGallery(this.galleryForm.value)
			.subscribe(res => {
				console.log(res);
				alert("Successfully added!");
			});
	}
}
