import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BloginfoService, Menu, MyInfo, BlogInfo} from '../service/bloginfo.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  private menus: Observable<Menu[]>;
  private myinfos: Observable<MyInfo[]>;
  private blogInfos: Observable<BlogInfo>;

  constructor(public router: Router, private blogInfo: BloginfoService) {
    this.menus = blogInfo.menus();
    this.myinfos = blogInfo.myinfos();
    this.blogInfos = blogInfo.blogInfo();
  }

  ngOnInit() {
  }

  navLink(menu: Menu) {
    this.router.navigate([menu.link]);
  }
}
