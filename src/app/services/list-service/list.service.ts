import { ResponseMessage } from '../../model/responseMessage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from '../../app.module';
import { List } from '../../model/list';
import { HEROKU_API_URL } from '../../../config';
import { AlertifyService } from '../alertify-service/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  getListByUserAndTypeId(userId: string, listType: string) {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<List[]>(
      HEROKU_API_URL +
        'userList/' +
        userId.toString() +
        '/' +
        listType.toString(),
      { headers: headers }
    );
  }

  addListItem(list: List) {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    this.httpClient
      .post(HEROKU_API_URL + 'list', list, { headers: headers })
      .subscribe((data) => {}, (error)=>{
        this.alertifyService.error("Bir hata oluştu.")
      });
    this.alertifyService.success('Seçtiğiniz film listenize eklenmiştir.');
  }

  deleteListItem(list: List) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    this.httpClient
      .delete(
        `${HEROKU_API_URL}list/${list.UserId}/${list.ListType}/${list.MovieId}`,
        { headers: headers }
      )
      .subscribe((data) => {}, (error)=>{
        this.alertifyService.error("Bir hata oluştu.")
      });
    this.alertifyService.error('Seçili film listenizden kaldırılmıştır.');
  }

  checkMoviOnList(
    userId: number,
    listType: number,
    movieId: number
  ): Observable<ResponseMessage> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<ResponseMessage>(
      `${HEROKU_API_URL}userList/${userId}/${listType}/${movieId}`,
      { headers: headers }
    );
  }
}
