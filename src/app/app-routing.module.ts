import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BadgeResolver} from "./badge/badge.resolver";
import {BadgePageComponent} from "./badge/badge-page/badge-page.component";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";

const routes: Routes = [
    {path: "", component: HomeComponent, data: {title: "Badger"}},
    {path: ":serverGroupKey", component: ServerGroupPageComponent, resolve: {serverGroup: ServerGroupResolver}},
    {path: ":serverGroupKey/badge/:badgeKey", component: BadgePageComponent, resolve: {serverGroup: ServerGroupResolver, badge: BadgeResolver}}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
