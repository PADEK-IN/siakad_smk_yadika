import * as responses from "../../../../helpers/response.js";
import Kelas from "../../../../models/kelas.model.js";

export const getAll = async (req, res) => {
  try {
      const dataKelas = await Kelas.findAll();

      const data = dataKelas.map((Kelas) => {
          return {
            ...Kelas.dataValues,
            id: hashids.encode(Kelas.id),
            id_wali_kelas: hashids.encode(Kelas.id_wali_kelas),
          };
        });

      responses.res200("Berhasil mengambil data kelas", data, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}

export const getOneById = async (req, res) => {
  try {
      const {id} = req.params;
      const validId = checkValidId(id);
      if(!validId) return responses.res400("ID kelas tidak valid", res);
      const dataKelas = await Kelas.findOne({
          where: { id: validId },
      });

      const data = {
          ...dataKelas.dataValues,
          id: hashids.encode(dataKelas.id),
          id_wali_kelas: hashids.encode(dataKelas.id_wali_kelas),
      };
      
      responses.res200("Berhasil mengambil data Kelas", data, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}