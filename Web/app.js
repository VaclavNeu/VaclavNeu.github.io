async function loadPartials() {
    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    if (navbar) {
        const navbarResponse = await fetch("../Layout/navbar.html");
        navbar.innerHTML = await navbarResponse.text();
    }

    if (footer) {
        const footerResponse = await fetch("../Layout/footer.html");
        footer.innerHTML = await footerResponse.text();
    }
}

/* Dark/Light mode */
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
}

(function () {
    const saved = localStorage.getItem("theme");
    if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
    }
})();

/* Scroll reveal */
function initReveal() {
    const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add("revealed");
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(function (el) {
        obs.observe(el);
    });
}

/* Loading screen */
function hideLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
        loader.classList.add("loaded");
        setTimeout(function () {
            loader.remove();
        }, 600);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadPartials();
    setTimeout(hideLoader, 400);
    initReveal();
});

/* Re-init on Blazor navigation */
if (typeof Blazor !== "undefined") {
    Blazor.addEventListener("enhancedload", function () {
        initReveal();
    });
}

function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.style.display = "flex";
    }
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.style.display = "none";
    }
}

const serviceDetails = {
    zavlazovani: {
        title: "Automatický závlahový systém",
        subtitle: "Pro jaké zahrady děláme zavlažovací systémy?",
        note: "Před zimou je nutné celý systém řádně odvodnit, a proto vás vždy na podzim budeme kontaktovat, abychom se domluvili na termínu vypuštění. I to patří mezi naše služby, kterými se snažíme vám, našim klientům, zpříjemnit a zjednodušit život.",
        text: `
            <p>Automatický zavlažovací systém jsme schopni navrhnout a realizovat na jakoukoli zahradu. Na velikosti, tvaru ani profilu nezáleží. Zavlažování lze plně přizpůsobit vašim konkrétním požadavkům, od zavlažování větších či menších travnatých ploch přes jednotlivé rostliny, keře, stromy nebo živé ploty. Automatické zavlažovací systémy lze instalovat na terasách a střešních zahradách, ale i k truhlíkům a květináčům.</p>
            <p>Těmito systémy lze osadit různá sportoviště, jako jsou třeba fotbalová hřiště, antukové i travnaté tenisové kurty, rovněž tak parkurové či jiné jezdecké plochy, hotelová atria, zelené střechy, květinové stěny nebo obecní zeleň.</p>
            <p>Námi dodávané zavlažovací systémy jsou vysoce efektivní nejen v rovnoměrnosti a kvalitě zálivky, ale i v množství spotřebované vody. Ve většině případů probíhá závlaha v nočních hodinách, což umožňuje denní užívání těchto ploch bez omezení.</p>
        `,
        points: [
            "mít stále svěží a krásný trávník, květiny i stromy",
            "ušetřit čas a věnovat ho jiným aktivitám",
            "bezstarostně jezdit na letní dovolené",
            "zvýšit hodnotu vaší nemovitosti",
            "pyšnit se profesionálním systémem"
        ]
    },
    jezirka: {
        title: "Zahradní jezírka",
        subtitle: "",
        note: 'A proto jsme tu pro vás. <a href="../Pages/Kontakt.html">Kontaktujte nás</a> a dohodneme se, jaké jezírko uděláme na vaší zahradě.',
        text: `
            <p>Zahradní jezírko dokáže dodat zahradě jedinečný charakter a vytvořit příjemné místo pro odpočinek i relaxaci. Kromě estetické funkce může posloužit také jako přirozené prostředí pro ryby a další drobné živočichy.</p>
            <p>Při návrhu jezírka je důležité promyslet jeho umístění, velikost i celkový tvar tak, aby co nejlépe zapadlo do okolního prostoru. Stejně podstatná je i volba vhodných materiálů a technického řešení, které zajistí dlouhou životnost a snadnou údržbu.</p>
            <p>Správně navržené jezírko může zahradě přinést nejen vizuální hodnotu, ale i příjemnější mikroklima. Voda pomáhá zvyšovat vlhkost vzduchu, podporuje pocit svěžesti a zároveň přispívá k celkově klidnější atmosféře zahrady.</p>
            <p>Součástí naší nabídky jsou i koupací jezírka, která spojují krásu přírodního vodního prvku s možností koupání. Návrh takového řešení vyžaduje správné posouzení velikosti, umístění, filtrace i celkové koncepce, aby bylo jezírko bezpečné, funkční a příjemné pro každodenní používání.</p>
            <p>Každý projekt je jiný, a proto je nejlepší vše konzultovat individuálně. Rádi vám pomůžeme s návrhem i realizací tak, aby výsledné jezírko odpovídalo vašim představám i možnostem zahrady.</p>
        `,
        points: [
            "okrasná i koupací jezírka",
            "vhodné technické a materiálové řešení",
            "Údržba a servis jezírek",
            "estetický i praktický přínos pro zahradu"
        ]
    },
    osvetleni: {
        title: "Osvětlení zahrad",
        subtitle: "",
        note: "",
        text: `
            <p>Nasviťte si svůj dům, jezírko nebo pergolu. Nic nevytvoří tak příjemnou atmosféru jako hra světla a stínů. Světla mohou zároveň sloužit i jako bezpečnostní prvek, když potřebujete osvětlit třeba jen cestu od garáže ke vstupu do domu.</p>
            <p>Vychutnávejte si příjemnou atmosféru světel, stínů, barev a odrazů světelných paprsků od osvětlených stromů, keřů či chodníků v okolí domu. Moderní zahradní svítidla dokážou spojit funkčnost s elegantním vzhledem a dodat prostoru jedinečný charakter.</p>
            <p>Venkovní osvětlení přináší nejen krásný vizuální efekt, ale také praktické výhody. Ať už se jedná o bezpečné nízké napětí, úsporný provoz nebo zvýšení komfortu při večerním pohybu po zahradě, správně navržené osvětlení má skutečný přínos.</p>
            <p>Důležitou roli hraje i energetická úspornost. Moderní LED technologie nabízí velmi nízkou spotřebu elektrické energie, dlouhou životnost a přitom vysokou svítivost.</p>
            <p>Nechte se oslovit i dostupným a elegantním řešením, které celkový dojem ze zahrady krásně podtrhne. Přejeme vám mnoho krásných okamžiků se zahradním osvětlením.</p>
        `,
        points: [
            "nasvícení domu, pergoly i jezírka",
            "bezpečnější pohyb po zahradě",
            "příjemná večerní atmosféra",
            "úsporné LED technologie"
        ]
    }
};

function showServiceDetail(serviceKey, clickedCard) {
    const detail = serviceDetails[serviceKey];
    if (!detail) {
        return;
    }

    const title = document.getElementById("service-detail-title");
    const subtitle = document.getElementById("service-detail-subtitle");
    const text = document.getElementById("service-detail-text");
    const points = document.getElementById("service-detail-points");
    const note = document.getElementById("service-detail-note");
    const section = document.getElementById("service-detail");

    if (section) {
        section.classList.remove("hidden");
    }

    if (title) {
        title.textContent = detail.title || "";
    }

    if (subtitle) {
        subtitle.textContent = detail.subtitle || "";
        subtitle.style.display = detail.subtitle ? "block" : "none";
    }

    if (note) {
        note.innerHTML = detail.note || "";
        note.style.display = detail.note ? "block" : "none";
    }

    if (text) {
        text.innerHTML = detail.text || "";
    }

    if (points) {
        points.innerHTML = "";

        if (detail.points && detail.points.length) {
            detail.points.forEach(function (point) {
                const item = document.createElement("div");
                item.className = "detail-point";
                item.textContent = point;
                points.appendChild(item);
            });
        }
    }

    document.querySelectorAll(".service-card").forEach(function (card) {
        card.classList.remove("active");
    });

    if (clickedCard) {
        clickedCard.classList.add("active");
    }

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
