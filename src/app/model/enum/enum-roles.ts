export class EnumRoles {
    static values(): any[] {
        return [
            { sigla: "ADM", descricao: "Administrador" },
            { sigla: "GER", descricao: "Gerente" },
            { sigla: "MED", descricao: "Médico" },
            { sigla: "PAC", descricao: "Paciente" },
            { sigla: "REC", descricao: "Recepcionista" },
            { sigla: "SUP", descricao: "Supervisor" },
        ]
    }
}