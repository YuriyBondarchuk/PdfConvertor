import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	private _storageSubject$: BehaviorSubject<any> = new BehaviorSubject({});
	private _storageEvent$: Observable<StorageEvent> = fromEvent<StorageEvent>(window, 'storage');

	constructor() {
		this.updateLocalStorage();

		this._storageEvent$
			.subscribe((event: StorageEvent) => {
				if (event.storageArea === localStorage) {
					this.updateLocalStorage();
				}
			});
	}

	public setItem(key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data));

		this._storageSubject$.next({key, data});
	}

	public getItem<T>(key: string): T | null {
		const item: string | null = localStorage.getItem(key);

		return item ? JSON.parse(item) : null;
	}

	public removeItem(key: string): void {
		localStorage.removeItem(key);

		this._storageSubject$.next({key, value: null});
	}

	public onStorageChange(): Observable<any> {
		return this._storageSubject$.asObservable();
	}

	public updateLocalStorage() {
		const storage: { [key: string]: any } = {};

		for (let i = 0; i < localStorage.length; i++) {
			const key: string | null = localStorage.key(i);

			if (key) {
				storage[key] = localStorage.getItem(key);
			}
		}

		this._storageSubject$.next(storage);
	}
}
