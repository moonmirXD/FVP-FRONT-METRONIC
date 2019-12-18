import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DealerapiService } from "../services/dealerapi.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-activate-card",
	templateUrl: "./activate-card.component.html",
	styleUrls: ["./activate-card.component.scss"]
})
export class ActivateCardComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private dealerApi: DealerapiService,
		private router: Router
	) {}
	activateForm: FormGroup;
	ngOnInit() {
		this.activateForm = this.fb.group({
			pin: [""]
		});
	}

	onSubmit() {
		console.log(this.activateForm.value);
		this.dealerApi
			.postActivateCard(this.activateForm.value)
			.subscribe((res: any) => {
				console.log("");
				localStorage.setItem("token", res.token);
				this.router.navigate(["/profile-details"]);
			});
	}
}
