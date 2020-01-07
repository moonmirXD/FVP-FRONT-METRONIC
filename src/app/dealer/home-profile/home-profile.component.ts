import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../services/dealerapi.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: "kt-home-profile",
	templateUrl: "./home-profile.component.html",
	styleUrls: ["./home-profile.component.scss"]
})
export class HomeProfileComponent implements OnInit {
	constructor(
		private dealerApiService: DealerapiService,
		private domSanitizer: DomSanitizer
	) {}
	forms: any;
	imageurl: any;
	ngOnInit() {
		this.dealerApiService.getUser().subscribe((res: any) => {
			this.forms = res.data;

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
