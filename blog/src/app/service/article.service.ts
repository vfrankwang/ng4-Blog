import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ArticleService {

  constructor(private http: Http) {
  }

  // 标签云
  archiveList(): Observable<Archive[]> {
    return this.http.get('/api/archive').map(resolve => resolve.json());
  }

  // 文章内容,文章列表
  articleContent(atticleid?: number): Observable<Article[]> {
    if (atticleid) {
      return this.http.get('/api/atticle?id=' + atticleid).map(resolve => resolve.json());
    } else {
      return this.http.get('/api/atticle').map(resolve => resolve.json());
    }
  }

  // 留言
  guestbook() {
  }
}


// 文章
export class Article {
  constructor(public id: number,
              public title: string,
              public date: string,
              public content: string) {
  }
}

// 标签云
export class Archive {
  constructor(public id: number,
              public name: string) {

  }
}

// 留言
export class Guestbook {
  constructor(public id: number,
              public name: string,
              public email: string,
              public date: string,
              public title: string,
              public content: string) {

  }
}
