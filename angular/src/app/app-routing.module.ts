import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminComponent} from "./components/admin/admin.component";
import {AdminUniverseComponent} from "./components/admin-universe/admin-universe.component";
import {AdminPracticesetComponent} from "./components/admin-practiceset/admin-practiceset.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'admin', component: AdminComponent,
    children: [
        {path: '', redirectTo: 'universe', pathMatch: 'full'},
        {path: 'universe', component: AdminUniverseComponent},
        {path: 'practiceset', component: AdminPracticesetComponent},
        {path: '**', redirectTo: 'universe', pathMatch: 'full'}
    ]},
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
