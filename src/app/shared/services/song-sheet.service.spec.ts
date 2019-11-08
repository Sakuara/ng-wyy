import { TestBed } from '@angular/core/testing';

import { SongSheetService } from './song-sheet.service';

describe('SongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongSheetService = TestBed.get(SongSheetService);
    expect(service).toBeTruthy();
  });
});
