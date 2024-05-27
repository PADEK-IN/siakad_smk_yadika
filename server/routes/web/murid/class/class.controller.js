import Murid from "../../../../models/murid.model.js";
import Kelas from "../../../../models/kelas.model.js";
import Jadwal from "../../../../models/jadwal_pelajaran.model.js";
import Jadwal_Pelajaran from "../../../../models/jadwal_pelajaran.model.js";
import Jadwal_Absen from "../../../../models/jadwal_absen.model.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getClassPage = async(req, res) => {
    try {
        // const  email  = req.session.user.email;
        const  email  = "user@gmail.com";
        const dataMurid = await Murid.findOne({
            where: { email },
            raw: true,
            include: [{
                model: Kelas,
                attributes: [ "tingkat", "kode","id"],
            }]
        })  

        if (!dataMurid) {
            throw new Error('Murid tidak ditemukan');
        }
        // console.log({dataMurid});
        const kelas = dataMurid['Kela.tingkat'] + "--" +  dataMurid['Kela.kode'];
        const kelas_id = dataMurid['Kela.id'];

        const murid = {
            ...dataMurid,
            id: hashids.encode(dataMurid.id),
            kelas,
            kelas_id
        }
        // console.log({ murid });
        
        const dataJadwals = await Jadwal_Pelajaran.findAll({
            where: { id_kelas: murid.id_kelas },
            raw: true,
            include: [{
                model: Mata_Pelajaran,
                attributes: [ "nama"],
            }],
            order:[["waktu_mulai", "ASC"]]
        })
        
        const dataJadwal = dataJadwals.map(jadwal => ({
            ...jadwal,
            id: hashids.encode(jadwal.id),
            pelajaran: jadwal['Mata_Pelajaran.nama'],
        }));
        // console.log({dataJadwal});

        const groupByDay = (jadwals) => {
            return jadwals.reduce((acc, jadwal) => {
                const day = jadwal.hari.toLowerCase();
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(jadwal);
                return acc;
            }, {});
        };

        let jadwalPerHari = groupByDay(dataJadwal);

        const hariList = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

        hariList.forEach(day => {
            if (!jadwalPerHari[day]) {
                jadwalPerHari[day] = "Tidak ada jadwal";
            }
        });

        jadwalPerHari = hariList.reduce((acc, day) => {
            acc[day] = jadwalPerHari[day];
            return acc;
        }, {});
        
        // console.log(jadwalPerHari);
        
        res.render("pages/murid/class/index", { murid, jadwalPerHari });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};

export const getAbsensiPage = async(req, res) => {
    try {
        // const  email  = req.session.user.email;
        const  email  = "user@gmail.com";
        const dataMurid = await Murid.findOne({
            where: { email },
            raw: true,
            include: [{
                model: Kelas,
                attributes: [ "tingkat", "kode","id"],
            }]
        })  

        if (!dataMurid) {
            throw new Error('Murid tidak ditemukan');
        }
        const kelas = dataMurid['Kela.tingkat'] + "--" +  dataMurid['Kela.kode'];
        const kelas_id = dataMurid['Kela.id'];

        const murid = {
            ...dataMurid,
            id: hashids.encode(dataMurid.id),
            kelas,
            kelas_id
        }
        console.log({ murid });

        const parts = req.url.split('/');
        let schadulelId = parts[parts.length - 2];
        // console.log({schadulelId});
        const jadwalId = hashids.decode(schadulelId);
        // console.log({jadwalId});

        const dataJadwal = await Jadwal.findOne({
            where: { id: jadwalId },
            raw: true,
            include: [
                { 
                    model: Mata_Pelajaran,
                    attributes: [ "id", "nama" ],
                },
            ],
        })

        if (!dataJadwal) {
            throw new Error('Jadwal tidak ditemukan');
        }

        const pelajaran = dataJadwal['Mata_Pelajaran.nama'];

        const jadwalPelajaran = {
            ...dataJadwal,
            id: hashids.encode(dataJadwal.id),
            pelajaran

        }
        console.log({ jadwalPelajaran });

        const dataJadwalAbsen = await Jadwal_Absen.findAll({
            where: { id_jadwal_pelajaran: jadwalId },
        })

        const jadwalAbsen = dataJadwalAbsen.map((jadwalAbsen) => {
            return {
                ...jadwalAbsen.dataValues,
                id: hashids.encode(jadwalAbsen.id),
            }
        })
        console.log({jadwalAbsen});

        res.render("pages/murid/class/absensi", { murid, jadwalPelajaran, jadwalAbsen });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};