import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../gifts.service';
import { GroupedGifts, UiFlatGift } from '../models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent {

  public gifts: GroupedGifts[] = [];
  public keys: string[] = [];
  public products = [];

  constructor(private giftService: GiftsService, private productService: ProductsService) {
    this.giftService.getGifts().subscribe(this.updateGifts.bind(this));
    this.productService.products.subscribe(
      (products) => {
        console.log('PRODUCTS', products);
        this.products = products;
      }
    );
  }

  updateGifts(gifts: GroupedGifts[]): void {
    this.keys = Object.keys(gifts).reverse();
    this.gifts = gifts;
     this.initializeDisplay();
  }

  initializeDisplay(): void {
    this.keys.forEach(
      (key) => {
        const gift: UiFlatGift = this.gifts[key][this.gifts[key].length - 1];
        gift.selected = true;
      }
    );
  }

}
