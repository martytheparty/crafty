import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GroupedGifts, FlatGift } from './models';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private gifts: GroupedGifts[] = [];
  private giftObservable: Observable<any[]>;
  private observer: any;

  constructor(private http: HttpClient) {
    this.giftObservable = new Observable(this.publish.bind(this));
    this.loadGifts();
   }

   private publish(observer): void {
     this.observer = observer;
    }

   loadGifts(): void {
    const cacheBust = Math.random();
    this.http
    .get('https://api.flyingskunkmonkeys.com/gifts?random=' + cacheBust)
    .subscribe(
      (result: FlatGift[]) => {
        result.forEach(
          (gift: FlatGift) => {
            gift.movie = gift.path.endsWith('mp4');
          }
        );
        const giftList: FlatGift[] = result
        .filter(gift => gift.published === '1');
        this.gifts = this.groupBy(giftList, 'g_id');
        this.observer.next(this.gifts);
      }
    );
   }

   getGifts(): Observable<any[]>
   {
      return this.giftObservable;
   }

   groupBy(objectArray, property): any {
    return objectArray.reduce( (acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

}
