// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { Subject } from "rxjs";

@Component({
	selector: "kt-forgot-password",
	templateUrl: "./forgot-password.component.html",
	encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
	
	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>; 
	
	constructor(private fb: FormBuilder) {
		this.unsubscribe = new Subject();
	}
	
	ngOnInit() {
		this.initRegistrationForm();
	}
	
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}
	
	initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			email: [
				"",
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			]
		});
	}
	
	submit() {
		const controls = this.forgotPasswordForm.controls;
		
		if (this.forgotPasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
	}
	
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[controlName];

		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
