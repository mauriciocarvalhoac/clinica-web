export class EnumSituacao {

    static values(): any[] {
        return [
            { valor: "A", descricao: "Ativo" },
            { valor: "I", descricao: "Inativo" },]
    }

    static value(situacao: string): string | number | boolean {

        for (let v of this.values()) {
            if (v.valor === situacao)
                return v.valor;
        }
        return '';
    }
}