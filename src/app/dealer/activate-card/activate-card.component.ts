import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DealerapiService } from "../services/dealerapi.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-activate-card",
	templateUrl: "./activate-card.component.html",
	styleUrls: ["./activate-card.component.scss"]
})
export class ActivateCardComponent implements OnInit {
	submitted = false;
	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,
		private router: Router
	) {}
	activateForm: FormGroup;
	ngOnInit() {
		this.activateForm = this.fb.group({
			pin: ["", Validators.required]
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.activateForm.invalid) {
			return;
		} else {
			console.log(this.activateForm.value);
			this.dealerApi.postActivateCard(this.activateForm.value).subscribe(
				(res: any) => {
					alert("Successfully submitted.");
					localStorage.setItem("token", res.token);
					this.router.navigate(["/profile-details"]);
				},
				err => {
					console.log(err.error.message);
					alert(err.error.message);
				}
			);
		}
	}
}
