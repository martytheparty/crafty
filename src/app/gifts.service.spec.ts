import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';



import { GiftsService } from './gifts.service';

describe('GiftsService', () => {
  let service: GiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
