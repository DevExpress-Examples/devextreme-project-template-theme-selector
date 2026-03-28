import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxSelectBoxModule, DxSelectBoxTypes } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { type ThemeData, ThemeService } from '../../services/theme.service';

@Component({
  standalone: false,
  selector: 'theme-selector',
  templateUrl: 'theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  currentTheme: string;

  themeSource: ThemeData[];

  constructor(private readonly theme: ThemeService) {
    this.currentTheme = theme.getTheme();
    this.themeSource = theme.getThemeData();
  }

  onValueChanged(e: DxSelectBoxTypes.ValueChangedEvent): void {
    this.theme.applyTheme(e.value);
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
  ],
  declarations: [ThemeSelectorComponent],
  exports: [ThemeSelectorComponent],
})
export class ThemeSelectorModule { }
