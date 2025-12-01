import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  public readonly title: string = 'App Name';

  public readonly currentYear: number = new Date().getFullYear();

  constructor() {}
}
