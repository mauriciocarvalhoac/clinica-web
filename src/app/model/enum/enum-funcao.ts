export class EnumFuncao {
    static values(): any[] {
        return [
            { sigla: "MED", descricao: "Médico" },
            { sigla: "REC", descricao: "Recepcionista" },
            { sigla: "SU1", descricao: "Supervisão 1" },
            { sigla: "SU2", descricao: "Supervisão 2" },
            { sigla: "GER", descricao: "Gerente" },
            { sigla: "ADM", descricao: "Administrador Geral" },
        ]
    }

    static descricao(funcao: string) {
        for (let f of this.values()) {
            if (funcao === f.sigla)
                return f.descricao;
        }
        return funcao;
    }
}