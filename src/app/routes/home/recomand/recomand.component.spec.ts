import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomandComponent } from './recomand.component';

describe('RecomandComponent', () => {
  let component: RecomandComponent;
  let fixture: ComponentFixture<RecomandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
