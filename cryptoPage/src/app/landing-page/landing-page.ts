import { Component } from '@angular/core';
import { Header } from './header/header';
import { Introduction } from './introduction/introduction';
import { Partners } from './partners/partners';
import { CryptoCoins } from './crypto-coins/crypto-coins';
import { News } from './news/news';
import { FAQ } from './faq/faq';
import { NewsLetter } from './news-letter/news-letter';
import { Footer } from './footer/footer';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [
    Header,
    Introduction,
    Partners,
    CryptoCoins,
    News,
    FAQ,
    NewsLetter,
    Footer,
    CommonModule,
    Login,
    Signup
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  
}
