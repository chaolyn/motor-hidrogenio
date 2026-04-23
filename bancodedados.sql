
-- DATABASE: H2_CORE_ULTIMATE
CREATE TABLE Motores (
    id_motor INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    configuracao VARCHAR(20), -- V6, V8, I4
    taxa_compressao DECIMAL(4,1),
    cilindrada_cc INT
);

CREATE TABLE Modulos_H2 (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    serial_n VARCHAR(50) UNIQUE,
    versao_firmware VARCHAR(10),
    pressao_nominal_bar DECIMAL(5,2)
);

CREATE TABLE Telemetria_Realtime (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rpm INT,
    vazao_h2_ls DECIMAL(5,2),
    temperatura_egt INT, -- Exhaust Gas Temp
    afr_lambda DECIMAL(4,2),
    status_seguranca VARCHAR(50) DEFAULT 'OPERATIONAL',
    eficiencia_ganho_pct DECIMAL(5,2)
);

-- DATABASE: H2_CORE_HYBRID_SYSTEM
CREATE TABLE Telemetria_Integrada (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    kit_selecionado VARCHAR(20), -- Turbo, Biturbo ou Supercharger
    rpm INT,
    vazao_h2 DECIMAL(5,2),      -- Litros por minuto de H2
    temp_motor_c INT,           -- Temperatura lida pelo sensor
    tmm_valvula_pct INT,        -- Abertura da válvula Porsche (0-100%)
    solar_volt DECIMAL(4,2),    -- Voltagem captada pelas placas
    economia_estimada_pct INT   -- Cálculo de eficiência em tempo real
);