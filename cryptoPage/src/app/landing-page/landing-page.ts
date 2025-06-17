import { Component } from '@angular/core';
import { Header } from './header/header';
import { Introduction } from './introduction/introduction';
import { Partners } from './partners/partners';
import { CryptoCoins } from './crypto-coins/crypto-coins';
import { News } from './news/news';
import { FAQ } from './faq/faq';

@Component({
  selector: 'app-landing-page',
  imports: [Header, Introduction, Partners, CryptoCoins,News, FAQ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
