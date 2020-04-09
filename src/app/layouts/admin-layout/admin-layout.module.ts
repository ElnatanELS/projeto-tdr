import { TesteTdreComponent } from './../../teste/components/teste-tdre/teste-tdre.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/components/criar/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { MaterialModule } from 'shared/material/material.module';
import { VisualizarComponent } from 'app/user-profile/components/visualizar/visualizar.component';
import { EditarComponent } from 'app/user-profile/components/editar/editar.component';
import { SelecaoComponent } from 'app/teste/components/selecao/selecao.component';
import { TesteTdrComponent } from 'app/teste/components/teste-tdr/teste-tdr.component';
import { DialogoConfirmacaoComponent } from 'app/teste/components/dialogo-confirmacao/dialogo-confirmacao.component';
import { DialogConfirmacaoComponent } from 'app/table-list/dialog-confirmacao/dialog-confirmacao.component';
import { DialogFinalizacaoComponent } from 'app/teste/components/dialog-finalizacao/dialog-finalizacao.component';
import { DialogContinuacaoComponent } from 'app/teste/components/dialog-continuacao/dialog-continuacao.component';
import { TelaInicialComponent } from 'app/tela-inicial/tela-inicial.component';
import { TesteDEComponent } from 'app/teste/components/teste-d-e/teste-d-e.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VisualizarComponent,
    EditarComponent,
    SelecaoComponent,
    TesteTdrComponent,
    DialogoConfirmacaoComponent,
    DialogConfirmacaoComponent,
    DialogFinalizacaoComponent,
    DialogContinuacaoComponent,
    TesteTdreComponent,
    TesteDEComponent
  ],
  entryComponents: [
    DialogoConfirmacaoComponent,
    DialogConfirmacaoComponent,
    DialogFinalizacaoComponent,
    DialogContinuacaoComponent
  ]
})
export class AdminLayoutModule {}
