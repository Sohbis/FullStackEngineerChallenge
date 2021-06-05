import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFormTemplateComponent } from './emp-form-template.component';

describe('EmpFormTemplateComponent', () => {
  let component: EmpFormTemplateComponent;
  let fixture: ComponentFixture<EmpFormTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpFormTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
