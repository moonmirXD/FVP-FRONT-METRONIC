import { Component, OnInit, ViewChild } from "@angular/core";
import {
	MatPaginator,
	MatTableDataSource,
	MatSort,
	MatDialog
} from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { AdminApiService } from "../../services/adminapi.service";
import { onInitEffects } from "@ngrx/effects/src/lifecycle_hooks";
import { PowercardEditComponent } from "../powercard-edit/powercard-edit.component";

@Component({
	selector: "kt-powercard-list",
	templateUrl: "./powercard-list.component.html",
	styleUrls: ["./powercard-list.component.scss"]
})
export class PowercardListComponent implements OnInit {
	dataSource: any;
	constructor(
		private adminApiService: AdminApiService,
		private router: Router,
		private dialog: MatDialog
	) {}
	ngOnInit() {
		this.getData();
	}
	displayedColumns = ["key_id", "email", "status", "action"];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */

	getData() {
		this.adminApiService.getPowerCard().subscribe((res: any) => {
			this.dataSource = new MatTableDataSource(res.data);
			console.log("Get Data:", res);
			this.dataSource.paginator = this.paginator;
		});
	}
	deleteData(_id: number) {
		const ans = confirm("Are you sure you want to delete this?");
		if (ans == true) {
			console.log("deleted");
			this.adminApiService.deletePowerCard(_id).subscribe(res => {
				alert("Deleted!");
				this.getData();
			});
		} else {
			console.log("not deleted");
		}
	}
	viewData(_id) {
		this.router.navigate(["/powercard-view", _id]);
	}
	editData(id) {
		this.router.navigate(["/powercard-edit", id]);

		// const message = "Group successfully added.";
		// const dialogRef = this.dialog.open(PowercardEditComponent);

		// dialogRef.afterClosed().subscribe(res => {
		// 	if (!res) {
		// 		return
		// 	}
		// 	this.getData();
		// 	this.utility.showActionNotification(message, MessageType.Create);
		// });
	}
}
