import { Component } from '@angular/core';
import { Header } from './header/header';
import { Introduction } from './introduction/introduction';
import { Partners } from './partners/partners';

@Component({
  selector: 'app-landing-page',
  imports: [Header, Introduction,Partners],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

}
