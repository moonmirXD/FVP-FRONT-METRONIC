import { Component, OnInit } from "@angular/core";
import { DealerapiService } from "../services/dealerapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-dealers-url",
	templateUrl: "./dealers-url.component.html",
	styleUrls: ["./dealers-url.component.scss"]
})
export class DealersUrlComponent implements OnInit {
	URL: any;
	data: any;
	constructor(
		private dealerApiService: DealerapiService,
		private fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	ngOnInit() {
		this.getUrl();
	}
	getUrl() {
		this.dealerApiService.getUserUrl().subscribe((res: any) => {
			console.log("Get Data:", res);
			this.data = res.data;
			this.URL = "my-fvp.com/" + res.data.userName;
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
