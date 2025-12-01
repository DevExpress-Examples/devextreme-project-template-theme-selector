import {
  Component,
  OnInit,
  NgModule,
  Input,
  ViewChild,
} from '@angular/core';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { SideNavigationMenuModule, HeaderModule } from '../../shared/components/index';
import { ScreenService } from '../../shared/services';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
})
export class SideNavOuterToolbarComponent implements OnInit {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;

  selectedRoute = '';

  menuOpened!: boolean;

  temporaryMenuOpened = false;

  @Input() title!: string;

  menuMode: DxDrawerTypes.OpenedStateMode = 'shrink';

  menuRevealMode: DxDrawerTypes.RevealMode = 'expand';

  minMenuSize = 0;

  shaderEnabled = false;

  constructor(private readonly screen: ScreenService, private readonly router: Router) { }

  ngOnInit(): void {
    this.menuOpened = this.screen.sizes.isLarge;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer(): void {
    const isXSmall = this.screen.sizes.isXSmall;
    const isLarge = this.screen.sizes.isLarge;

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation(): boolean {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick(): boolean {
    return !this.menuOpened;
  }

  navigationChanged(event: ItemClickEvent): void {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]).then(
          () => this.scrollView.instance.scrollTo(0),
          () => { /* Handle navigation error if needed */ },
        );
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick(): void {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
}

@NgModule({
  imports: [SideNavigationMenuModule, DxDrawerModule, HeaderModule, DxScrollViewModule, CommonModule],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent],
})
export class SideNavOuterToolbarModule { }
