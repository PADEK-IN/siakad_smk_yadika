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
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const editSchadulePage = async(req, res) => {
  try {
    const parts = req.url.split('/');
    let schaduleId = parts[parts.length - 2];
    // console.log({schaduleId});
    const decodedJadwalId = hashids.decode(schaduleId);
    const dataJadwal = await Jadwal.findOne({
      where: { id: decodedJadwalId },
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

    const jadwal = {
      ...dataJadwal.dataValues,
      id: hashids.encode(dataJadwal.id),
      idKelas: hashids.encode(dataJadwal.id_kelas),
      idPelajaran: hashids.encode(dataJadwal.id_mata_pelajaran),
      Kela: dataJadwal.Kela.tingkat + "--" +  dataJadwal.Kela.kode,
      Mata_Pelajaran: dataJadwal.Mata_Pelajaran.nama
    };

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

    console.log({jadwal, kelas, mataPelajaran});

    res.render("pages/admin/schadule/edit.ejs", { jadwal, kelas, mataPelajaran })
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }  
  };
  