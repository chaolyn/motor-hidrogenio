let currentKit = "TURBO";

function changeKit() {
    currentKit = document.getElementById('kitSelect').value;
    alert("Sistema reconfigurado para modo: " + currentKit);
}

function updateSimulation() {
    const rpmEl = document.getElementById('rpm');
    if(!rpmEl) return;

    // Define RPM base conforme o KIT
    let baseRpm = currentKit === "BITURBO" ? 4500 : (currentKit === "SUPERCHARGER" ? 3200 : 1800);
    let rpm = Math.floor(Math.random() * 1500 + baseRpm);
    
    // Vazão de H2: Biturbo injeta o dobro
    let h2Multi = currentKit === "BITURBO" ? 2.5 : 1.2;
    let vazaoH2 = (rpm / 3000 * h2Multi).toFixed(2);

    // Gestão Térmica (Porsche): A válvula abre mais em alta RPM
    let tmmValvula = Math.min(Math.floor(rpm / 65), 100);
    let tempStatus = tmmValvula > 70 ? "ARREFECIMENTO MÁXIMO" : (tmmValvula > 30 ? "OTIMIZAÇÃO TÉRMICA" : "AQUECIMENTO RÁPIDO");

    // Energia Solar: Variação entre 12.5V e 14.2V
    let solarVolt = (12.5 + Math.random() * 1.7).toFixed(1);

    // Atualização da Interface
    rpmEl.innerText = rpm + " RPM";
    document.getElementById('h2-flow').innerText = vazaoH2 + " L/min";
    document.getElementById('tmm').innerText = tmmValvula + "%";
    document.getElementById('temp-val').innerText = tempStatus;
    document.getElementById('solar').innerText = solarVolt + "V";

    // Geração do Log SQL para apresentação
    const log = `INSERT INTO Telemetria_Integrada (kit, rpm, h2, tmm_pct, solar_v) VALUES ('${currentKit}', ${rpm}, ${vazaoH2}, ${tmmValvula}, ${solarVolt});`;
    document.getElementById('sql-log').innerText = log;
}

// Atualiza os dados a cada 1.2 segundos para simular tempo real
setInterval(updateSimulation, 1200);