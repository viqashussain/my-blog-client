import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutMeData } from 'src/app/models/about-me-data.interface';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { GetAboutMe } from 'src/app/store/actions/home.actions';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  aboutMeData$: Observable<AboutMeData>;

  ngOnInit() {
    this.store.dispatch(new GetAboutMe());

    this.aboutMeData$ = this.store.pipe(select((state: AppState) => state.home.aboutMeData));
  }

}
