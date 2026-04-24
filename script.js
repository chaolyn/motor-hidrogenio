
let isSystemActive = true;
let currentKit = "TURBO";

function toggleSystem() {
    isSystemActive = !isSystemActive;
    const btn = document.getElementById('btnStop');
    const status = document.getElementById('status-bar');

    if (!isSystemActive) {
        btn.innerText = "RESUME SYSTEM";
        btn.classList.add('active');
        status.innerText = "!!! EMERGENCY SHUTDOWN ACTIVE !!!";
        status.className = "status-offline";
    } else {
        btn.innerText = "EMERGENCY STOP";
        btn.classList.remove('active');
        status.innerText = "SISTEMA OPERACIONAL";
        status.className = "status-online";
    }
}

function changeKit() {
    currentKit = document.getElementById('kitSelect').value;
}

function updateSimulation() {
    if (!isSystemActive) {
        // Se o sistema parar, zeramos o H2 e abrimos a válvula Porsche 100% por segurança
        document.getElementById('h2-vazao').innerText = "0.00";
        document.getElementById('tmm').innerText = "100%";
        document.getElementById('sql-log').innerText = `-- EMERGENCY: Injeção cortada. Válvula TMM aberta 100%.`;
        return;
    }

    // Lógica normal
    let baseRpm = currentKit === "BITURBO" ? 4500 : (currentKit === "SUPERCHARGER" ? 3000 : 2000);
    let rpm = Math.floor(Math.random() * 2000 + baseRpm);
    let h2Vazao = (rpm / 1500 + Math.random()).toFixed(2);
    let tmmValvula = Math.min(Math.floor(rpm / 70), 100);
    let solarVolt = (12 + Math.random() * 2.5).toFixed(1);

    // Atualiza Tela
    document.getElementById('rpm-display').innerText = rpm + " RPM";
    document.getElementById('h2-vazao').innerText = h2Vazao;
    document.getElementById('tmm').innerText = tmmValvula + "%";
    document.getElementById('solar').innerText = solarVolt + "V";

    // SQL Log
    const sql = `INSERT INTO Telemetria_Integrada (kit, rpm, h2_flow, tmm_pos, solar_v) 
                 VALUES ('${currentKit}', ${rpm}, ${h2Vazao}, ${tmmValvula}, ${solarVolt});`;
    document.getElementById('sql-log').innerText = sql;
}

setInterval(updateSimulation, 1000);