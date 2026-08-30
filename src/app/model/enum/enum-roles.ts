export class EnumRoles {
    static values(): any[] {
        return [
            { sigla: "ADM", descricao: "Administrador" },
            { sigla: "ADM2", descricao: "Administrador 2" },
            { sigla: "GER", descricao: "Gerente" },
            { sigla: "GER2", descricao: "Gerente 2" },
            { sigla: "MED", descricao: "Médico" },
            { sigla: "MED2", descricao: "Médico 2" },
            { sigla: "PAC", descricao: "Paciente" },
            { sigla: "REC", descricao: "Recepcionista" },
            { sigla: "SUP", descricao: "Supervisor" },
        ]
    }

    static descricao(sigla: string) {
        for (let r of this.values()) {
            if (r.sigla === sigla)
                return r.descricao;
        }
        return "";
    }
}