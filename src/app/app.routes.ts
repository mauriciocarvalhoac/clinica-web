import { Routes } from '@angular/router';
import { TemplateDefault } from './core/template/template-default/template-default';
import { DashboardGraphics } from './screens/dashboard/dashboard-graphics/dashboard-graphics';
import { MedicoListagem } from './screens/medico/medico-listagem/medico-listagem';
import { MedicoInclusao } from './screens/medico/medico-inclusao/medico-inclusao';
import { Login } from './screens/login/login';
import { authGuard } from './core/auth/auth-guard';
import { PacienteListagem } from './screens/paciente/paciente-listagem/paciente-listagem';
import { PacienteInclusao } from './screens/paciente/paciente-inclusao/paciente-inclusao';
import { EspecialidadeListagem } from './screens/especialidade/especialidade-listagem/especialidade-listagem';
import { EspecialidadeInclusao } from './screens/especialidade/especialidade-inclusao/especialidade-inclusao';

export const routes: Routes = [
    { path: 'login', component: Login },

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '', component: TemplateDefault, canActivateChild: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardGraphics },
            { path: 'medico-listagem', component: MedicoListagem },
            { path: 'medico-inclusao', component: MedicoInclusao },
            { path: 'medico-inclusao/:id', component: MedicoInclusao },
            { path: 'paciente-listagem', component: PacienteListagem },
            { path: 'paciente-inclusao', component: PacienteInclusao },
            { path: 'paciente-inclusao/:id', component: PacienteInclusao },
            { path: 'especialidade-listagem', component: EspecialidadeListagem },
            { path: 'especialidade-inclusao', component: EspecialidadeInclusao },
        ]
    },

    { path: '**', redirectTo: 'login' }
];
