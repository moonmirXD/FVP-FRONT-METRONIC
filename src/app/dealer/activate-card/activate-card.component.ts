import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "kt-activate-card",
	templateUrl: "./activate-card.component.html",
	styleUrls: ["./activate-card.component.scss"]
})
export class ActivateCardComponent implements OnInit {
	constructor(private fb: FormBuilder) {}
	activateForm: FormGroup;
	ngOnInit() {
		this.activateForm = this.fb.group({
			pin: [""]
		});
	}

	onSubmit() {
		console.log(this.activateForm.value);
	}
}
