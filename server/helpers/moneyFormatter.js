export default function moneyFormat(kode, number) {

    let parts = number.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1];
    
    // Menambahkan titik setiap tiga digit dari kanan
    let rupiahString = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${kode}. ${rupiahString},${decimalPart}`;
}