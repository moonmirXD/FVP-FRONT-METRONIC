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
	forms: any;
	urlForm: FormGroup;
	constructor(
		private dealerApiService: DealerapiService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	ngOnInit() {
		this.getUrl();
		this.urlForm = this.formBuilder.group({
			userName: [""]
		});
	}
	getUrl() {
		this.dealerApiService.getUserUrl().subscribe(
			(res: any) => {
				console.log("Get Data:", res);
				this.forms = res.data;
				this.URL = "my-fvp.com/" + res.data.userName;
				this.urlForm.patchValue({
					userName: ["my-fvp.com/" + this.forms.userName]
				});
			},
			err => {
				alert("Connection Timed Out");
			}
		);
	}
	copyUrl(val: string) {
		alert("Copied");
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
