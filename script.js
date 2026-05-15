
    function atualizarIconesTema(temaEscuro) {
        const icones = document.querySelectorAll(".iconeTema");
        icones.forEach((icone) => {
            icone.src = temaEscuro ? "./botao_modo_escuroo.png" : "./botao_modo_claroo.png";
        });
    }

    function toggleDark() {
        document.body.classList.toggle("dark");
        const temaEscuro = document.body.classList.contains("dark");

        atualizarIconesTema(temaEscuro);
        localStorage.setItem("tema", temaEscuro ? "dark" : "light");
    }

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.addEventListener("load", () => {
        window.scrollTo(0, 0);

        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "dark") {
            document.body.classList.add("dark");
            atualizarIconesTema(true);
        } else {
            atualizarIconesTema(false);
        }

        const rodape = document.querySelector('.rodape');

        const observerRodape = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    rodape.classList.add('visivel');
                } else {
                    rodape.classList.remove('visivel');
                }
            });
        }, {
            threshold: 0.2
        });

        observerRodape.observe(rodape);
    });

    const indicador = document.querySelector('.scroll-indicador');
    const elementosAnimados = document.querySelectorAll('.secao .animar-scroll, .secao .animar-card');
    const headerTop = document.getElementById("headerTop");
    const headerPill = document.getElementById("headerPill");
    const steamCards = document.querySelectorAll('[data-steam-card]');

    const observerAnimacao = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            } else {
                entrada.target.classList.remove('visivel');
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px'
    });

    elementosAnimados.forEach((elemento) => {
        observerAnimacao.observe(elemento);
    });

    let ticking = false;
    let timeout;

    function atualizarScrollUI() {
        const alturaTotal = document.body.scrollHeight - window.innerHeight;
        const progresso = alturaTotal > 0 ? window.scrollY / alturaTotal : 0;
        const posicao = progresso * (window.innerHeight - 40);

        indicador.style.top = posicao + 'px';
        indicador.classList.add('ativo');

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            indicador.classList.remove('ativo');
        }, 600);

        if (window.scrollY > 80) {
            headerTop.classList.add("oculta");
            headerPill.classList.add("ativo");
        } else {
            headerTop.classList.remove("oculta");
            headerPill.classList.remove("ativo");
        }

        if (window.scrollY <= 40) {
            elementosAnimados.forEach((elemento) => {
                elemento.classList.remove('visivel');
            });
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(atualizarScrollUI);
            ticking = true;
        }
    }, { passive: true });

    steamCards.forEach((card) => {
        let rafId = null;

        const intensidadeRotacao = 8;
        const intensidadeElevacao = 10;

        card.addEventListener('mousemove', (event) => {
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const px = (x / rect.width) - 0.5;
                const py = (y / rect.height) - 0.5;

                const rotateY = px * intensidadeRotacao * 2;
                const rotateX = -py * intensidadeRotacao * 2;
                const translateY = -Math.abs(py) * intensidadeElevacao - 4;

                card.style.transform = `
                    perspective(1000px)
                    translateY(${translateY}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);

            card.style.transform = `
                perspective(1000px)
                translateY(0px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;
        });
    });

    const imagensProjeto = document.querySelectorAll('.img-projeto');
const modalImagem = document.getElementById('modalImagem');
const imagemModal = document.getElementById('imagemModal');
const fecharModal = document.getElementById('fecharModal');

imagensProjeto.forEach((imagem) => {
    imagem.addEventListener('click', () => {
        imagemModal.src = imagem.src;
        imagemModal.alt = imagem.alt;
        modalImagem.classList.add('ativo');
        document.body.classList.add('modal-aberto');
    });
});

function fecharModalImagem() {
    modalImagem.classList.remove('ativo');
    document.body.classList.remove('modal-aberto');
    imagemModal.src = "";
}

fecharModal.addEventListener('click', fecharModalImagem);

modalImagem.addEventListener('click', (event) => {
    if (event.target === modalImagem) return;
    if (event.target === fecharModal) return;
    if (!event.target.closest('.modal-conteudo')) {
        fecharModalImagem();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalImagem.classList.contains('ativo')) {
        fecharModalImagem();
    }
});
    <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
        new window.VLibras.Widget('https://vlibras.gov.br/app');

