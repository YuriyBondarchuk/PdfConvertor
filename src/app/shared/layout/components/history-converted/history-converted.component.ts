import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {LocalStorageService} from "../../../services";
import {filter, map, Observable} from "rxjs";
import {IConvertedHistory} from "../../../interfaces";
import {AsyncPipe, DatePipe, JsonPipe} from "@angular/common";
import {CONVERTED_HISTORY_KEY} from "../../../utils";
import {fadeAnimation} from "../../../animations";

@Component({
	standalone: true,
	selector: 'app-history-converted',
	templateUrl: './history-converted.component.html',
	imports: [
		AsyncPipe,
		JsonPipe,
		DatePipe
	],
	styleUrl: './history-converted.component.scss',
	animations: [fadeAnimation('.5s ease-in-out')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryConvertedComponent {
	private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);

	@Output()
	public emitShowFile: EventEmitter<string> = new EventEmitter();

	public readonly history$: Observable<IConvertedHistory[]> =
		this._localStorageService
			.onStorageChange()
			.pipe(
				filter(data => data[CONVERTED_HISTORY_KEY]),
				map(data => data[CONVERTED_HISTORY_KEY]),
				map(data => JSON.parse(data)),
			);

	public showFile(item: IConvertedHistory) {
		this.emitShowFile.emit(item.file);
	}
}
