import { AlertifyService } from './../alertify-service/alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from '../../app.module';
import { Review } from '../../model/review';
import { HEROKU_API_URL } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  getReviewById(id: number) {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Review>(
      HEROKU_API_URL + 'review/' + id.toString(),
      { headers: headers }
    );
  }

  getReviewByMovieId(movieId: number): Observable<Review[]> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Review[]>(
      HEROKU_API_URL + 'movieReviewAll/' + movieId.toString(),
      { headers: headers }
    );
  }

  getReviewByUserId(id: number) {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Review>(
      HEROKU_API_URL + 'reviews/' + id.toString(),
      { headers: headers }
    );
  }

  getReviews(): Observable<Review[]> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Review[]>(HEROKU_API_URL + 'reviewAll', {
      headers: headers,
    });
  }

  updateReview(review: Review) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put(HEROKU_API_URL + 'review', review, {
      headers: headers,
    });
  }

  addReview(review: Review) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    this.httpClient
      .post(
        HEROKU_API_URL + 'review',
        {
          UserId: review.UserId,
          Title: review.Title,
          MovieId: review.MovieId,
          MessageText: review.MessageText,
          CreatedDate: review.CreatedDate,
        },
        { headers: headers }
      )
      .subscribe(
        (data) => {},
        (error) => {
          this.alertifyService.error('Bir hata olu??tu.');
        }
      );
  }

  deletReview(reviewId: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.delete<Review>(
      HEROKU_API_URL + 'review/' + reviewId.toString(),
      { headers: headers }
    );
  }

  getToken() {
    let token = tokenGetter();
    if (token !== null) return true;
    return false;
  }
}
