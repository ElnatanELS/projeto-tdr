import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTdrComponent } from './teste-tdr.component';

describe('TesteTdrComponent', () => {
  let component: TesteTdrComponent;
  let fixture: ComponentFixture<TesteTdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteTdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteTdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
