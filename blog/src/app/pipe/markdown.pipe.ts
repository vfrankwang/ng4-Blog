import { Pipe, PipeTransform } from '@angular/core';
import * as assert from 'assert';
import {parse} from 'jekyll-markdown-parser';
@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return parse([value].join('\n')).html;
  }

}
