import InstitutionModel from "../models/institution.model.js";

export default class InstitutionService {
    #institutionModel = InstitutionModel;

    async findFirst() {
        return await this.#institutionModel.find().limit(1);
    }
}