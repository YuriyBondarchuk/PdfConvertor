import {inject, Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {IHttpEndpoints} from "../../interfaces";
import {httpEndpoints} from "../../api";
import {environment} from "../../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class ConvertorService {
	private readonly API_ADDRESS: string = environment.apiUrl;
	private readonly _httpService: HttpService = inject(HttpService);

	private endpoints: IHttpEndpoints = httpEndpoints;

	public convertTextToPdf(text: string) {
		return this._httpService
			.post(
				this.API_ADDRESS +
				this.endpoints.createPdf,
				{text},
				{responseType: 'blob'}
			);
	}
}
