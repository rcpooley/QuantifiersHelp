import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {FormsModule} from "@angular/forms";
import {PracticeSetsComponent} from "./components/practice-sets/practice-sets.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {MainService} from "./services/main.service";
import {AdminUniverseComponent} from "./components/admin-universe/admin-universe.component";
import {AdminPracticesetComponent} from "./components/admin-practiceset/admin-practiceset.component";

@NgModule({
    declarations: [
        AppComponent,
        PracticeSetsComponent,
        AdminComponent,
        AdminUniverseComponent,
        AdminPracticesetComponent,
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
