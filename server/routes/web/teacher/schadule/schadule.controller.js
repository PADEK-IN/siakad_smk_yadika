import Guru from "../../../../models/guru.model.js";
import Kelas from "../../../../models/kelas.model.js";
import Jadwal from "../../../../models/jadwal_pelajaran.model.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import Jadwal_Absen from "../../../../models/jadwal_absen.model.js";
import Absen from "../../../../models/absen.model.js";
import Murid from "../../../../models/murid.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getSchadulePage = async(req, res) => {
    try {
        // const  email  = req.session.user.email;
        const  email  = "guru@gmail.com";
        const dataGuru = await Guru.findOne({
            where: { email },
            raw: true,
            include: [
                {
                    model: Mata_Pelajaran,
                    attributes: ["id", "nama"],
                },
            ],
        })

        const mataPelajaranNama = dataGuru['Mata_Pelajaran.nama'];

        const guru = {
            ...dataGuru,
            id: hashids.encode(dataGuru.id),
            Mata_Pelajaran: mataPelajaranNama || "Tidak ada mata pelajaran",
        }
        // console.log({ guru });
        // console.log( guru.id_mata_pelajaran );
        // console.log( guru.Mata_Pelajaran );
        const dataJadwal = await Jadwal.findAll({
            where: { id_mata_pelajaran: guru.id_mata_pelajaran },
            include: [
                { 
                    model: Kelas,
                    attributes: [ "tingkat", "kode", "id_wali_kelas" ],
                    include:  [
                        {   
                            model: Guru,
                            attributes: [ "nama" ] }
                    ]
                },
            ],
        })

        const jadwal = dataJadwal.map((jadwal) => {
            return {
                ...jadwal.dataValues,
                id: hashids.encode(jadwal.id),
                id_mata_pelajaran: hashids.encode(jadwal.id_mata_pelajaran),
                Kela: jadwal.Kela.tingkat + "--" +  jadwal.Kela.kode,
                Wali_Kelas: jadwal.Kela.Guru.nama,
            }
        })
        // console.log({ jadwal });
        
        res.render("pages/teacher/schadule/index.ejs", { guru, jadwal });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};

export const addSchadulePage = (req, res) => {
    res.render("pages/teacher/schadule/add.ejs");
};
export const detailSchadulePage = async(req, res) => {
    try {
        const parts = req.url.split('/');
        let schadulelId = parts[parts.length - 2];
        // console.log({schadulelId});
        const jadwal = hashids.decode(schadulelId);
        console.log({jadwal});

        const dataJadwal = await Jadwal.findOne({
            where: { id: jadwal },
            raw: true,
            include: [
                { 
                    model: Kelas,
                    attributes: [ "tingkat", "kode"],
                },
            ],
        })

        const kelas = dataJadwal['Kela.tingkat'] + "--" +  dataJadwal['Kela.kode'];

        const pelajaran = {
            ...dataJadwal,
            id: hashids.encode(dataJadwal.id),
            Kelas: kelas,
        }

        console.log({ pelajaran });

        const dataJadwalAbsen = await Jadwal_Absen.findAll({
            where: { id_jadwal_pelajaran: jadwal },
            include: [
                { 
                    model: Absen,
                    attributes: [ "id_murid", "id_jadwal_absen" ],
                    include:  [
                        {   
                            model: Murid
                        }
                    ]
                },
            ]
        })

        const jadwalAbsen = dataJadwalAbsen.map((jadwalAbsen) => {
            return {
                ...jadwalAbsen.dataValues,
                // id: hashids.encode(jadwalAbsen.id),
            }
        })
        console.log({jadwalAbsen});



        // const dataAbsen = await Absen.findAll({
        //     where: { id_jadwal_absen: jadwalAbsen.id }
        // })

        // const absen = dataAbsen.map((absen) => {
        //     return {
        //         ...absen.dataValues,
        //         id: hashids.encode(absen.id),
        //     }
        // })

        // console.log({absen});

        
        res.render("pages/teacher/schadule/detail.ejs", { pelajaran, jadwalAbsen });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500'); 
    }
};
