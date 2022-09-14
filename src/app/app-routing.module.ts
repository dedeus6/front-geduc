import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CertificatesComponent } from "./shared/components/profile/certificates/certificates.component";
import { ContentComponent } from "./shared/components/profile/content/content.component";
import { TelaCadastroComponent } from "./views/cadastro-page/tela-cadastro.component";
import { TelaLoginComponent } from "./views/login-page/tela-login.component";
import { HomePageComponent } from "./views/home-page/home-page.component";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";

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
    },
    {
        path: "profile",
        component: ProfilePageComponent,
        children: [
            {
                path: "personal",
                component: ContentComponent
            },
            {
                path: "certificates",
                component: CertificatesComponent
            }
        ] 
    }
   

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }