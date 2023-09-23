import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Movie, MovieAdapter, MovieResponse } from "../models/movie";




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseURL: string = "http://localhost:8080/api";
  moviesURL: string = `${this.baseURL}/movies`; // CREATE AND FETCH REQUESTS
  movieDetailURL = (id: number): string => `${this.baseURL}/movies/${id}`;
  genreListURL: string = `${this.baseURL}/genres`;


  constructor(private http: HttpClient) {

  }

  getMovieDetail(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.movieDetailURL(id)).pipe(
      map((res: MovieResponse) => new MovieAdapter().adapt(res))
    ).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.message) {
          return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
      })
    );
  }

  getData(url: string): Observable<any> {
    return this.http.get<any[]>(url).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.message) {
          return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
      })
    );
  }


  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.message) {
          return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
      })
    );
  }

}