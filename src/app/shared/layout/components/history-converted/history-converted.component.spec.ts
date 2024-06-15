import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryConvertedComponent } from './history-converted.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HistoryConvertedComponent', () => {
  let component: HistoryConvertedComponent;
  let fixture: ComponentFixture<HistoryConvertedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
		imports: [BrowserAnimationsModule]
	})
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryConvertedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
