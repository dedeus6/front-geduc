import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CertificatesComponent } from "./shared/components/profile/certificates/certificates.component";
import { ContentComponent } from "./shared/components/profile/content/content.component";
import { SignUpPageComponent } from "./views/sign-up-page/sign-up-page.component";
import { LoginPage } from "./views/login-page/login-page.component";
import { HomePageComponent } from "./views/home-page/home-page.component";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { AuthGuard } from "./shared/guard/auth-guard.guard";
import { CreateEventPageComponent } from "./views/create-event-page/create-event-page.component";
import { MyEventsComponent } from "./shared/components/profile/my-events/my-events.component";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: "login",
        component: LoginPage,

    },
    {
        path: "cadastro",
        component: SignUpPageComponent
    },
    {
        path: "home",
        component: HomePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "profile",
        component: ProfilePageComponent,
        children: [
            {
                path: "personal",
                component: ContentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "certificates",
                component: CertificatesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "my-events",
                component: MyEventsComponent,
                canActivate: [AuthGuard]
            }
        ] ,
        canActivate: [AuthGuard]
    },
    {
        path:"create-event",
        component: CreateEventPageComponent,
        canActivate: [AuthGuard]
    }
   

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }