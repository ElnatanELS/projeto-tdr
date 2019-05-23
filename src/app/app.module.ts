import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/components/criar/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MaterialModule } from 'shared/material/material.module';
import { MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SelecaoComponent } from './teste/components/selecao/selecao.component';
import { TesteTdrComponent } from './teste/components/teste-tdr/teste-tdr.component';
import { DialogoConfirmacaoComponent } from './teste/components/dialogo-confirmacao/dialogo-confirmacao.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
   
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DialogoConfirmacaoComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
