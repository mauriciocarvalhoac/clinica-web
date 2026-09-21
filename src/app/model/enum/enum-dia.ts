export class EnumDia {

    static values(): any[] {
        return [
            { sigla: "DOM", descricao: "Domingo" },
            { sigla: "SEG", descricao: "Segunda" },
            { sigla: "TER", descricao: "Terça" },
            { sigla: "QUA", descricao: "Quarta" },
            { sigla: "QUI", descricao: "Quinta" },
            { sigla: "SEX", descricao: "Sexta" },
            { sigla: "SAB", descricao: "Sábado" },
        ]
    }

    static descricao(dia: string) {
        for (let e of this.values()) {
            if (e.sigla === dia) {
                return e.descricao;
            }
        }
        return "";
    }
}