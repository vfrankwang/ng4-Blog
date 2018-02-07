import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GuestbookService {

  private postguestbook: Guestbook;

  constructor(private http: Http) {

  }

  postGuestbook(articleid: number, info: any) {
    this.postguestbook = {
      articleid: articleid,
      username: info.userInfo.username,
      useremail: info.userInfo.email,
      content: info.content
    };
    this.http.post('/api/inserguestbook', {guestbook: this.postguestbook}).map(res => res.json()).subscribe(
      data => console.log(data.code)
    );
    return;
  }

  getGuestbook(id: number) {
    return this.http.get('/api/guestbook?id=' + id).map(resolve => resolve.json());
  }
}

export class Guestbook {
  constructor(public articleid: number,
              public username: string,
              public useremail: string,
              public content: string) {
  }
}
