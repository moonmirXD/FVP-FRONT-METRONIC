import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AdminApiService } from "../../services/adminapi.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";

@Component({
	selector: "kt-gallery-add",
	templateUrl: "./gallery-add.component.html",
	styleUrls: ["./gallery-add.component.scss"]
})
export class GalleryAddComponent implements OnInit {
	submitted = false;
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
	private imageSrc: string = "";
	handleInputChange(e) {
		const file = e.dataTransfer
			? e.dataTransfer.files[0]
			: e.target.files[0];

		this.galleryForm.get("uploadFile").updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = this._handleReaderLoaded.bind(this);

		reader.readAsDataURL(file);
	}
	_handleReaderLoaded(e) {
		let reader = e.target;
		this.imageSrc = reader.result;
		console.log(this.imageSrc);

		this.galleryForm.patchValue({
			uploadFile: this.imageSrc
		});
	}
	progress: number = 0;
	onSubmit() {
		this.submitted = true;
		if (this.galleryForm.invalid) {
			return;
		} else {
			this.adminApiService
				.postGallery(this.galleryForm.value)
				.subscribe((event: HttpEvent<any>) => {
					switch (event.type) {
						case HttpEventType.Sent:
							console.log("Request has been made!");
							alert("Uploading please wait.");
							break;
						case HttpEventType.ResponseHeader:
							console.log("Response header has been received!");
							break;
						case HttpEventType.UploadProgress:
							this.progress = Math.round(
								(event.loaded / event.total) * 100
							);
							console.log(`Uploaded! ${this.progress}%`);
							break;
						case HttpEventType.Response:
							console.log(
								"User successfully created!",
								event.body
							);
							alert("Successfully uploaded.");

							setTimeout(() => {
								this.progress = 0;
							}, 1500);
					}
				});
		}
	}
}
