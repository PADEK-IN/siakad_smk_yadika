export function periodeFormat(bulan, tahun){
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const periode = `${month[bulan-1]} ${tahun}`;
    return periode;
}