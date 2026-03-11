document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-buku');
    const categorySelect = document.getElementById('jenis-buku');
    const bookItems = document.querySelectorAll('.book-item');
    
    const checkboxes = document.querySelectorAll('.pilih-buku');
    const inputPilihan = document.getElementById('pilihan-buku');
    const inputTotal = document.getElementById('total');

    function filterBooks() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categorySelect.value;

        bookItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            const category = item.getAttribute('data-category');
            const matchesSearch = title.includes(searchText);
            const matchesCategory = (selectedCategory === 'semua' || category === selectedCategory);

            item.style.display = (matchesSearch && matchesCategory) ? 'flex' : 'none';
        });
    }

    function updateKeranjang() {
        let subtotal = 0;
        let rincianBuku = []; 
        let jumlahBuku = 0;

        checkboxes.forEach(cb => {
            if (cb.checked) {
                const harga = parseInt(cb.getAttribute('data-harga'));
                const judul = cb.getAttribute('data-judul');
                
                subtotal += harga;
                rincianBuku.push(`${judul} (Rp ${harga.toLocaleString('id-ID')})`);
                jumlahBuku++;
            }
        });

        inputPilihan.value = rincianBuku.join(", ");

        let hargaAkhir = subtotal;
        let infoDiskon = "";

        if (jumlahBuku >= 5) {
            let diskon = subtotal * 0.1;
            hargaAkhir = subtotal - diskon;
            infoDiskon = " (Diskon 10% Aktif!)";
        }

        if (hargaAkhir > 0) {
            inputTotal.value = "Rp " + hargaAkhir.toLocaleString('id-ID') + infoDiskon;
        } else {
            inputTotal.value = "";
        }
    }

    searchInput.addEventListener('input', filterBooks);
    categorySelect.addEventListener('change', filterBooks);
    checkboxes.forEach(cb => cb.addEventListener('change', updateKeranjang));
});

function proses() {
    const nama = document.getElementById('nama').value;
    const buku = document.getElementById('pilihan-buku').value;
    const total = document.getElementById('total').value;
    
    const riwayatSeksi = document.getElementById('riwayat-section');
    const daftarRiwayat = document.getElementById('daftar-riwayat');

    if (nama.trim() === "" || buku === "") {
        alert("Peringatan: Mohon isi Nama dan pilih minimal satu buku!");
    } else {
        riwayatSeksi.style.display = "block";

        const nota = document.createElement('div');
        nota.className = 'nota-pembelian';
        nota.innerHTML = `
            <p><strong>Nama Pembeli:</strong> ${nama}</p>
            <p><strong>Buku & Harga Satuan:</strong> ${buku}</p>
            <p><strong>Total Pembayaran:</strong> <span style="color: #1A374D; font-weight: bold;">${total}</span></p>
            <hr>
        `;

        daftarRiwayat.prepend(nota);

        alert("Pembelian Berhasil! Rincian telah ditambahkan ke Riwayat.");
        
        document.getElementById('pembelian').reset();
        document.querySelectorAll('.pilih-buku').forEach(cb => cb.checked = false);
    }
}