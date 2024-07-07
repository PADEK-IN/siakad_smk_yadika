import * as responses from "../../../../helpers/response.js";
import Murid from "../../../../models/murid.model.js";
import Users from "../../../../models/users.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const {id_kelas} = req.body;

        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID murid tidak valid", res);
        const idKelas = checkValidId(id_kelas);
        if(!idKelas) return responses.res400("ID kelas tidak valid", res);

        const respons = await Murid.update({
            id_kelas: idKelas
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, data murid tidak ditemukan", res);
        responses.res200("Data murid berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}