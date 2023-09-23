import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit {

  movieList: Movie[] = [];
  genreList: string[] = [];
  selectedMovie?: Movie;

  movieForm: FormGroup = new FormGroup({
    "title": new FormControl<string>('', Validators.required),
    "releaseYear": new FormControl<number | null>(null, Validators.required),
    "description": new FormControl<string>('', Validators.required),
    "genres": this.formBuilder.array([])
  });

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.refreshMovieAndGenreList();
  }

  ngAfterViewInit(): void {

    // AUTO FILL THE FIELDS
    this.movieForm.get("title")?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      (value) => {
        if (value) {
          this.movieForm.get("description")?.patchValue(
            `${value} is a dummy title of a movie that might not yet been released :)`
          );

          this.movieForm.patchValue({
            "releaseYear": 2023,
          });

          this.setGenreInputField("History, Action")
        }

      }
    )
  }

  getAllMovies(): void {
    this.projectService.getData(this.projectService.moviesURL).subscribe({
      next: (res: Movie[]) => {
        this.movieList = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onGetMovieDetail(id: number): void {
    this.projectService.getMovieDetail(id).subscribe({
      next: (res: Movie) => {        
        this.selectedMovie = res;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getGenreList(): void {
    this.projectService.getData(this.projectService.genreListURL).subscribe({
      next: (res: string[]) => {
        this.genreList = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private refreshMovieAndGenreList(): void {
    this.getAllMovies();
    this.getGenreList();
  }

  SubmitForm(): void {
    if (this.movieForm.valid) {
      this.populateFormWithGenres();
      console.log(this.movieForm.value)
      
      this.projectService.postData(this.projectService.moviesURL, this.movieForm.value).subscribe({
        next: (res: any) => {
          this.resetForm();
          this.refreshMovieAndGenreList();
        },
        error: (err) => {
          console.log(err);
        }
      })

    } else {
      console.warn("Data is invalid.")
    }
  }

  private populateFormWithGenres(): void {
    const genresRawString = (document.getElementById("genre-input") as HTMLInputElement).value.trim();

    if (genresRawString) {
      const genreList: string[] = genresRawString.split(',');

      genreList.map((genre) => {
        genre = genre.trim();
        if (genre) {
          (this.movieForm.get('genres') as FormArray).push(new FormControl(genre));
        }
      });
    }
  }

  private resetForm(): void {
    this.movieForm.reset();
    (this.movieForm.get('genres') as FormArray).clear(); // TO MAKE THE ARRAY EMPTY
    
    this.setGenreInputField();
  }

  private setGenreInputField(param: string = ''): any {
    (document.getElementById("genre-input") as HTMLInputElement).value = param ? param.trim() : '';
  }

}
