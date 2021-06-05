import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTemplateComponent } from './review-template.component';

describe('ReviewTemplateComponent', () => {
  let component: ReviewTemplateComponent;
  let fixture: ComponentFixture<ReviewTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
