import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  @HostBinding('class') get getClass(): string {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl as keyof typeof this.screen.sizes]).join(' ');
  }

  constructor(
    private readonly themeService: ThemeService,
    private readonly authService: AuthService,
    private readonly screen: ScreenService,
    public readonly appInfo: AppInfoService,
  ) { }

  isAuthenticated(): boolean {
    return this.authService.loggedIn;
  }

  ngOnInit(): void {
    this.themeService.applyTheme();
  }
}
