import Guru from "../../../../models/guru.model.js";
import Kelas from "../../../../models/kelas.model.js";
import Jadwal from "../../../../models/jadwal_pelajaran.model.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async(req, res) => {
    try {
         // const  email  = req.session.user.email;
        const  email  = "guru@gmail.com";
        const dataGuru = await Guru.findOne({
            where: { email },
            raw: true,
            include: [
                {
                    model: Mata_Pelajaran,
                    attributes: [ "id", "nama" ],
                },
            ],
        })

        const mataPelajaranNama = dataGuru['Mata_Pelajaran.nama'];

        const guru = {
            ...dataGuru,
            id: hashids.encode(dataGuru.id),
            Mata_Pelajaran: mataPelajaranNama || "Tidak ada mata pelajaran",
            // id_mata_pelajaran: hashids.encode(dataGuru.id_mata_pelajaran),
        }
        console.log({ guru });
        console.log(guru.id_mata_pelajaran );
        
        const dataJadwal = await Jadwal.findAll({
            where: { id_mata_pelajaran: guru.id_mata_pelajaran },
            include: [
                { 
                    model: Kelas,
                    attributes: [ "id", "tingkat", "kode", "id_wali_kelas", "isActive" ],
                    include:  [
                        {   
                            model: Guru,
                            attributes: [ "nama" ] }
                    ]
                },
                {
                    model: Mata_Pelajaran,
                    attributes: [ "nama" ]
                }
            ],
            raw: true,
            nest: true
        })
        const seenClasses = new Set();
        const kelas = dataJadwal.reduce((acc, jadwal) => {
            const k = jadwal.Kela;  // Assuming `Kela` is the alias for `Kelas` in your join
            if (!seenClasses.has(k.id)) {
                seenClasses.add(k.id);
                acc.push({
                    ...k,
                    id: hashids.encode(k.id),
                    Wali_Kelas: k.Guru.nama,
                    kelas: jadwal.Kela.tingkat + "--" +  jadwal.Kela.kode,
                });
            }
            return acc;
        }, []);
        
        console.log({ kelas });

        // const jadwal = dataJadwal.map((jadwal) => {
        //     return {
        //         ...jadwal.dataValues,
        //         id: hashids.encode(jadwal.id),
        //         id_mata_pelajaran: hashids.encode(jadwal.id_mata_pelajaran),
        //         Kela: jadwal.Kela.tingkat + "--" +  jadwal.Kela.kode,
        //         Mata_Pelajaran: jadwal.Mata_Pelajaran.nama,
        //         Wali_Kelas: jadwal.Kela.Guru.nama,
        //     }
        // })
        // console.log({ jadwal });
        
        res.render("pages/teacher/class/index.ejs", { guru, kelas });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};

export const detailClassPage = (req, res) => {
    res.render("pages/teacher/class/detail.ejs");
};
