import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-powercard-add",
	templateUrl: "./powercard-add.component.html",
	styleUrls: ["./powercard-add.component.scss"]
})
export class PowercardAddComponent implements OnInit {
	powerCardForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private adminApiService: AdminApiService
	) {}

	ngOnInit() {
		this.powerCardForm = this.formBuilder.group({
			key_id: ["Sample", Validators.required],
			pin: ["Sample Pin", Validators.required]
		});
	}
	onSubmit() {
		this.adminApiService
			.postPowerCard(this.powerCardForm.value)
			.subscribe(res => {
				console.log(res);
				alert("Successfully added!");
			});
	}
}
