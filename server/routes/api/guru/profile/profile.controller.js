import * as responses from "../../../../helpers/response.js";
import Guru from "../../../../models/guru.model.js";

export const create = async (req, res) => {
    try {

        responses.res201("Berhasil mendaftar", null, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

