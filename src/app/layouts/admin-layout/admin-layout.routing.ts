import { TesteTdreComponent } from './../../teste/components/teste-tdre/teste-tdre.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserProfileComponent } from 'app/user-profile/components/criar/user-profile.component';
import { EditarComponent } from 'app/user-profile/components/editar/editar.component';
import { VisualizarComponent } from 'app/user-profile/components/visualizar/visualizar.component';
import { SelecaoComponent } from 'app/teste/components/selecao/selecao.component';
import { TesteTdrComponent } from 'app/teste/components/teste-tdr/teste-tdr.component';
import { TesteDEComponent } from 'app/teste/components/teste-d-e/teste-d-e.component';

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: 'inicio', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'visualizar/:id', component: VisualizarComponent },
  { path: 'selecao/:tipo', component: SelecaoComponent },
  { path: 'teste-tdr/:id/:tipo/:quant', component: TesteTdrComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'teste-tdre/:id/:tipo/:quant', component: TesteTdreComponent },
  { path: 'teste-d-e/:id', component: TesteDEComponent }
];
