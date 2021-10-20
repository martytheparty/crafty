import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommissionArtComponent } from '../commission-art/commission-art.component' 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CommissionArtComponent);
  }

}
