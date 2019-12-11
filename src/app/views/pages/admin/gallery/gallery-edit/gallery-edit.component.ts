import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminApiService } from "../../services/adminapi.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "kt-gallery-edit",
	templateUrl: "./gallery-edit.component.html",
	styleUrls: ["./gallery-edit.component.scss"]
})
export class GalleryEditComponent implements OnInit {
	form: any;
	galleryForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private adminApiService: AdminApiService,
		private router: Router
	) {}

	ngOnInit() {
		this.getId();
		this.galleryForm = this.formBuilder.group({
			postTitle: [""],
			description: [""],
			uploadFile: [""],
			url: [""]
		});
	}

	getId() {
		let galleryId = parseInt(this.route.snapshot.paramMap.get("id"));
		this.adminApiService.getById(galleryId).subscribe(res => {
			this.form = res;
			console.log(this.form.id);
		});
	}

	onSubmit() {
		this.adminApiService
			.updateGallery(this.form.id, this.galleryForm.value)
			.subscribe(res => {
				console.log(res);
				this.form = res;
				alert("Successfully Updated");
				this.router.navigate(["/gallery-list"]);
			});
	}
}
