import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPerfilComponent } from './logo-perfil.component';

describe('LogoPerfilComponent', () => {
  let component: LogoPerfilComponent;
  let fixture: ComponentFixture<LogoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
