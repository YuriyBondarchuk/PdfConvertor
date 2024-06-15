import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {InputFieldComponent, UiButtonComponent} from "../../ui";
import {PdfPreviewComponent} from "../pdf-preview/pdf-preview.component";
import {HistoryConvertedComponent} from "../history-converted/history-converted.component";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {ReactiveFormsModule} from "@angular/forms";
import {FormatConverterService} from "../../../services/format-converter/format-converter.service";
import {ConvertorFormComponent} from "../convertor-form/convertor-form.component";
import {animationMoveFromDown} from "../../../animations";

@Component({
	standalone: true,
	selector: 'app-convertor',
	templateUrl: './convertor.component.html',
	imports: [
		InputFieldComponent,
		UiButtonComponent,
		PdfPreviewComponent,
		HistoryConvertedComponent,
		PdfJsViewerModule,
		ReactiveFormsModule,
		ConvertorFormComponent,
	],
	styleUrl: './convertor.component.scss',
	animations: [animationMoveFromDown()],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertorComponent {
	private readonly _formatConverterService: FormatConverterService = inject(FormatConverterService);

	public pdfSrc!: Blob;

	public showFile(file: string) {
		this.pdfSrc = this._formatConverterService.base64ToBlob(file) || new Blob();
	}
}
