import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private gifts: [] = [];
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
    this.http.get('https://api.flyingskunkmonkeys.com/gifts').subscribe(
      (result: []) => {
        this.gifts = result;
        this.observer.next(this.gifts);
      }
    );
   }

   getGifts(): Observable<any[]>
   {
      return this.giftObservable;
   }

}
