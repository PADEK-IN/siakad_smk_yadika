import Jadwal from "../../../../models/jadwal_pelajaran.model.js";
import Kelas from '../../../../models/kelas.model.js';
import Mata_Pelajaran from '../../../../models/mata_pelajaran.model.js';
import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getSchadulePage = async(req, res) => {
  try {
    const dataJadwal = await Jadwal.findAll({
      include: [
        {
          model: Kelas,
          // attributes: [ "kode" ],
          // as: 'Kelas'
        },
        // {
        //   model: Mata_Pelajaran,
        //   attributes: [ "nama" ],
        //   // as: 'Mata_Pelajaran'
        // }
      ]
    });
    // console.log(dataJadwal[0].Kelas.kode); // Output: Nama Kelas
    // console.log(dataJadwal[0].Mata_Pelajaran.nama); // Output: Nama Mata Pelajaran

    const jadwal = dataJadwal.map((jadwal) => {
      return {
        ...jadwal.dataValues,
        id: hashids.encode(jadwal.id),
        // Kelas:  jadwal.Kelas.kode,
        // Mata_Pelajaran: jadwal.Mata_Pelajaran.nama
      };
    });
    for (const data of jadwal){
        console.log({data});
    }
    console.log({ jadwal });
    res.render("pages/admin/schadule/index.ejs", {jadwal});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const addSchadulePage = (req, res) => {
    res.render("pages/admin/schadule/add.ejs");
  };

export const editSchadulePage = (req, res) => {
    res.render("pages/admin/schadule/edit.ejs");
  };
  