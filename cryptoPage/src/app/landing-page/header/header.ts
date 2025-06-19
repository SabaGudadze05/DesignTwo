import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Login } from '../login/login';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, Login],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild(Login) LoginComponent!: Login;

  activeSection: string = 'home';
  constructor(private authService: AuthService) {}

  private getHeaderHeight(): number {
    return (
      this.headerContainer?.nativeElement.getBoundingClientRect().height || 112
    );
  }
  onLoginClicked() {
    this.authService.openLogin();
  }
  openLoginPopup() {
    this.authService.openLogin();
  }

  scrollTO(sectionID: string) {
    const elem = document.getElementById(sectionID);
    if (elem) {
      const headerHeight = this.getHeaderHeight();
      const elemPosition = elem.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elemPosition - headerHeight,
        behavior: 'smooth',
      });
      this.activeSection = sectionID;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const headerHeight = this.getHeaderHeight();
    const sections = ['home', 'news', 'faq', 'newsletter'];
    const scrollPosition = window.scrollY + headerHeight + 112;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
