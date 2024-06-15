import {animate, animation, style, transition, trigger, useAnimation} from '@angular/animations';

export const fadeInAnimationHelper = animation([
	style({opacity: 0}),
	animate('{{ time }}', style({opacity: 1}))
]);

export const fadeOutAnimationHelper = animation([
	animate('{{ time }}', style({opacity: 0}))
]);

export const fadeAnimation = (fadeInTime?: string, fadeOutTime?: string) =>
	trigger('fade', [
		transition(':enter', [
			useAnimation(fadeInAnimationHelper, {
				params: {
					time: fadeInTime || '.3s ease',
				}
			}),
		]),
		transition(':leave', [
			useAnimation(fadeOutAnimationHelper, {
				params: {
					time: fadeOutTime || '.3s ease',
				}
			}),
		]),
	]);

export const animationMoveFromDown = (time: string = '.3s ease') =>
	trigger('moveUp', [
		transition(':enter', [
			style({transform: 'translateY(100%)', opacity: 0}),
			animate(time,
				style({transform: 'translateY(0)', opacity: 1})
			),
		]),
		transition(':leave', [
			animate(time,
				style({transform: 'translateY(100%)', opacity: 0})
			),
		]),
	]);
