import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTdreComponent } from './teste-tdre.component';

describe('TesteTdreComponent', () => {
  let component: TesteTdreComponent;
  let fixture: ComponentFixture<TesteTdreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteTdreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteTdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
