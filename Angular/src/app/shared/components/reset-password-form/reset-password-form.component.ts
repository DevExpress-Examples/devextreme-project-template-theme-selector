import { CommonModule } from '@angular/common';
import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  standalone: false,
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
  loading = false;

  formData: any = {};

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  async handleSubmitAsync(): Promise<void> {
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']).catch(() => {});
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.handleSubmitAsync().catch(() => {});
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent],
})
export class ResetPasswordFormModule { }
