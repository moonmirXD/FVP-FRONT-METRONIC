import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DealerapiService } from "../../services/dealerapi.service";

@Component({
	selector: "kt-personal-details",
	templateUrl: "./personal-details.component.html",
	styleUrls: ["./personal-details.component.scss"]
})
export class PersonalDetailsComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,
		private router: Router
	) {}
	personalForm: FormGroup;
	ngOnInit() {
		this.personalForm = this.fb.group({
			firstName: [""],
			lastName: [""],
			middleName: [""],
			userName: [""],
			email: [""],
			password: [""],
			password2: [""],
			contactNumber: [""],
			address: [""],
			onlineStore: [""]
		});
	}
	onSubmit() {
		this.dealerApi
			.postRegistrationForm(this.personalForm.value)
			.subscribe((res: any) => {
				console.log(res);
				alert("Successfully Registered!");
			});
	}
	nextPage() {
		this.router.navigate(["/contact-details"]);
	}
}
