import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSheetComponent } from './song-sheet.component';

describe('SongSheetComponent', () => {
  let component: SongSheetComponent;
  let fixture: ComponentFixture<SongSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
