import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../gifts.service';
import { GroupedGifts, UiFlatGift } from '../models';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent {

  public gifts: GroupedGifts[] = [];
  public keys: string[] = [];
  public text = '';

  constructor(private giftService: GiftsService) {
    this.giftService.getGifts().subscribe(this.updateGifts.bind(this));
  }

  updateGifts(gifts: GroupedGifts[]): void {
    this.keys = Object.keys(gifts).reverse();
    this.gifts = gifts;
    this.initializeDisplay();
  }

  initializeDisplay(): void {
    this.keys.forEach(
      (key) => {
        const gift: UiFlatGift = this.gifts[key][0];
        gift.selected = true;
      }
    );
  }

}
