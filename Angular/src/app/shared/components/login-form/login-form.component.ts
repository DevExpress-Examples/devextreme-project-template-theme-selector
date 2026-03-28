import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';

@Component({
  standalone: false,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading = false;

  formData: any = {};

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  async handleSubmitAsync(): Promise<void> {
    const { email, password } = this.formData;
    this.loading = true;
    const result = await this.authService.logIn(email, password);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.handleSubmitAsync().catch(() => {});
  }

  onCreateAccountClick = (): void => {
    this.router.navigate(['/create-account']).catch(() => {});
  };
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule { }
