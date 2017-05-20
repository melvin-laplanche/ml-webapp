import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// State management
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

// Angular material
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdSidenavModule } from '@angular/material';
import { MdButtonModule, MdListModule } from '@angular/material';

// Router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

// App components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdListModule,
    StoreModule.provideStore(appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
