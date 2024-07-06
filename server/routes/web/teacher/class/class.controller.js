import Guru from '../../../../models/guru.model.js';
import Murid from '../../../../models/murid.model.js';
import Kelas from '../../../../models/kelas.model.js';
import Penilaian from '../../../../models/penilaian.model.js';
import Jadwal from '../../../../models/jadwal_pelajaran.model.js';
import Mata_Pelajaran from '../../../../models/mata_pelajaran.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async (req, res) => {
  try {
    const  email  = req.session.user.email;
    const dataGuru = await Guru.findOne({
      where: { email },
      raw: true,
      include: [
        {
          model: Mata_Pelajaran,
          attributes: ['id', 'nama'],
        },
      ],
    });

    const mataPelajaranNama = dataGuru['Mata_Pelajaran.nama'];

    const guru = {
      ...dataGuru,
      id: hashids.encode(dataGuru.id),
      Mata_Pelajaran: mataPelajaranNama || 'Tidak ada mata pelajaran',
      // id_mata_pelajaran: hashids.encode(dataGuru.id_mata_pelajaran),
    };

    const dataJadwal = await Jadwal.findAll({
      where: { id_mata_pelajaran: guru.id_mata_pelajaran },
      include: [
        {
          model: Kelas,
          attributes: ['id', 'tingkat', 'kode', 'id_wali_kelas', 'isActive'],
          include: [
            {
              model: Guru,
              attributes: ['nama'],
            },
          ],
        },
        {
          model: Mata_Pelajaran,
          attributes: ['nama'],
        },
      ],
      raw: true,
      nest: true,
    });
    const seenClasses = new Set();
    const kelas = dataJadwal.reduce((acc, jadwal) => {
      const k = jadwal.Kela; // Assuming `Kela` is the alias for `Kelas` in your join
      if (!seenClasses.has(k.id)) {
        seenClasses.add(k.id);
        acc.push({
          ...k,
          id: hashids.encode(k.id),
          Wali_Kelas: k.Guru.nama,
          kelas: jadwal.Kela.tingkat + '--' + jadwal.Kela.kode,
        });
      }
      return acc;
    }, []);

    res.render('pages/teacher/class/index.ejs', { guru, kelas });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};

export const detailClassPage = async (req, res) => {
  try {
    const  email  = req.session.user.email;
    const dataGuru = await Guru.findOne({
      where: { email },
      raw: true,
      include: [
        {
          model: Mata_Pelajaran,
          attributes: ['id', 'nama'],
        },
      ],
    });

    const mataPelajaranId = dataGuru['Mata_Pelajaran.id'];
    const mataPelajaranNama = dataGuru['Mata_Pelajaran.nama'];

    const guru = {
      ...dataGuru,
      id: hashids.encode(dataGuru.id),
      id_mata_pelajaran: hashids.encode(mataPelajaranId),
      Mata_Pelajaran: mataPelajaranNama || 'Tidak ada mata pelajaran',
    };
    // console.log({ guru });

    const parts = req.url.split('/');
    let kelasId = parts[parts.length - 2];
    // console.log({kelasId});

    // Dekode kelasId menggunakan hashids
    const decodedKelas = hashids.decode(kelasId);
    if (decodedKelas.length === 0) {
      console.error('Invalid kelas ID');
      return res.render('pages/errors/404');
    }
    const kelas = decodedKelas[0];

    // Fetch Kelas data including Guru
    const dataKelas = await Kelas.findOne({
      where: { id: kelas },
      include: [
        {
          model: Guru,
          attributes: ['nama'],
        },
      ],
      raw: true,
    });
    // console.log({dataKelas});

    const kelass = {
      ...dataKelas,
      id: hashids.encode(dataKelas.id),
      Wali_Kelas: dataKelas['Guru.nama'],
      kelas: dataKelas.tingkat + '--' + dataKelas.kode,
      id_wali_kelas: hashids.encode(dataKelas.id_wali_kelas),
    };
    // console.log({ kelass });

    // Mengambil data murid berdasarkan id_kelas
    const dataMurid = await Murid.findAll({
      where: { id_kelas: kelas },
      raw: true,
    });

    // Menambahkan encoding id untuk setiap murid
    const murid = dataMurid.map((murid) => {
      return {
        ...murid,
        id: hashids.encode(murid.id),
      };
    });
    // console.log({ murid });

    // Mengumpulkan semua id murid
    const muridIds = murid.map((m) => hashids.decode(m.id)[0]);

    const dataNilai = await Penilaian.findAll({
      where: {
        id_murid: muridIds,
        id_mata_pelajaran: mataPelajaranId,
      },
      raw: true,
    });

    const nilai = dataNilai.map((nilai) => {
      return {
        ...nilai,
        id: hashids.encode(nilai.id),
        id_murid: hashids.encode(nilai.id_murid),
        id_mata_pelajaran: hashids.encode(nilai.id_mata_pelajaran),
      };
    });
    // console.log({ nilai });

    // Menggabungkan nilai dengan murid
    const muridDenganNilai = murid.map((m) => {
      const decodedMuridId = hashids.decode(m.id)[0];
      const nilaiMurid = dataNilai
        .filter((n) => n.id_murid === decodedMuridId)
        .map((n) => ({
          ...n,
          id: hashids.encode(n.id),
        }));

      return {
        ...m,
        nilai: nilaiMurid,
      };
    });

    // console.log({ muridDenganNilai });

    res.render('pages/teacher/class/detail.ejs', {
      guru,
      kelass,
      muridDenganNilai,
    });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};

export const classOwnPage = async(req, res) => {
  try {
    // const  email  = req.session.user.email;
    const  email  = 'guru@gmail.com';
    res.render('pages/teacher/class/own.ejs');
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
}