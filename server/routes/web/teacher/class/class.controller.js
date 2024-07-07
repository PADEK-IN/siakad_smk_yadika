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

export const classOwnPage = async (req, res) => {
  try {
    const email = req.session.user.email; // Ganti dengan req.session.user.email jika menggunakan session

    const dataGuru = await Guru.findOne({
      where: { email },
      raw: true
    });

    const kelas = await Kelas.findOne({
      where: { id_wali_kelas: dataGuru.id },
      raw: true
    });

    const dataMurid = await Murid.findAll({
      where: { id_kelas: kelas.id },
      include: [
        {
          model: Kelas,
          attributes: ['tingkat', 'kode'],
        }
      ],
      raw: true
    });

    const dataJadwal = await Jadwal.findAll({
      where: { id_kelas: kelas.id },
      include: [
        {
          model: Mata_Pelajaran,
          attributes: ['id', 'nama'],
        }
      ],
      raw: true
    });

    const mataPelajaranMap = new Map();
    dataJadwal.forEach(jadwal => {
      const key = jadwal['Mata_Pelajaran.id'];
      if (!mataPelajaranMap.has(key)) {
        mataPelajaranMap.set(key, {
          id_pelajaran: jadwal['Mata_Pelajaran.id'],
          pelajaran: jadwal['Mata_Pelajaran.nama']
        });
      }
    });
    const jadwal = Array.from(mataPelajaranMap.values());

    const muridIds = dataMurid.map(murid => murid.id);

    const dataNilai = await Penilaian.findAll({
      where: {
        id_murid: muridIds,
      },
      raw: true,
    });

    const muridWithNilai = dataMurid.map((m) => {
      const nilaiMurid = dataNilai.filter(n => n.id_murid === m.id);
      let totalNilai = 0;
      let countPelajaran = 0;
      const pelajaranNilai = {};
      let incompleteData = false;

      jadwal.forEach(j => {
        const nilai = nilaiMurid.filter(n => n.id_mata_pelajaran === j.id_pelajaran);
        if (nilai.length > 0) {
          let totalScores = 0;
          let count = 0;
          nilai.forEach(n => {
            if (n.tugas !== null) {
              totalScores += parseFloat(n.tugas) || 0;
              count++;
            }
            if (n.uts !== null) {
              totalScores += parseFloat(n.uts) || 0;
              count++;
            }
            if (n.uas !== null) {
              totalScores += parseFloat(n.uas) || 0;
              count++;
            }
          });
          const average = count > 0 ? totalScores / count : 0;
          pelajaranNilai[j.pelajaran] = average.toFixed(2);
          totalNilai += parseFloat(average);
          countPelajaran++;
        } else {
          pelajaranNilai[j.pelajaran] = '-';
          incompleteData = true;
        }
      });

      const rataNilai = countPelajaran > 0 ? totalNilai / countPelajaran : 0;

      let status;
      if (incompleteData) {
        status = 'Nilai Belum Lengkap';
      } else if (rataNilai >= 60) {
        status = 'Lulus';
      } else {
        status = 'Belum Lulus';
      }

      return {
        ...m,
        pelajaranNilai,
        totalNilai: rataNilai.toFixed(2),
        status,
        currentTingkat: kelas.tingkat,
        kelas: {
          id: hashids.encode(kelas.id),
          kode: kelas.kode,
          tingkat: kelas.tingkat
        },
        id_murid: hashids.encode(m.id),
        id_kelas: hashids.encode(kelas.id)
      };
    });
    // console.log({muridWithNilai});

    const daftarKelas = await Kelas.findAll();
    const listKelas = daftarKelas.map((daftarKelas) => {
      return {
        id: hashids.encode(daftarKelas.id),
        kode: daftarKelas.kode,
        tingkat: daftarKelas.tingkat
      };
    });

    res.render('pages/teacher/class/own.ejs', { kelas, listKelas, jadwal, murid: muridWithNilai });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
}
