import { Component, OnInit, enableProdMode } from "@angular/core";
import { DealerapiService } from "../services/dealerapi.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
	selector: "kt-home-profile",
	templateUrl: "./home-profile.component.html",
	styleUrls: ["./home-profile.component.scss"]
})
export class HomeProfileComponent implements OnInit {
	constructor(
		private dealerApiService: DealerapiService,
		private domSanitizer: DomSanitizer,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute
	) {}
	forms: any;
	profileForm: FormGroup;
	imageurl: any;
	username: any;

	user: any;
	ngOnInit() {
		// this.route.params.subscribe(params => {
		// 	// get the username out of the route params
		// 	this.username = params["username"];
		// 	const username = params["username"];
		// 	this.dealerApiService
		// 		.getUserbyUsernameProfile(username)
		// 		.subscribe((user: any) => {
		// 			this.user = user.data;
		// 			console.log(user);
		// 			console.log(user.data);
		// 			this.firstName = user.data.firstName;
		// 			alert(user.data.firstName);
		// 		});
		// });
		// this.profileForm = this.formBuilder.group({
		// 	lastName: [""],
		// 	firstName: [""],
		// 	middleName: [""],
		// 	password: [""],
		// 	email: [""]
		// });
		// this.viewData();
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
export class User {
	firstName: string;
	lastName: string;
	// remaining properties
}
