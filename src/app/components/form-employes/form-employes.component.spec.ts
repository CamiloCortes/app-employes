import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmployesComponent } from './form-employes.component';

describe('FormEmployesComponent', () => {
  let component: FormEmployesComponent;
  let fixture: ComponentFixture<FormEmployesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEmployesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
