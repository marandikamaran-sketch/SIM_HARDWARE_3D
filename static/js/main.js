// =========================================================================
    // 2. INISIALISASI SCENE THREE.JS UTAMA (MEJA KAYU & TEMBOK KERJA RAPI)
    // =========================================================================
    const canvas = document.getElementById('three-canvas');
    const viewport = document.getElementById('viewport-wrapper');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdbe4ee);
    scene.fog = new THREE.FogExp2(0xdbe4ee, 0.012);

    const camera = new THREE.PerspectiveCamera(42, viewport.clientWidth / viewport.clientHeight, 0.1, 100);
    camera.position.set(0.4, 9.2, 11.8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(viewport.clientWidth, viewport.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 4.2;
    controls.maxDistance = 22;
    controls.target.set(0, 1.2, 0);

    // Pencahayaan studio ruang kerja terang & natural
    scene.add(new THREE.AmbientLight(0xf8fafc, 0.85));

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
    keyLight.position.set(7, 15, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    const d = 12;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.55);
    fillLight.position.set(-9, 8, 6);
    scene.add(fillLight);

    // Tembok Ruang Kerja Rapi dengan Panel Kisi Kayu Akustik
    const backWallRoom = new THREE.Mesh(
        new THREE.BoxGeometry(28, 13, 0.4),
        new THREE.MeshStandardMaterial({
            map: T.createOfficeWallTexture(),
            roughness: 0.72,
            metalness: 0.05
        })
    );
    backWallRoom.position.set(0, 5.6, -6.9);
    backWallRoom.receiveShadow = true;
    scene.add(backWallRoom);

    // Rak Dinding Minimalis & Tanaman Hias Meja Kerja
    const wallShelf = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 0.16, 0.95),
        new THREE.MeshStandardMaterial({ color: 0x855834, roughness: 0.55 })
    );
    wallShelf.position.set(4.5, 4.9, -6.3);
    wallShelf.castShadow = true;
    scene.add(wallShelf);

    // Meja Kerja Kayu Natural Oak Rapi
    const deskMesh = new THREE.Mesh(
        new THREE.BoxGeometry(24, 0.52, 13.5),
        new THREE.MeshStandardMaterial({
            map: T.createWoodDeskTexture(),
            roughness: 0.42,
            metalness: 0.08
        })
    );
    deskMesh.position.set(0, -0.26, 0);
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);

    // Desk Mat Abu-Abu Gelap Rapi di bawah Casing & Monitor
    const deskMat = new THREE.Mesh(
        new THREE.BoxGeometry(16.2, 0.035, 8.2),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.88 })
    );
    deskMat.position.set(0.5, 0.018, -0.1);
    deskMat.receiveShadow = true;
    scene.add(deskMat);

    // =========================================================================
    // 3. CASING PC PUTIH BERMEREK ARMAGGEDDON & TOMBOL POWER 3D
    // =========================================================================
    const caseGroup = new THREE.Group();
    caseGroup.position.set(-2.4, 0.04, 0.15);
    scene.add(caseGroup);

    const whiteSteelMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28, metalness: 0.25 });
    const whiteInteriorMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.2 });
    const blackTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.5 });

    const caseBase = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.22, 6.4), whiteInteriorMat);
    caseBase.position.set(0, 0.11, 0);
    caseBase.castShadow = true;
    caseBase.receiveShadow = true;
    caseGroup.add(caseBase);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.44, 6.4), whiteSteelMat);
    backWall.position.set(-3.98, 0.83, 0);
    backWall.castShadow = true;
    caseGroup.add(backWall);

    const topBezel = new THREE.Mesh(new THREE.BoxGeometry(8.2, 1.44, 0.30), whiteSteelMat);
    topBezel.position.set(0, 0.83, -3.05);
    topBezel.castShadow = true;
    caseGroup.add(topBezel);

    // Panel Depan Putih Armaggeddon + Logo & Tipografi Merek
    const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.44, 6.4), whiteSteelMat);
    frontPanel.position.set(3.95, 0.83, 0);
    frontPanel.castShadow = true;
    caseGroup.add(frontPanel);

    const brandPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(5.6, 1.25),
        new THREE.MeshStandardMaterial({
            map: T.createArmaggeddonCaseTexture(),
            roughness: 0.25,
            metalness: 0.15
        })
    );
    brandPlate.rotation.y = Math.PI / 2;
    brandPlate.position.set(4.15, 0.84, -0.1);
    caseGroup.add(brandPlate);

    // Bingkai trim hitam di tepi bawah casing putih
    const bottomTrim = new THREE.Mesh(new THREE.BoxGeometry(8.28, 0.12, 6.48), blackTrimMat);
    bottomTrim.position.set(0, 0.05, 0);
    caseGroup.add(bottomTrim);

    const powerBtnRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.35, 0.14, 32),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 })
    );
    powerBtnRing.position.set(3.95, 1.56, 2.25);
    caseGroup.add(powerBtnRing);

    const powerLedMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.25,
        roughness: 0.2
    });
    const powerButtonMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.23, 0.23, 0.16, 32),
        powerLedMat
    );
    powerButtonMesh.position.set(3.95, 1.58, 2.25);
    caseGroup.add(powerButtonMesh);

    // Ruang PSU Shroud Putih Armaggeddon
    const psuBay = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.18, 2.3),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.25 })
    );
    psuBay.position.set(-2.7, 0.25, 1.85);
    psuBay.receiveShadow = true;
    caseGroup.add(psuBay);

    const moboGroup = M.buildMotherboardAssembly();
    moboGroup.position.set(0.75, 0.32, -0.25);
    caseGroup.add(moboGroup);

// =========================================================================
    // 5. MONITOR SAMSUNG TERBARU (ODYSSEY / M8 ULTRA-SLIM BEZEL)
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
    monitorGroup.position.set(4.55, 0.03, -0.45);
    monitorGroup.rotation.y = -0.34;
    scene.add(monitorGroup);

    // Kaki penyangga datar logam perak modern khas Samsung Odyssey / M8 terbaru
    const silverStandMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.88, roughness: 0.20 });
    const monBase = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.07, 1.35), silverStandMat);
    monBase.position.y = 0.035;
    monBase.castShadow = true;
    monitorGroup.add(monBase);

    const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.95, 0.18), silverStandMat);
    monNeck.position.set(0, 0.98, -0.36);
    monNeck.castShadow = true;
    monitorGroup.add(monNeck);

    // Bodi layar tipis ultra-slim Samsung
    const monBezel = new THREE.Mesh(
        new THREE.BoxGeometry(4.95, 3.02, 0.11),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.78, roughness: 0.24 })
    );
    monBezel.position.set(0, 2.38, -0.15);
    monBezel.castShadow = true;
    monitorGroup.add(monBezel);

    // Chin bawah dengan logo SAMSUNG perak mengilap
    const samsungChin = new THREE.Mesh(
        new THREE.BoxGeometry(4.95, 0.24, 0.12),
        new THREE.MeshStandardMaterial({
            map: T.createSamsungBezelTexture(),
            metalness: 0.82,
            roughness: 0.22
        })
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