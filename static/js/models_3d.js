window.HardwareModels3D = (function () {
    const T = window.HardwareTextures;

    // 1. Casing Armaggeddon Putih Tidur Horizontal (Desktop Style)
    function buildStandingArmaggeddonCase(powerCallbackMeshes) {
        const caseGroup = new THREE.Group();
        const whiteSteel = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28, metalness: 0.22 });
        const whiteTrim = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.25 });
        const darkMetal = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.42, metalness: 0.6 });

        // Dasar Casing (Tidur Horizontal)
        const bottomTray = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.16, 4.8), whiteSteel);
        bottomTray.position.set(0, 0.08, 0);
        bottomTray.receiveShadow = true;
        caseGroup.add(bottomTray);

        // Dinding Belakang (-Z) dengan Rear I/O & Soket Listrik AC
        const rearWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.25, 0.16), whiteSteel);
        rearWall.position.set(0, 1.2, -2.32);
        rearWall.castShadow = true;
        caseGroup.add(rearWall);

        // Panel Depan Putih ARMAGGEDDON (+Z)
        const frontBezel = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.25, 0.26), whiteSteel);
        frontBezel.position.set(0, 1.2, 2.35);
        frontBezel.castShadow = true;
        caseGroup.add(frontBezel);

        const frontLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(2.6, 0.65),
            new THREE.MeshStandardMaterial({ map: T.createArmaggeddonCaseTexture(), roughness: 0.28 })
        );
        frontLogo.position.set(-0.9, 1.15, 2.49);
        caseGroup.add(frontLogo);

        // Tombol Power Utama di Panel Depan-Atas Casing
        const powerBtnBezel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24), darkMetal);
        powerBtnBezel.rotation.x = Math.PI / 2;
        powerBtnBezel.position.set(1.85, 1.85, 2.48);
        caseGroup.add(powerBtnBezel);

        const powerBtnCap = new THREE.Mesh(
            new THREE.CylinderGeometry(0.16, 0.16, 0.10, 24),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.9 })
        );
        powerBtnCap.rotation.x = Math.PI / 2;
        powerBtnCap.position.set(1.85, 1.85, 2.50);
        powerBtnCap.userData = { isPowerButton: true };
        caseGroup.add(powerBtnCap);
        if (powerCallbackMeshes) powerCallbackMeshes.push(powerBtnCap);

        // Dinding Samping Kiri (-X) & Kanan (+X)
        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.25, 4.8), whiteTrim);
        leftWall.position.set(-2.52, 1.2, 0);
        caseGroup.add(leftWall);

        const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.25, 4.8), whiteTrim);
        rightWall.position.set(2.52, 1.2, 0);
        caseGroup.add(rightWall);

        // Sekat Ruang PSU di Pojok Kanan-Belakang
        const shroudDivider = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.25, 0.08), whiteTrim);
        shroudDivider.position.set(1.52, 0.72, -0.35);
        caseGroup.add(shroudDivider);

        // Rear I/O Shield & Colokan Listrik AC 3-Pin di Belakang Casing
        const ioPlate = new THREE.Mesh(
            new THREE.BoxGeometry(1.55, 0.55, 0.06),
            new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.88, roughness: 0.22 })
        );
        ioPlate.position.set(-1.35, 1.35, -2.42);
        caseGroup.add(ioPlate);

        const acSocket = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.34, 0.12), darkMetal);
        acSocket.position.set(1.65, 0.85, -2.42);
        caseGroup.add(acSocket);

        const redSwitch = new THREE.Mesh(
            new THREE.BoxGeometry(0.20, 0.24, 0.12),
            new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
        );
        redSwitch.position.set(1.12, 0.85, -2.42);
        caseGroup.add(redSwitch);

        return caseGroup;
    }

    // 2. Motherboard ATX Realistis Berbaring di Dasar Casing
    function buildVerticalMotherboard() {
        const moboGroup = new THREE.Group();

        // PCB Utama dengan Tekstur Sirkuit Realistis
        const pcbMat = new THREE.MeshStandardMaterial({
            map: T.createMotherboardPCBTexture(),
            roughness: 0.36,
            metalness: 0.22
        });
        const pcb = new THREE.Mesh(new THREE.BoxGeometry(3.25, 0.10, 3.85), pcbMat);
        pcb.castShadow = true;
        pcb.receiveShadow = true;
        moboGroup.add(pcb);

        // Heatsink VRM Aluminium & Chipset PCH
        const alumMat = new THREE.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.90, roughness: 0.20 });
        const darkHeatsink = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });

        const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.28, 0.36), alumMat);
        vrmTop.position.set(-0.35, 0.18, -1.48);
        moboGroup.add(vrmTop);

        const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.28, 1.25), alumMat);
        vrmLeft.position.set(-1.22, 0.18, -0.65);
        moboGroup.add(vrmLeft);

        const pch = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 0.85), darkHeatsink);
        pch.position.set(0.95, 0.12, 1.15);
        moboGroup.add(pch);

        // Kapasitor & Baterai CMOS
        const capMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.18 });
        for (let i = 0; i < 6; i++) {
            const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 14), capMat);
            cap.position.set(-0.88 + i * 0.22, 0.12, -1.18);
            moboGroup.add(cap);
        }

        const cmos = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20), capMat);
        cmos.position.set(-0.85, 0.08, 1.38);
        moboGroup.add(cmos);

        return moboGroup;
    }

    // 3. Processor Intel Core Ultra 9 (Berbaring Menghadap +Y)
    function buildCPU3D() {
        const g = new THREE.Group();
        const greenPCB = new THREE.Mesh(
            new THREE.BoxGeometry(0.86, 0.045, 0.86),
            new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.32 })
        );
        g.add(greenPCB);

        const goldContacts = new THREE.Mesh(
            new THREE.BoxGeometry(0.80, 0.02, 0.80),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.96, roughness: 0.15 })
        );
        goldContacts.position.y = -0.02;
        g.add(goldContacts);

        const ihs = new THREE.Mesh(
            new THREE.BoxGeometry(0.72, 0.065, 0.72),
            new THREE.MeshStandardMaterial({ map: T.createCPUIHSTexture(), metalness: 0.90, roughness: 0.18 })
        );
        ihs.position.y = 0.045;
        g.add(ihs);

        return g;
    }

    // 4. Kipas Processor / CPU Cooler (Menghadap +Y di Atas CPU)
    function buildCPUCooler3D(fanMeshesOut) {
        const g = new THREE.Group();

        const copperBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24),
            new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.94, roughness: 0.18 })
        );
        copperBase.position.y = 0.04;
        g.add(copperBase);

        const heatsink = new THREE.Mesh(
            new THREE.CylinderGeometry(0.52, 0.44, 0.28, 32),
            new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.90, roughness: 0.20 })
        );
        heatsink.position.y = 0.20;
        g.add(heatsink);

        const shroudMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.38, metalness: 0.4 });
        const fanRing = new THREE.Mesh(new THREE.TorusGeometry(0.50, 0.045, 12, 32), shroudMat);
        fanRing.rotation.x = Math.PI / 2;
        fanRing.position.y = 0.36;
        g.add(fanRing);

        const rotor = new THREE.Group();
        rotor.position.y = 0.36;
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.07, 24), shroudMat);
        rotor.add(hub);

        for (let i = 0; i < 9; i++) {
            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(0.42, 0.018, 0.085),
                new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.45 })
            );
            blade.rotation.y = (i * Math.PI * 2) / 9;
            blade.rotation.z = 0.28;
            rotor.add(blade);
        }

        if (fanMeshesOut) fanMeshesOut.push(rotor);
        g.add(rotor);
        return g;
    }

    // 5. 1 Keping RAM DDR5 Green PCB (Dipasang Satu per Satu)
    function buildRAM3D() {
        const g = new THREE.Group();
        const greenTex = T.createGreenRAMPCBTexture();

        const pcb = new THREE.Mesh(
            new THREE.BoxGeometry(0.038, 0.44, 1.65),
            new THREE.MeshStandardMaterial({ map: greenTex, roughness: 0.32, metalness: 0.20 })
        );
        pcb.position.y = 0.24;
        g.add(pcb);

        const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.96, roughness: 0.15 });
        const pinFront = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.06, 0.80), goldMat);
        pinFront.position.set(0, 0.03, 0.38);
        g.add(pinFront);

        const pinBack = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.06, 0.68), goldMat);
        pinBack.position.set(0, 0.03, -0.44);
        g.add(pinBack);

        const chipMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.38 });
        [-0.62, -0.38, -0.14, 0.14, 0.38, 0.62].forEach(zPos => {
            const ic = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.18, 0.14), chipMat);
            ic.position.set(0, 0.25, zPos);
            g.add(ic);
        });

        return g;
    }

    // 6. SSD NVMe M.2 2280 (Berbaring di Slot M.2)
    function buildSSD3D() {
        const g = new THREE.Group();
        const board = new THREE.Mesh(
            new THREE.BoxGeometry(1.08, 0.045, 0.34),
            new THREE.MeshStandardMaterial({ map: T.createSSDTexture(), roughness: 0.30, metalness: 0.24 })
        );
        g.add(board);

        const goldEdge = new THREE.Mesh(
            new THREE.BoxGeometry(0.09, 0.05, 0.32),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.16 })
        );
        goldEdge.position.x = -0.56;
        g.add(goldEdge);

        return g;
    }

    // 7. VGA NVIDIA GeForce RTX 5090 (Berdiri Tegak di Slot PCIe x16)
    function buildVGA3D(fanMeshesOut) {
        const g = new THREE.Group();
        const shroud = new THREE.Mesh(
            new THREE.BoxGeometry(2.35, 1.05, 0.42),
            new THREE.MeshStandardMaterial({ map: T.createNvidiaVGAShroudTexture(), metalness: 0.85, roughness: 0.22 })
        );
        shroud.position.y = 0.56;
        shroud.castShadow = true;
        g.add(shroud);

        const rtxLed = new THREE.Mesh(
            new THREE.BoxGeometry(0.95, 0.06, 0.03),
            new THREE.MeshStandardMaterial({ color: 0x76b900, emissive: 0x76b900, emissiveIntensity: 0.95 })
        );
        rtxLed.position.set(0.05, 1.08, 0);
        g.add(rtxLed);

        const pcieGold = new THREE.Mesh(
            new THREE.BoxGeometry(1.65, 0.12, 0.06),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.96, roughness: 0.15 })
        );
        pcieGold.position.set(-0.20, 0.06, 0);
        g.add(pcieGold);

        return g;
    }

    // 8. PSU 850W Gold
    function buildPSU3D() {
        const g = new THREE.Group();
        const chassis = new THREE.Mesh(
            new THREE.BoxGeometry(1.65, 0.92, 1.65),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.80, roughness: 0.32 })
        );
        chassis.position.y = 0.46;
        g.add(chassis);

        const label = new THREE.Mesh(
            new THREE.PlaneGeometry(1.45, 0.72),
            new THREE.MeshStandardMaterial({ map: T.createPSULabelTexture(), roughness: 0.32 })
        );
        label.position.set(0, 0.46, 0.83);
        g.add(label);

        return g;
    }

    // 9. Kabel Power ATX 24-Pin
    function buildCable3D() {
        const g = new THREE.Group();
        const colors = [0xfacc15, 0xdc2626, 0xf97316, 0x111827, 0xfacc15];
        for (let i = 0; i < colors.length; i++) {
            const off = (i - 2) * 0.045;
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(1.45, 0.55, -1.15 + off),
                new THREE.Vector3(1.15, 1.15, -0.45 + off),
                new THREE.Vector3(0.55, 0.65, -0.15 + off)
            ]);
            const tube = new THREE.Mesh(
                new THREE.TubeGeometry(curve, 28, 0.026, 8, false),
                new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.38 })
            );
            g.add(tube);
        }
        return g;
    }

    return {
        buildStandingArmaggeddonCase,
        buildVerticalMotherboard,
        buildCPU3D,
        buildCPUCooler3D,
        buildRAM3D,
        buildSSD3D,
        buildVGA3D,
        buildPSU3D,
        buildCable3D
    };
})();
