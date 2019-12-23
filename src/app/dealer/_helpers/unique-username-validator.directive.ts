import { Directive } from "@angular/core";
import {
	AsyncValidator,
	AbstractControl,
	ValidationErrors,
	NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { Observable } from "rxjs";
import { DealerapiService } from "../services/dealerapi.service";
import { map } from "rxjs/operators";

@Directive({
	selector: "[UniqueUsername]",
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			useExisting: UniqueUsernameValidatorDirective,
			multi: true
		}
	]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
	constructor(private dealerApiService: DealerapiService) {}

	validate(
		c: AbstractControl
	): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		return this.dealerApiService.getUserByUsername(c.value).pipe(
			map((users:any) => {
				return users && users.length > 0
					? { uniqueUsername: true }
					: null;
			})
		);
	}
}
