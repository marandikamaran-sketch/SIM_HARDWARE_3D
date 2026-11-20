/**
 * ============================================================================
 * MAIN APPLICATION CONTROLLER (static/js/main.js)
 * - Laboratorium Rakit PC 3D Realistis (Casing Tidur Armaggeddon + 8 Komponen)
 * - Soket Processor LGA1851 Terbuka + Kipas Processor Bertumpuk di Atas CPU
 * - Pemasangan RAM DDR5 Satu per Satu (Slot A1 & Slot B1)
 * - Komponen Hardware 360°, Kuis Evaluasi, & Rekap Nilai Guru
 * ============================================================================
 */

(function () {
    const T = window.HardwareTextures;
    const M = window.HardwareModels3D;
    const LOCAL_BACKUP_KEY = 'sim_hardware_3d_records_v4';
    const THEME_STORAGE_KEY = 'sim_hardware_3d_theme_v1';

    const DEFAULT_MOTHERBOARD_META = {
        id: "motherboard",
        name: "Motherboard ATX Z890-PRO",
        subtitle: "Papan Sirkuit Utama (Mainboard) • Socket LGA1851",
        category: "Processing & Interconnect Hub",
        physical_appearance: "Papan PCB fiberglass hijau-gelap teknis yang dipasang mendatar di dasar casing tidur Armaggeddon, dilengkapi jalur tembaga keemasan, heatsink VRM aluminium, kapasitor perak, soket CPU LGA1851 dengan pin emas, 2 slot RAM terpisah, slot M.2, dan slot VGA bertulang baja.",
        description: "Motherboard adalah papan sirkuit utama tempat seluruh komponen komputer (Processor, Kipas CPU, RAM 1 & RAM 2, SSD M.2, VGA, dan kabel daya PSU) terhubung dan saling berkomunikasi.",
        analogy: "Seperti jalan raya dan tata kota yang menghubungkan pusat pemerintahan (CPU), pendingin gedung (Kipas CPU), meja kerja (RAM), gudang arsip (SSD), dan gardu listrik (PSU).",
        specs: "Form Factor ATX • Socket LGA1851 • Dual DDR5 DIMM (A1/B1) • Slot M.2 NVMe • PCIe 5.0 x16 • ATX 24-Pin"
    };

    const DEFAULT_CATALOG = {
        cpu: {
            id: "cpu",
            name: "Processor (CPU)",
            short_name: "CPU Intel Ultra 9",
            subtitle: "Intel Core Ultra 9 285K • Socket LGA1851",
            category: "Processing Device (Perangkat Pemroses)",
            target_slot: "slot_cpu",
            slot_label: "Soket Processor (LGA1851) di Motherboard",
            order_hint: 1,
            requires: [],
            physical_appearance: "Keping persegi berukuran ±4,5 cm dengan papan sirkuit hijau di tepi, pelat logam nikel perak mengilap (IHS) bertuliskan seri prosesor, bagian bawah dipenuhi titik kontak emas, serta tanda segitiga emas di sudut.",
            description: "Central Processing Unit (CPU) adalah otak utama komputer yang mengeksekusi instruksi program dan melakukan perhitungan aritmetika serta logika.",
            analogy: "Seperti otak manusia atau koki utama di dapur yang mengolah semua perintah dari pengguna.",
            specs: "24 Core • Boost 5.70 GHz • Cache 36 MB • Socket LGA1851"
        },
        cooler: {
            id: "cooler",
            name: "Kipas Processor (CPU Cooler)",
            short_name: "Kipas Processor",
            subtitle: "Heatsink Aluminium + Inti Tembaga + Kipas 9 Bilah",
            category: "Thermal Cooling System",
            target_slot: "slot_cooler",
            slot_label: "Dudukan Kipas Tepat di Atas Processor (CPU)",
            order_hint: 2,
            requires: ["cpu"],
            physical_appearance: "Susunan sirip pendingin aluminium melingkar dengan inti tembaga di bagian bawah yang menempel langsung pada pelat CPU, dipadukan kipas hitam 9 bilah dan 4 kaki pengunci ke motherboard.",
            description: "Kipas Processor (CPU Cooler) dipasang tepat di atas Processor setelah CPU masuk ke soket, berfungsi menyerap dan membuang panas agar suhu prosesor tetap aman.",
            analogy: "Seperti kipas angin dan radiator pendingin mesin kendaraan yang mencegah mesin mengalami overheat.",
            specs: "PWM 4-Pin • 2800 RPM • Copper Core + Radial Aluminum Fins"
        },
        ram1: {
            id: "ram1",
            name: "Memory RAM 8GB (Keping 1)",
            short_name: "RAM DDR5 #1",
            subtitle: "DDR5 5600MHz Green PCB • Slot DIMM A1",
            category: "Processing / Volatile Memory",
            target_slot: "slot_ram1",
            slot_label: "Slot RAM 1 (DIMM A1) di Samping Soket CPU",
            order_hint: 3,
            requires: [],
            physical_appearance: "Keping papan sirkuit (PCB) hijau asli standar industri dengan deretan chip memori IC hitam berjejer, stiker spesifikasi putih, serta pin emas bertakik tidak simetris.",
            description: "Keping pertama Random Access Memory (RAM) yang dipasang pada Slot DIMM A1 untuk menyimpan data dan program yang sedang aktif dijalankan secara sementara (volatile).",
            analogy: "Seperti meja kerja utama tempat menaruh buku dan alat tulis yang sedang dipakai belajar.",
            specs: "8 GB DDR5 • Kecepatan 5600 MT/s • 288-Pin Gold Finger • Slot A1"
        },
        ram2: {
            id: "ram2",
            name: "Memory RAM 8GB (Keping 2)",
            short_name: "RAM DDR5 #2",
            subtitle: "DDR5 5600MHz Green PCB • Slot DIMM B1",
            category: "Processing / Volatile Memory",
            target_slot: "slot_ram2",
            slot_label: "Slot RAM 2 (DIMM B1) di Sebelah Slot RAM 1",
            order_hint: 4,
            requires: [],
            physical_appearance: "Keping kedua RAM DDR5 PCB hijau asli untuk mengaktifkan konfigurasi Dual-Channel bersama keping pertama.",
            description: "Keping kedua Random Access Memory (RAM) yang dipasang terpisah pada Slot DIMM B1 agar kapasitas memori menjadi 16 GB Dual-Channel.",
            analogy: "Seperti meja kerja tambahan yang memperluas ruang kerja sehingga lebih banyak aplikasi dapat dibuka bersamaan.",
            specs: "8 GB DDR5 • Kecepatan 5600 MT/s • Dual-Channel Mode • Slot B1"
        },
        ssd: {
            id: "ssd",
            name: "SSD NVMe M.2 1TB",
            short_name: "SSD NVMe M.2",
            subtitle: "PCIe Gen5 x4 • Ukuran 2280 (22x80 mm)",
            category: "Storage Device (Perangkat Penyimpanan)",
            target_slot: "slot_ssd",
            slot_label: "Slot M.2 NVMe di Permukaan Motherboard",
            order_hint: 5,
            requires: [],
            physical_appearance: "Papan sirkuit kecil ramping berukuran 2,2 x 8 cm dengan chip memori hitam (NAND Flash), stiker label biru-hitam, pin emas M-Key di ujung kiri, dan baut pengunci perak.",
            description: "Solid State Drive (SSD) NVMe M.2 adalah media penyimpanan data berkecepatan tinggi untuk menyimpan Sistem Operasi Windows, aplikasi, dan dokumen secara permanen.",
            analogy: "Seperti lemari arsip permanen modern yang menyimpan seluruh buku dan catatan dengan aman meskipun listrik dimatikan.",
            specs: "Kapasitas 1 TB • NVMe PCIe Gen5 x4 • Kecepatan Baca 12.000 MB/s"
        },
        vga: {
            id: "vga",
            name: "VGA / GPU Card",
            short_name: "VGA NVIDIA RTX 5090",
            subtitle: "NVIDIA GeForce RTX 5090 • 32GB GDDR7",
            category: "Processing / Graphics Output",
            target_slot: "slot_vga",
            slot_label: "Slot VGA (PCIe x16 Bertulang Baja) di Motherboard",
            order_hint: 6,
            requires: [],
            physical_appearance: "Kartu grafis NVIDIA GeForce RTX 5090 berdesain rangka logam gunmetal dengan dua kipas pendingin besar, pipa tembaga, logo GEFORCE RTX menyala hijau, dan konektor emas PCIe x16.",
            description: "Video Graphics Array (VGA) atau GPU bertugas mengolah data grafis dan mengirimkan sinyal tampilan visual ke layar monitor.",
            analogy: "Seperti pelukis dan desainer khusus yang menggambar seluruh tampilan layar, animasi, dan video agar tampil tajam di monitor.",
            specs: "32 GB GDDR7 • Interface PCIe 5.0 x16 • Dual Axial Fan • HDMI 2.1 & DP"
        },
        psu: {
            id: "psu",
            name: "Power Supply (PSU)",
            short_name: "PSU 850W Gold",
            subtitle: "850W 80+ Gold ATX 3.1 Power Unit",
            category: "Power Supply Unit (Ruang PSU Casing)",
            target_slot: "slot_psu",
            slot_label: "Ruang Dudukan PSU di Pojok Kanan-Belakang Casing",
            order_hint: 7,
            requires: [],
            physical_appearance: "Kotak logam besi hitam doff dengan stiker tabel tegangan (+12V, +5V, +3.3V), terhubung langsung dengan soket colokan listrik AC 3-pin dan sakelar daya merah di bagian belakang casing.",
            description: "Power Supply Unit (PSU) mengubah arus listrik bolak-balik (AC 220V) dari stopkontak menjadi arus searah (DC +12V, +5V, +3.3V) bagi seluruh komponen komputer.",
            analogy: "Seperti jantung atau gardu induk listrik yang menyuplai energi stabil ke seluruh ruangan rumah.",
            specs: "Daya 850 Watt • Sertifikasi 80+ Gold • ATX 3.1 • AC 220V Input"
        },
        cable: {
            id: "cable",
            name: "Kabel Power ATX 24-Pin",
            short_name: "Kabel Daya ATX",
            subtitle: "Kabel Daya Utama PSU ke Motherboard",
            category: "Power Distribution Cable",
            target_slot: "slot_cable",
            slot_label: "Port Power 24-Pin ATX di Tepi Kanan Motherboard",
            order_hint: 8,
            requires: ["psu"],
            physical_appearance: "Berkas kabel listrik dengan warna standar ATX (kuning +12V, merah +5V, oranye +3.3V, hitam ground) yang menghubungkan PSU menuju konektor 24-pin di tepi kanan motherboard.",
            description: "Kabel daya utama 24-Pin ATX mengalirkan arus listrik DC dari Power Supply menuju motherboard agar seluruh komponen dapat menyala.",
            analogy: "Seperti pembuluh darah atau kabel instalasi listrik yang mengalirkan daya dari sumber listrik menuju setiap bagian komputer.",
            specs: "24-Pin ATX Main Power Connector"
        }
    };

    const TOTAL_COMPONENTS = Object.keys(DEFAULT_CATALOG).length;

    const FALLBACK_QUIZ = [
        {
            id: 1,
            question: "Komponen perangkat keras berbentuk persegi dengan pelat logam perak dan titik kontak emas yang dipasang di tengah motherboard sebagai otak pemroses perintah disebut...",
            options: ["Random Access Memory (RAM)", "Central Processing Unit (CPU / Processor)", "Power Supply Unit (PSU)", "Solid State Drive (SSD)"],
            answer_index: 1,
            explanation: "Processor (CPU) dipasang pada soket LGA1851 motherboard dan berfungsi mengolah seluruh perhitungan logika serta instruksi komputer."
        },
        {
            id: 2,
            question: "Mengapa Kipas Processor (CPU Cooler) wajib dipasang tepat di atas Processor sebelum komputer digunakan?",
            options: ["Untuk menyimpan dokumen dan foto secara permanen", "Untuk menyerap dan membuang panas CPU agar tidak terjadi overheat", "Untuk mengubah arus listrik AC 220V menjadi arus DC", "Untuk memperkuat sinyal Wi-Fi pada motherboard"],
            answer_index: 1,
            explanation: "Processor menghasilkan panas tinggi saat bekerja; CPU Cooler menyerap panas lewat inti tembaga/aluminium dan meniupkannya dengan kipas."
        },
        {
            id: 3,
            question: "Ketika listrik tiba-tiba padam saat siswa belum menyimpan dokumen yang sedang diketik, data tersebut hilang karena sebelumnya berada di...",
            options: ["SSD NVMe M.2 (Non-Volatile)", "Memory RAM (Volatile)", "Power Supply Unit (PSU)", "Kartu Grafis (VGA)"],
            answer_index: 1,
            explanation: "RAM bersifat volatile, artinya hanya menyimpan data sementara selama komputer dialiri listrik."
        },
        {
            id: 4,
            question: "Komponen ramping berbentuk papan sirkuit kecil (22x80 mm) yang dipasang pada slot M.2 motherboard untuk menyimpan Sistem Operasi Windows secara permanen adalah...",
            options: ["VGA Card PCIe x16", "SSD NVMe M.2", "Kabel Power 24-Pin ATX", "Baterai CMOS CR2032"],
            answer_index: 1,
            explanation: "SSD NVMe M.2 menyimpan sistem operasi dan file pengguna secara permanen dengan kecepatan baca/tulis tinggi."
        },
        {
            id: 5,
            question: "Apa keuntungan memasang dua keping Memory RAM secara terpisah pada Slot DIMM A1 dan Slot DIMM B1 di motherboard?",
            options: ["Mengaktifkan mode Dual-Channel dan menggandakan kapasitas memori kerja", "Menggantikan fungsi kartu grafis (VGA)", "Mengubah arus listrik AC menjadi DC", "Mendinginkan suhu harddisk"],
            answer_index: 0,
            explanation: "Memasang dua keping RAM pada slot DIMM A1 dan B1 mengaktifkan jalur data Dual-Channel sehingga akses memori lebih cepat."
        },
        {
            id: 6,
            question: "Apa yang terjadi jika seluruh komponen motherboard sudah terpasang, tetapi kabel 24-Pin ATX dari PSU lupa dicolokkan ke motherboard saat tombol Power ditekan?",
            options: ["Komputer langsung masuk ke desktop Windows dengan normal", "Aliran daya listrik ke motherboard terputus sehingga komputer gagal menyala (Boot Error)", "Monitor menampilkan gambar lebih tajam", "Kipas VGA berputar dua kali lebih cepat"],
            answer_index: 1,
            explanation: "Tanpa kabel 24-Pin ATX yang mencolok dari PSU ke motherboard, papan sirkuit utama tidak menerima daya listrik."
        },
        {
            id: 7,
            question: "Kartu ekspansi berkipas ganda dengan konektor emas panjang yang ditancapkan pada slot PCIe x16 bertulang baja di motherboard untuk menampilkan grafis ke monitor adalah...",
            options: ["VGA / GPU Card", "Sound Card", "Processor LGA1851", "Heatsink VRM"],
            answer_index: 0,
            explanation: "VGA / GPU Card mengolah pemrosesan grafis dan menghubungkan komputer ke monitor melalui port HDMI atau DisplayPort."
        },
        {
            id: 8,
            question: "Urutan siklus pemrosesan informasi dasar pada sistem komputer yang benar adalah...",
            options: ["Output → Process → Input → Storage", "Input → Process → Output & Storage", "Storage → Output → Process → Input", "Process → Input → Storage → Output"],
            answer_index: 1,
            explanation: "Data dimasukkan melalui Input Device, diolah di Processing Device (CPU & RAM), lalu ditampilkan lewat Output Device atau disimpan di Storage Device."
        }
    ];

    let CATALOG = { ...DEFAULT_CATALOG };
    let MOTHERBOARD_META = { ...DEFAULT_MOTHERBOARD_META };

    const state = {
        activeTab: 'assembly',
        installed: [],
        selectedPart: null,
        draggingPart: null,
        hoveredSlot: null,
        assemblyScore: 100,
        quizScore: null,
        errorsCount: 0,
        pcPoweredOn: false,
        bootStage: 'OFF',
        startTime: Date.now()
    };

    // =========================================================================
    // 0. TEMA HITAM / PUTIH & FULLSCREEN
    // =========================================================================
    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.body.classList.toggle('theme-light', isLight);
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.innerHTML = isLight ? '🌙 Mode Hitam' : '☀️ Mode Putih';
        }
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {}
    }

    window.toggleWebTheme = function () {
        const currentlyLight = document.body.classList.contains('theme-light');
        applyTheme(currentlyLight ? 'dark' : 'light');
    };

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light') {
        applyTheme('light');
    }

    function updateFullscreenButtonLabel() {
        const wrapper = document.getElementById('viewport-wrapper');
        const btn = document.getElementById('btn-fullscreen');
        if (!wrapper || !btn) return;
        const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement || wrapper.classList.contains('is-fullscreen'));
        btn.innerHTML = active ? '✕ Keluar Fullscreen' : '⛶ Layar Penuh';
    }

    window.toggleFullscreenViewport = async function () {
        const wrapper = document.getElementById('viewport-wrapper');
        if (!wrapper) return;

        const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement || wrapper.classList.contains('is-fullscreen'));
        if (!isFs) {
            wrapper.classList.add('is-fullscreen');
            try {
                if (wrapper.requestFullscreen) {
                    await wrapper.requestFullscreen();
                } else if (wrapper.webkitRequestFullscreen) {
                    wrapper.webkitRequestFullscreen();
                }
            } catch (e) {}
        } else {
            wrapper.classList.remove('is-fullscreen');
            try {
                if (document.exitFullscreen && document.fullscreenElement) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
                    document.webkitExitFullscreen();
                }
            } catch (e) {}
        }
        updateFullscreenButtonLabel();
        setTimeout(resizeViewport, 80);
    };

    document.addEventListener('fullscreenchange', () => {
        const wrapper = document.getElementById('viewport-wrapper');
        if (!document.fullscreenElement && wrapper) {
            wrapper.classList.remove('is-fullscreen');
        }
        updateFullscreenButtonLabel();
        setTimeout(resizeViewport, 80);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const wrapper = document.getElementById('viewport-wrapper');
            if (wrapper && wrapper.classList.contains('is-fullscreen')) {
                wrapper.classList.remove('is-fullscreen');
                updateFullscreenButtonLabel();
                setTimeout(resizeViewport, 80);
            }
        }
    });

    // =========================================================================
    // 1. WEB AUDIO SYNTHESIZER
    // =========================================================================
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioCtx = AudioContextClass ? new AudioContextClass() : null;
    function playTone(freq, type = 'sine', duration = 0.12, vol = 0.14, delay = 0) {
        if (!audioCtx) return;
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
            gain.gain.setValueAtTime(vol, audioCtx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + delay);
            osc.stop(audioCtx.currentTime + delay + duration);
        } catch (e) {}
    }

    const playSnapSound = () => { playTone(540, 'triangle', 0.08, 0.18, 0); playTone(920, 'sine', 0.14, 0.16, 0.06); };
    const playErrorSound = () => { playTone(185, 'sawtooth', 0.22, 0.18, 0); playTone(140, 'sawtooth', 0.28, 0.18, 0.18); };
    const playBootBeep = () => { playTone(1000, 'sine', 0.18, 0.16, 0.08); };

    // =========================================================================
    // 2. SCENE THREE.JS UTAMA (CASING TIDUR ARMAGGEDDON + MEJA KERJA)
    // =========================================================================
    const canvas = document.getElementById('three-canvas');
    const viewport = document.getElementById('viewport-wrapper');
    const initW = Math.max(viewport.clientWidth || 960, 320);
    const initH = Math.max(viewport.clientHeight || 620, 360);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdbe4ee);
    scene.fog = new THREE.FogExp2(0xdbe4ee, 0.010);

    const camera = new THREE.PerspectiveCamera(42, initW / initH, 0.1, 100);
    camera.position.set(0.6, 8.8, 9.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.85;
    controls.zoomSpeed = 0.95;
    controls.panSpeed = 0.85;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 3.2;
    controls.maxDistance = 24;
    controls.target.set(0.2, 0.85, 0.15);

    scene.add(new THREE.AmbientLight(0xf8fafc, 0.92));

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
    keyLight.position.set(7, 15, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    const d = 13;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.65);
    fillLight.position.set(-10, 8, -6);
    scene.add(fillLight);

    // Dinding Ruang Kerja
    const backWallRoom = new THREE.Mesh(
        new THREE.BoxGeometry(28, 14, 0.4),
        new THREE.MeshStandardMaterial({ map: T.createOfficeWallTexture(), roughness: 0.72, metalness: 0.05 })
    );
    backWallRoom.position.set(0, 6.2, -6.5);
    backWallRoom.receiveShadow = true;
    scene.add(backWallRoom);

    // Meja Kerja Kayu Natural Oak
    const deskMesh = new THREE.Mesh(
        new THREE.BoxGeometry(24, 0.52, 13.5),
        new THREE.MeshStandardMaterial({ map: T.createWoodDeskTexture(), roughness: 0.42, metalness: 0.08 })
    );
    deskMesh.position.set(0, -0.26, 0);
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);

    const deskMat = new THREE.Mesh(
        new THREE.BoxGeometry(17.5, 0.035, 8.6),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.88 })
    );
    deskMat.position.set(0.4, 0.018, 0.2);
    deskMat.receiveShadow = true;
    scene.add(deskMat);

    // Casing Putih Merk ARMAGGEDDON (Tidur Horizontal di Atas Meja)
    const powerTriggerMeshes = [];
    const caseGroup = M.buildStandingArmaggeddonCase(powerTriggerMeshes);
    caseGroup.position.set(-2.35, 0.035, -0.45);
    scene.add(caseGroup);

    const powerLedMat = powerTriggerMeshes[0].material;

    // Motherboard ATX Z890-PRO Berbaring di Dasar Casing
    const moboGroup = M.buildVerticalMotherboard();
    moboGroup.position.set(-0.78, 0.34, -0.15);
    caseGroup.add(moboGroup);

    // =========================================================================
    // 3. SLOT TARGET MOTHERBOARD HORIZONTAL & RUANG PSU CASING
    // =========================================================================
    const slotMeshes = {};
    const slotHighlightMeshes = {};
    const slotWorldCenters = {};

    function createTargetSlot(slotId, parent, pos, size, visualBuilder) {
        const group = new THREE.Group();
        group.position.copy(pos);
        parent.add(group);
        if (visualBuilder) visualBuilder(group);

        const hitBox = new THREE.Mesh(
            new THREE.BoxGeometry(size.x, size.y, size.z),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        hitBox.userData = { slotId };
        group.add(hitBox);
        slotMeshes[slotId] = hitBox;

        const highlight = new THREE.Mesh(
            new THREE.BoxGeometry(size.x + 0.12, 0.24, size.z + 0.12),
            new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0, depthWrite: false })
        );
        highlight.position.y = 0.14;
        group.add(highlight);
        slotHighlightMeshes[slotId] = highlight;
    }

    // 1. Soket Processor (LGA1851) Terbuka Jelas di Motherboard
    createTargetSlot('slot_cpu', moboGroup, new THREE.Vector3(-0.26, 0.06, -0.58), new THREE.Vector3(1.15, 0.55, 1.15), (g) => {
        // Dudukan Soket Gelap + Pin Kontak Emas LGA1851
        const socketBase = new THREE.Mesh(
            new THREE.BoxGeometry(1.04, 0.04, 1.04),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.4 })
        );
        g.add(socketBase);

        const pinArray = new THREE.Mesh(
            new THREE.BoxGeometry(0.92, 0.05, 0.92),
            new THREE.MeshStandardMaterial({ map: T.createCPUSocketPinTexture(), metalness: 0.88, roughness: 0.25 })
        );
        pinArray.position.y = 0.01;
        g.add(pinArray);

        // Bingkai Pengunci Logam Perak (ILM Retention Frame)
        const frameMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.18 });
        const barTop = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.07, 0.09), frameMat);
        barTop.position.set(0, 0.03, -0.49);
        const barBot = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.07, 0.09), frameMat);
        barBot.position.set(0, 0.03, 0.49);
        const barLeft = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.92), frameMat);
        barLeft.position.set(-0.49, 0.03, 0);
        const barRight = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.92), frameMat);
        barRight.position.set(0.49, 0.03, 0);
        g.add(barTop, barBot, barLeft, barRight);

        // Tuas Pengunci Logam di Samping Soket CPU
        const leverArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 1.05, 10),
            frameMat
        );
        leverArm.rotation.x = Math.PI / 2;
        leverArm.position.set(0.58, 0.04, 0);
        g.add(leverArm);
    });

    // 2. Slot Kipas Processor / CPU Cooler (Tepat di Atas Soket Processor)
    createTargetSlot('slot_cooler', moboGroup, new THREE.Vector3(-0.26, 0.26, -0.58), new THREE.Vector3(1.30, 0.65, 1.30), (g) => {
        [[-0.46, -0.46], [0.46, -0.46], [-0.46, 0.46], [0.46, 0.46]].forEach(([hx, hz]) => {
            const mountHole = new THREE.Mesh(
                new THREE.CylinderGeometry(0.065, 0.065, 0.08, 14),
                new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.92, roughness: 0.18 })
            );
            mountHole.position.set(hx, -0.18, hz);
            g.add(mountHole);
        });
    });

    // 3. Slot RAM 1 (DIMM A1) — Terpisah untuk Pemasangan Satu per Satu
    createTargetSlot('slot_ram1', moboGroup, new THREE.Vector3(0.76, 0.12, -0.58), new THREE.Vector3(0.28, 0.65, 1.85), (g) => {
        const slot = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.16, 1.72),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.42 })
        );
        slot.position.y = 0.04;
        g.add(slot);

        [-0.88, 0.88].forEach(zEnd => {
            const latch = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.22, 0.10),
                new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 })
            );
            latch.position.set(0, 0.08, zEnd);
            g.add(latch);
        });
    });

    // 4. Slot RAM 2 (DIMM B1) — Terpisah di Samping Slot RAM 1
    createTargetSlot('slot_ram2', moboGroup, new THREE.Vector3(1.04, 0.12, -0.58), new THREE.Vector3(0.28, 0.65, 1.85), (g) => {
        const slot = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.16, 1.72),
            new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.42 })
        );
        slot.position.y = 0.04;
        g.add(slot);

        [-0.88, 0.88].forEach(zEnd => {
            const latch = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.22, 0.10),
                new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 })
            );
            latch.position.set(0, 0.08, zEnd);
            g.add(latch);
        });
    });

    // 5. Slot SSD NVMe M.2
    createTargetSlot('slot_ssd', moboGroup, new THREE.Vector3(-0.22, 0.09, 0.26), new THREE.Vector3(1.42, 0.45, 0.52), (g) => {
        const m2Conn = new THREE.Mesh(
            new THREE.BoxGeometry(0.14, 0.12, 0.40),
            new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4 })
        );
        m2Conn.position.set(-0.56, 0.03, 0);
        g.add(m2Conn);

        const standoff = new THREE.Mesh(
            new THREE.CylinderGeometry(0.055, 0.055, 0.12, 14),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 })
        );
        standoff.position.set(0.55, 0.03, 0);
        g.add(standoff);
    });

    // 6. Slot VGA PCIe x16 Bertulang Baja
    createTargetSlot('slot_vga', moboGroup, new THREE.Vector3(-0.22, 0.14, 0.88), new THREE.Vector3(2.45, 0.95, 0.65), (g) => {
        const pcieSlot = new THREE.Mesh(
            new THREE.BoxGeometry(2.05, 0.18, 0.18),
            new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 })
        );
        pcieSlot.position.y = 0.06;
        g.add(pcieSlot);
    });

    // 7. Ruang Dudukan Power Supply (PSU) di Pojok Kanan-Belakang Casing
    createTargetSlot('slot_psu', caseGroup, new THREE.Vector3(1.55, 0.68, -1.35), new THREE.Vector3(1.85, 1.15, 1.85), (g) => {
        const psuTrayOutline = new THREE.Mesh(
            new THREE.BoxGeometry(1.75, 0.06, 1.75),
            new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
        );
        psuTrayOutline.position.y = -0.38;
        g.add(psuTrayOutline);
    });

    // 8. Port Power 24-Pin ATX di Tepi Kanan Motherboard
    createTargetSlot('slot_cable', moboGroup, new THREE.Vector3(1.40, 0.14, -0.15), new THREE.Vector3(0.58, 0.65, 1.25), (g) => {
        const header24 = new THREE.Mesh(
            new THREE.BoxGeometry(0.24, 0.22, 1.02),
            new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
        );
        header24.position.y = 0.08;
        g.add(header24);
    });

    scene.updateMatrixWorld(true);
    Object.keys(slotMeshes).forEach(sId => {
        const v = new THREE.Vector3();
        slotMeshes[sId].getWorldPosition(v);
        slotWorldCenters[sId] = v;
    });

    // =========================================================================
    // 4. MONITOR SAMSUNG DI SEBELAH KANAN CASING
    // =========================================================================
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const screenCtx = screenCanvas.getContext('2d');
    const monitorScreenTex = new THREE.CanvasTexture(screenCanvas);

    function updateMonitorScreen(mode, errorMsg = '') {
        T.renderMonitorCanvas(screenCtx, screenCanvas.width, screenCanvas.height, mode, errorMsg);
        monitorScreenTex.needsUpdate = true;
    }

    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(3.85, 0.035, -0.65);
    monitorGroup.rotation.y = -0.28;
    scene.add(monitorGroup);

    const silverStandMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.88, roughness: 0.20 });
    const monBase = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.07, 1.35), silverStandMat);
    monBase.position.y = 0.035;
    monBase.castShadow = true;
    monitorGroup.add(monBase);

    const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.95, 0.18), silverStandMat);
    monNeck.position.set(0, 0.98, -0.36);
    monNeck.castShadow = true;
    monitorGroup.add(monNeck);

    const monBezel = new THREE.Mesh(
        new THREE.BoxGeometry(4.95, 3.02, 0.11),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.78, roughness: 0.24 })
    );
    monBezel.position.set(0, 2.38, -0.15);
    monBezel.castShadow = true;
    monitorGroup.add(monBezel);

    const samsungChin = new THREE.Mesh(
        new THREE.BoxGeometry(4.95, 0.24, 0.12),
        new THREE.MeshStandardMaterial({ map: T.createSamsungBezelTexture(), metalness: 0.82, roughness: 0.22 })
    );
    samsungChin.position.set(0, 0.98, -0.14);
    monitorGroup.add(samsungChin);

    updateMonitorScreen('OFF');
    const monDisplay = new THREE.Mesh(
        new THREE.PlaneGeometry(4.78, 2.76),
        new THREE.MeshStandardMaterial({ map: monitorScreenTex, roughness: 0.14, metalness: 0.06 })
    );
    monDisplay.position.set(0, 2.46, -0.09);
    monitorGroup.add(monDisplay);

    // =========================================================================
    // 5. TRAY KOMPONEN 3D DI ATAS MEJA KERJA (8 KOMPONEN SIAP RAKIT)
    // =========================================================================
    const componentMeshes = {};
    const spinningFans = [];

    const trayPositions = {
        cpu: new THREE.Vector3(-6.2, 0.14, 3.35),
        cooler: new THREE.Vector3(-4.5, 0.14, 3.35),
        ram1: new THREE.Vector3(-2.9, 0.14, 3.35),
        ram2: new THREE.Vector3(-1.8, 0.14, 3.35),
        ssd: new THREE.Vector3(-0.3, 0.14, 3.35),
        vga: new THREE.Vector3(1.9, 0.14, 3.35),
        psu: new THREE.Vector3(4.4, 0.08, 3.35),
        cable: new THREE.Vector3(6.6, 0.08, 3.35)
    };

    function initComponentMeshes() {
        const builders = {
            cpu: () => M.buildCPU3D(),
            cooler: () => M.buildCPUCooler3D(spinningFans),
            ram1: () => M.buildRAM3D(),
            ram2: () => M.buildRAM3D(),
            ssd: () => M.buildSSD3D(),
            vga: () => M.buildVGA3D(spinningFans),
            psu: () => M.buildPSU3D(),
            cable: () => M.buildCable3D()
        };

        Object.keys(builders).forEach(partId => {
            const meshGroup = builders[partId]();
            meshGroup.position.copy(trayPositions[partId]);
            meshGroup.traverse(child => {
                child.userData.partId = partId;
            });
            scene.add(meshGroup);
            componentMeshes[partId] = meshGroup;
        });
    }

    initComponentMeshes();

    // =========================================================================
    // 6. INTERAKSI LAYAR SENTUH HALUS (iPad/HP/PC) + SNAP-ASSIST PRESISI
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    // Bidang geser mendatar sejajar permukaan motherboard tidur
    const horizontalDragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.78);
    const dragIntersect = new THREE.Vector3();

    function updatePointerNDC(clientX, clientY) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    function highlightSlots(active, targetSlotId = null, isValid = true) {
        Object.keys(slotHighlightMeshes).forEach(sId => {
            const hl = slotHighlightMeshes[sId];
            if (!active) {
                hl.material.opacity = 0;
            } else if (sId === targetSlotId) {
                hl.material.color.setHex(isValid ? 0x10b981 : 0xef4444);
                hl.material.opacity = 0.65;
            } else {
                hl.material.color.setHex(0x38bdf8);
                hl.material.opacity = 0.22;
            }
        });
    }

    function detectTargetSlot(partId) {
        const slotHits = raycaster.intersectObjects(Object.values(slotMeshes), false);
        if (slotHits.length > 0) {
            return slotHits[0].object.userData.slotId;
        }

        if (!partId || !componentMeshes[partId]) return null;
        const partPos = new THREE.Vector3();
        componentMeshes[partId].getWorldPosition(partPos);

        let nearestSlot = null;
        let minDist = 1.65;
        Object.keys(slotWorldCenters).forEach(sId => {
            const dist = partPos.distanceTo(slotWorldCenters[sId]);
            if (dist < minDist) {
                minDist = dist;
                nearestSlot = sId;
            }
        });
        return nearestSlot;
    }

    function moveDraggedPart(clientX, clientY) {
        if (!state.draggingPart) return;
        updatePointerNDC(clientX, clientY);
        raycaster.setFromCamera(pointerNDC, camera);

        if (raycaster.ray.intersectPlane(horizontalDragPlane, dragIntersect)) {
            const clampedX = Math.max(-7.2, Math.min(7.2, dragIntersect.x));
            const clampedZ = Math.max(-3.6, Math.min(4.2, dragIntersect.z));
            componentMeshes[state.draggingPart].position.set(clampedX, 0.85, clampedZ);
        }

        const detectedSlot = detectTargetSlot(state.draggingPart);
        if (detectedSlot) {
            state.hoveredSlot = detectedSlot;
            highlightSlots(true, detectedSlot, CATALOG[state.draggingPart].target_slot === detectedSlot);
        } else {
            state.hoveredSlot = null;
            highlightSlots(true);
        }
    }

    renderer.domElement.addEventListener('pointerdown', (e) => {
        if (e.isPrimary === false) return;
        updatePointerNDC(e.clientX, e.clientY);
        raycaster.setFromCamera(pointerNDC, camera);

        if (raycaster.intersectObjects(powerTriggerMeshes, true).length > 0) {
            triggerCasePower();
            return;
        }
        if (raycaster.intersectObject(monDisplay, true).length > 0 && state.bootStage === 'WINDOWS') {
            openWindowsModal();
            return;
        }

        const draggableRoots = Object.keys(componentMeshes)
            .filter(id => !state.installed.includes(id))
            .map(id => componentMeshes[id]);

        const hits = raycaster.intersectObjects(draggableRoots, true);
        if (hits.length > 0) {
            const partId = hits[0].object.userData.partId;
            if (partId && !state.installed.includes(partId)) {
                state.draggingPart = partId;
                selectComponent(partId);
                controls.enabled = false;
                renderer.domElement.style.cursor = 'grabbing';
                if (renderer.domElement.setPointerCapture) {
                    try { renderer.domElement.setPointerCapture(e.pointerId); } catch (err) {}
                }
                highlightSlots(true, CATALOG[partId].target_slot, true);
                return;
            }
        }

        if (state.selectedPart && !state.installed.includes(state.selectedPart)) {
            const slotHits = raycaster.intersectObjects(Object.values(slotMeshes), false);
            if (slotHits.length > 0) {
                attemptInstallComponent(state.selectedPart, slotHits[0].object.userData.slotId);
            }
        }
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
        if (!state.draggingPart || e.isPrimary === false) return;
        e.preventDefault();
        moveDraggedPart(e.clientX, e.clientY);
    });

    function finishPointerDrag(e) {
        if (!state.draggingPart) return;
        const partId = state.draggingPart;
        const slotId = state.hoveredSlot || detectTargetSlot(partId);
        state.draggingPart = null;
        state.hoveredSlot = null;
        controls.enabled = true;
        renderer.domElement.style.cursor = 'grab';
        if (e && renderer.domElement.releasePointerCapture) {
            try { renderer.domElement.releasePointerCapture(e.pointerId); } catch (err) {}
        }
        highlightSlots(false);
        if (slotId) {
            attemptInstallComponent(partId, slotId);
        } else if (!state.installed.includes(partId)) {
            componentMeshes[partId].position.copy(trayPositions[partId]);
        }
    }

    renderer.domElement.addEventListener('pointerup', finishPointerDrag);
    renderer.domElement.addEventListener('pointercancel', finishPointerDrag);

    renderer.domElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!state.draggingPart) return;
        moveDraggedPart(e.clientX, e.clientY);
    });

    renderer.domElement.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!state.draggingPart) return;
        const partId = state.draggingPart;
        const slotId = state.hoveredSlot || detectTargetSlot(partId);
        state.draggingPart = null;
        state.hoveredSlot = null;
        highlightSlots(false);
        if (slotId) {
            attemptInstallComponent(partId, slotId);
        } else if (!state.installed.includes(partId)) {
            componentMeshes[partId].position.copy(trayPositions[partId]);
        }
    });

    function validateDropLocally(partId, targetSlot) {
        const comp = CATALOG[partId];
        if (comp.requires && comp.requires.includes('cpu') && !state.installed.includes('cpu')) {
            return {
                valid: false,
                title: 'URUTAN SALAH! Pasang Processor (CPU) Dulu',
                message: 'Pasang keping Processor (CPU) pada soket LGA1851 terlebih dahulu sebelum memasang Kipas Processor di atasnya!'
            };
        }
        if (comp.requires && comp.requires.includes('psu') && !state.installed.includes('psu')) {
            return {
                valid: false,
                title: 'URUTAN SALAH! Pasang PSU Terlebih Dahulu',
                message: 'Pasang unit Power Supply (PSU) di pojok kanan-belakang casing terlebih dahulu sebelum mencolokkan Kabel Power ATX 24-Pin!'
            };
        }
        if (targetSlot !== comp.target_slot) {
            return {
                valid: false,
                title: 'SALAH SLOT / POSISI!',
                message: `${comp.name} tidak cocok pada slot tersebut. Pasang pada: ${comp.slot_label}.`
            };
        }
        return {
            valid: true,
            title: `Berhasil Memasang ${comp.name}!`,
            message: `${comp.name} terpasang presisi pada ${comp.slot_label}.`
        };
    }

    async function attemptInstallComponent(partId, targetSlot) {
        const result = validateDropLocally(partId, targetSlot);

        if (result.valid) {
            playSnapSound();
            state.installed.push(partId);
            snapComponentToBoard3D(partId);
            showStatusBanner('success', result.title, result.message);
        } else {
            playErrorSound();
            state.errorsCount += 1;
            state.assemblyScore = Math.max(0, state.assemblyScore - 10);
            if (!state.installed.includes(partId)) {
                componentMeshes[partId].position.copy(trayPositions[partId]);
            }
            showStatusBanner('error', result.title, result.message);
        }
        updateHUD();
    }

    // Kunci komponen presisi pada motherboard horizontal & casing tidur
    function snapComponentToBoard3D(partId) {
        const mesh = componentMeshes[partId];
        mesh.rotation.set(0, 0, 0);
        if (partId === 'cpu') {
            moboGroup.add(mesh);
            mesh.position.set(-0.26, 0.10, -0.58);
        } else if (partId === 'cooler') {
            moboGroup.add(mesh);
            mesh.position.set(-0.26, 0.18, -0.58);
        } else if (partId === 'ram1') {
            moboGroup.add(mesh);
            mesh.position.set(0.76, 0.12, -0.58);
        } else if (partId === 'ram2') {
            moboGroup.add(mesh);
            mesh.position.set(1.04, 0.12, -0.58);
        } else if (partId === 'ssd') {
            moboGroup.add(mesh);
            mesh.position.set(-0.22, 0.09, 0.26);
        } else if (partId === 'vga') {
            moboGroup.add(mesh);
            mesh.position.set(-0.22, 0.14, 0.88);
        } else if (partId === 'psu') {
            caseGroup.add(mesh);
            mesh.position.set(1.55, 0.28, -1.35);
        } else if (partId === 'cable') {
            caseGroup.add(mesh);
            mesh.position.set(0, 0, 0);
        }
    }

    async function triggerCasePower() {
        const pBtn = powerTriggerMeshes[0];
        if (pBtn) {
            pBtn.position.z = 2.46;
            setTimeout(() => { pBtn.position.z = 2.50; }, 160);
        }

        const missing = Object.keys(CATALOG).filter(k => !state.installed.includes(k));
        const bootRes = missing.length === 0
            ? { boot_success: true }
            : {
                boot_success: false,
                error_code: 'ERR_MISSING_HARDWARE',
                message: `Komponen belum terpasang lengkap: ${missing.map(m => CATALOG[m].name).join(', ')}`
            };

        const ledDot = document.getElementById('power-led-dot');
        const badge = document.getElementById('pc-state-badge');

        if (!bootRes.boot_success) {
            playErrorSound();
            state.pcPoweredOn = false;
            state.bootStage = 'ERROR';
            state.errorsCount += 1;
            state.assemblyScore = Math.max(0, state.assemblyScore - 10);

            powerLedMat.color.setHex(0xef4444);
            powerLedMat.emissive.setHex(0xdc2626);
            powerLedMat.emissiveIntensity = 1.8;

            ledDot.className = 'w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping';
            badge.textContent = 'STATUS: BOOT ERROR!';
            badge.className = 'text-[11px] mono px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-700';

            updateMonitorScreen('ERROR', `${bootRes.error_code} — ${bootRes.message}`);
            showStatusBanner('error', `GAGAL MENYALAKAN PC (${bootRes.error_code})`, bootRes.message);
            window.setCameraPreset('monitor');
            updateHUD();
            return;
        }

        playBootBeep();
        state.pcPoweredOn = true;
        state.bootStage = 'BIOS';

        powerLedMat.color.setHex(0x38bdf8);
        powerLedMat.emissive.setHex(0x0ea5e9);
        powerLedMat.emissiveIntensity = 2.0;

        ledDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]';
        badge.textContent = 'POWER: ON (WINDOWS)';
        badge.className = 'text-[11px] mono px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700';

        updateMonitorScreen('BIOS');
        showStatusBanner('success', 'PC Menyala! Kipas Processor & VGA Berputar...', 'Memuat Sistem Operasi Windows 11 di monitor Samsung...');
        window.setCameraPreset('monitor');

        await saveRecordToBackend('LULUS PRAKTIKUM RAKIT PC 3D');

        setTimeout(() => {
            if (state.pcPoweredOn) {
                state.bootStage = 'WINDOWS';
                updateMonitorScreen('WINDOWS');
                document.getElementById('windows-actions').classList.remove('hidden');
                showStatusBanner(
                    'success',
                    '🎉 Komputer Berhasil Dirakit & Windows Menyala!',
                    'Klik layar monitor 3D atau tombol "Buka Layar Windows Penuh" di bawah.'
                );
            }
        }, 1400);
    }

    async function saveRecordToBackend(statusText) {
        const studentName = document.getElementById('student-name-input').value.trim() || 'Siswa Kelas VII';
        const studentClass = document.getElementById('student-class-input').value.trim() || 'VII SMPIT Sahabat Alam';
        const duration = Math.round((Date.now() - state.startTime) / 1000);

        const localRecord = {
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            student_name: studentName,
            student_class: studentClass,
            assembly_score: state.assemblyScore,
            quiz_score: state.quizScore,
            errors_count: state.errorsCount,
            duration_seconds: duration,
            status: statusText
        };

        try {
            const res = await fetch('/api/save-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(localRecord)
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.record) {
                    const existing = JSON.parse(localStorage.getItem(LOCAL_BACKUP_KEY) || '[]');
                    existing.push(data.record);
                    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(existing));
                    return;
                }
            }
        } catch (e) {}

        const existing = JSON.parse(localStorage.getItem(LOCAL_BACKUP_KEY) || '[]');
        existing.push(localRecord);
        localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(existing));
    }

    // =========================================================================
    // 7. RENDER SIDEBAR, CHECKLIST, INSPECTOR, & TABS
    // =========================================================================
    function renderPartsSidebar() {
        const list = document.getElementById('parts-list');
        if (!list) return;
        list.innerHTML = '';

        Object.values(CATALOG).forEach(part => {
            const isInst = state.installed.includes(part.id);
            const isSel = state.selectedPart === part.id;

            const card = document.createElement('div');
            card.draggable = !isInst;
            card.className = `part-card p-2.5 rounded-xl border border-slate-800 bg-slate-950/85 cursor-pointer ${isInst ? 'installed' : ''} ${isSel ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="flex items-center justify-between gap-2">
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 mono">#${part.order_hint}</span>
                            <h4 class="text-xs font-bold text-white">${part.name}</h4>
                        </div>
                        <p class="text-[11px] text-slate-400 mt-0.5">${part.subtitle}</p>
                    </div>
                    <span class="text-xs font-bold ${isInst ? 'text-emerald-400' : 'text-sky-400'}">
                        ${isInst ? '✓ Terpasang' : '⤢ Drag'}
                    </span>
                </div>
            `;

            card.addEventListener('click', () => selectComponent(part.id));
            card.addEventListener('dragstart', (e) => {
                if (isInst) return e.preventDefault();
                state.draggingPart = part.id;
                selectComponent(part.id);
                highlightSlots(true, part.target_slot, true);
            });
            card.addEventListener('dragend', () => {
                state.draggingPart = null;
                highlightSlots(false);
            });

            list.appendChild(card);
        });

        const checkBar = document.getElementById('checklist-bar');
        if (checkBar) {
            checkBar.innerHTML = Object.values(CATALOG).map(p => {
                const ok = state.installed.includes(p.id);
                return `
                    <div class="px-2.5 py-2 rounded-xl border text-[11px] flex items-center justify-between ${ok ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/80 border-slate-800 text-slate-400'}">
                        <span class="font-semibold truncate">${p.short_name}</span>
                        <span class="font-bold ml-1">${ok ? '✓' : '○'}</span>
                    </div>
                `;
            }).join('');
        }
    }

    function selectComponent(partId) {
        state.selectedPart = partId;
        const p = CATALOG[partId];
        document.getElementById('insp-title').textContent = p.name;
        document.getElementById('insp-category').textContent = `${p.category} → ${p.slot_label}`;
        document.getElementById('insp-appearance').textContent = p.physical_appearance;
        document.getElementById('insp-desc').textContent = p.description;
        document.getElementById('insp-analogy').textContent = p.analogy;
        document.getElementById('insp-specs').textContent = p.specs;

        if (!state.installed.includes(partId)) {
            highlightSlots(true, p.target_slot, true);
        }
        renderPartsSidebar();
    }

    function showStatusBanner(type, title, message) {
        const banner = document.getElementById('status-banner');
        const icon = document.getElementById('status-icon');
        const titleEl = document.getElementById('status-title');
        const msgEl = document.getElementById('status-message');

        banner.classList.remove('shake-error');
        void banner.offsetWidth;

        if (type === 'error') {
            banner.className = 'bg-rose-950/90 border border-rose-500/60 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shake-error';
            icon.className = 'w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 font-bold text-base';
            icon.textContent = '⚠';
            titleEl.className = 'text-sm font-bold text-rose-200';
        } else if (type === 'success') {
            banner.className = 'bg-emerald-950/85 border border-emerald-500/50 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3';
            icon.className = 'w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-base';
            icon.textContent = '✓';
            titleEl.className = 'text-sm font-bold text-emerald-200';
        } else {
            banner.className = 'bg-slate-900/95 border border-slate-800 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3';
            icon.className = 'w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-base';
            icon.textContent = 'ℹ';
            titleEl.className = 'text-sm font-bold text-white';
        }

        titleEl.textContent = title;
        msgEl.innerHTML = message;
    }

    function updateHUD() {
        document.getElementById('hud-installed').textContent = `${state.installed.length}/${TOTAL_COMPONENTS}`;
        document.getElementById('hud-score').textContent = state.assemblyScore;
        document.getElementById('hud-errors').textContent = state.errorsCount;

        const powerBtn = document.getElementById('btn-case-power');
        if (state.installed.length === TOTAL_COMPONENTS && !state.pcPoweredOn) {
            powerBtn.classList.add('power-ready', 'bg-sky-600');
            showStatusBanner(
                'success',
                `Semua ${TOTAL_COMPONENTS} Komponen Terpasang! Siap Dinyalakan!`,
                'Tekan <strong>Tombol Power di Depan Casing Armaggeddon</strong> (atau tombol biru di bawah) untuk menyalakan Windows!'
            );
        }
        renderPartsSidebar();
    }

    // =========================================================================
    // 8. KOMPONEN HARDWARE 360° (TAB 2)
    // =========================================================================
    let galleryScene, galleryCamera, galleryRenderer, galleryControls, galleryCurrentMesh;
    let galleryInitialized = false;

    function initGallery3D() {
        if (galleryInitialized) return;
        const gCanvas = document.getElementById('gallery-canvas');
        const gBox = document.getElementById('gallery-viewport');
        if (!gCanvas || !gBox) return;

        const gw = Math.max(gBox.clientWidth || 460, 280);
        const gh = Math.max(gBox.clientHeight || 460, 280);

        galleryScene = new THREE.Scene();
        galleryCamera = new THREE.PerspectiveCamera(40, gw / gh, 0.1, 50);
        galleryCamera.position.set(2.8, 2.4, 3.6);

        galleryRenderer = new THREE.WebGLRenderer({ canvas: gCanvas, antialias: true, alpha: true });
        galleryRenderer.setSize(gw, gh);
        galleryRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        galleryControls = new THREE.OrbitControls(galleryCamera, galleryRenderer.domElement);
        galleryControls.enableDamping = true;
        galleryControls.autoRotate = true;
        galleryControls.autoRotateSpeed = 2.2;

        galleryScene.add(new THREE.AmbientLight(0xffffff, 0.95));
        const gKey = new THREE.DirectionalLight(0xffffff, 1.3);
        gKey.position.set(5, 8, 6);
        galleryScene.add(gKey);
        const gRim = new THREE.DirectionalLight(0x38bdf8, 0.7);
        gRim.position.set(-5, -3, -5);
        galleryScene.add(gRim);

        galleryInitialized = true;
        loadGalleryItem('motherboard');
    }

    window.loadGalleryItem = function (itemId) {
        if (!galleryInitialized) initGallery3D();
        if (galleryCurrentMesh) galleryScene.remove(galleryCurrentMesh);

        let itemData;
        if (itemId === 'motherboard') {
            galleryCurrentMesh = M.buildVerticalMotherboard();
            galleryCurrentMesh.scale.set(0.65, 0.65, 0.65);
            itemData = MOTHERBOARD_META;
        } else {
            itemData = CATALOG[itemId];
            if (itemId === 'cpu') { galleryCurrentMesh = M.buildCPU3D(); galleryCurrentMesh.scale.set(2.2, 2.2, 2.2); }
            else if (itemId === 'cooler') { galleryCurrentMesh = M.buildCPUCooler3D(null); galleryCurrentMesh.scale.set(2.0, 2.0, 2.0); }
            else if (itemId === 'ram1' || itemId === 'ram2') { galleryCurrentMesh = M.buildRAM3D(); galleryCurrentMesh.scale.set(1.55, 1.55, 1.55); }
            else if (itemId === 'ssd') { galleryCurrentMesh = M.buildSSD3D(); galleryCurrentMesh.scale.set(1.85, 1.85, 1.85); }
            else if (itemId === 'vga') { galleryCurrentMesh = M.buildVGA3D(null); galleryCurrentMesh.scale.set(0.95, 0.95, 0.95); }
            else if (itemId === 'psu') { galleryCurrentMesh = M.buildPSU3D(); galleryCurrentMesh.scale.set(1.15, 1.15, 1.15); }
            else if (itemId === 'cable') { galleryCurrentMesh = M.buildCable3D(); galleryCurrentMesh.scale.set(0.65, 0.65, 0.65); }
        }

        galleryScene.add(galleryCurrentMesh);

        document.getElementById('gal-title').textContent = itemData.name;
        document.getElementById('gal-subtitle').textContent = itemData.subtitle;
        document.getElementById('gal-appearance').textContent = itemData.physical_appearance;
        document.getElementById('gal-desc').textContent = itemData.description;
        document.getElementById('gal-analogy').textContent = itemData.analogy;
        document.getElementById('gal-specs').textContent = itemData.specs;

        document.querySelectorAll('.gal-selector-btn').forEach(btn => {
            btn.classList.toggle('border-sky-400', btn.dataset.item === itemId);
            btn.classList.toggle('bg-sky-500/15', btn.dataset.item === itemId);
        });
    };

    // =========================================================================
    // 9. KUIS EVALUASI INTERAKTIF (TAB 3) & DASHBOARD GURU (TAB 4)
    // =========================================================================
    let quizData = [...FALLBACK_QUIZ];

    function renderQuizUI() {
        const container = document.getElementById('quiz-questions-container');
        if (!container) return;
        container.innerHTML = quizData.map((q, idx) => `
            <div class="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <p class="text-sm font-bold text-white">${idx + 1}. ${q.question}</p>
                <div class="space-y-2">
                    ${q.options.map((opt, oIdx) => `
                        <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 cursor-pointer text-xs text-slate-200 transition">
                            <input type="radio" name="quiz_q_${q.id}" value="${oIdx}" class="accent-sky-500" />
                            <span>${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                        </label>
                    `).join('')}
                </div>
                <div id="quiz-feedback-${q.id}" class="hidden text-xs p-3 rounded-xl"></div>
            </div>
        `).join('');
    }

    async function loadQuizQuestions() {
        renderQuizUI();
        try {
            const res = await fetch('/api/quiz');
            if (res.ok) {
                const data = await res.json();
                if (data.questions && data.questions.length > 0) {
                    quizData = data.questions;
                    renderQuizUI();
                }
            }
        } catch (e) {}
    }

    function gradeQuizLocally(answers) {
        let correctCount = 0;
        const details = FALLBACK_QUIZ.map(q => {
            const userChoice = answers[String(q.id)] !== undefined ? answers[String(q.id)] : -1;
            const isCorrect = userChoice === q.answer_index;
            if (isCorrect) correctCount++;
            return {
                id: q.id,
                is_correct: isCorrect,
                correct_text: q.options[q.answer_index],
                explanation: q.explanation
            };
        });
        const score = Math.round((correctCount / FALLBACK_QUIZ.length) * 100);
        return {
            score,
            correct_count: correctCount,
            total_questions: FALLBACK_QUIZ.length,
            passed: score >= 75,
            details
        };
    }

    window.submitQuizAnswers = async function () {
        const answers = {};
        quizData.forEach(q => {
            const checked = document.querySelector(`input[name="quiz_q_${q.id}"]:checked`);
            if (checked) answers[String(q.id)] = parseInt(checked.value, 10);
        });

        let result;
        try {
            const res = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });
            if (!res.ok) throw new Error('Offline mode');
            result = await res.json();
        } catch (err) {
            result = gradeQuizLocally(answers);
        }

        state.quizScore = result.score;

        const summaryBox = document.getElementById('quiz-result-summary');
        summaryBox.classList.remove('hidden');
        summaryBox.innerHTML = `
            <div class="p-4 rounded-2xl border ${result.passed ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-amber-950/60 border-amber-500/50 text-amber-200'}">
                <h4 class="font-bold text-base">Skor Evaluasi Anda: ${result.score} / 100 (${result.correct_count} dari ${result.total_questions} Benar)</h4>
                <p class="text-xs mt-1">${result.passed ? 'Selamat! Anda lulus standar ketuntasan materi Sistem Komputer & Perangkat Keras Kelas VII.' : 'Silakan pelajari pembahasan di bawah dan ulangi kuis untuk mencapai skor minimal 75.'}</p>
            </div>
        `;

        result.details.forEach(d => {
            const fb = document.getElementById(`quiz-feedback-${d.id}`);
            fb.classList.remove('hidden');
            fb.className = `text-xs p-3 rounded-xl mt-2 ${d.is_correct ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200' : 'bg-rose-950/70 border border-rose-500/40 text-rose-200'}`;
            fb.innerHTML = `<strong>${d.is_correct ? '✓ Jawaban Benar!' : '✕ Kurang Tepat. Jawaban benar: ' + d.correct_text}</strong><br/>${d.explanation}`;
        });

        await saveRecordToBackend(state.pcPoweredOn ? 'LULUS PRAKTIKUM + KUIS' : 'SELESAI KUIS TEORI');
    };

    async function loadTeacherRecords() {
        const tbody = document.getElementById('teacher-records-body');
        let serverRecords = [];
        try {
            const res = await fetch('/api/teacher/records');
            if (res.ok) {
                const data = await res.json();
                serverRecords = data.records || [];
            }
        } catch (e) {}

        const localRecords = JSON.parse(localStorage.getItem(LOCAL_BACKUP_KEY) || '[]');
        const records = serverRecords.length >= localRecords.length ? serverRecords : localRecords;

        if (records.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400 text-xs">Belum ada riwayat praktikum siswa yang tersimpan.</td></tr>`;
            return;
        }

        tbody.innerHTML = records.slice().reverse().map(r => `
            <tr class="border-b border-slate-800/80 hover:bg-slate-900/60 text-xs">
                <td class="py-2.5 px-3 mono text-slate-400">${r.timestamp}</td>
                <td class="py-2.5 px-3 font-bold text-white">${r.student_name}</td>
                <td class="py-2.5 px-3 text-slate-300">${r.student_class}</td>
                <td class="py-2.5 px-3 mono font-bold text-sky-400">${r.assembly_score}</td>
                <td class="py-2.5 px-3 mono font-bold text-emerald-400">${r.quiz_score !== null && r.quiz_score !== undefined ? r.quiz_score : '-'}</td>
                <td class="py-2.5 px-3 mono text-rose-400">${r.errors_count}</td>
                <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${r.status}</span></td>
            </tr>
        `).join('');
    }

    // =========================================================================
    // 10. GLOBAL WINDOW HELPERS (TABS, CAMERA, MODALS, RESET)
    // =========================================================================
    window.switchTab = function (tabName) {
        state.activeTab = tabName;
        document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById(`tab-${tabName}`).classList.remove('hidden');

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        if (tabName === 'gallery') {
            initGallery3D();
            setTimeout(() => {
                const gBox = document.getElementById('gallery-viewport');
                if (gBox && galleryRenderer) {
                    const gw = Math.max(gBox.clientWidth || 460, 280);
                    const gh = Math.max(gBox.clientHeight || 460, 280);
                    galleryCamera.aspect = gw / gh;
                    galleryCamera.updateProjectionMatrix();
                    galleryRenderer.setSize(gw, gh);
                }
            }, 60);
        } else if (tabName === 'teacher') {
            loadTeacherRecords();
        }
    };

    window.setCameraPreset = function (preset) {
        if (preset === 'overview') {
            camera.position.set(0.6, 8.8, 9.2);
            controls.target.set(0.2, 0.85, 0.15);
        } else if (preset === 'motherboard') {
            camera.position.set(-2.35, 5.2, 2.2);
            controls.target.set(-2.35, 0.35, -0.35);
        } else if (preset === 'rear') {
            camera.position.set(-2.35, 3.2, -6.2);
            controls.target.set(-2.35, 1.1, -2.5);
        } else if (preset === 'monitor') {
            camera.position.set(2.4, 2.8, 4.9);
            controls.target.set(3.85, 2.2, -0.45);
        }
        controls.update();
    };

    window.focusSelectedComponent3D = function () {
        if (!state.selectedPart) return;
        const target = componentMeshes[state.selectedPart].getWorldPosition(new THREE.Vector3());
        camera.position.set(target.x, target.y + 2.4, target.z + 2.6);
        controls.target.copy(target);
        controls.update();
    };

    window.triggerCasePower = triggerCasePower;

    window.resetSimulation = function () {
        state.installed = [];
        state.selectedPart = null;
        state.draggingPart = null;
        state.assemblyScore = 100;
        state.errorsCount = 0;
        state.pcPoweredOn = false;
        state.bootStage = 'OFF';
        state.startTime = Date.now();

        Object.keys(componentMeshes).forEach(partId => {
            const mesh = componentMeshes[partId];
            scene.add(mesh);
            mesh.position.copy(trayPositions[partId]);
        });

        powerLedMat.color.setHex(0x38bdf8);
        powerLedMat.emissive.setHex(0x0284c7);
        powerLedMat.emissiveIntensity = 0.9;

        document.getElementById('power-led-dot').className = 'w-2.5 h-2.5 rounded-full bg-slate-500';
        const badge = document.getElementById('pc-state-badge');
        badge.textContent = 'POWER: OFF';
        badge.className = 'text-[11px] mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 border border-slate-800';
        document.getElementById('btn-case-power').classList.remove('power-ready', 'bg-sky-600');
        document.getElementById('windows-actions').classList.add('hidden');

        updateMonitorScreen('OFF');
        highlightSlots(false);
        window.setCameraPreset('overview');
        showStatusBanner('info', 'Simulasi Direset!', 'Seret (drag & drop) kembali seluruh 8 komponen 3D ke slot masing-masing.');
        updateHUD();
    };

    window.openWindowsModal = function () {
        document.getElementById('windows-modal').classList.remove('hidden');
        document.getElementById('win-clock').textContent = new Date().toTimeString().slice(0, 5) + ' WIB';
    };
    window.closeWindowsModal = function () {
        document.getElementById('windows-modal').classList.add('hidden');
    };
    window.toggleSysInfoWindow = function () {
        document.getElementById('win-sys-window').classList.toggle('hidden');
    };

    window.openCertificateModal = function () {
        document.getElementById('cert-student-name').textContent = document.getElementById('student-name-input').value.trim() || 'Peserta Didik Kelas VII';
        document.getElementById('cert-student-class').textContent = document.getElementById('student-class-input').value.trim() || 'VII SMPIT Sahabat Alam';
        document.getElementById('cert-score').textContent = state.assemblyScore;
        document.getElementById('certificate-modal').classList.remove('hidden');
    };
    window.closeCertificateModal = function () {
        document.getElementById('certificate-modal').classList.add('hidden');
    };

    // =========================================================================
    // 11. ANIMATION LOOP, RESIZE OBSERVER, & BOOTSTRAP
    // =========================================================================
    let clockTime = 0;
    function animate() {
        requestAnimationFrame(animate);
        clockTime += 0.03;

        if (state.pcPoweredOn) {
            spinningFans.forEach((fan, idx) => {
                if (idx === 0) {
                    fan.rotation.y += 0.34; // Kipas Processor berputar horizontal di atas CPU
                } else {
                    fan.rotation.z += 0.30; // Kipas VGA berputar
                }
            });
        }

        Object.keys(componentMeshes).forEach((id, idx) => {
            if (!state.installed.includes(id) && state.draggingPart !== id) {
                componentMeshes[id].position.y = trayPositions[id].y + Math.sin(clockTime * 1.4 + idx) * 0.025;
            }
        });

        controls.update();
        renderer.render(scene, camera);

        if (galleryInitialized && state.activeTab === 'gallery') {
            galleryControls.update();
            galleryRenderer.render(galleryScene, galleryCamera);
        }
    }

    function resizeViewport() {
        if (!viewport) return;
        const w = viewport.clientWidth;
        const h = viewport.clientHeight;
        if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    }

    window.addEventListener('resize', resizeViewport);
    if (window.ResizeObserver && viewport) {
        new ResizeObserver(resizeViewport).observe(viewport);
    }

    renderPartsSidebar();
    updateHUD();
    loadQuizQuestions();
    animate();
})();
