import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FormatConverterService {
	public pdfToBlob(document: any) {
		return new Blob([document], { type: 'application/pdf' })
	}

	public base64ToBlob(base64: string): Blob | undefined {
		if (!base64) return;

		const byteString: string = atob(base64.split(',')[1]);
		const mimeString: string = base64.split(',')[0].split(':')[1].split(';')[0];
		const ab: ArrayBuffer = new ArrayBuffer(byteString.length);
		const ia: Uint8Array = new Uint8Array(ab);

		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ab], {type: mimeString});
	}

	public blobToBase64(blob: Blob): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader: FileReader = new FileReader();

			reader.onloadend = () => {
				resolve(reader.result as string);
			};

			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}
}
