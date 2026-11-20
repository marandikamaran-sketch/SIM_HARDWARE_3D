# -*- coding: utf-8 -*-
"""
Modul Katalog Perangkat Keras Komputer Realistis (SIM-HARDWARE 3D Pro)
Berisi spesifikasi teknis nyata, warna fisik, identitas slot, urutan perakitan,
serta penjelasan pedagogis dan analogi untuk siswa kelas VII SMP/MTs.
"""

MOTHERBOARD_INFO = {
    "id": "motherboard",
    "name": "Motherboard ATX Z790-PRO DDR4",
    "subtitle": "Papan Sirkuit Utama (Mainboard) • Socket LGA1700",
    "category": "Processing & Interconnect Hub",
    "physical_appearance": "Papan PCB fiberglass hijau-gelap/hitam berukuran persegi panjang dengan jalur sirkuit tembaga keemasan, kapasitor silinder perak, heatsink aluminium, soket CPU berpenutup logam, slot RAM memanjang, slot M.2, dan slot VGA bertulang baja.",
    "description": "Motherboard adalah papan sirkuit utama tempat seluruh komponen komputer (Processor, RAM, SSD M.2, VGA, dan kabel daya PSU) terhubung dan saling berkomunikasi.",
    "analogy": "Seperti jalan raya dan tata kota yang menghubungkan pusat pemerintahan (CPU), meja kerja (RAM), gudang arsip (SSD), dan pembangkit listrik (PSU).",
    "specs": "Form Factor ATX • Socket LGA1700 • 4x Slot DDR4 DIMM • Slot M.2 NVMe • PCIe 4.0 x16 • ATX 24-Pin"
}

HARDWARE_CATALOG = {
    "cpu": {
        "id": "cpu",
        "name": "Processor (CPU)",
        "short_name": "Intel Core i9-14900K",
        "subtitle": "Intel Core i9-14900K • Socket LGA1700",
        "category": "Processing Device (Perangkat Pemroses)",
        "target_slot": "slot_cpu",
        "slot_label": "Soket Processor (LGA1700) di Tengah Motherboard",
        "order_hint": 1,
        "requires": [],
        "physical_appearance": "Keping persegi berukuran ±4,5 cm dengan papan sirkuit hijau di tepi, pelat logam nikel perak mengilap (IHS) bertuliskan seri prosesor, bagian bawah dipenuhi titik kontak emas, serta tanda segitiga emas di salah satu sudut.",
        "description": "Central Processing Unit (CPU) adalah otak utama komputer yang mengeksekusi instruksi program dan melakukan perhitungan aritmetika serta logika. Dipasang tepat pada soket prosesor di tengah motherboard.",
        "analogy": "Seperti otak manusia atau koki utama di dapur yang mengolah semua perintah dari pengguna.",
        "specs": "24 Core (8P+16E) • 32 Thread • Boost 6.00 GHz • Cache 36 MB • Socket LGA1700"
    },
    "ram": {
        "id": "ram",
        "name": "Memory RAM DDR4 16GB Kit",
        "short_name": "RAM DDR4 16GB Kit (2x8GB)",
        "subtitle": "DDR4 3200MHz Green PCB Asli (2x8GB)",
        "category": "Processing / Volatile Memory",
        "target_slot": "slot_ram",
        "slot_label": "Slot RAM (DIMM DDR4) di Samping Soket CPU",
        "order_hint": 2,
        "requires": [],
        "physical_appearance": "Keping papan sirkuit (PCB) berwarna hijau asli standar industri dengan deretan chip memori IC hitam berjejer, stiker spesifikasi putih, serta deretan pin konektor emas di bagian bawah yang memiliki takik (celah kunci) tidak simetris.",
        "description": "Random Access Memory (RAM) berfungsi menyimpan data dan program yang sedang aktif dijalankan secara sementara. Data pada RAM akan hilang saat listrik padam (bersifat volatile).",
        "analogy": "Seperti meja kerja tempat menaruh buku dan alat tulis yang sedang dipakai belajar; semakin luas mejanya, semakin banyak aplikasi bisa dibuka bersamaan.",
        "specs": "16 GB (2x8 GB) DDR4 • Kecepatan 3200 MT/s • 288-Pin Gold Finger"
    },
    "ssd": {
        "id": "ssd",
        "name": "SSD NVMe M.2 1TB",
        "short_name": "SSD NVMe M.2",
        "subtitle": "PCIe Gen4 x4 • Ukuran 2280 (22x80 mm)",
        "category": "Storage Device (Perangkat Penyimpanan)",
        "target_slot": "slot_ssd",
        "slot_label": "Slot M.2 NVMe di Permukaan Motherboard",
        "order_hint": 3,
        "requires": [],
        "physical_appearance": "Modul M.2 2280 sepanjang 80 mm dengan PCB hijau gelap, chip controller NVMe, beberapa paket NAND Flash hitam, komponen SMD, kontak emas M-Key, serta lubang baut pengunci di ujungnya.",
        "description": "Solid State Drive (SSD) NVMe M.2 adalah media penyimpanan data berkecepatan tinggi berbasis chip semikonduktor (tanpa piringan berputar) untuk menyimpan Sistem Operasi Windows, aplikasi, dan dokumen secara permanen.",
        "analogy": "Seperti lemari arsip permanen modern yang menyimpan seluruh buku dan catatan dengan aman meskipun aliran listrik dimatikan.",
        "specs": "Kapasitas 1 TB • NVMe PCIe 4.0 x4 • Kecepatan Baca hingga 7.400 MB/s"
    },
    "vga": {
        "id": "vga",
        "name": "VGA / GPU Card",
        "short_name": "VGA RTX 4080 SUPER",
        "subtitle": "NVIDIA GeForce RTX 4080 SUPER • 16GB GDDR6X",
        "category": "Processing / Graphics Output",
        "target_slot": "slot_vga",
        "slot_label": "Slot VGA (PCIe x16 Bertulang Baja) di Motherboard",
        "order_hint": 4,
        "requires": [],
        "physical_appearance": "Kartu grafis kelas tinggi dengan shroud logam gunmetal, tiga kipas pendingin aksial, heatsink aluminium bersirip rapat, heatpipe tembaga, pelat belakang, konektor PCIe x16 berlapis emas, dan soket daya tambahan 16-pin.",
        "description": "Video Graphics Array (VGA) atau Graphics Processing Unit (GPU) bertugas mengolah data grafis dan mengirimkan sinyal tampilan visual ke layar monitor.",
        "analogy": "Seperti pelukis dan desainer khusus yang menggambar seluruh tampilan layar, animasi, dan video agar tampil tajam di monitor.",
        "specs": "16 GB GDDR6X • Interface PCIe 4.0 x16 • Triple Axial Fan • HDMI 2.1 & DisplayPort"
    },
    "psu": {
        "id": "psu",
        "name": "Power Supply (PSU)",
        "short_name": "PSU 850W Gold",
        "subtitle": "850W 80+ Gold ATX 3.1 Power Unit",
        "category": "Power Supply Unit (Luar Motherboard)",
        "target_slot": "slot_psu",
        "slot_label": "Ruang Dudukan PSU di Luar Area Motherboard",
        "order_hint": 5,
        "requires": [],
        "physical_appearance": "Kotak baja ATX hitam dengan kisi kipas 120 mm di bagian atas, label tabel tegangan di sisi casing, panel konektor modular, soket AC IEC, dan sakelar rocker I/O pada panel belakang.",
        "description": "Power Supply Unit (PSU) dipasang di ruang khusus pada casing di luar area motherboard. PSU mengubah arus listrik bolak-balik (AC 220V) dari stopkontak menjadi arus searah (DC +12V, +5V, +3.3V) bagi komponen komputer.",
        "analogy": "Seperti jantung atau gardu induk listrik yang menyuplai energi stabil ke seluruh bagian rumah.",
        "specs": "Daya 850 Watt • Sertifikasi 80+ Gold • Kipas 120mm • Full Modular • Proteksi OVP/SCP"
    },
    "cable": {
        "id": "cable",
        "name": "Kabel Power ATX 24-Pin",
        "short_name": "Kabel Daya ATX",
        "subtitle": "Kabel Daya Utama PSU ke Motherboard & VGA",
        "category": "Power Distribution Cable",
        "target_slot": "slot_cable",
        "slot_label": "Port Power 24-Pin ATX di Tepi Kanan Motherboard",
        "order_hint": 6,
        "requires": ["psu"],
        "physical_appearance": "Berkas kabel listrik dengan warna standar ATX (kuning +12V, merah +5V, oranye +3.3V, hitam ground) yang keluar dari unit PSU dan berakhir pada kepala konektor plastik 24-pin serta 8-pin VGA.",
        "description": "Kabel daya utama 24-Pin ATX menghubungkan PSU di luar motherboard menuju soket power utama di sisi kanan motherboard serta menyalurkan daya tambahan 8-Pin ke kartu grafis VGA.",
        "analogy": "Seperti pembuluh darah atau kabel instalasi listrik rumah yang mengalirkan daya dari sumber listrik menuju setiap ruangan.",
        "specs": "24-Pin ATX Main Power + 8-Pin (6+2) PCIe VGA Power Connector"
    }
}

SLOT_ERROR_MESSAGES = {
    ("cpu", "slot_ram"): "SALAH SLOT! Processor berbentuk persegi (LGA1700) tidak bisa masuk ke slot RAM DIMM yang memanjang. Pasang Processor ke Soket CPU persegi di tengah motherboard!",
    ("cpu", "slot_ssd"): "SALAH SLOT! Slot M.2 berukuran kecil memanjang untuk SSD NVMe, bukan untuk Processor.",
    ("cpu", "slot_vga"): "SALAH SLOT! Slot PCIe x16 khusus untuk kartu grafis (VGA). Arahkan Processor ke Soket CPU di tengah motherboard.",
    ("cpu", "slot_psu"): "SALAH POSISI! Processor harus menempel pada soket di atas motherboard, bukan di ruang PSU.",
    ("cpu", "slot_cable"): "SALAH POSISI! Itu adalah soket kabel daya 24-Pin ATX. Pasang Processor ke Soket CPU.",

    ("ram", "slot_cpu"): "SALAH SLOT! Keping RAM memanjang tidak cocok dengan Soket Processor persegi. Arahkan RAM ke Slot DIMM di sebelah kanan soket CPU!",
    ("ram", "slot_ssd"): "SALAH SLOT! Slot M.2 terlalu pendek untuk keping RAM DDR4. Pasang RAM ke Slot DIMM vertikal!",
    ("ram", "slot_vga"): "SALAH SLOT! Takik kunci pin emas RAM DDR4 tidak sejajar dengan slot VGA PCIe x16. Jangan dipaksa karena dapat mematahkan pin!",
    ("ram", "slot_psu"): "SALAH POSISI! Keping RAM harus ditancapkan pada Slot DIMM di motherboard.",
    ("ram", "slot_cable"): "SALAH POSISI! Pasang RAM ke Slot DIMM vertikal yang memiliki klip pengunci di kedua ujungnya.",

    ("ssd", "slot_cpu"): "SALAH SLOT! SSD NVMe M.2 tidak dipasang pada soket prosesor. Cari slot M.2 horizontal di permukaan motherboard!",
    ("ssd", "slot_ram"): "SALAH SLOT! SSD M.2 dipasang mendatar pada slot M.2, bukan berdiri di slot RAM.",
    ("ssd", "slot_vga"): "SALAH SLOT! Slot panjang PCIe x16 digunakan untuk VGA Card, sedangkan SSD M.2 dipasang pada slot M.2.",
    ("ssd", "slot_psu"): "SALAH POSISI! SSD NVMe M.2 menempel langsung pada slot M.2 di motherboard.",

    ("vga", "slot_cpu"): "SALAH SLOT! Kartu grafis VGA tidak dipasang pada soket prosesor. Arahkan ke slot panjang PCIe x16 bertulang baja!",
    ("vga", "slot_ram"): "SALAH SLOT! Slot RAM terlalu sempit untuk konektor PCIe x16 milik VGA Card.",
    ("vga", "slot_ssd"): "SALAH SLOT! Slot M.2 hanya untuk SSD kecil, bukan untuk VGA Card.",
    ("vga", "slot_psu"): "SALAH POSISI! VGA Card harus ditancapkan ke slot PCIe x16 di motherboard agar terhubung ke monitor.",

    ("psu", "slot_cpu"): "SALAH POSISI! PSU (Power Supply) berbentuk kotak besar dan ditempatkan di luar area motherboard (ruang dudukan PSU), bukan di atas motherboard!",
    ("psu", "slot_ram"): "SALAH POSISI! PSU tidak dipasang di motherboard. Seret PSU ke ruang khusus PSU di bagian kiri bawah casing (di luar motherboard)!",
    ("psu", "slot_ssd"): "SALAH POSISI! PSU diletakkan di luar papan motherboard, lalu dihubungkan memakai kabel power.",
    ("psu", "slot_vga"): "SALAH POSISI! Letakkan PSU di ruang khusus casing di luar motherboard.",
    ("psu", "slot_cable"): "SALAH POSISI! Pasang kotak unit PSU terlebih dahulu di ruang dudukan PSU di luar motherboard.",

    ("cable", "slot_cpu"): "SALAH COLOKAN! Konektor kabel power 24-Pin ATX dicolokkan ke soket daya di tepi kanan motherboard, bukan ke soket CPU!",
    ("cable", "slot_ram"): "SALAH COLOKAN! Jangan colokkan kabel power ke slot RAM! Arahkan ujung kabel 24-Pin ke port daya di tepi kanan motherboard.",
    ("cable", "slot_ssd"): "SALAH COLOKAN! SSD M.2 sudah mendapat daya langsung dari slot motherboard tanpa kabel tambahan.",
    ("cable", "slot_vga"): "SALAH COLOKAN! Arahkan kabel daya utama ke port 24-Pin ATX di tepi kanan motherboard (cabang kabel 8-Pin VGA akan otomatis terhubung).",
    ("cable", "slot_psu"): "SALAH COLOKAN! Ujung kabel harus dicolokkan ke soket power pada motherboard."
}

