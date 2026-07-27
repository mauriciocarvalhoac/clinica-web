import { Routes } from '@angular/router';
import { TemplateDefault } from './core/template/template-default/template-default';
import { DashboardGraphics } from './screens/dashboard/dashboard-graphics/dashboard-graphics';

export const routes: Routes = [
    {
        path: "", component: TemplateDefault, children: [
            { path: "dashboard", component: DashboardGraphics }
        ]
    }
];
