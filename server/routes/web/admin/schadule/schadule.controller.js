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
          attributes: [ "tingkat", "kode" ]
        },
        {
          model: Mata_Pelajaran,
          attributes: [ "nama" ]
        }
      ]
    });

    const jadwal = dataJadwal.map((jadwal) => {
      return {
        ...jadwal.dataValues,
        id: hashids.encode(jadwal.id),
        Kela: jadwal.Kela.tingkat + "--" +  jadwal.Kela.kode,
        Mata_Pelajaran: jadwal.Mata_Pelajaran.nama
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

export const addSchadulePage = async(req, res) => {
  try {
    const dataKelas = await Kelas.findAll();
    const dataMataPelajaran = await Mata_Pelajaran.findAll();

    const kelas = dataKelas.map((kelas) => {
      return { 
        ...kelas.dataValues,
        id: hashids.encode(kelas.id),
      };
    })
    const mataPelajaran = dataMataPelajaran.map((mataPelajaran) => {
      return { 
        ...mataPelajaran.dataValues,
        id: hashids.encode(mataPelajaran.id),
      };
    })
    res.render("pages/admin/schadule/add.ejs" , { kelas, mataPelajaran });
  } catch (error) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const editSchadulePage = (req, res) => {
    res.render("pages/admin/schadule/edit.ejs");
  };
  