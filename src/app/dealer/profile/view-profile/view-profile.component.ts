import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DealerapiService } from "../../services/dealerapi.service";

@Component({
	selector: "kt-view-profile",
	templateUrl: "./view-profile.component.html",
	styleUrls: ["./view-profile.component.scss"]
})
export class ViewProfileComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private dealerApiService: DealerapiService
	) {}
	forms: any;
	ngOnInit() {
		let profileID = this.route.snapshot.paramMap.get("id");
		console.log("Id:", profileID);
		this.dealerApiService
			.getByIdPowerCard(profileID)
			.subscribe((res: any) => {
				this.forms = res.data;
				console.log(res);
			});
	}
}
