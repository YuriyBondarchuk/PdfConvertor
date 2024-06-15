import {inject, Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private readonly _toastr: ToastrService = inject(ToastrService);

	public success(message: string) {
		this._toastr.success(message, 'Success Message', {timeOut: 5000})
	}

	public error(message: string) {
		this._toastr.error(message, 'Error Message', {timeOut: 5000})
	}
}
