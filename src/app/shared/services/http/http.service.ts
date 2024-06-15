import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	private readonly _httpClient: HttpClient = inject(HttpClient);

	public get<T>(
		url: string,
		options?: Object
	): Observable<T> {
		return this._httpClient.get<T>(url, options);
	}

	public post<T>(
		url: string,
		body: any,
		options?: Object,
	): Observable<T> {
		return this._httpClient.post<T>(url, body,  options);
	}

	public patch<T>(
		url: string,
		options?: Object
	): Observable<T> {
		return this._httpClient.patch<T>(url, options);
	}

	public put<T>(
		url: string,
		options?: Object
	): Observable<T> {
		return this._httpClient.put<T>(url, options);
	}

	public delete<T>(
		url: string,
		options?: Object
	): Observable<T> {
		return this._httpClient.delete<T>(url, options);
	}
}
