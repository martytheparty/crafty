import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../gifts.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent {

  public gifts = [];
  public text = '';

  constructor(private giftService: GiftsService) {
    this.giftService.getGifts().subscribe(this.updateGifts.bind(this));
  }

  updateGifts(gifts) {
    console.log('thsi fi', Object.keys(gifts));
    this.gifts = gifts;
  }

}
