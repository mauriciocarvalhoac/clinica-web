export class EnumRoles {
    static values(): any[] {
        return [
            { sigla: "ADM", descricao: "Administrador" },
            { sigla: "GES", descricao: "Gestor" },
            { sigla: "MED", descricao: "Médico" },
            { sigla: "MAU", descricao: "Médico Auxiliar" },
            { sigla: "MAD", descricao: "Médico + Administrador" },
            { sigla: "REC", descricao: "Recepcionista" },
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