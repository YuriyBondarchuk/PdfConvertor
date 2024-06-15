import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {PdfJsViewerComponent, PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {UiButtonComponent} from "../../ui";
import {fadeAnimation} from "../../../animations";

@Component({
	standalone: true,
	selector: 'app-pdf-preview',
	templateUrl: './pdf-preview.component.html',
	imports: [
		PdfJsViewerModule,
		UiButtonComponent
	],
	styleUrl: './pdf-preview.component.scss',
	animations: [fadeAnimation('.5s ease-in-out')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfPreviewComponent implements OnChanges {
	@Input()
	public src: Blob | undefined;

	@ViewChild('pdfViewer')
	public pdfViewer!: PdfJsViewerComponent;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['src'] && this.pdfViewer) {
			this.pdfViewer.pdfSrc = changes['src'].currentValue;
			this.pdfViewer.refresh();
		}
	}
}
