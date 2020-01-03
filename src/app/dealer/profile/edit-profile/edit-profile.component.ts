import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../../services/dealerapi.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpEvent, HttpEventType } from "@angular/common/http";

@Component({
	selector: "kt-edit-profile",
	templateUrl: "./edit-profile.component.html",
	styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
	submitted = false;
	forms: any;
	profileForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService,
		private router: Router
	) {}

	ngOnInit() {
		this.viewData();
		this.profileForm = this.formBuilder.group({
			lastName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			firstName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			middleName: [
				"",
				[Validators.required, Validators.pattern("^[a-zA-Z -']+")]
			],
			password: ["", Validators.required],
			email: ["", [Validators.email, Validators.required]],
			uploadFile: [null]
		});
	}
	viewData() {
		this.dealerApiService.getUser().subscribe(
			(res: any) => {
				this.forms = res.data;
				console.log(res);
				this.profileForm.patchValue({
					lastName: [this.forms.lastName],
					firstName: [this.forms.firstName],
					middleName: [this.forms.middleName],
					password: [this.forms.password],
					email: [this.forms.email]
				});
			},
			err => {
				console.log(err);
			}
		);
	}
	private imageSrc: string = "";
	handleInputChange(e) {
		const file = e.dataTransfer
			? e.dataTransfer.files[0]
			: e.target.files[0];

		this.profileForm.get("uploadFile").updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = this._handleReaderLoaded.bind(this);

		reader.readAsDataURL(file);
	}
	_handleReaderLoaded(e) {
		let reader = e.target;
		this.imageSrc = reader.result;
		console.log(this.imageSrc);

		this.profileForm.patchValue({
			uploadFile: this.imageSrc
		});
	}
	progress: number = 0;
	onSubmit() {
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		} else {
			this.dealerApiService
				.updateUser(this.profileForm.value)
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
