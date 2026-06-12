import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  constructor() {}
}
