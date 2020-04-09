import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteDEComponent } from './teste-d-e.component';

describe('TesteDEComponent', () => {
  let component: TesteDEComponent;
  let fixture: ComponentFixture<TesteDEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteDEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
