import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss'
})
export class News  implements OnInit{
  isLoading: boolean = true;

  ngOnInit(): void {
    setTimeout (()=>{
      this.isLoading = false
    }, 3000)
  }
}
