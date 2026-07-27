import { Routes } from '@angular/router';
import { TemplateDefault } from './core/template/template-default/template-default';
import { DashboardGraphics } from './screens/dashboard/dashboard-graphics/dashboard-graphics';
import { MedicoListagem } from './screens/medico/medico-listagem/medico-listagem';

export const routes: Routes = [
    {
        path: "", component: TemplateDefault, children: [
            { path: "dashboard", component: DashboardGraphics },
            { path: "medico-listagem", component: MedicoListagem }
        ]
    }
];
