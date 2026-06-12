import { Component, NgModule, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

@Component({
  standalone: false,
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./single-card.component.scss'],
})
export class SingleCardComponent {
  @Input() title!: string;

  @Input() description!: string;

  constructor() { }
}

@NgModule({
  imports: [CommonModule, DxScrollViewModule],
  exports: [SingleCardComponent],
  declarations: [SingleCardComponent],
})
export class SingleCardModule { }
