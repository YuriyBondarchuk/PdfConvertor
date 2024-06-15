import { Injectable, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Injectable()
export class NgValueAccessor implements ControlValueAccessor {
  protected _value: any = '';

  @Input()
  set value(val: any) {
    this._value = val;
  }

  get value(): any {
    return this._value;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onChange(value: any) {
  }

  public onTouched(): void {
  }
}
