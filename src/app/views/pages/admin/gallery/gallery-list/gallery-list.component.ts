import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { AdminApiService } from "../../services/adminapi.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-gallery-list",
	templateUrl: "./gallery-list.component.html",
	styleUrls: ["./gallery-list.component.scss"]
})
export class GalleryListComponent implements OnInit {
	dataSource: any;
	constructor(
		private adminApiService: AdminApiService,
		private router: Router,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.getData();
	}
	displayedColumns = ["postTitle", "description", "url", "action"];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */

	getData() {
		this.adminApiService.getGallery().subscribe((res: any) => {
			this.dataSource = new MatTableDataSource(res);
			console.log("Get Data:", res);
			this.dataSource.paginator = this.paginator;
		});
	}
	deleteData(id: number) {
		const ans = confirm("Are you sure you want to delete this?");
		if (ans == true) {
			this.adminApiService.deleteGallery(id).subscribe(res => {
				alert("Deleted!");
				this.getData();
			});
		} else {
			console.log("not deleted");
		}
	}
	viewData(id) {
		this.router.navigate(["/gallery-view", id]);
	}
	editData(id) {
		this.router.navigate(["/gallery-edit", id]);
		this.getData();
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
