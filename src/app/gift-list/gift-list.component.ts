import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../gifts.service';
import { GroupedGifts } from '../models'

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

  updateGifts(gifts: GroupedGifts[]) {
    this.keys = Object.keys(gifts).reverse();
    this.gifts = gifts;
  }

}
