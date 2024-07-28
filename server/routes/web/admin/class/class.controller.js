import Kelas from '../../../../models/kelas.model.js';
import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async(req, res) => {
  try {
    const dataClass = await Kelas.findAll({
      include: [
        {
          model: Guru,
          attributes: [ "nama"],
        },
      ]
    });
    const kelas = dataClass.map((kelas) => {
      return {
        ...kelas.dataValues,
        id: hashids.encode(kelas.id),
        Guru: kelas.Guru.nama,
      };
    });
    res.render("pages/admin/class/index.ejs", {kelas});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};

export const addClassPage = async(req, res) => {
  try {
    const dataGuru = await Guru.findAll();
    const kelas = await Kelas.findAll();

    const guruIdsInKelas = kelas.map((kelas) => kelas.id_wali_kelas);

    const guru = dataGuru.reduce((result, guru) => {
      if (!guruIdsInKelas.includes(guru.id)) {
        result.push({
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        });
      }
      return result;
    }, []);
    res.render("pages/admin/class/add.ejs", {guru});
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

export const editClassPage = async(req, res) => {
  try {
    const parts = req.url.split('/');
    let classId = parts[parts.length - 2];

    const decodedClassId = hashids.decode(classId);
    const dataClass = await Kelas.findOne({
      where: { id: decodedClassId },
      include: [
        {
          model: Guru,
          attributes: [ "nama", "id" ],
        },
      ],
    });

    // Pastikan data kelas ditemukan
    if (!dataClass) {
      return res.render('pages/errors/404');
    }

    const kelas = {
      ...dataClass.dataValues,
      id: hashids.encode(dataClass.id),
      idWaliKelas: hashids.encode(dataClass.id_wali_kelas),
      GuruId: hashids.encode(dataClass.Guru.id),
      waliKelas: dataClass.Guru.nama,
    };
    // console.log(kelas);

    const dataGuru = await Guru.findAll();
    const kelases = await Kelas.findAll();

    const guruIdsInKelas = kelases.map((kelases) => kelases.id_wali_kelas);

    const guru = dataGuru.reduce((result, guru) => {
      if (!guruIdsInKelas.includes(guru.id)) {
        result.push({
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        });
      }
      return result;
    }, []);
    res.render("pages/admin/class/edit.ejs", { kelas, guru });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};
  