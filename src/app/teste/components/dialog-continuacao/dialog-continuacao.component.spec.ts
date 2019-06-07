import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContinuacaoComponent } from './dialog-continuacao.component';

describe('DialogContinuacaoComponent', () => {
  let component: DialogContinuacaoComponent;
  let fixture: ComponentFixture<DialogContinuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContinuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContinuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
