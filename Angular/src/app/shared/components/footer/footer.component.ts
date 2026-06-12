import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-footer',
  template: `
    <footer><ng-content></ng-content></footer>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {

}

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule { }
