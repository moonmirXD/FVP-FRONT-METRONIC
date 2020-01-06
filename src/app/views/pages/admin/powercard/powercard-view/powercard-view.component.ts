import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminApiService } from "../../services/adminapi.service";

@Component({
	selector: "kt-powercard-view",
	templateUrl: "./powercard-view.component.html",
	styleUrls: ["./powercard-view.component.scss"]
})
export class PowercardViewComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router
	) {}
	public pin;
	forms: any;
	ngOnInit() {
		let powerCardId = this.route.snapshot.paramMap.get("id");
		this.pin = powerCardId;
		console.log("Id:", powerCardId);
		this.adminApiService
			.getByIdPowerCard(powerCardId)
			.subscribe((res: any) => {
				this.forms = res.data;
				console.log(res);
			});
	}
	onClick() {
		this.router.navigate(["/powercard-list"]);
	}
}
