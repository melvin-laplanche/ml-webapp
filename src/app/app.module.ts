import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// State management
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

import { SessionModule } from './session';
import { UsersService } from './users';

// Angular material
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdSidenavModule, MdToolbarModule } from '@angular/material';
import { MdButtonModule, MdListModule } from '@angular/material';

// Router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

// App components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found';
import { LeftDrawerComponent } from './left-drawer';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LeftDrawerComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule,
    StoreModule.provideStore(appReducer),
    SessionModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
