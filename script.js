const App = (() => {

    let state = {
        db: [],
        search: "",
        filter: "الكل",
        sort: "latest"
    };

    const KEY = "legal_db_v1";

    function init() {
        load();
        bind();
        render();
    }

    function load() {
        const data = JSON.parse(localStorage.getItem(KEY));
        state.db = data || seed();
    }

    function save() {
        localStorage.setItem(KEY, JSON.stringify(state.db));
    }

    function seed() {
        return [
            {
                id: 1,
                title: "شرح قانون الالتزامات والعقود",
                cat: "قانون مدني",
                url: "https://example.com",
                likes: 5,
                date: Date.now()
            }
        ];
    }

    function bind() {

        document.getElementById("searchInput")
        .addEventListener("input", e => {
            state.search = e.target.value.toLowerCase();
            render();
        });

        document.getElementById("filterSelect")
        .addEventListener("change", e => {
            state.filter = e.target.value;
            render();
        });

        document.getElementById("sortSelect")
        .addEventListener("change", e => {
            state.sort = e.target.value;
            render();
        });
    }

    function process() {
        let data = [...state.db];

        if (state.filter !== "الكل") {
            data = data.filter(x => x.cat === state.filter);
        }

        if (state.search) {
            data = data.filter(x =>
                x.title.toLowerCase().includes(state.search)
            );
        }

        if (state.sort === "latest") {
            data.sort((a,b) => b.date - a.date);
        } else {
            data.sort((a,b) => b.likes - a.likes);
        }

        return data;
    }

    function render() {
        const grid = document.getElementById("grid");
        const data = process();

        if (!data.length) {
            grid.innerHTML = "<p>لا توجد نتائج</p>";
            return;
        }

        grid.innerHTML = data.map(item => `
            <div class="card">
                <div class="tag">${item.cat}</div>
                <h3>${item.title}</h3>

                <p>❤️ ${item.likes}</p>

                <a href="#" onclick="App.like(${item.id})" class="btn">إعجاب</a>
                <a href="${item.url}" target="_blank" class="btn">فتح</a>
            </div>
        `).join("");
    }

    function like(id) {
        const item = state.db.find(x => x.id === id);
        item.likes++;
        save();
        render();
    }

    function addPrompt() {
        const title = prompt("اسم المرجع:");
        const url = prompt("الرابط:");

        if (!title || !url) return;

        state.db.unshift({
            id: Date.now(),
            title,
            url,
            cat: detect(title),
            likes: 0,
            date: Date.now()
        });

        save();
        render();
    }

    function detect(t) {
        if (t.includes("جنائي")) return "قانون جنائي";
        return "قانون مدني";
    }

    return { init, like, addPrompt };

})();

window.onload = App.init;
