import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SingleCardModule } from 'src/app/layouts';

@Component({
  standalone: false,
  selector: 'app-not-authorized-container',
  template: `
    <app-single-card [title]="title" [description]="description">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `],
})
export class NotAuthorizedContainerComponent {
  constructor(private readonly router: Router) { }

  get title(): string {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'login-form': return 'Sign In';
      case 'reset-password': return 'Reset Password';
      case 'create-account': return 'Sign Up';
      case 'change-password': return 'Change Password';
      default: return '';
    }
  }

  get description(): string {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password': return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [NotAuthorizedContainerComponent],
  exports: [NotAuthorizedContainerComponent],
})
export class NotAuthorizedContainerModule { }
