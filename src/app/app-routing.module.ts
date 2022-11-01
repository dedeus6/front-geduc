import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CertificatesComponent } from "./shared/components/profile/certificates/certificates.component";
import { ContentComponent } from "./shared/components/profile/content/content.component";
import { TelaCadastroComponent } from "./views/cadastro-page/tela-cadastro.component";
import { TelaLoginComponent } from "./views/login-page/tela-login.component";
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
        component: TelaLoginComponent,

    },
    {
        path: "cadastro",
        component: TelaCadastroComponent
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