import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "kt-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
	constructor(private http: HttpClient) {}
	ngOnInit() {}
}
