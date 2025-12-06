document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");

    // ABRIR / FECHAR MENU
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        nav.classList.toggle("active");

        // Desabilita scroll no body quando menu está aberto
        document.body.style.overflow =
            nav.classList.contains("active") ? "hidden" : "auto";
    });

    // FECHAR MENU AO CLICAR EM QUALQUER LINK
    document.querySelectorAll("#main-nav a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });

    // FECHAR MENU AO CLICAR FORA (opcional)
    document.addEventListener("click", (e) => {
        if (
            nav.classList.contains("active") &&
            !nav.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            menuToggle.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // FECHAR MENU AO REDIMENSIONAR PARA DESKTOP
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});
