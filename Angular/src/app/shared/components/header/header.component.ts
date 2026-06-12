import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { AuthService, UserData } from '../../services';
import { ThemeSelectorModule } from '../theme-selector/theme-selector.component';
import { UserPanelModule } from '../user-panel/user-panel.component';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();

  @Input() menuToggleEnabled = false;

  @Input() title!: string;

  user: UserData | undefined = { email: '' };

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: (): void => {
      this.router.navigate(['/profile']).catch(() => {});
    },
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: (): void => {
      this.authService.logOut();
    },
  }];

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUser().then((e) => this.user = e.data).catch(() => {});
  }

  toggleMenu = (): void => {
    this.menuToggle.emit();
  };
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    ThemeSelectorModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule { }
