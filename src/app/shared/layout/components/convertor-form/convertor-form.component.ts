import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
	ConvertedSessionsService,
	ConvertorService,
	FormatConverterService,
	NotificationService
} from "../../../services";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {InputFieldComponent, UiButtonComponent} from "../../ui";

@Component({
	standalone: true,
	selector: 'app-convertor-form',
	templateUrl: './convertor-form.component.html',
	imports: [
		InputFieldComponent,
		UiButtonComponent,
		ReactiveFormsModule
	],
	styleUrl: './convertor-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertorFormComponent implements OnInit, OnDestroy {
	private readonly _convertorService: ConvertorService = inject(ConvertorService);
	private readonly _notificationService: NotificationService = inject(NotificationService);
	private readonly _formatConverterService: FormatConverterService = inject(FormatConverterService);
	private readonly _convertedSessionsService: ConvertedSessionsService = inject(ConvertedSessionsService);

	@Output() public emitCreateBlob: EventEmitter<Blob> = new EventEmitter();

	public convertorFrom!: FormGroup;
	public readonly _destroy$: Subject<boolean> = new Subject<boolean>();

	public ngOnInit() {
		this.convertorFrom = new FormGroup({
			userText: new FormControl('', [Validators.required])
		});
	}

	private _convert(text: string) {
		this._convertorService
			.convertTextToPdf(text)
			.pipe(
				takeUntil(this._destroy$),
				catchError(err => {
					this._notificationService.error('PDF conversion failed.');
					return throwError(() => Error(err));
				}))
			.subscribe(async (response: any) => {
					try {
						const blob: Blob = this._formatConverterService.pdfToBlob(response);
						this.emitCreateBlob.next(blob);
						await this._convertedSessionsService.save(blob);
						this._notificationService.success('PDF file has been created.');
					} catch (error) {
						this._notificationService.error('Error processing PDF data.');
					}
				}, (error) => {
					console.error('Subscription error:', error);
				});
	}

	public convertToPDF(): void {
		this._convert(this.convertorFrom.value.userText);
		this.convertorFrom.reset();
	}

	public ngOnDestroy() {
		this._destroy$.next(true);
		this._destroy$.complete();
	}
}
