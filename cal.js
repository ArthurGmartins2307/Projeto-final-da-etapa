// Seleção de elementos
const atividadeSelect = document.getElementById("atividade");
const atividadesExtrasContainer = document.getElementById("atividadesExtrasContainer");

// Função para atualizar visibilidade do container
function atualizarVisibilidade() {
    const valor = atividadeSelect.value;

    if (valor === "" || valor === "1.2") {
        atividadesExtrasContainer.style.display = "none";

        // Limpa checkboxes e frequência
        document.querySelectorAll("#atividadesExtras input").forEach(cb => cb.checked = false);
        document.getElementById("frequencia").value = "";
    } else {
        atividadesExtrasContainer.style.display = "block";
    }
}

// Executa a atualização logo ao carregar a página
atualizarVisibilidade();

// Escuta mudança no select para mostrar/ocultar atividades extras
atividadeSelect.addEventListener("change", atualizarVisibilidade);

// Evento submit do formulário
document.getElementById("formCalorias").addEventListener("submit", function (event) {
    event.preventDefault();

    // Inputs do usuário
    const sexo = document.getElementById("sexo").value;
    const idade = parseInt(document.getElementById("idade").value, 10);
    const peso = parseFloat(document.getElementById("peso").value);
    const alturaCm = parseFloat(document.getElementById("altura").value);
    const atividade = parseFloat(document.getElementById("atividade").value);
    const objetivo = document.getElementById("objetivo").value;

    const alturaM = alturaCm / 100;

    // Atividades extras selecionadas
    const atividadesSelecionadas = Array.from(document.querySelectorAll("#atividadesExtras input:checked"))
        .map(cb => cb.value);

    const frequencia = parseInt(document.getElementById("frequencia").value) || 0;

    // Cálculo TMB (Taxa Metabólica Basal)
    let tmb = sexo === "masculino"
        ? (10 * peso) + (6.25 * alturaCm) - (5 * idade) + 5
        : (10 * peso) + (6.25 * alturaCm) - (5 * idade) - 161;

    // IMC
    const imc = peso / (alturaM * alturaM);

    // GET Base
    const getBase = tmb * atividade;

    // Gasto extra das atividades
    const tabelaKcal = {
        "academia": 245, "atletismo": 560, "boxe": 490, "caminhada": 231, "capoeira": 560,
        "ciclismo": 490, "corrida": 581, "crossfit": 700, "jiu jitsu": 490, "judo": 700,
        "karate": 721, "kickboxing": 700, "krav maga": 630, "muay thai": 686, "natação": 490, "taekwondo": 700
    };

    const multiplicadorAtividades = {
        "academia": 1.2, "atletismo": 1.4, "boxe": 1.3, "caminhada": 1.1, "capoeira": 1.4,
        "ciclismo": 1.3, "corrida": 1.5, "crossfit": 1.6, "jiu jitsu": 1.3, "judo": 1.5,
        "karate": 1.5, "kickboxing": 1.5, "krav maga": 1.4, "muay thai": 1.5, "natação": 1.3, "taekwondo": 1.5
    };

    let caloriasExtrasSemana = atividadesSelecionadas.reduce((total, atividade) => {
        const caloriasAtividade = tabelaKcal[atividade] * multiplicadorAtividades[atividade];
        return total + (caloriasAtividade * frequencia);
    }, 0);

    const caloriasExtrasDia = caloriasExtrasSemana / 7;

    // GET final antes do objetivo
    let get = getBase + caloriasExtrasDia;

    // Ajuste para objetivo
    let ajusteCalorias = 0;
    let decisaoTexto = "";

    if (objetivo === "emagrecer") {
        if (imc >= 30) ajusteCalorias = -550, decisaoTexto = "IMC ≥ 30: déficit forte (-550 kcal).";
        else if (imc >= 27.5) ajusteCalorias = -500, decisaoTexto = "IMC 27.5–29.9: déficit alto (-500 kcal).";
        else if (imc >= 25) ajusteCalorias = -450, decisaoTexto = "IMC 25–27.4: déficit moderado (-450 kcal).";
        else if (imc >= 23) ajusteCalorias = -400, decisaoTexto = "IMC 23–24.9: déficit moderado (-400 kcal).";
        else if (imc >= 18.5) ajusteCalorias = -300, decisaoTexto = "IMC 18.5–22.9: déficit leve (-300 kcal).";
        else ajusteCalorias = 0, decisaoTexto = "IMC baixo — não recomendado emagrecer.";
    } else if (objetivo === "manter") {
        ajusteCalorias = 0;
        decisaoTexto = "Manutenção: calorias próximas ao gasto.";
    } else if (objetivo === "ganhar") {
        if (imc < 18.5) ajusteCalorias = 500, decisaoTexto = "Superávit forte (+500 kcal).";
        else if (imc < 23) ajusteCalorias = 400, decisaoTexto = "Superávit moderado (+400 kcal).";
        else ajusteCalorias = 300, decisaoTexto = "Superávit leve (+300 kcal).";
    }

    let caloriasFinais = get + ajusteCalorias;

    // Segurança mínima
    const minCal = sexo === "masculino" ? 1500 : 1200;
    let avisoSeguranca = "";
    if (objetivo === "emagrecer" && caloriasFinais < minCal) {
        caloriasFinais = minCal;
        avisoSeguranca = `Calorias ajustadas para o mínimo seguro (${minCal} kcal/dia).`;
    }

    // Macronutrientes
    let proteina_g_por_kg = objetivo === "emagrecer" ? 2.2 : objetivo === "manter" ? 1.6 : 1.9;
    const proteina_g = peso * proteina_g_por_kg;
    const proteina_kcal = proteina_g * 4;

    let gordura_kcal = caloriasFinais * (objetivo === "ganhar" ? 0.30 : 0.25);
    let gordura_g = gordura_kcal / 9;

    let carbo_kcal = caloriasFinais - (proteina_kcal + gordura_kcal);
    let carbo_g = Math.max(0, carbo_kcal / 4);

    // Exibição do resultado
    const div = document.getElementById("resultado");
    div.style.display = "block";

    div.innerHTML = `
    <h2>Resultado Avançado</h2>

    <section class="info-basica">
        <p><strong>IMC:</strong> <span class="destaque">${imc.toFixed(2)}</span></p>
        <p><strong>TMB:</strong> <span class="destaque">${tmb.toFixed(2)} kcal</span></p>
        <p><strong>GET Base:</strong> <span class="destaque">${getBase.toFixed(2)} kcal</span></p>
        <p><strong>Gasto extra atividades:</strong> <span class="destaque">${caloriasExtrasDia.toFixed(0)} kcal/dia</span></p>
        <p><strong>GET Total:</strong> <span class="destaque">${get.toFixed(2)} kcal</span></p>
    </section>

    <section class="calorias-totais">
        <h3>Calorias Totais</h3>
        <p class="valor-calorias">${Math.round(caloriasFinais)} kcal/dia</p>
        <p class="decisao-texto">${decisaoTexto}</p>
    </section>

    <section class="macronutrientes">
        <h3>Macronutrientes</h3>
        <p><strong>Proteína:</strong> <span class="destaque">${proteina_g.toFixed(1)} g</span></p>
        <p><strong>Gorduras:</strong> <span class="destaque">${gordura_g.toFixed(1)} g</span></p>
        <p><strong>Carboidratos:</strong> <span class="destaque">${carbo_g.toFixed(1)} g</span></p>
    </section>

    ${avisoSeguranca ? `<div class="aviso-seguranca"><strong>Aviso:</strong> ${avisoSeguranca}</div>` : ""}

    `;
});


const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
