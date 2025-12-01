import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';

@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html',
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;

  formData: any = {};

  recoveryCode = '';

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recoveryCode = params.get('recoveryCode') ?? '';
    });
  }

  async handleSubmitAsync(): Promise<void> {
    const { password } = this.formData;
    this.loading = true;

    const result = await this.authService.changePassword(password, this.recoveryCode);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']).catch(() => { });
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.handleSubmitAsync().catch(() => { });
  }

  confirmPassword = (e: ValidationCallbackData): boolean => e.value === this.formData.password;
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  declarations: [ChangePasswordFormComponent],
  exports: [ChangePasswordFormComponent],
})
export class ChangePasswordFormModule { }
