import { ConvertorFormComponent } from './convertor-form.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
	ConvertedSessionsService,
	ConvertorService,
	FormatConverterService,
	NotificationService
} from "../../../services";
import {ReactiveFormsModule} from "@angular/forms";

describe('ConvertorFormComponent', () => {
	let component: ConvertorFormComponent;
	let fixture: ComponentFixture<ConvertorFormComponent>;
	let toastrService: ToastrService;

	const mockConvertorService = jasmine.createSpyObj('ConvertorService', ['convertTextToPdf']);
	const mockFormatConverterService = jasmine.createSpyObj('FormatConverterService', ['pdfToBlob']);
	const mockNotificationService = jasmine.createSpyObj('NotificationService', ['success']);
	const mockConvertedSessionsService = jasmine.createSpyObj('ConvertedSessionsService', ['save']);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
			providers: [
				{ provide: ConvertorService, useValue: mockConvertorService },
				{ provide: FormatConverterService, useValue: mockFormatConverterService },
				{ provide: NotificationService, useValue: mockNotificationService },
				{ provide: ConvertedSessionsService, useValue: mockConvertedSessionsService },
			],
		}).compileComponents();

		toastrService = TestBed.inject(ToastrService);

		fixture = TestBed.createComponent(ConvertorFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		component.ngOnDestroy();
	});

	it('_convert should call services and emit blob', async () => {
		const sampleText = 'Sample text';
		const mockResponse = {};

		mockConvertorService.convertTextToPdf.and.returnValue({
			pipe: () => ({
				subscribe: (callback: any) => {
					callback(mockResponse);
				},
			}),
		});

		const mockBlob = new Blob(['mock data'], { type: 'application/pdf' });

		mockFormatConverterService.pdfToBlob.and.returnValue(mockBlob);
		spyOn(component.emitCreateBlob, 'next').and.callThrough();
		await component['_convert'](sampleText);

		expect(mockConvertorService.convertTextToPdf).toHaveBeenCalledWith(sampleText);
		expect(mockFormatConverterService.pdfToBlob).toHaveBeenCalledWith(mockResponse);
		expect(component.emitCreateBlob.next).toHaveBeenCalledWith(mockBlob);
		expect(mockNotificationService.success).toHaveBeenCalledWith('PDF file has been created.');
		expect(mockConvertedSessionsService.save).toHaveBeenCalledWith(mockBlob);
	});
});

