import * as responses from "../../../../helpers/response.js";
import Kelas from "../../../../models/kelas.model.js";
import Penilaian from "../../../../models/penilaian.model.js";

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

export const createNilai = async(req, res) => {
  try {
    const {id_murid, id_mata_pelajaran, tugas, uts, uas, semester} = req.body;
    const validIdMurid = checkValidId(id_murid);
    if(!validIdMurid) return responses.res400("ID murid tidak valid", res);
    
    const validIdMaPel = checkValidId(id_mata_pelajaran);
    if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

    await Penilaian.create({
      id_murid: validIdMurid,
      id_mata_pelajaran: validIdMaPel,
      tugas,
      uts,
      uas,
      semester
    })
    responses.res200("Data nilai berhasil dibuat", null, res);
  } catch (err) {
    console.log(err.message);
    responses.res500(res);
  }
}

export const updateNilai = async(req, res) => {
  try {
    const {id} = req.params;
    const {id_murid, id_mata_pelajaran, tugas, uts, uas, semester} = req.body;
    const validId = checkValidId(id);
    if(!validId) return responses.res400("ID nilai tidak valid", res);

    const validIdMurid = checkValidId(id_murid);
    if(!validIdMurid) return responses.res400("ID murid tidak valid", res);
    
    const validIdMaPel = checkValidId(id_mata_pelajaran);
    if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

    const respons = await Penilaian.update({
      id_murid: validIdMurid,
      id_mata_pelajaran: validIdMaPel,
      tugas,
      uts,
      uas,
      semester
    },{
      where: {
        id: validId
      }
    })

    if(!respons[0]) return responses.res400("Maaf, nilai tidak ditemukan", res);
    responses.res200("Data nilai berhasil diperbarui", null, res);
  } catch (err) {
    console.log(err.message);
    responses.res500(res);
  }
}

export const delNilai = async (req, res) => {
  try {
      const {id} = req.params;
      const validId = checkValidId(id);
      if(!validId) return responses.res400("ID nilai tidak valid", res);
      
      const respons = await Penilaian.destroy({
          where: {id: validId}
      });
      
      if(!respons) return responses.res400("Maaf, nilai tidak ditemukan", res);
      responses.res200("Data nilai berhasil hapus", null, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}