`script.js`

```javascript
/* =========================================
   AETHERIA DEVELOPMENT DASHBOARD
========================================= */


/* =========================================
   ADMIN
========================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

let isAdmin = localStorage.getItem("aetheria_admin") === "true";


/* =========================================
   DEFAULT ROADMAP
========================================= */

const defaultRoadmap = [

    {
        id: "phase0",
        number: "PHASE 0",
        title: "Concept",
        description: "Définir l'identité et les fondations d'AETHERIA.",
        tasks: [
            { id: 1, text: "Nom définitif", done: true },
            { id: 2, text: "Concept Skyblock RPG", done: true },
            { id: 3, text: "Thème spatial", done: true },
            { id: 4, text: "Slogan", done: false },
            { id: 5, text: "Direction artistique", done: false },
            { id: 6, text: "Logo", done: false },
            { id: 7, text: "Palette définitive", done: false },
            { id: 8, text: "Police", done: false },
            { id: 9, text: "Mascotte", done: false },
            { id: 10, text: "Lore de base", done: false }
        ]
    },

    {
        id: "phase1",
        number: "PHASE 1",
        title: "Game Design",
        description: "Définir précisément les systèmes du serveur.",
        tasks: [
            { id: 11, text: "Système des îles", done: false },
            { id: 12, text: "Farming", done: false },
            { id: 13, text: "Minage", done: false },
            { id: 14, text: "Niveaux joueur", done: false },
            { id: 15, text: "XP", done: false },
            { id: 16, text: "Stats RPG", done: false },
            { id: 17, text: "Classes", done: false },
            { id: 18, text: "Compétences", done: false },
            { id: 19, text: "Système de donjons", done: false },
            { id: 20, text: "Mobs", done: false },
            { id: 21, text: "Boss", done: false },
            { id: 22, text: "Loot", done: false },
            { id: 23, text: "Économie", done: false },
            { id: 24, text: "Marché", done: false },
            { id: 25, text: "Hôtel des ventes", done: false }
        ]
    },

    {
        id: "phase2",
        number: "PHASE 2",
        title: "Prototype",
        description: "Créer la première version réellement jouable.",
        tasks: [
            { id: 26, text: "Créer une île", done: false },
            { id: 27, text: "Récolter des ressources", done: false },
            { id: 28, text: "Gagner de l'argent", done: false },
            { id: 29, text: "Améliorer son île", done: false },
            { id: 30, text: "Entrer dans un donjon", done: false },
            { id: 31, text: "Combattre les mobs", done: false },
            { id: 32, text: "Boss du premier donjon", done: false },
            { id: 33, text: "Récompenses", done: false }
        ]
    },

    {
        id: "phase3",
        number: "PHASE 3",
        title: "Alpha",
        description: "Construire les systèmes principaux du serveur.",
        tasks: [
            { id: 34, text: "Système RPG complet", done: false },
            { id: 35, text: "Système d'équipement", done: false },
            { id: 36, text: "Premier donjon complet", done: false },
            { id: 37, text: "Première planète", done: false },
            { id: 38, text: "Quêtes", done: false },
            { id: 39, text: "PNJ", done: false },
            { id: 40, text: "Sauvegarde des joueurs", done: false }
        ]
    },

    {
        id: "phase4",
        number: "PHASE 4",
        title: "Beta",
        description: "Tests, équilibrage et correction des problèmes.",
        tasks: [
            { id: 41, text: "Tests joueurs", done: false },
            { id: 42, text: "Correction des bugs", done: false },
            { id: 43, text: "Équilibrage économique", done: false },
            { id: 44, text: "Équilibrage RPG", done: false },
            { id: 45, text: "Tests de performance", done: false },
            { id: 46, text: "Tests anti-exploit", done: false }
        ]
    },

    {
        id: "phase5",
        number: "PHASE 5",
        title: "Release",
        description: "Préparer le lancement officiel d'AETHERIA.",
        tasks: [
            { id: 47, text: "Site public", done: false },
            { id: 48, text: "Discord", done: false },
            { id: 49, text: "Trailer", done: false },
            { id: 50, text: "Réseaux sociaux", done: false },
            { id: 51, text: "Boutique", done: false },
            { id: 52, text: "Support", done: false },
            { id: 53, text: "Lancement officiel", done: false }
        ]
    }

];


/* =========================================
   LOAD / SAVE
========================================= */

function loadRoadmap() {

    const saved = localStorage.getItem("aetheria_roadmap");

    if (!saved) {
        return structuredClone(defaultRoadmap);
    }

    try {
        return JSON.parse(saved);
    }

    catch {
        return structuredClone(defaultRoadmap);
    }
}


let roadmap = loadRoadmap();


function saveRoadmap() {
    localStorage.setItem(
        "aetheria_roadmap",
        JSON.stringify(roadmap)
    );
}


/* =========================================
   RENDER ROADMAP
========================================= */

function renderRoadmap() {

    const container =
        document.getElementById("roadmapContainer");

    container.innerHTML = "";


    roadmap.forEach((phase, phaseIndex) => {

        const completed =
            phase.tasks.filter(task => task.done).length;

        const total = phase.tasks.length;

        const phaseProgress =
            total === 0
                ? 0
                : Math.round((completed / total) * 100);


        let status = "À VENIR";

        if (phaseProgress === 100 && total > 0) {
            status = "TERMINÉ";
        }

        else if (phaseProgress > 0) {
            status = "EN COURS";
        }


        const article =
            document.createElement("article");

        article.className = "phase";


        article.innerHTML = `

            <div class="phase-header">

                <div>

                    <span class="phase-number">
                        ${phase.number}
                    </span>

                    <h3>
                        ${escapeHTML(phase.title)}
                    </h3>

                </div>

                <span class="phase-status ${
                    status === "EN COURS"
                        ? "status-progress"
                        : ""
                }">

                    ${status}

                </span>

            </div>


            <p class="phase-description">
                ${escapeHTML(phase.description)}
            </p>


            <div class="tasks">

                ${phase.tasks.map(task => `

                    <label class="task ${
                        task.done ? "done" : ""
                    }">

                        <input
                            type="checkbox"
                            data-phase="${phase.id}"
                            data-task="${task.id}"
                            ${task.done ? "checked" : ""}
                            ${!isAdmin ? "disabled" : ""}
                        >

                        <span>
                            ${escapeHTML(task.text)}
                        </span>

                        ${
                            isAdmin
                                ? `
                                    <div class="task-actions">

                                        <button
                                            class="task-delete"
                                            data-phase="${phase.id}"
                                            data-task="${task.id}"
                                            title="Supprimer"
                                        >
                                            🗑
                                        </button>

                                    </div>
                                `
                                : ""
                        }

                    </label>

                `).join("")}

            </div>


            ${
                isAdmin
                    ? `
                        <button
                            class="add-task"
                            data-phase="${phase.id}"
                        >
                            + Ajouter une tâche
                        </button>
                    `
                    : ""
            }

        `;


        container.appendChild(article);

    });


    attachTaskEvents();

    updateProgress();
}


/* =========================================
   TASK EVENTS
========================================= */

function attachTaskEvents() {

    document
        .querySelectorAll('.task input[type="checkbox"]')
        .forEach(input => {

            input.addEventListener("change", () => {

                const phase =
                    roadmap.find(
                        p => p.id === input.dataset.phase
                    );

                if (!phase) return;

                const task =
                    phase.tasks.find(
                        t =>
                            t.id === Number(input.dataset.task)
                    );

                if (!task) return;

                task.done = input.checked;

                saveRoadmap();

                renderRoadmap();
            });

        });


    document
        .querySelectorAll(".task-delete")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                const phase =
                    roadmap.find(
                        p => p.id === button.dataset.phase
                    );

                if (!phase) return;

                const taskId =
                    Number(button.dataset.task);

                phase.tasks =
                    phase.tasks.filter(
                        task => task.id !== taskId
                    );

                saveRoadmap();

                renderRoadmap();
            });

        });


    document
        .querySelectorAll(".add-task")
        .forEach(button => {

            button.addEventListener("click", () => {

                const phase =
                    roadmap.find(
                        p => p.id === button.dataset.phase
                    );

                if (!phase) return;


                const name =
                    prompt("Nom de la nouvelle tâche :");


                if (!name || !name.trim()) return;


                const allTasks =
                    roadmap.flatMap(
                        p => p.tasks
                    );


                const maxId =
                    allTasks.length
                        ? Math.max(
                            ...allTasks.map(
                                task => task.id
                            )
                        )
                        : 0;


                phase.tasks.push({

                    id: maxId + 1,

                    text: name.trim(),

                    done: false

                });


                saveRoadmap();

                renderRoadmap();

            });

        });

}


/* =========================================
   GLOBAL PROGRESS
========================================= */

function updateProgress() {

    const allTasks =
        roadmap.flatMap(
            phase => phase.tasks
        );


    const total =
        allTasks.length;


    const completed =
        allTasks.filter(
            task => task.done
        ).length;


    const remaining =
        total - completed;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    document.getElementById(
        "totalTasks"
    ).textContent = total;


    document.getElementById(
        "completedTasks"
    ).textContent = completed;


    document.getElementById(
        "remainingTasks"
    ).textContent = remaining;


    document.getElementById(
        "progressText"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";
}


/* =========================================
   LOGIN MODAL
========================================= */

const loginModal =
    document.getElementById("loginModal");

const loginButton =
    document.getElementById("loginButton");

const closeLogin =
    document.getElementById("closeLogin");

const submitLogin =
    document.getElementById("submitLogin");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");


loginButton.addEventListener("click", () => {

    if (isAdmin) {

        enableAdminMode();

        return;

    }

    loginModal.classList.add("active");

    username.focus();

});


closeLogin.addEventListener("click", () => {

    loginModal.classList.remove("active");

    loginError.textContent = "";

});


loginModal.addEventListener("click", event => {

    if (event.target === loginModal) {

        loginModal.classList.remove("active");

    }

});


submitLogin.addEventListener("click", login);


password.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        login();
    }

});


function login() {

    const user =
        username.value.trim();

    const pass =
        password.value;


    if (
        user === ADMIN_USERNAME &&
        pass === ADMIN_PASSWORD
    ) {

        isAdmin = true;

        localStorage.setItem(
            "aetheria_admin",
            "true"
        );


        loginModal.classList.remove(
            "active"
        );


        username.value = "";
        password.value = "";

        loginError.textContent = "";

        enableAdminMode();

    }

    else {

        loginError.textContent =
            "Identifiants incorrects.";

    }

}


/* =========================================
   ADMIN MODE
========================================= */

function enableAdminMode() {

    document.body.classList.add(
        "admin-mode"
    );


    document
        .getElementById("adminBar")
        .classList.add("active");


    loginButton.textContent =
        "🛠️ Admin";


    renderRoadmap();

}


function disableAdminMode() {

    isAdmin = false;

    localStorage.removeItem(
        "aetheria_admin"
    );


    document.body.classList.remove(
        "admin-mode"
    );


    document
        .getElementById("adminBar")
        .classList.remove("active");


    loginButton.textContent =
        "🔐 Admin";


    renderRoadmap();

}


document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        disableAdminMode
    );


/* =========================================
   HTML SAFETY
========================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}


/* =========================================
   START
========================================= */

renderRoadmap();

if (isAdmin) {
    enableAdminMode();
}
```
