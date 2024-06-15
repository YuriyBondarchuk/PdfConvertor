import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, Input} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	standalone: true,
	selector: 'app-input-field',
	templateUrl: './input-field.component.html',
	styleUrl: './input-field.component.scss',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => InputFieldComponent),
		multi: true
	}],
	viewProviders: [{
		provide: InputFieldComponent,
		useExisting: FormGroupDirective
	}],
	imports: [
		FormsModule
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent  implements ControlValueAccessor{
	private readonly _changeDetectionRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	@Input({required: true})
	public placeholder: string = 'Default Placeholder';

	@Input()
	public set value(val: any) {
		this._value = val ? val : '';
		this.onChange(this._value);
	}

	public get value() {
		return this._value;
	}

	private _value: string = '';

	private onChange: any = (): void => {};

	private onTouched: any = (): void => {};

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.value = value;
		this._changeDetectionRef.detectChanges();
	}
}
