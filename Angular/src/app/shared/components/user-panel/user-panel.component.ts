import { Component, NgModule, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { UserData } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./user-panel.component.scss'],
})

export class UserPanelComponent {
  @Input() menuItems: any;

  @Input() menuMode!: string;

  @Input() user: UserData | undefined;

  constructor() {}
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule,
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule { }
