import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: BehaviorSubject<any[]> = new BehaviorSubject([]);


  productList: any[] = [];
  lookupDict = {};
  imageDict = {};


  constructor(private http: HttpClient) { 
    this.setProducts();
    this.setImages();
    this.setCrossRefs();
  }

  setProducts() {
    const cacheBust = Math.random();
    this.http
    .get('https://api.flyingskunkmonkeys.com/products.php?random=' + cacheBust)
    .subscribe(
      (data: any[]) => {
        this.productList = data.sort(
          (productA, productB) => { 
          if (parseInt(productA.p_id) > parseInt(productB.p_id)) {
            return -1;
          } else {
            return 1;
          }
         });
        this.updateProductList();
      }
    );
  }

  setImages() {
    const cacheBust = Math.random();
    this.http
    .get('https://api.flyingskunkmonkeys.com/imagesProducts.php?random=' + cacheBust)
    .subscribe(
      (data: any[]) => {
        this.imageDict = {};
        data.forEach(
          (record) => {
            this.imageDict[record.gi_id] = record;
          }
        );
        this.updateProductList();
      }
    );
  }

  setCrossRefs() {
    console.log('set cross refs');
    const cacheBust = Math.random();
    this.http
    .get('https://api.flyingskunkmonkeys.com/pixpip.php?random=' + cacheBust)
    .subscribe(
      (data: any[]) => {
        this.lookupDict = {};
        //console.log('products images lookups', data);
        data.forEach(
          (record) => {
            if (!this.lookupDict[record.p_id]) {
              this.lookupDict[record.p_id] = [];
            }
            this.lookupDict[record.p_id].push(record);
          }
        )
        //console.log('lookup-dict', this.lookupDict);
        this.updateProductList();
      }
      
    );

    // pixpip.php
  }

  updateProductList() {

    if (this.productList.length > 0 && Object.keys(this.lookupDict).length > 0 && Object.keys(this.imageDict).length > 0) {
      this.productList.forEach(
        (product) => {
          console.log(this.lookupDict[product.p_id]);
          const imagesLookups = this.lookupDict[product.p_id].sort(
            (imageA, imageB) => {
              if (imageA.pxpi_id*1 > imageB.pxpi_id*1 ) {
                return -1;
              } else {
                return 1;
              }
            }
          );
          imagesLookups.every(
            (lu) => {
              if (this.imageDict[lu.pi_id] && this.imageDict[lu.pi_id].smallPath && !this.imageDict[lu.pi_id].smallPath.endsWith('mp4')) {
                if (!this.imageDict[lu.pi_id].smallPath) {
                  console.log('small path', this.imageDict[lu.pi_id].smallPath, product, imagesLookups);
                }

                product.smallPath = this.imageDict[lu.pi_id].smallPath;
                return false;
              }
              return true;
            }
          );
        }
      );
      this.products.next(this.productList);
    } 

  }


}
