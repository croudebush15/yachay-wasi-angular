import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProfesorComponent } from './mant-profesor.component';

describe('MantProfesorComponent', () => {
  let component: MantProfesorComponent;
  let fixture: ComponentFixture<MantProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
