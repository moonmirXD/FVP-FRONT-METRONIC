import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../services/dealerapi.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
	selector: "kt-home-profile",
	templateUrl: "./home-profile.component.html",
	styleUrls: ["./home-profile.component.scss"]
})
export class HomeProfileComponent implements OnInit {
	constructor(
		private dealerApiService: DealerapiService,
		private domSanitizer: DomSanitizer,
		private formBuilder: FormBuilder
	) {}
	forms: any;
	profileForm: FormGroup;
	imageurl: any;
	ngOnInit() {
		this.profileForm = this.formBuilder.group({
			lastName: [""],
			firstName: [""],
			middleName: [""],
			password: [""],
			email: [""]
		});
		this.viewData();
	}
	viewData() {
		this.dealerApiService.getUser().subscribe((res: any) => {
			this.forms = res.data;

			this.profileForm.patchValue({
				lastName: [this.forms.lastName],
				firstName: [this.forms.firstName],
				middleName: [this.forms.middleName],
				password: [this.forms.password],
				email: [this.forms.email],
				uploadFile: [this.forms.uploadFile]
			});

			//Render image
			const TYPED_ARRAY = new Uint8Array(res.imageData.data);
			const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
			const base64String = btoa(STRING_CHAR);
			this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(
				("data:image/jpg;base64, " || "data:image/png;base64, ") +
					base64String
			);
		});
	}
}
