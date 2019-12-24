import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../services/dealerapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "kt-dealers-url",
	templateUrl: "./dealers-url.component.html",
	styleUrls: ["./dealers-url.component.scss"]
})
export class DealersUrlComponent implements OnInit {
	constructor(
		private dealerApiService: DealerapiService,
		private fb: FormBuilder
	) {}
	urlData: any;
	ngOnInit() {
		this.getUrl();
	}
	getUrl() {
		this.dealerApiService.getUserUrl().subscribe((res: any) => {
			this.urlData = res[0];
			console.log("Get Data:", res[0]);
		});
	}
	copyUrl(val: string) {
		const selBox = document.createElement("textarea");
		selBox.style.position = "fixed";
		selBox.style.left = "0";
		selBox.style.top = "0";
		selBox.style.opacity = "0";
		selBox.value = val;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand("copy");
		document.body.removeChild(selBox);
	}
}
