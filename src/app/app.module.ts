import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { GuidService } from './guid/guid.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FooterComponent } from './sharePages/footer/footer.component';
import { RegisterComponent } from './Pages/register/register.component';
import { NavbarComponent } from './sharePages/navbar/navbar.component';
import{ HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SearchComponent } from './Pages/search/search.component';
import { FriendrequistlistComponent } from './sharePages/friendrequistlist/friendrequistlist.component';
export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    SearchComponent,
    FriendrequistlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : tokenGetter,
        allowedDomains : ["localhost:7101"],
        disallowedRoutes : []
      }
    }),

  ],
  providers: [GuidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
