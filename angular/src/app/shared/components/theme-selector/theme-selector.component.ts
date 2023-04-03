import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'theme-selector',
    templateUrl: 'theme-selector.component.html',
    styleUrls: ['./theme-selector.component.scss']
  })
  
  export class ThemeSelectorComponent {
    currentTheme
    themeSource
    constructor(private theme: ThemeService) {
        this.currentTheme = theme.getTheme()
        this.themeSource = theme.getThemeData()
    }
    onValueChanged(e: any){
        this.theme.applyTheme(e.value)
    }
  
  }
  
  @NgModule({
    imports: [
      CommonModule,
      DxSelectBoxModule,
      DxTextBoxModule
    ],
    declarations: [ ThemeSelectorComponent ],
    exports: [ ThemeSelectorComponent ]
  })
  export class ThemeSelectorModule { }