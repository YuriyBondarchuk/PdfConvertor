import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './root/app.component';
import {ConvertorComponent} from './shared/layout/components';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpRequestsInterceptor} from "./shared/interceptors";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ContentComponent, FooterComponent, HeaderComponent} from "./shared/layout/widgets";

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
				httpRequestsInterceptor
			]),
		)
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
