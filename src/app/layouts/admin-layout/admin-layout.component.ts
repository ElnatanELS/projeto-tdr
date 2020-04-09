import { Location, PopStateEvent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router
} from '@angular/router';
import { TelaInicialComponent } from 'app/tela-inicial/tela-inicial.component';
import PerfectScrollbar from 'perfect-scrollbar';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  tipo: any;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo1'];
      console.log(params, 'params');
      console.log(this.tipo, 'tipo ');
    });

    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (
      isWindows &&
      !document
        .getElementsByTagName('body')[0]
        .classList.contains('sidebar-mini')
    ) {
      // if we are on windows OS we activate the perfectScrollbar function

      document
        .getElementsByTagName('body')[0]
        .classList.add('perfect-scrollbar-on');
    } else {
      document
        .getElementsByTagName('body')[0]
        .classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>(
      document.querySelector('.sidebar .sidebar-wrapper')
    );

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this._router = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //     let ps = new PerfectScrollbar(elemMainPanel);
    //     ps = new PerfectScrollbar(elemSidebar);
    // }
  }
  ngAfterViewInit() {
    this.dialog.open(TelaInicialComponent, {
      width: '80vw',
      height: '80vh'
    });
    this.runOnRouteChange();
  }
  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    var array: any[] = titlee.split('/');
    

    if (
      array[array.length - 2] == 'visual' ||
      array[array.length - 2] == 'auditivo' ||
      array[array.length - 2] == 'aleatorio' ||
      array[array.length - 2] == 'cores' ||
      array[array.length - 2] == 'palavras' ||
      array[array.length - 2] == 'teste-d-e'
    ) {
      return false;
    }

    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
  isTeste(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);

    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
