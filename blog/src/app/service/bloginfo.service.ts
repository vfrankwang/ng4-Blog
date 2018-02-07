import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BloginfoService {

  constructor(private http: Http) {
  }

  menus(): Observable<Menu[]> {
    return this.http.get('/api/menu').map(resolve => resolve.json());
  }

  myinfos(): Observable<MyInfo[]> {
    return this.http.get('/api/my_info').map(resolve => resolve.json());
  }

  blogInfo(): Observable<BlogInfo> {
    return this.http.get('/api/blog-info').map(resolve => resolve.json());
  }
}

export class MyInfo {
  constructor(public id: number,
              public name: string,
              public link: string,
              public ico: string) {
  }
}

export class Menu {
  constructor(public id: number,
              public name: string,
              public link: string) {
  }
}


export class BlogInfo {
  constructor(public logo: string,
              public title: string,
              public mintitle: string,
              public username: string,
              public careerdirection: string,
              public footerinfo: string) {
  }
}
