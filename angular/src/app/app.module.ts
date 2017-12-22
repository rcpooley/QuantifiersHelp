import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {FormsModule} from "@angular/forms";
import {PracticeSetsComponent} from "./components/practice-sets/practice-sets.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {MainService} from "./services/main.service";

@NgModule({
    declarations: [
        AppComponent,
        PracticeSetsComponent,
        AdminComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
