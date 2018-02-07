import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ArticleService} from '../../service/article.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private archives: Observable<Archive[]>;

  constructor(public router: Router, private articleService: ArticleService) {
    this.archives = articleService.archiveList();
  }

  ngOnInit() {
  }

  articleLink(articleLink: Archive) {
    this.router.navigate(['article/' + articleLink.id]);
  }
}

export class Archive {
  constructor(public id: number,
              public name: string) {

  }
}
