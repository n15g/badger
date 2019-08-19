import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BadgeSetPageComponent} from "./badge/badge-set-page/badge-set-page.component";
import {BadgeSetResolver} from "./badge/badge-set.resolver";
import {BadgeResolver} from "./badge/badge.resolver";
import {BadgePageComponent} from "./badge/badge-page/badge-page.component";

const routes: Routes = [
    {path: "", component: HomeComponent, data: {title: "Badger"}},
    {path: "badge-set/:badgeSetKey", component: BadgeSetPageComponent, resolve: {badgeSet: BadgeSetResolver}},
    {path: "badge-set/:badgeSetKey/badge/:badgeKey", component: BadgePageComponent, resolve: {badgeSet: BadgeSetResolver, badge: BadgeResolver}}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
