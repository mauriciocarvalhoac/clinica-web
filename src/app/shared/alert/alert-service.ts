import { Injectable, signal } from '@angular/core';

export interface AppAlert {
    mensagem: string;
    tipo: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary';
    id?: number;
}
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertsSignal = signal<AppAlert[]>([]);
    public alerts = this.alertsSignal.asReadonly();

    alertInfo(mensagem: string) {
        this.buildAlert(mensagem, 'info');
    }

    alertWarning(mensagem: string) {
        this.buildAlert(mensagem, 'warning');
    }

    alertDanger(mensagem: string) {
        this.buildAlert(mensagem, 'danger');
    }

    private buildAlert(mensagem: string, tipo: AppAlert['tipo'] = 'info', tempoAutofechamento = 3000) {
        const id = Date.now();
        const novoAlert: AppAlert = { id, mensagem, tipo };

        // Adiciona o alerta na lista
        this.alertsSignal.update(alerts => [...alerts, novoAlert]);

        // Configura o fechamento automático opcional
        if (tempoAutofechamento > 0) {
            setTimeout(() => this.remover(id), tempoAutofechamento);
        }
    }

    remover(id: number) {
        this.alertsSignal.update(alerts => alerts.filter(a => a.id !== id));
    }

    limparTudo() {
        this.alertsSignal.set([]);
    }
}
