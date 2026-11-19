/**
 * ============================================================================
 * PBR TEXTURE GENERATOR (static/js/textures_pbr.js)
 * Tekstur resolusi tinggi untuk Casing Armaggeddon Putih, VGA NVIDIA RTX,
 * RAM PCB Hijau Asli, Processor, Monitor Samsung, Meja Kayu, & Dinding Kerja.
 * ============================================================================
 */

window.HardwareTextures = (function () {
    function createMotherboardPCBTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 1024;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#0d231a';
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 1024; i += 6) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(218, 178, 62, 0.34)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 95; i++) {
            const x = 55 + (i * 11) % 910;
            const y = 70 + ((i * 41) % 880);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 75, y);
            ctx.lineTo(x + 115, y + 38);
            ctx.lineTo(x + 220, y + 38);
            ctx.stroke();

            ctx.fillStyle = '#eab308';
            ctx.beginPath();
            ctx.arc(x, y, 2.8, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(45, 720);
        ctx.lineTo(190, 720);
        ctx.lineTo(220, 760);
        ctx.lineTo(220, 975);
        ctx.stroke();

        ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('SIM-HARDWARE Z890-PRO ATX', 65, 968);

        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#fde047';
        ctx.fillText('SOCKET LGA1851 (CPU)', 375, 235);
        ctx.fillText('DDR5_DIMM_A1 / B1 (RAM)', 630, 128);
        ctx.fillText('M.2_NVME_PCIe5 (SSD)', 365, 515);
        ctx.fillText('PCIEX16_STEEL (VGA)', 215, 642);
        ctx.fillText('ATX_PWR_24PIN', 835, 340);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('HD_AUDIO', 80, 910);
        ctx.fillText('SATA6G_1..4', 790, 860);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    function createCPUSocketPinTexture() {
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 256;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(0, 0, 256, 256);

        ctx.fillStyle = '#facc15';
        for (let y = 12; y < 244; y += 5) {
            for (let x = 12; x < 244; x += 5) {
                if (x > 96 && x < 160 && y > 96 && y < 160) continue;
                ctx.fillRect(x, y, 2.5, 2.5);
            }
        }
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(98, 98, 60, 60);
        return new THREE.CanvasTexture(c);
    }

    function createCPUIHSTexture() {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        const ctx = c.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#cbd5e1');
        grad.addColorStop(0.35, '#f8fafc');
        grad.addColorStop(0.7, '#e2e8f0');
        grad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Tekstur brushed nickel halus
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.04)';
        ctx.lineWidth = 1;
        for (let y = 0; y < 512; y += 3) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(512, y);
            ctx.stroke();
        }

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 8;
        ctx.strokeRect(18, 18, 476, 476);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 31px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('INTEL® CORE™ ULTRA 9', 256, 165);
        ctx.font = 'bold 25px monospace';
        ctx.fillText('285K • 5.70GHz • 24-CORE', 256, 215);
        ctx.font = '19px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText('SRL42 • LGA1851', 256, 265);
        ctx.fillText('SMPIT SAHABAT ALAM', 256, 315);

        // Segitiga penanda orientasi pin
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.moveTo(34, 478);
        ctx.lineTo(86, 478);
        ctx.lineTo(34, 426);
        ctx.closePath();
        ctx.fill();

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur RAM PCB Hijau Asli (Bare Green Circuit Board + Jalur Tembaga + Label Putih)
     */
    function createGreenRAMPCBTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 256;
        const ctx = c.getContext('2d');

        // Warna hijau PCB asli standar industri memori
        const pcbGrad = ctx.createLinearGradient(0, 0, 0, 256);
        pcbGrad.addColorStop(0, '#15803d');
        pcbGrad.addColorStop(0.5, '#166534');
        pcbGrad.addColorStop(1, '#14532d');
        ctx.fillStyle = pcbGrad;
        ctx.fillRect(0, 0, 1024, 256);

        // Jalur sirkuit tembaga halus di balik solder mask hijau
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
        ctx.lineWidth = 2;
        for (let i = 16; i < 1008; i += 14) {
            ctx.beginPath();
            ctx.moveTo(i, 220);
            ctx.lineTo(i, 175);
            ctx.lineTo(i + 8, 155);
            ctx.lineTo(i + 8, 35);
            ctx.stroke();
        }

        // Lubang mounting & titik vias emas
        ctx.fillStyle = '#facc15';
        [36, 512, 988].forEach(vx => {
            ctx.beginPath();
            ctx.arc(vx, 32, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#052e16';
            ctx.beginPath();
            ctx.arc(vx, 32, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#facc15';
        });

        // Stiker label spesifikasi memori putih di tengah keping hijau
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(365, 58, 294, 96);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(365, 58, 294, 96);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 21px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('16GB 2Rx8 PC5-5600B', 380, 92);
        ctx.font = '16px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText('DDR5 SDRAM • 1.1V • GREEN PCB', 380, 120);
        ctx.fillText('SN: 2026-TIK-VII-0891', 380, 142);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur Shroud VGA NVIDIA GeForce RTX Terbaru (RTX 5090 Style)
     */
    function createNvidiaVGAShroudTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 384;
        const ctx = c.getContext('2d');

        // Rangka logam gunmetal gelap-titanium khas Founders Edition
        const grad = ctx.createLinearGradient(0, 0, 1024, 384);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(0.5, '#334155');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 384);

        // Garis desain X-frame khas NVIDIA Founders Edition
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(430, 18);
        ctx.lineTo(594, 366);
        ctx.moveTo(594, 18);
        ctx.lineTo(430, 366);
        ctx.stroke();

        // Aksen hijau khas NVIDIA
        ctx.fillStyle = '#76b900';
        ctx.fillRect(425, 174, 174, 36);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GEFORCE RTX', 512, 199);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('RTX 5090 • 32GB GDDR7', 512, 348);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur Logo & Branding Casing Putih ARMAGGEDDON
     */
    function createArmaggeddonCaseTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 256;
        const ctx = c.getContext('2d');

        // Dasar putih bersih powder-coated
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 1024, 256);

        // Garis aksen futuristik hitam & biru-es
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(0, 215);
        ctx.lineTo(680, 215);
        ctx.lineTo(720, 256);
        ctx.lineTo(0, 256);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#0284c7';
        ctx.fillRect(48, 52, 14, 118);

        // Ikon geometris Armaggeddon
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(92, 152);
        ctx.lineTo(132, 62);
        ctx.lineTo(172, 152);
        ctx.moveTo(108, 122);
        ctx.lineTo(156, 122);
        ctx.stroke();

        // Tipografi merek ARMAGGEDDON
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 54px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('ARMAGGEDDON', 202, 124);

        ctx.fillStyle = '#475569';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('NIMITZ TR8000 • TEMPERED GLASS WHITE EDITION', 205, 164);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur Bezel Bawah Monitor SAMSUNG Terbaru
     */
    function createSamsungBezelTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 96;
        const ctx = c.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 1024, 0);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(0.5, '#334155');
        grad.addColorStop(1, '#1e293b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 96);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 34px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('S A M S U N G', 512, 58);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur Meja Kerja Serat Kayu Natural Oak Realistis
     */
    function createWoodDeskTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 1024;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#b07d4f';
        ctx.fillRect(0, 0, 1024, 1024);

        for (let y = 0; y < 1024; y += 2) {
            const wave = Math.sin(y * 0.03) * 14;
            ctx.strokeStyle = y % 6 === 0 ? 'rgba(92, 56, 24, 0.22)' : 'rgba(222, 184, 135, 0.14)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(340, y + wave, 680, y - wave, 1024, y);
            ctx.stroke();
        }

        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(2, 1);
        tex.anisotropy = 8;
        return tex;
    }

    /**
     * Tekstur Dinding Kerja Rapi dengan Panel Kisi Kayu Akustik (Wood Slat Wall)
     */
    function createOfficeWallTexture() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 512;
        const ctx = c.getContext('2d');

        // Cat dinding putih-hangat bersih (warm off-white)
        ctx.fillStyle = '#eef2f6';
        ctx.fillRect(0, 0, 1024, 512);

        // Panel kisi kayu akustik vertikal di bagian tengah dinding kerja
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(260, 0, 504, 512);

        for (let x = 272; x < 756; x += 24) {
            const slatGrad = ctx.createLinearGradient(x, 0, x + 14, 0);
            slatGrad.addColorStop(0, '#855834');
            slatGrad.addColorStop(0.5, '#a97449');
            slatGrad.addColorStop(1, '#6f4728');
            ctx.fillStyle = slatGrad;
            ctx.fillRect(x, 0, 14, 512);
        }

        // Bingkai papan informasi laboratorium TIK di sisi kiri dinding
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(58, 95, 165, 220);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.strokeRect(58, 95, 165, 220);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(74, 115, 133, 28);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LAB KOMPUTER TIK', 140, 134);
        ctx.fillStyle = '#334155';
        ctx.font = '11px sans-serif';
        ctx.fillText('1. Pasang CPU & RAM', 140, 172);
        ctx.fillText('2. Pasang SSD & VGA', 140, 198);
        ctx.fillText('3. Pasang PSU & Kabel', 140, 224);
        ctx.fillText('4. Tekan Power Casing', 140, 250);

        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 8;
        return tex;
    }

    function createSSDTexture() {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 256;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, 512, 256);

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(48, 36, 92, 184);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('NVMe CTRL', 54, 132);

        const grad = ctx.createLinearGradient(155, 30, 465, 220);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = grad;
        ctx.fillRect(156, 30, 312, 196);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(156, 30, 312, 196);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('SSD NVMe M.2', 176, 86);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('1TB • PCIe Gen5 x4', 176, 132);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '17px monospace';
        ctx.fillText('Read 12000MB/s • 2280', 176, 176);

        return new THREE.CanvasTexture(c);
    }

    function createPSULabelTexture() {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 256;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 512, 256);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(10, 10, 492, 236);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 34px sans-serif';
        ctx.fillText('ATX 850W', 30, 62);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('80 PLUS GOLD • ATX 3.1', 210, 60);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 86, 452, 130);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '16px monospace';
        ctx.fillText('AC INPUT : 100-240V ~ 50/60Hz 10A', 44, 116);
        ctx.fillStyle = '#fde047';
        ctx.fillText('DC OUTPUT: +12V (70A) | +5V (20A) | +3.3V (20A)', 44, 152);
        ctx.fillStyle = '#4ade80';
        ctx.fillText('STATUS   : POWER SUPPLY EKSTERNAL MOTHERBOARD', 44, 188);

        return new THREE.CanvasTexture(c);
    }

    function renderMonitorCanvas(ctx, w, h, mode, errorMsg = '') {
        if (mode === 'OFF') {
            ctx.fillStyle = '#070b14';
            ctx.fillRect(0, 0, w, h);

            const sheen = ctx.createLinearGradient(0, 0, w, h);
            sheen.addColorStop(0, 'rgba(255,255,255,0.08)');
            sheen.addColorStop(0.5, 'rgba(255,255,255,0.02)');
            sheen.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = sheen;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 22px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('SAMSUNG ODYSSEY • NO SIGNAL (TEKAN POWER CASING)', w / 2, h / 2);
        } else if (mode === 'BIOS') {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 28px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('SAMSUNG UEFI DISPLAY • SIM-HARDWARE BIOS', 48, 76);

            ctx.fillStyle = '#e2e8f0';
            ctx.font = '21px monospace';
            ctx.fillText('CPU : Intel(R) Core(TM) Ultra 9 285K @ 5.70GHz [OK]', 48, 150);
            ctx.fillText('MEM : 16384 MB DDR5-5600 Green PCB Dual-Ch     [OK]', 48, 198);
            ctx.fillText('SSD : 1000 GB NVMe M.2 PCIe Gen5 x4            [OK]', 48, 246);
            ctx.fillText('VGA : NVIDIA GeForce RTX 5090 32GB GDDR7       [OK]', 48, 294);
            ctx.fillText('PSU : 850W ATX 3.1 24-Pin + 16-Pin PCIe Power  [OK]', 48, 342);

            ctx.fillStyle = '#4ade80';
            ctx.fillText('POST Complete. Loading Windows 11 Pro...', 48, 430);
        } else if (mode === 'WINDOWS') {
            const grad = ctx.createRadialGradient(w * 0.54, h * 0.45, 35, w * 0.5, h * 0.5, w * 0.78);
            grad.addColorStop(0, '#38bdf8');
            grad.addColorStop(0.45, '#2563eb');
            grad.addColorStop(0.85, '#1e1b4b');
            grad.addColorStop(1, '#090d16');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = 'rgba(147, 197, 253, 0.25)';
            ctx.beginPath();
            ctx.ellipse(w * 0.54, h * 0.46, 240, 125, -0.35, 0, Math.PI * 2);
            ctx.fill();

            const icons = [
                { y: 45, label: 'This PC', color: '#38bdf8' },
                { y: 150, label: 'Device Mgr', color: '#4ade80' },
                { y: 255, label: 'Sertifikat', color: '#fbbf24' }
            ];
            icons.forEach(ic => {
                ctx.fillStyle = ic.color;
                ctx.fillRect(40, ic.y, 46, 38);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(ic.label, 63, ic.y + 56);
            });

            ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
            ctx.fillRect(220, 95, 610, 365);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
            ctx.lineWidth = 2;
            ctx.strokeRect(220, 95, 610, 365);

            ctx.fillStyle = '#1e293b';
            ctx.fillRect(220, 95, 610, 42);
            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 18px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Windows 11 Pro — Samsung Monitor Active', 240, 122);

            ctx.fillStyle = '#4ade80';
            ctx.font = 'bold 25px sans-serif';
            ctx.fillText('✓ PERAKITAN PC 3D BERHASIL 100%', 248, 184);

            ctx.fillStyle = '#e2e8f0';
            ctx.font = '18px sans-serif';
            ctx.fillText('• CPU     : Intel Core Ultra 9 285K (LGA1851)', 248, 230);
            ctx.fillText('• RAM     : 16GB DDR5 Green PCB Dual-Channel', 248, 265);
            ctx.fillText('• VGA     : NVIDIA GeForce RTX 5090 32GB GDDR7', 248, 300);
            ctx.fillText('• CASING  : Armaggeddon White ATX Edition', 248, 335);
            ctx.fillText('• MONITOR : Samsung Odyssey OLED Display', 248, 370);

            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 15px sans-serif';
            ctx.fillText('Klik layar monitor Samsung ini untuk membuka Windows penuh!', 248, 422);

            ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
            ctx.fillRect(0, h - 48, w, 48);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(w / 2 - 70, h - 36, 24, 24);
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(w / 2 - 34, h - 36, 24, 24);
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(w / 2 + 2, h - 36, 24, 24);
            ctx.fillStyle = '#34d399';
            ctx.fillRect(w / 2 + 38, h - 36, 24, 24);
        } else if (mode === 'ERROR') {
            ctx.fillStyle = '#991b1b';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 72px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(':(', 60, 125);

            ctx.font = 'bold 26px sans-serif';
            ctx.fillText('HARDWARE BOOT ERROR — PERAKITAN BELUM LENGKAP / SALAH!', 60, 192);

            ctx.font = '19px monospace';
            ctx.fillStyle = '#fecaca';
            const words = errorMsg.split(' ');
            let line = '';
            let y = 252;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                if (ctx.measureText(testLine).width > 890 && n > 0) {
                    ctx.fillText(line, 60, y);
                    line = words[n] + ' ';
                    y += 30;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 60, y);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 17px monospace';
            ctx.fillText('TINDAKAN: Lengkapi & perbaiki posisi komponen, lalu tekan tombol Power lagi.', 60, 520);
        }
    }

    return {
        createMotherboardPCBTexture,
        createCPUSocketPinTexture,
        createCPUIHSTexture,
        createGreenRAMPCBTexture,
        createNvidiaVGAShroudTexture,
        createArmaggeddonCaseTexture,
        createSamsungBezelTexture,
        createWoodDeskTexture,
        createOfficeWallTexture,
        createSSDTexture,
        createPSULabelTexture,
        renderMonitorCanvas
    };
})();