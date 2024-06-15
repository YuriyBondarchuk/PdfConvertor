import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './root/app.component';
import {FooterComponent} from './shared/layout/widgets';
import {HeaderComponent} from './shared/layout/widgets';
import {ContentComponent} from './shared/layout/widgets';
import {ConvertorComponent} from './shared/layout/components';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {errorInterceptor, httpRequestsInterceptor} from "./shared/interceptors";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,

		HeaderComponent,
		ContentComponent,
		FooterComponent,
		ConvertorComponent,
		ToastrModule.forRoot(),
	],
	providers: [
		provideHttpClient(
			withInterceptors([
				httpRequestsInterceptor,
				errorInterceptor
			]),
		)
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
