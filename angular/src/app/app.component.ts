import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private themeService: ThemeService, private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
  
  ngOnInit(){
    this.themeService.applyTheme();
  }
}
