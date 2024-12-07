import { StatusEnum } from "../config/status";
export class MaintenceRequest {
    descricaoEquipamento: string;
    descricaoDefeito: string;
    nomeCategoria: string;
    status: StatusEnum;

    constructor(descricaoEquipamento : string, descricaoDefeito : string, nomeCategoria : string , status : StatusEnum){
        this.descricaoEquipamento = descricaoEquipamento;
        this.descricaoDefeito = descricaoDefeito;
        this.nomeCategoria = nomeCategoria;
        this.status = status;
    }
}
