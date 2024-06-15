import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		catchError((err: any) => {
			if (err instanceof HttpErrorResponse) {
				console.log(err)
			} else {
				console.error('An error occurred:', err);
			}

			return throwError(() => err);
		})
	);
}
