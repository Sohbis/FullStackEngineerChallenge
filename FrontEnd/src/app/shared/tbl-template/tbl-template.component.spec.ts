import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblTemplateComponent } from './tbl-template.component';

describe('TblTemplateComponent', () => {
  let component: TblTemplateComponent;
  let fixture: ComponentFixture<TblTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
