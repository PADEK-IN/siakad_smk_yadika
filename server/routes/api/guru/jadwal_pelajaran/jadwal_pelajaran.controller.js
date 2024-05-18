import * as responses from "../../../../helpers/response.js";
import Guru from "../../../../models/guru.model.js";

export const getAll = async (req, res) => {
    try {
        const dataGuru = await Guru.findAll();

        const data = dataGuru.map((guru) => {
            return {
              ...guru.dataValues,
              id: hashids.encode(guru.id)
            };
          });

        responses.res200("Berhasil mengambil data guru", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}
