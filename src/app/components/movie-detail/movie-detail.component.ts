import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnChanges {

  @Input() movieDetail?: Movie;

  constructor() {
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('detail: ', this.movieDetail)
      
  }

}
