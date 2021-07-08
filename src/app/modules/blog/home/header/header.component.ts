import { Component, OnInit } from '@angular/core';
import { faTwitter, faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faStackOverflow = faStackOverflow;

  constructor() { }

  ngOnInit() {
  }

}
