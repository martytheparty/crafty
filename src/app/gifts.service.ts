import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GroupedGifts, FlatGift } from './models'

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
    this.http.get('https://api.flyingskunkmonkeys.com/gifts')
    .subscribe(
      (result: FlatGift[]) => {
        this.gifts = this.groupBy(result, 'g_id');
        this.observer.next(this.gifts);
      }
    );
   }

   getGifts(): Observable<any[]>
   {
      return this.giftObservable;
   }

   groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

}
