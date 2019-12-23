import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-powercard-add",
	templateUrl: "./powercard-add.component.html",
	styleUrls: ["./powercard-add.component.scss"]
})
export class PowercardAddComponent implements OnInit {
	submitted = false;
	powerCardForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private adminApiService: AdminApiService
	) {}

	ngOnInit() {
		this.powerCardForm = this.formBuilder.group({
			key_id: ["", Validators.required],
			pin: ["", Validators.required]
		});
	}
	// get f() {
	// 	return this.powerCardForm.controls;
	// }
	onSubmit() {
		this.submitted = true;
		if (this.powerCardForm.invalid) {
			return;
		} else {
			this.adminApiService
				.postPowerCard(this.powerCardForm.value)
				.subscribe(
					res => {
						console.log(res);
						alert("Successfully added!");
					},
					err => {
						console.log(err);
					}
				);
		}
	}
}
