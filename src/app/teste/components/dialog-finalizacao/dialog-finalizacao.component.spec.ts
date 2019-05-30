import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinalizacaoComponent } from './dialog-finalizacao.component';

describe('DialogFinalizacaoComponent', () => {
  let component: DialogFinalizacaoComponent;
  let fixture: ComponentFixture<DialogFinalizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFinalizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
