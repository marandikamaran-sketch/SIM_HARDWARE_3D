/**
 * ============================================================================
 * REALISTIC 3D HARDWARE BUILDER (static/js/models_3d.js)
 * Membangun model 3D komponen komputer menyerupai bentuk & warna aslinya:
 * - RAM PCB Hijau Asli lengkap dengan chip memori IC hitam & pin emas bertakik
 * - Processor Intel Core Ultra / i9 dengan IHS berlekuk & matriks kontak emas
 * - VGA NVIDIA GeForce RTX 5090 dengan dual-fan, heatsink bersirip, & logo RTX
 * ============================================================================
 */

window.HardwareModels3D = (function () {
    const T = window.HardwareTextures;

    function buildMotherboardAssembly() {
        const moboGroup = new THREE.Group();

        const pcbMat = new THREE.MeshStandardMaterial({
            map: T.createMotherboardPCBTexture(),
            roughness: 0.42,
            metalness: 0.16
        });
        const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.12, 4.9), pcbMat);
        pcb.castShadow = true;
        pcb.receiveShadow = true;
        moboGroup.add(pcb);

        const alumMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.22 });
        const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.82, roughness: 0.28 });

        const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.36, 0.46), alumMat);
        vrmTop.position.set(-0.2, 0.24, -1.78);
        vrmTop.castShadow = true;
        moboGroup.add(vrmTop);

        const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 1.65), alumMat);
        vrmLeft.position.set(-1.58, 0.24, -0.75);
        vrmLeft.castShadow = true;
        moboGroup.add(vrmLeft);

        const pchHeatsink = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.20, 1.18), darkMetalMat);
        pchHeatsink.position.set(1.45, 0.16, 1.38);
        pchHeatsink.castShadow = true;
        moboGroup.add(pchHeatsink);

        const capSilverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.18 });
        const capTopBlueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 });
        const chokeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.3 });

        for (let i = 0; i < 7; i++) {
            const cx = -1.0 + i * 0.26;
            const choke = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.18), chokeMat);
            choke.position.set(cx, 0.13, -1.42);
            moboGroup.add(choke);

            const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 16), capSilverMat);
            cap.position.set(cx + 0.08, 0.15, -1.22);
            moboGroup.add(cap);

            const capStripe = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.04, 16), capTopBlueMat);
            capStripe.position.set(cx + 0.08, 0.22, -1.22);
            moboGroup.add(capStripe);
        }

        const cmosHolder = new THREE.Mesh(
            new THREE.CylinderGeometry(0.25, 0.25, 0.07, 24),
            new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.5 })
        );
        cmosHolder.position.set(-0.35, 0.09, 1.62);
        moboGroup.add(cmosHolder);

        const cmosCoin = new THREE.Mesh(
            new THREE.CylinderGeometry(0.20, 0.20, 0.09, 24),
            capSilverMat
        );
        cmosCoin.position.set(-0.35, 0.10, 1.62);
        moboGroup.add(cmosCoin);

        const ioBlock = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.68, 1.95),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.22 })
        );
        ioBlock.position.set(-2.5, 0.39, -1.35);
        ioBlock.castShadow = true;
        moboGroup.add(ioBlock);

        const jackColors = [0xec4899, 0x22c55e, 0x3b82f6];
        jackColors.forEach((col, idx) => {
            const jack = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12),
                new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 })
            );
            jack.rotation.z = Math.PI / 2;
            jack.position.set(-2.78, 0.26, -0.65 - idx * 0.18);
            moboGroup.add(jack);
        });

        for (let s = 0; s < 2; s++) {
            const sata = new THREE.Mesh(
                new THREE.BoxGeometry(0.24, 0.18, 0.42),
                new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
            );
            sata.position.set(2.55, 0.15, 1.35 + s * 0.55);
            moboGroup.add(sata);
        }

        return moboGroup;
    }

    /**
     * Processor (CPU) Realistis: Substrat PCB hijau multi-lapis, IHS logam berlekuk,
     * dan kontak pin emas presisi.
     */
    function buildCPU3D() {
        const g = new THREE.Group();

        // Substrat PCB hijau tua khas prosesor
        const greenPCB = new THREE.Mesh(
            new THREE.BoxGeometry(1.02, 0.055, 0.94),
            new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.35, metalness: 0.15 })
        );
        greenPCB.castShadow = true;
        g.add(greenPCB);

        // Matriks kontak emas di bagian bawah
        const goldContact = new THREE.Mesh(
            new THREE.BoxGeometry(0.94, 0.02, 0.86),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.96, roughness: 0.16 })
        );
        goldContact.position.y = -0.026;
        g.add(goldContact);

        // Pelat Integrated Heat Spreader (IHS) utama
        const ihsMat = new THREE.MeshStandardMaterial({
            map: T.createCPUIHSTexture(),
            metalness: 0.88,
            roughness: 0.18
        });
        const ihsMain = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.085, 0.78), ihsMat);
        ihsMain.position.y = 0.065;
        ihsMain.castShadow = true;
        g.add(ihsMain);

        // Kuping pengunci (retaining notches/ears) di kiri-kanan IHS
        const earMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.90, roughness: 0.20 });
        const earBar = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.048, 0.26), earMat);
        earBar.position.y = 0.048;
        g.add(earBar);

        return g;
    }

    /**
     * Memory RAM Bentuk Asli Hijau (Bare Green PCB DIMM):
     * Keping PCB hijau dengan 8 chip memori IC hitam di kedua sisi, kapasitor SMD,
     * stiker putih spesifikasi, dan deretan pin emas dengan celah takik (notch).
     */
    function buildRAM3D() {
        const g = new THREE.Group();
        const greenPcbTex = T.createGreenRAMPCBTexture();

        [-0.18, 0.18].forEach(offsetX => {
            const stick = new THREE.Group();
            stick.position.x = offsetX;

            // Papan PCB hijau asli (ramping & proporsional seperti keping DIMM sungguhan)
            const pcbMat = new THREE.MeshStandardMaterial({
                map: greenPcbTex,
                roughness: 0.36,
                metalness: 0.18
            });
            const pcbBoard = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.52, 2.12), pcbMat);
            pcbBoard.position.y = 0.34;
            pcbBoard.castShadow = true;
            stick.add(pcbBoard);

            // Deretan pin konektor emas (gold fingers) dipisahkan takik kunci (key notch)
            const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.96, roughness: 0.16 });
            const pinsFront = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.08, 1.08), goldMat);
            pinsFront.position.set(0, 0.05, -0.49);
            stick.add(pinsFront);

            const pinsBack = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.08, 0.88), goldMat);
            pinsBack.position.set(0, 0.05, 0.58);
            stick.add(pinsBack);

            // 8 Chip Memori IC Hitam (DRAM FBGA Packages) di sisi kiri & kanan papan hijau
            const chipMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.42, metalness: 0.25 });
            const chipZPositions = [-0.84, -0.60, -0.36, -0.12, 0.12, 0.36, 0.60, 0.84];
            chipZPositions.forEach(zPos => {
                // Skip bagian tengah agar stiker putih terlihat jelas
                if (Math.abs(zPos) < 0.26) return;
                [-0.025, 0.025].forEach(sideX => {
                    const icChip = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.22, 0.15), chipMat);
                    icChip.position.set(sideX, 0.36, zPos);
                    stick.add(icChip);
                });
            });

            // Chip PMIC (Power Management IC) kecil di bagian tengah atas
            const pmicChip = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.11, 0.11), chipMat);
            pmicChip.position.set(0, 0.49, 0);
            stick.add(pmicChip);

            g.add(stick);
        });

        return g;
    }

    function buildSSD3D() {
        const g = new THREE.Group();

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(1.34, 0.055, 0.44),
            new THREE.MeshStandardMaterial({
                map: T.createSSDTexture(),
                roughness: 0.32,
                metalness: 0.22
            })
        );
        board.castShadow = true;
        g.add(board);

        const goldEdge = new THREE.Mesh(
            new THREE.BoxGeometry(0.11, 0.06, 0.42),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.94, roughness: 0.18 })
        );
        goldEdge.position.x = -0.68;
        g.add(goldEdge);

        const screwHead = new THREE.Mesh(
            new THREE.CylinderGeometry(0.065, 0.065, 0.08, 16),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
        );
        screwHead.position.set(0.65, 0.02, 0);
        g.add(screwHead);

        return g;
    }

    /**
     * VGA / GPU Card NVIDIA GeForce RTX 5090 Founders Edition Style:
     * Rangka logam gunmetal, sirip heatsink padat, pipa tembaga, logo GEFORCE RTX hijau-putih,
     * konektor daya 16-pin, dan kipas ganda 11-bilah axial-tech.
     */
    function buildVGA3D(fanMeshesOut) {
        const g = new THREE.Group();

        // Backplate & PCB hitam presisi
        const pcb = new THREE.Mesh(
            new THREE.BoxGeometry(3.25, 0.08, 1.38),
            new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.35, metalness: 0.3 })
        );
        pcb.position.y = 0.16;
        g.add(pcb);

        // Sirip Heatsink Aluminium Padat
        const heatsinkCore = new THREE.Mesh(
            new THREE.BoxGeometry(3.05, 0.28, 1.24),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.90, roughness: 0.22 })
        );
        heatsinkCore.position.y = 0.34;
        g.add(heatsinkCore);

        // Pipa pendingin tembaga (Copper Heatpipes)
        [-0.58, 0.58].forEach(zPipe => {
            const copperPipe = new THREE.Mesh(
                new THREE.CylinderGeometry(0.04, 0.04, 2.95, 16),
                new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.94, roughness: 0.18 })
            );
            copperPipe.rotation.z = Math.PI / 2;
            copperPipe.position.set(0, 0.36, zPipe);
            g.add(copperPipe);
        });

        // Shroud luar NVIDIA GeForce RTX bertekstur logam gunmetal + logo GEFORCE RTX
        const shroudMat = new THREE.MeshStandardMaterial({
            map: T.createNvidiaVGAShroudTexture(),
            metalness: 0.82,
            roughness: 0.24
        });
        const shroud = new THREE.Mesh(new THREE.BoxGeometry(3.28, 0.26, 1.40), shroudMat);
        shroud.position.y = 0.58;
        shroud.castShadow = true;
        g.add(shroud);

        // Aksen LED menyala bertuliskan GEFORCE RTX di sisi depan kartu
        const rtxGlowBar = new THREE.Mesh(
            new THREE.BoxGeometry(1.15, 0.07, 0.03),
            new THREE.MeshStandardMaterial({
                color: 0x76b900,
                emissive: 0x76b900,
                emissiveIntensity: 0.85,
                roughness: 0.2
            })
        );
        rtxGlowBar.position.set(0, 0.58, 0.71);
        g.add(rtxGlowBar);

        // Konektor daya 16-Pin (12V-2x6) di tepi atas
        const power16Pin = new THREE.Mesh(
            new THREE.BoxGeometry(0.32, 0.14, 0.18),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
        );
        power16Pin.position.set(0.35, 0.64, 0.56);
        g.add(power16Pin);

        // Braket I/O baja di sisi belakang
        const rearBracket = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.90, 1.42),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.18 })
        );
        rearBracket.position.set(-1.66, 0.34, 0);
        g.add(rearBracket);

        // Konektor emas PCIe 5.0 x16
        const pciePins = new THREE.Mesh(
            new THREE.BoxGeometry(2.18, 0.14, 0.07),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.16 })
        );
        pciePins.position.set(-0.24, 0.06, -0.36);
        g.add(pciePins);

        // Dua Kipas Besar Axial-Tech Khas NVIDIA RTX
        [-0.86, 0.86].forEach(fx => {
            const fanRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.54, 0.035, 12, 32),
                new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
            );
            fanRing.rotation.x = Math.PI / 2;
            fanRing.position.set(fx, 0.72, 0);
            g.add(fanRing);

            const fanWell = new THREE.Mesh(
                new THREE.CylinderGeometry(0.53, 0.53, 0.05, 32),
                new THREE.MeshStandardMaterial({ color: 0x060912, roughness: 0.5 })
            );
            fanWell.position.set(fx, 0.70, 0);
            g.add(fanWell);

            const fanRotor = new THREE.Group();
            fanRotor.position.set(fx, 0.72, 0);

            const hub = new THREE.Mesh(
                new THREE.CylinderGeometry(0.15, 0.15, 0.055, 24),
                new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 })
            );
            fanRotor.add(hub);

            const hubAccent = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, 0.06, 20),
                new THREE.MeshStandardMaterial({ color: 0x76b900, metalness: 0.7, roughness: 0.25 })
            );
            fanRotor.add(hubAccent);

            for (let b = 0; b < 11; b++) {
                const blade = new THREE.Mesh(
                    new THREE.BoxGeometry(0.47, 0.018, 0.075),
                    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.28 })
                );
                blade.rotation.y = (b * Math.PI * 2) / 11;
                blade.rotation.x = 0.28;
                fanRotor.add(blade);
            }
            if (fanMeshesOut) fanMeshesOut.push(fanRotor);
            g.add(fanRotor);
        });

        return g;
    }

    function buildPSU3D() {
        const g = new THREE.Group();

        const chassis = new THREE.Mesh(
            new THREE.BoxGeometry(1.96, 1.02, 1.96),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.78, roughness: 0.34 })
        );
        chassis.position.y = 0.51;
        chassis.castShadow = true;
        g.add(chassis);

        const label = new THREE.Mesh(
            new THREE.PlaneGeometry(1.72, 0.86),
            new THREE.MeshStandardMaterial({ map: T.createPSULabelTexture(), roughness: 0.35 })
        );
        label.rotation.x = -Math.PI / 2;
        label.position.set(0, 1.025, 0);
        g.add(label);

        const acSocket = new THREE.Mesh(
            new THREE.BoxGeometry(0.10, 0.36, 0.52),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
        );
        acSocket.position.set(-0.99, 0.52, 0.45);
        g.add(acSocket);

        const switchRed = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.22, 0.16),
            new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
        );
        switchRed.position.set(-0.99, 0.52, -0.35);
        g.add(switchRed);

        return g;
    }

    function buildCable3D() {
        const g = new THREE.Group();

        const atxColors = [0xfacc15, 0xdc2626, 0xf97316, 0x111827, 0xfacc15];
        for (let i = 0; i < atxColors.length; i++) {
            const offset = (i - 2) * 0.065;
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-4.15, 0.58, 2.05 + offset),
                new THREE.Vector3(-3.15, 1.42, 1.15 + offset),
                new THREE.Vector3(-0.35, 1.58, 0.15 + offset),
                new THREE.Vector3(1.85, 0.55, -0.58 + offset)
            ]);
            const tube = new THREE.Mesh(
                new THREE.TubeGeometry(curve, 36, 0.032, 8, false),
                new THREE.MeshStandardMaterial({ color: atxColors[i], roughness: 0.42, metalness: 0.15 })
            );
            tube.castShadow = true;
            g.add(tube);
        }

        const connector24 = new THREE.Mesh(
            new THREE.BoxGeometry(0.32, 0.28, 1.24),
            new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.38 })
        );
        connector24.position.set(1.85, 0.45, -0.58);
        g.add(connector24);

        return g;
    }

    return {
        buildMotherboardAssembly,
        buildCPU3D,
        buildRAM3D,
        buildSSD3D,
        buildVGA3D,
        buildPSU3D,
        buildCable3D
    };
})();