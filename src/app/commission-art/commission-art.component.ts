import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'commission',
  templateUrl: './commission-art.component.html',
  styleUrls: ['./commission-art.component.scss']
})
export class CommissionArtComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<CommissionArtComponent>) {}

  ngOnInit(): void {
  }

}
