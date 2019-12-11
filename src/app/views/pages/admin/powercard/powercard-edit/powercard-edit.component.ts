import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-powercard-edit",
	templateUrl: "./powercard-edit.component.html",
	styleUrls: ["./powercard-edit.component.scss"]
})
export class PowercardEditComponent implements OnInit {
	form: any;
	powerCardForm: FormGroup;
	editID = this.route.snapshot.paramMap.get("id");
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router
	) {}

	ngOnInit() {
		this.getId();
		this.powerCardForm = this.formBuilder.group({
			key_id: [""],
			pin: [""],
			email: [""],
			userName: [""],
			status: [""],
			isDisabled: [""]
		});
	}

	getId() {
		let powerCardId = this.route.snapshot.paramMap.get("id");
		this.adminApiService
			.getByIdPowerCard(powerCardId)
			.subscribe((res: any) => {
				this.form = res.data;
				console.log("id3:", this.editID);
				console.log(res);
			});
	}
	onSubmit() {
		this.adminApiService
			// .updatePowerCard(this.editID, this.powerCardForm.value)
			.updatePowerCard(this.editID, this.powerCardForm.value)
			.subscribe((res: any) => {
				console.log(res);
				this.form = res.data;
				console.log(this.editID);
				alert("Successfully Updated");
				this.router.navigate(["/powercard-list"]);
			});
	}
}
