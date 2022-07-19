import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidService } from './guid/guid.service';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterComponent } from './Pages/register/register.component';
import { SearchComponent } from './Pages/search/search.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[GuidService]},
  {path:'search',component:SearchComponent,canActivate:[GuidService]},
  {path:'',component:HomeComponent,canActivate:[GuidService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
