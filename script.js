const PartageApp = {

    db: [],
    currentFilter: "الكل",
    searchQuery: "",
    sortBy: "new",

    // ================= INIT =================
    init() {
        this.load();
        this.bindEvents();
        this.renderFilters();
        this.render();
    },

    // ================= STORAGE =================
    load() {
        const data = localStorage.getItem("pl_pro_db");
        this.db = data ? JSON.parse(data) : [];
    },

    save() {
        localStorage.setItem("pl_pro_db", JSON.stringify(this.db));
    },

    // ================= SECURITY =================
    escapeHTML(str) {
        return str.replace(/[&<>"']/g, m => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[m]));
    },

    // ================= SEARCH =================
    normalize(text) {
        return text
            .toLowerCase()
            .replace(/[أإآ]/g, "ا")
            .replace(/ة/g, "ه");
    },

    debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    bindEvents() {
        const input = document.getElementById("lawSearch");
        if (input) {
            input.addEventListener("input", this.debounce(e => {
                this.searchQuery = this.normalize(e.target.value);
                this.render();
            }));
        }
    },

    // ================= FILTER =================
    setFilter(cat) {
        this.currentFilter = cat;
        this.renderFilters();
        this.render();
    },

    renderFilters() {
        const cats = ["الكل", "قانون مدني", "قانون الأسرة", "قانون جنائي"];
        const el = document.getElementById("filterBar");

        el.innerHTML = cats.map(c => `
            <button class="filter-btn ${c === this.currentFilter ? "active" : ""}"
            onclick="PartageApp.setFilter('${c}')">${c}</button>
        `).join("");
    },

    // ================= SORT =================
    sortData(data) {
        if (this.sortBy === "new") {
            return data.sort((a,b) => b.date - a.date);
        }
        if (this.sortBy === "popular") {
            return data.sort((a,b) => b.dl - a.dl);
        }
        return data;
    },

    // ================= MAIN RENDER =================
    render() {
        let data = [...this.db];

        // filter
        if (this.currentFilter !== "الكل") {
            data = data.filter(x => x.cat === this.currentFilter);
        }

        // search
        if (this.searchQuery) {
            data = data.filter(x =>
                this.normalize(x.title).includes(this.searchQuery)
            );
        }

        // sort
        data = this.sortData(data);

        this.renderGrid(data);
    },

    renderGrid(data) {
        const grid = document.getElementById("proLibrary");

        if (!data.length) {
            grid.innerHTML = `<div class="empty">❌ لا توجد نتائج</div>`;
            return;
        }

        grid.innerHTML = data.map(item => `
            <div class="file-card">
                <div class="card-body">
                    <span class="tag">${this.escapeHTML(item.cat)}</span>
                    <h3>${this.escapeHTML(item.title)}</h3>

                    <div class="stats">
                        <span onclick="PartageApp.like(${item.id})">❤️ ${item.likes}</span>
                        <span>⬇ ${item.dl}</span>
                    </div>

                    <a href="${item.url}" target="_blank"
                    onclick="PartageApp.download(${item.id})"
                    class="btn-dl">تحميل</a>
                </div>
            </div>
        `).join("");
    },

    // ================= ACTIONS =================
    like(id) {
        const item = this.db.find(x => x.id === id);
        if (item) {
            item.likes++;
            this.save();
            this.render();
        }
    },

    download(id) {
        const item = this.db.find(x => x.id === id);
        if (item) {
            item.dl++;
            this.save();
        }
    }

};

// INIT
window.onload = () => PartageApp.init();
