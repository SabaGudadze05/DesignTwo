import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-partners',
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class Partners {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  logos = [
    { src: '/img/samsung.svg', alt: 'Samsung', class: 'first' },
    { src: '/img/Morpheus.png', alt: 'Morpheus', class: 'second' },
    { src: '/img/zeppelin.png', alt: 'Zeppelin', class: 'first' },
    { src: '/img/protonet.svg', alt: 'Protonet', class: 'second' },
    { src: '/img/segment.svg', alt: 'Segment', class: 'first' },
    { src: '/img/Oracle1.png', alt: 'Oracle', class: 'second' },
  ];


}
