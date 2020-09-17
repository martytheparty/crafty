import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { groupBy } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
    // .pipe(
    //   groupBy((gift: FlatGift) => gift.g_id)
    // )
    .subscribe(
      (result: FlatGift[]) => {
        this.gifts = this.groupBy(result, 'g_id');
        console.log('result: ', this.gifts);
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



class FlatGift {
  g_id: string;
  title: string;
  description: string;
  path: string;
  votes: string;
}

class GroupedGifts {
  g_id: string;
  gifts: FlatGift[];
}

