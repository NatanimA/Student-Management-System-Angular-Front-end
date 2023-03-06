import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'', component: NewsComponent},
  {path:'students', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path: 'profile/:id', component: ProfileComponent},
  //If unknown route is given redirect to news component
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
