import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {ArticleListComponent} from './content/article-list/article-list.component';
import {ArchiveComponent} from './content/archive/archive.component';
import {ArticleComponent} from './content/article/article.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ArticleService} from './service/article.service';
import {BloginfoService} from './service/bloginfo.service';
import {MeInfoPipe} from './pipe/me-info.pipe';
import {MarkdownPipe} from './pipe/markdown.pipe';
import {GuestbookService} from './service/guestbook.service';

const routedConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ArticleListComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: '**', component: ArticleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ArticleListComponent,
    ArchiveComponent,
    ArticleComponent,
    MeInfoPipe,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routedConfig, { useHash: false })
  ],
  providers: [
    ArticleService,
    BloginfoService,
    GuestbookService,
    { provide: LocationStrategy, useClass: HashLocationStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
