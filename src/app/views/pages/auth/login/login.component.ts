// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { Observable, Subject } from "rxjs";

const DEMO_PARAMS = {
	EMAIL: "admin@demo.com",
	PASSWORD: "demo"
};

@Component({
	selector: "kt-login",
	templateUrl: "./login.component.html",
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;
	
	constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
		this.unsubscribe = new Subject();
	}
	
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params["returnUrl"] || "/";
		});
	}
	
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}
	
	initLoginForm() {

		this.loginForm = this.fb.group({
			email: [
				DEMO_PARAMS.EMAIL,
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			],
			password: [
				DEMO_PARAMS.PASSWORD,
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			]
		});
	}
	
	submit() {
		const controls = this.loginForm.controls;
		
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		this.router.navigate([`dashboard`]);
	}
	
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
