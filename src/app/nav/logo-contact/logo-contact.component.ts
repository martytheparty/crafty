import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logo-contact',
  templateUrl: './logo-contact.component.html',
  styleUrls: ['./logo-contact.component.css']
})
export class LogoContactComponent implements OnInit {

  envelopeIcon = faEnvelope;
  phoneIcon = faPhone;
  contactClicked = false;
  constructor() { }

  ngOnInit(): void {
  }

  contactMelissa() {
    this.contactClicked = !this.contactClicked;
  }

}
