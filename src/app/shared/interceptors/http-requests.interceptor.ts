import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {environment} from "../../../environments/environment";

export const httpRequestsInterceptor: HttpInterceptorFn = (
	req,
	next
) => {
  return next(addAuthTokens(req));
};

const addAuthTokens = (
	request: HttpRequest<unknown>
): HttpRequest<unknown> => {
	if (request.url.includes('create-pdf')) {
		return request.clone({
			setParams: {
				apiKey: environment.apiKey,
			}
		});
	}

	return  request;
}
