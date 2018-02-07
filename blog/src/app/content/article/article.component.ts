import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Article, ArticleService, Guestbook} from '../../service/article.service';
import {ActivatedRoute, Params} from '@angular/router';
import {GuestbookService} from '../../service/guestbook.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  private article: Observable<Article[]>;
  private getGuestbooks: Observable<Guestbook[]>;

  private id;

  constructor(private routeInfo: ActivatedRoute, private articleService: ArticleService, private guestbookService: GuestbookService) {
  }

  ngOnInit() {
    this.id = this.routeInfo.snapshot.params.id;
    this.article = this.articleService.articleContent(this.id);
    this.getGuestbooks = this.guestbookService.getGuestbook(this.id);
  }

  commentSubmit(info: any) {
    this.guestbookService.postGuestbook(this.id, info);
  }

}
