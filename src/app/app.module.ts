import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { LoginComponent } from '@/components/login/login.component';
import { HomeComponent } from '@/components/home/home.component';
import { NotFoundComponent } from '@/component/not-found/not-found.component';
import { AuthenticationService } from './services/authentication.service';

const configFactory = (config: AuthenticationService) => {
  return () => config.checkToken();
};
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [AuthenticationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
