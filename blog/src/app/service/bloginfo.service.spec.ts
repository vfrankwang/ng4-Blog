import { TestBed, inject } from '@angular/core/testing';

import { BloginfoService } from './bloginfo.service';

describe('BloginfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloginfoService]
    });
  });

  it('should be created', inject([BloginfoService], (service: BloginfoService) => {
    expect(service).toBeTruthy();
  }));
});
