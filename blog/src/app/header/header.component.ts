import {Component, OnInit} from '@angular/core';
import {BloginfoService, BlogInfo} from '../service/bloginfo.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private blogInfos: Observable<BlogInfo>;

  constructor(private blogInfo: BloginfoService) {
    this.blogInfos = blogInfo.blogInfo();
  }

  ngOnInit() {
  }

}

export class Blog {
  constructor(public logo: string,
              public title: string,
              public secondaryTitle: string) {

  }
}
