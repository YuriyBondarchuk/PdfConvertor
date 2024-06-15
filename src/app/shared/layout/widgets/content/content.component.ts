import {Component} from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-content',
	template: `<ng-content/>`,
	styles: [':host{ padding: 20px}']
})
export class ContentComponent {
}
