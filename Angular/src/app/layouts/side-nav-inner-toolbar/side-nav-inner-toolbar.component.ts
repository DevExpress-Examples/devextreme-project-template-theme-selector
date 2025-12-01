import {
  Component,
  OnInit,
  NgModule,
  Input,
  ViewChild,
} from '@angular/core';
import { ItemClickEvent as TreeViewItemClickEvent } from 'devextreme/ui/tree_view';
import { ItemClickEvent as ToolbarItemClickEvent } from 'devextreme/ui/toolbar';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { SideNavigationMenuModule, HeaderModule } from '../../shared/components/index';
import { ScreenService } from '../../shared/services';

@Component({
  selector: 'app-side-nav-inner-toolbar',
  templateUrl: './side-nav-inner-toolbar.component.html',
  styleUrls: ['./side-nav-inner-toolbar.component.scss'],
})
export class SideNavInnerToolbarComponent implements OnInit {
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

  toggleMenu = (e: ToolbarItemClickEvent): void => {
    this.menuOpened = !this.menuOpened;
    e.event?.stopPropagation();
  };

  get hideMenuAfterNavigation(): boolean {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick(): boolean {
    return !this.menuOpened;
  }

  navigationChanged(event: TreeViewItemClickEvent): void {
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
  imports: [SideNavigationMenuModule, DxDrawerModule, HeaderModule, DxToolbarModule, DxScrollViewModule, CommonModule],
  exports: [SideNavInnerToolbarComponent],
  declarations: [SideNavInnerToolbarComponent],
})
export class SideNavInnerToolbarModule { }
