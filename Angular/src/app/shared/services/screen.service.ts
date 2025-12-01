import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface ScreenSize {
  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => this.changed.next(true));
  }

  private isLargeScreen(): boolean {
    const isLarge: boolean = this.breakpointObserver.isMatched(Breakpoints.Large);
    const isXLarge: boolean = this.breakpointObserver.isMatched(Breakpoints.XLarge);
    return isLarge || isXLarge;
  }

  public get sizes(): ScreenSize {
    return {
      isXSmall: this.breakpointObserver.isMatched(Breakpoints.XSmall),
      isSmall: this.breakpointObserver.isMatched(Breakpoints.Small),
      isMedium: this.breakpointObserver.isMatched(Breakpoints.Medium),
      isLarge: this.isLargeScreen(),
    };
  }
}
