// ====================== Partage Légal - JavaScript Professional ======================

const PartageApp = {
    db: [],
    currentFilter: "الكل",

    // ==================== تهيئة التطبيق ====================
    init() {
        this.loadFromStorage();
        this.renderFilters();
        this.render();
    },

    // ==================== تخزين البيانات ====================
    loadFromStorage() {
        const saved = localStorage.getItem('pl_pro_db');
        this.db = saved ? JSON.parse(saved) : [
            {
                id: 1,
                title: "شرح قانون الالتزامات والعقود - الجزء الأول والثاني",
                cat: "قانون مدني",
                url: "https://example.com/ref1.pdf",
                owner: "د. أحمد الرحماني",
                dl: 1240,
                likes: 87,
                date: Date.now() - 86400000 * 3
            },
            {
                id: 2,
                title: "دليل قانون الأسرة المغربي مع التعديلات الجديدة",
                cat: "قانون الأسرة",
                url: "https://example.com/ref2.pdf",
                owner: "مساهم قانوني",
                dl: 980,
                likes: 64,
                date: Date.now() - 86400000 * 5
            }
        ];
    },

    syncStorage() {
        localStorage.setItem('pl_pro_db', JSON.stringify(this.db));
    },

    // ==================== تصنيف تلقائي ====================
    detectCategory(title) {
        const t = title.toLowerCase();
        if (/مدني|التزامات|عقود|مسؤولية/.test(t)) return "قانون مدني";
        if (/أسرة|زواج|طلاق|ميراث|حضانة/.test(t)) return "قانون الأسرة";
        if (/جنائي|عقوبات|جرائم|جنح/.test(t)) return "قانون جنائي";
        if (/تجاري|شركات|تجارة|منافسة/.test(t)) return "قانون تجاري";
        if (/دستور|دستوري/.test(t)) return "قانون دستوري";
        if (/إداري|إدارة|جماعات/.test(t)) return "قانون إداري";
        return "مراجع عامة";
    },

    // ==================== رفع مرجع جديد ====================
    handleUpload() {
        const title = prompt("أدخل اسم الكتاب أو الملخص:");
        if (!title?.trim()) return this.showToast("يرجى إدخال اسم المرجع", "error");

        const url = prompt("أدخل رابط التحميل (Google Drive, Mega, Dropbox...):");
        if (!url?.trim()) return this.showToast("يرجى إدخال رابط صحيح", "error");

        const newEntry = {
            id: Date.now(),
            title: title.trim(),
            url: url.trim(),
            cat: this.detectCategory(title),
            owner: "مساهم قانوني",
            dl: 0,
            likes: 0,
            date: Date.now()
        };

        this.db.unshift(newEntry);
        this.syncStorage();
        this.render();
        this.showToast("✅ تمت إضافة المرجع بنجاح", "success");
    },

    // ==================== تحميل المرجع ====================
    handleDownload(id) {
        const item = this.db.find(x => x.id === id);
        if (!item?.url) {
            this.showToast("❌ الرابط غير متوفر حالياً", "error");
            return;
        }

        item.dl++;
        this.syncStorage();
        this.render();

        window.open(item.url, "_blank");
    },

    // ==================== الإعجاب ====================
    like(id) {
        const item = this.db.find(x => x.id === id);
        if (item) {
            item.likes++;
            this.syncStorage();
            this.render();
        }
    },

    // ==================== الفلاتر ====================
    renderFilters() {
        const categories = ["الكل", "قانون مدني", "قانون الأسرة", "قانون جنائي", "قانون تجاري", "قانون دستوري", "قانون إداري", "مراجع عامة"];
        const container = document.getElementById('filterBar');

        container.innerHTML = categories.map(cat => `
            <button class="filter-btn ${cat === this.currentFilter ? 'active' : ''}" 
                    onclick="PartageApp.setFilter('${cat}')">
                ${cat}
            </button>
        `).join('');
    },

    setFilter(category) {
        this.currentFilter = category;
        this.renderFilters();
        this.render();
    },

    // ==================== عرض المكتبة ====================
    render() {
        const grid = document.getElementById('proLibrary');
        let filteredData = this.db;

        if (this.currentFilter !== "الكل") {
            filteredData = this.db.filter(item => item.cat === this.currentFilter);
        }

        grid.innerHTML = filteredData.map(item => `
            <div class="file-card">
                <div class="card-body">
                    <span class="tag">${item.cat}</span>
                    <h3>${item.title}</h3>
                    
                    <div class="meta">
                        <small>بواسطة: ${item.owner}</small><br>
                        <small>تاريخ الإضافة: ${new Date(item.date).toLocaleDateString('ar-MA')}</small>
                    </div>

                    <div class="stats">
                        <span onclick="PartageApp.like(${item.id}); event.stopImmediatePropagation()" style="cursor:pointer;">
                            ❤️ ${item.likes}
                        </span>
                        <span><i class="fa-solid fa-download"></i> ${item.dl.toLocaleString()}</span>
                    </div>

                    <a href="#" onclick="PartageApp.handleDownload(${item.id}); event.preventDefault()" class="btn-dl">
                        <i class="fa-solid fa-download"></i> تحميل المرجع
                    </a>
                </div>
            </div>
        `).join('');
    },

    // ==================== إشعارات ====================
    showToast(message, type = "success") {
        let toast = document.getElementById('toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }

        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 28px;
            border-radius: 50px;
            color: white;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-weight: 500;
            background: ${type === "success" ? "#2c1a12" : "#c0392b"};
        `;

        toast.innerHTML = `
            <i class="fa-solid ${type === "success" ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        `;

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    }
};

// ====================== تهيئة عند تحميل الصفحة ======================
window.onload = () => PartageApp.init();
