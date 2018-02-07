import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Article, ArticleService} from '../../service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  private arcitles: Observable<Article[]>;

  constructor(public router: Router, private articleService: ArticleService) {
    this.arcitles = this.articleService.articleContent();
  }

  ngOnInit() {
  }

  arcitleNav(arcitle: Arcitle) {
    // this.router.navigate(['arcitle/' + arcitle.id]);
    this.router.navigateByUrl('article/' + arcitle.id);
  }
}

export class Arcitle {
  constructor(public id: number,
              public title: string,
              public date: string) {
  }
}
