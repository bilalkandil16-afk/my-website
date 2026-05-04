/**
 * Partage Légal Core Engine v2.0
 * بنية احترافية تعتمد على نظام الكائنات وتنظيم الذاكرة
 */

const PartageApp = {
    // 1. قاعدة البيانات (الذاكرة المحلية)
    db: JSON.parse(localStorage.getItem('pl_db')) || [
        { id: 1, title: "شرح قانون الالتزامات والعقود المغربي", cat: "قانون مدني", owner: "د. عبد الرزاق", dl: 1240, likes: 450, date: Date.now() - 10000000 },
        { id: 2, title: "الوجيز في المسطرة الجنائية", cat: "قانون جنائي", owner: "أستاذ كمال", dl: 890, likes: 310, date: Date.now() - 20000000 }
    ],

    currentFilter: 'الكل',
    searchTerm: '',

    // 2. البداية (Initialization)
    init() {
        this.render();
        console.log("Partage Légal Engine: Active");
    },

    // 3. محرك العرض (Rendering Engine)
    render() {
        const grid = document.getElementById('proLibrary');
        if (!grid) return;

        // تصفية البيانات بناءً على القسم وبحث المستخدم
        let filtered = this.db.filter(f => {
            const matchesCat = this.currentFilter === 'الكل' || f.cat === this.currentFilter;
            const matchesSearch = f.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #a67c52;">لا توجد نتائج تطابق بحثك...</div>`;
            return;
        }

        grid.innerHTML = filtered.map(f => this.createCardTemplate(f)).join('');
    },

    // 4. قالب البطاقة (Template)
    createCardTemplate(f) {
        return `
            <div class="file-card" data-id="${f.id}">
                <div class="file-header">
                    <span class="tag">${f.cat}</span>
                    <div class="stats">
                        <span class="like-btn" onclick="PartageApp.handleLike(${f.id})">
                            <i class="fa-solid fa-heart"></i> ${f.likes}
                        </span>
                        <span style="color:var(--gold-bronze)">
                            <i class="fa-solid fa-fire"></i> ${f.dl}
                        </span>
                    </div>
                </div>
                <h3 class="file-title">${f.title}</h3>
                <div class="meta">
                    <small><i class="fa-solid fa-user-tie"></i> ${f.owner}</small>
                    <small>${new Date(f.date).toLocaleDateString('ar-MA')}</small>
                </div>
                <button class="btn-dl" onclick="PartageApp.handleDownload(${f.id})">
                    <i class="fa-solid fa-download"></i> تحميل المرجع
                </button>
            </div>
        `;
    },

    // 5. إدارة الرفع (Upload Management)
    handleUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        this.showToast("جاري معالجة الملف...");

        setTimeout(() => {
            const category = this.detectCategory(file.name);
            const newEntry = {
                id: Date.now(),
                title: file.name.replace(/\.[^/.]+$/, ""),
                cat: category,
                owner: "باحث قانوني",
                dl: 0,
                likes: 0,
                date: Date.now()
            };

            this.db.unshift(newEntry);
            this.syncStorage();
            this.render();
            this.showToast("تمت إضافة المرجع للمكتبة بنجاح", "success");
        }, 800);
    },

    // 6. التفاعل (Likes & Downloads)
    handleLike(id) {
        const item = this.db.find(x => x.id === id);
        item.likes++;
        this.syncStorage();
        this.render();
    },

    handleDownload(id) {
        const item = this.db.find(x => x.id === id);
        item.dl++;
        this.syncStorage();
        this.render();
        this.showToast(`بدأ تحميل: ${item.title}`);
    },

    // 7. أدوات مساعدة (Helpers)
    detectCategory(name) {
        const n = name.toLowerCase();
        if (n.includes("مدني")) return "قانون مدني";
        if (n.includes("جنائي") || n.includes("عقوبات")) return "قانون جنائي";
        if (n.includes("أسرة") || n.includes("أحوال")) return "قانون الأسرة";
        return "عام";
    },

    syncStorage() {
        localStorage.setItem('pl_db', JSON.stringify(this.db));
    },

    showToast(msg, type = "info") {
        // إنشاء إشعار احترافي يظهر ويختفي
        const toast = document.createElement('div');
        toast.style = `
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
            background: #3d1f14; color: #a67c52; padding: 12px 25px;
            border-radius: 5px; border-bottom: 3px solid #a67c52;
            z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            font-family: 'Cairo'; animation: slideUp 0.3s ease;
        `;
        toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${msg}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

// تشغيل المحرك
PartageApp.init();

// ربط البحث الخارجي (Google) بالزر
function proSearch() {
    const val = document.getElementById('lawSearch').value;
    if (!val) {
        PartageApp.showToast("يرجى إدخال نص البحث أولاً");
        return;
    }
    // تحديث البحث الداخلي أيضاً
    PartageApp.searchTerm = val;
    PartageApp.render();
    
    // البحث الخارجي
    const query = encodeURIComponent(`"${val}" (site:talibdroit.com OR site:elkanoon.blogspot.com) filetype:pdf`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
}

// ربط الفلترة
function filterBy(cat) {
    PartageApp.currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === cat);
    });
    PartageApp.render();
}
