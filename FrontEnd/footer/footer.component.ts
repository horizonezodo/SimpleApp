import { Component } from '@angular/core';
import { faFacebook, faYoutube, faTwitch, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faceIcon = faFacebook;
  youIcon = faYoutube;
  twichIcon = faTwitch;
  instaIcon = faInstagram
}
