import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GiftListComponent } from './gift-list.component';
import { GiftsService } from '../gifts.service';

describe('GiftListComponent', () => {
  let component: GiftListComponent;
  let fixture: ComponentFixture<GiftListComponent>;
  let giftServiceSpy: jasmine.SpyObj<GiftsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GiftsService', ['getGifts']);

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ GiftListComponent ],
      providers: [ GiftsService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
