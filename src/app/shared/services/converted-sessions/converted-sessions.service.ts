import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../storage/local-storage.service";
import {CONVERTED_HISTORY_KEY} from "../../utils";
import {IConvertedHistory} from "../../interfaces";
import {FormatConverterService} from "../format-converter/format-converter.service";

@Injectable({
	providedIn: 'root'
})
export class ConvertedSessionsService {
	private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);
	private readonly _formatConverterService: FormatConverterService = inject(FormatConverterService);

	public async save(blob: Blob) {
		const history: IConvertedHistory[] | never[] =
			this._localStorageService.getItem<IConvertedHistory[]>(CONVERTED_HISTORY_KEY) || [];

		const convertedPdf: string = await this._formatConverterService.blobToBase64(blob);

		this._localStorageService.setItem(
			CONVERTED_HISTORY_KEY,
			[...history, {
				date: new Date(),
				file: convertedPdf,
				fileType: blob.type,
				fileSize: blob.size,
				timeForConvert: 23
			}]
		);
	}
}
