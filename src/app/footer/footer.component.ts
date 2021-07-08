import { Component, OnInit } from '@angular/core';
import { faTwitter, faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faStackOverflow = faStackOverflow;


  ngOnInit() {
  }

}
