import { Routes } from '@angular/router';
import { TemplateDefault } from './core/template/template-default/template-default';
import { DashboardGraphics } from './screens/dashboard/dashboard-graphics/dashboard-graphics';
import { Login } from './screens/login/login';
import { authGuard } from './core/auth/auth-guard';
import { PacienteListagem } from './screens/paciente/paciente-listagem/paciente-listagem';
import { PacienteInclusao } from './screens/paciente/paciente-inclusao/paciente-inclusao';
import { EspecialidadeListagem } from './screens/especialidade/especialidade-listagem/especialidade-listagem';
import { EspecialidadeInclusao } from './screens/especialidade/especialidade-inclusao/especialidade-inclusao';
import { FuncionarioInclusao } from './screens/funcionario/funcionario-inclusao/funcionario-inclusao';
import { FuncionarioListagem } from './screens/funcionario/funcionario-listagem/funcionario-listagem';
import { AcessoInclusao } from './screens/acesso/acesso-inclusao/acesso-inclusao';
import { AcessoListagem } from './screens/acesso/acesso-listagem/acesso-listagem';
import { ConvenioListagem } from './screens/convenio/convenio-listagem/convenio-listagem';
import { ConvenioInclusao } from './screens/convenio/convenio-inclusao/convenio-inclusao';

export const routes: Routes = [
    { path: 'login', component: Login },

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '', component: TemplateDefault, canActivateChild: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardGraphics },
            { path: 'funcionario-listagem', component: FuncionarioListagem },
            { path: 'funcionario-inclusao', component: FuncionarioInclusao },
            { path: 'funcionario-inclusao/:id', component: FuncionarioInclusao },
            { path: 'paciente-listagem', component: PacienteListagem },
            { path: 'paciente-inclusao', component: PacienteInclusao },
            { path: 'paciente-inclusao/:id', component: PacienteInclusao },
            { path: 'especialidade-listagem', component: EspecialidadeListagem },
            { path: 'especialidade-inclusao', component: EspecialidadeInclusao },
            { path: 'especialidade-inclusao/:id', component: EspecialidadeInclusao },
            { path: 'acesso-inclusao', component: AcessoInclusao },
            { path: 'acesso-inclusao/:id', component: AcessoInclusao },
            { path: 'acesso-listagem', component: AcessoListagem },
            { path: 'convenio-listagem', component: ConvenioListagem },
            { path: 'convenio-inclusao', component: ConvenioInclusao },
            { path: 'convenio-inclusao/:id', component: ConvenioInclusao },
        ]
    },

    { path: '**', redirectTo: 'login' }
];
