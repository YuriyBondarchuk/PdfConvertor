import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-ui-button',
	templateUrl: './ui-button.component.html',
	styleUrl: './ui-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent {
	@Input()
	public type: string = 'button';

	@Input()
	public disabled: boolean = false;
}
