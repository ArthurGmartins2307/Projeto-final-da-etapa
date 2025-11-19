const atividadeSelect = document.getElementById("atividade");
const atividadesExtrasContainer = document.getElementById("atividadesExtrasContainer");

atividadeSelect.addEventListener("change", () => {
    if (atividadeSelect.value === "1.2") {
        atividadesExtrasContainer.style.display = "none";

        document.querySelectorAll("#atividadesExtras input")
            .forEach(cb => cb.checked = false);

        document.getElementById("frequencia").value = "";
    } else {
        atividadesExtrasContainer.style.display = "block";
    }
});


document.getElementById("formCalorias").addEventListener("submit", function (event) {
    event.preventDefault();

    //  inputs
    const sexo = document.getElementById("sexo").value;
    const idade = parseInt(document.getElementById("idade").value, 10);
    const peso = parseFloat(document.getElementById("peso").value);
    const alturaCm = parseFloat(document.getElementById("altura").value);
    const atividade = parseFloat(document.getElementById("atividade").value);
    const objetivo = document.getElementById("objetivo").value;

    const alturaM = alturaCm / 100;

    // atividades extras
    const atividadesSelecionadas = Array.from(document.querySelectorAll("#atividadesExtras input:checked"))
        .map(cb => cb.value);

    const frequencia = parseInt(document.getElementById("frequencia").value) || 0;


    // cálculo TMB
    let tmb;
    if (sexo === "masculino") {
        tmb = (10 * peso) + (6.25 * alturaCm) - (5 * idade) + 5;
    } else {
        tmb = (10 * peso) + (6.25 * alturaCm) - (5 * idade) - 161;
    }

    // IMC
    const imc = peso / (alturaM * alturaM);

    // GET base
    const getBase = tmb * atividade;

    //  gasto extra das atividades
    const tabelaKcal = {
        "academia": 245,
        "atletismo": 560,
        "boxe": 490,
        "caminhada": 231,
        "capoeira": 560,
        "ciclismo": 490,
        "corrida": 581,
        "crossfit": 700,
        "jiu jitsu": 490,
        "judo": 700,
        "karate": 721,
        "kickboxing": 700,
        "krav maga": 630,
        "muay thai": 686,
        "natação": 490,
        "taekwondo": 700
    };


    let caloriasExtrasSemana = 0;

    atividadesSelecionadas.forEach(a => {
        caloriasExtrasSemana += tabelaKcal[a] * frequencia;
    });

    // transforma para kcal/dia
    const caloriasExtrasDia = caloriasExtrasSemana / 7;

    // GET final antes do objetivo
    let get = getBase + caloriasExtrasDia;

    //  Déficit / Superávit
    let ajusteCalorias = 0;
    let decisaoTexto = "";

    if (objetivo === "emagrecer") {
        if (imc >= 30) {
            ajusteCalorias = -550;
            decisaoTexto = "IMC ≥ 30: déficit forte (-550 kcal).";
        } else if (imc >= 27.5) {
            ajusteCalorias = -500;
            decisaoTexto = "IMC 27.5–29.9: déficit alto (-500 kcal).";
        } else if (imc >= 25) {
            ajusteCalorias = -450;
            decisaoTexto = "IMC 25–27.4: déficit moderado (-450 kcal).";
        } else if (imc >= 23) {
            ajusteCalorias = -400;
            decisaoTexto = "IMC 23–24.9: déficit moderado (-400 kcal).";
        } else if (imc >= 18.5) {
            ajusteCalorias = -300;
            decisaoTexto = "IMC 18.5–22.9: déficit leve (-300 kcal).";
        } else {
            ajusteCalorias = 0;
            decisaoTexto = "IMC baixo — não recomendado emagrecer.";
        }
    }

    if (objetivo === "manter") {
        ajusteCalorias = 0;
        decisaoTexto = "Manutenção: calorias próximas ao gasto.";
    }

    if (objetivo === "ganhar") {
        if (imc < 18.5) {
            ajusteCalorias = +500;
            decisaoTexto = "Superávit forte (+500 kcal).";
        } else if (imc < 23) {
            ajusteCalorias = +400;
            decisaoTexto = "Superávit moderado (+400 kcal).";
        } else {
            ajusteCalorias = +300;
            decisaoTexto = "Superávit leve (+300 kcal).";
        }
    }

    //  calorias finais
    let caloriasFinais = get + ajusteCalorias;

    // segurança
    const minCal = sexo === "masculino" ? 1500 : 1200;
    let avisoSeguranca = "";

    if (objetivo === "emagrecer" && caloriasFinais < minCal) {
        caloriasFinais = minCal;
        avisoSeguranca = `Calorias ajustadas para o mínimo seguro (${minCal} kcal/dia).`;
    }

    //  macros
    let proteina_g_por_kg =
        objetivo === "emagrecer" ? 2.2 :
            objetivo === "manter" ? 1.6 : 1.9;

    const proteina_g = peso * proteina_g_por_kg;
    const proteina_kcal = proteina_g * 4;

    let gordura_kcal = caloriasFinais * (objetivo === "ganhar" ? 0.30 : 0.25);
    let gordura_g = gordura_kcal / 9;

    let carbo_kcal = caloriasFinais - (proteina_kcal + gordura_kcal);
    let carbo_g = Math.max(0, carbo_kcal / 4);

    // Exibição
    const div = document.getElementById("resultado");
    div.style.display = "block";

    div.innerHTML = `
        <h2>Resultado Avançado</h2>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>TMB:</strong> ${tmb.toFixed(2)} kcal</p>
        <p><strong>GET Base:</strong> ${getBase.toFixed(2)} kcal</p>
        <p><strong>Gasto extra atividades:</strong> ${caloriasExtrasDia.toFixed(0)} kcal/dia</p>
        <p><strong>GET Total:</strong> ${get.toFixed(2)} kcal</p>

        <h3>Calorias Totais:</h3>
        <p style="font-size:22px;font-weight:bold;">${Math.round(caloriasFinais)} kcal/dia</p>
        <p>${decisaoTexto}</p>

        <h3>Macronutrientes:</h3>
        <p><strong>Proteína:</strong> ${proteina_g.toFixed(1)} g</p>
        <p><strong>Gorduras:</strong> ${gordura_g.toFixed(1)} g</p>
        <p><strong>Carboidratos:</strong> ${carbo_g.toFixed(1)} g</p>

        ${avisoSeguranca ? `<div style="background:#fff8e6;padding:10px;border-left:4px solid #f39c12;">
            <strong>Aviso:</strong> ${avisoSeguranca}
        </div>` : ""}
    `;
});