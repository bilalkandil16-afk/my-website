<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partage Légal | المنصة القانونية الاحترافية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    
    <style>
        :root {
            --dark-wood: #2c1a12;
            --accent-gold: #c5a059;
            --gold-light: #e6d4a8;
            --legal-brown: #5c3023;
            --paper: #fdfaf5;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Cairo', sans-serif;
            background: #f5f0e6;
            background-image: linear-gradient(rgba(44,26,18,0.03), rgba(44,26,18,0.03)), url('https://www.transparenttextures.com/patterns/cream-paper.png');
            color: #333;
        }

        header {
            background: linear-gradient(135deg, var(--dark-wood), #1a0d08);
            padding: 60px 20px 80px;
            text-align: center;
            position: relative;
        }

        header::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 6px;
            background: linear-gradient(to right, transparent, var(--accent-gold), transparent);
        }

        .logo { 
            font-family: 'Amiri', serif; 
            font-size: 3.8rem; 
            color: var(--accent-gold); 
            text-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
        }

        .container { max-width: 1200px; margin: -50px auto 50px; padding: 0 20px; }

        .section-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            margin-bottom: 35px;
            box-shadow: 0 15px 45px rgba(61, 31, 20, 0.12);
            border: 1px solid rgba(197, 160, 89, 0.15);
        }

        h2 {
            font-family: 'Amiri', serif;
            color: var(--dark-wood);
            font-size: 2.1rem;
            margin-bottom: 25px;
            padding-right: 18px;
            border-right: 6px solid var(--accent-gold);
        }

        .search-group {
            display: flex;
            background: white;
            border: 3px solid var(--accent-gold);
            border-radius: 50px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(197, 160, 89, 0.15);
        }

        .search-group input {
            flex: 1;
            border: none;
            padding: 18px 25px;
            font-size: 1.15rem;
            outline: none;
        }

        .search-group button {
            background: var(--dark-wood);
            color: var(--accent-gold);
            border: none;
            padding: 0 35px;
            font-size: 1.3rem;
            cursor: pointer;
            transition: 0.3s;
        }

        .upload-zone {
            border: 3px dashed var(--accent-gold);
            padding: 55px 30px;
            text-align: center;
            border-radius: 16px;
            background: #fcfbf7;
            transition: all 0.4s ease;
            cursor: pointer;
        }

        .upload-zone:hover {
            background: white;
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(197, 160, 89, 0.2);
        }

        .filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px; }

        .filter-btn {
            padding: 10px 22px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filter-btn.active {
            background: var(--dark-wood);
            color: var(--accent-gold);
            border-color: var(--accent-gold);
        }

        .files-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 28px;
        }

        .file-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            border-top: 6px solid var(--legal-brown);
        }

        .file-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }

        .card-body { padding: 25px; }

        .tag {
            display: inline-block;
            padding: 5px 16px;
            background: rgba(197, 160, 89, 0.1);
            color: var(--accent-gold);
            font-size: 0.82rem;
            font-weight: 600;
            border-radius: 30px;
            margin-bottom: 12px;
        }

        .file-card h3 {
            font-family: 'Amiri', serif;
            font-size: 1.32rem;
            line-height: 1.4;
            margin-bottom: 15px;
            color: #222;
        }

        .meta {
            font-size: 0.85rem;
            color: #777;
            margin-bottom: 18px;
        }

        .stats {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            font-size: 0.95rem;
        }

        .btn-dl {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, var(--dark-wood), #3d2419);
            color: var(--accent-gold);
            padding: 15px;
            text-align: center;
            text-decoration: none;
            font-weight: 700;
            border-radius: 8px;
            transition: 0.3s;
            font-size: 1.08rem;
        }

        .btn-dl:hover {
            transform: translateY(-2px);
        }

        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 28px;
            border-radius: 50px;
            display: none;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-weight: 500;
        }
    </style>
</head>
<body>

<header>
    <h1 class="logo">⚖️ Partage Légal</h1>
    <p class="subtitle" style="color:#e6d4a8; font-size:1.25rem; margin-top:8px;">المنصة الاحترافية لتبادل المعرفة القانونية</p>
</header>

<div class="container">

    <div class="section-box">
        <h2>🔍 محرك البحث القانوني</h2>
        <div class="search-group">
            <input type="text" id="lawSearch" placeholder="ابحث عن كتب، أحكام، مذكرات أو مراجع قانونية...">
            <button onclick="proSearch()"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>

    <div class="section-box">
        <h2>📤 مساهمة في المكتبة</h2>
        <div class="upload-zone" onclick="PartageApp.handleUpload()">
            <i class="fa-solid fa-cloud-upload-alt" style="font-size: 4rem; color: var(--legal-brown); margin-bottom: 20px;"></i>
            <h3>أضف مرجعاً قانونياً جديداً</h3>
            <p>Google Drive • Mega • MediaFire • Dropbox</p>
        </div>
    </div>

    <div class="section-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h2>📚 المكتبة التشاركية</h2>
            <div class="filters" id="filterBar"></div>
        </div>
        <div class="files-grid" id="proLibrary"></div>
    </div>
</div>

<!-- Toast -->
<div class="toast" id="toast"></div>

<script>
    const PartageApp = {
        db: JSON.parse(localStorage.getItem('pl_pro_db')) || [
            { id: 1, title: "شرح قانون الالتزامات والعقود - الجزء الأول والثاني", cat: "قانون مدني", url: "#", owner: "د. أحمد الرحماني", dl: 1240, likes: 87, date: Date.now() - 86400000*3 },
            { id: 2, title: "دليل قانون الأسرة المغربي مع التعديلات الجديدة", cat: "قانون الأسرة", url: "#", owner: "مساهم قانوني", dl: 980, likes: 64, date: Date.now() - 86400000*5 }
        ],

        categories: ["الكل", "قانون مدني", "قانون الأسرة", "قانون جنائي", "قانون تجاري", "قانون دستوري", "قانون إداري"],

        init() {
            this.renderFilters();
            this.render();
        },

        renderFilters() {
            const container = document.getElementById('filterBar');
            container.innerHTML = this.categories.map(cat => `
                <button class="filter-btn \( {cat === 'الكل' ? 'active' : ''}" onclick="PartageApp.filterBy(' \){cat}')">
                    ${cat}
                </button>
            `).join('');
        },

        render(filteredDb = null) {
            const grid = document.getElementById('proLibrary');
            const data = filteredDb || this.db;

            grid.innerHTML = data.map(item => `
                <div class="file-card">
                    <div class="card-body">
                        <span class="tag">${item.cat}</span>
                        <h3>${item.title}</h3>
                        <div class="meta">
                            <small>بواسطة: ${item.owner || 'مساهم قانوني'}</small><br>
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

        filterBy(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.toggle('active', btn.textContent.trim() === category)
            );

            if (category === "الكل") {
                this.render();
            } else {
                this.render(this.db.filter(f => f.cat === category));
            }
        },

        // ==================== دالة الرفع المحدثة ====================
        handleUpload() {
            const title = prompt("أدخل اسم الكتاب أو الملخص:");
            if (!title) return this.showToast("يرجى إدخال اسم المرجع", "error");

            const url = prompt("ضع رابط التحميل (Google Drive, Mega, Dropbox...):");
            if (!url) return this.showToast("يرجى إدخال الرابط", "error");

            const category = this.detectCategory(title);

            const newEntry = {
                id: Date.now(),
                title: title.trim(),
                url: url.trim(),
                cat: category,
                owner: "مساهم قانوني",
                dl: 0,
                likes: 0,
                date: Date.now()
            };

            this.db.unshift(newEntry);
            this.syncStorage();
            this.render();
            this.showToast("تمت إضافة المرجع بنجاح!", "success");
        },

        detectCategory(title) {
            const t = title.toLowerCase();
            if (t.includes("مدني") || t.includes("التزامات") || t.includes("عقود")) return "قانون مدني";
            if (t.includes("أسرة") || t.includes("زواج") || t.includes("طلاق")) return "قانون الأسرة";
            if (t.includes("جنائي") || t.includes("عقوبات") || t.includes("جرائم")) return "قانون جنائي";
            if (t.includes("تجاري") || t.includes("شركات") || t.includes("تجارة")) return "قانون تجاري";
            if (t.includes("دستور")) return "قانون دستوري";
            if (t.includes("إداري")) return "قانون إداري";
            return "عام";
        },

        // ==================== دالة التحميل المحدثة ====================
        handleDownload(id) {
            const item = this.db.find(x => x.id === id);
            if (!item || !item.url) {
                this.showToast("الرابط غير متوفر", "error");
                return;
            }

            item.dl++;
            this.syncStorage();
            this.render();

            // فتح الرابط في تبويب جديد
            window.open(item.url, "_blank");
        },

        like(id) {
            const item = this.db.find(x => x.id === id);
            if (item) {
                item.likes++;
                this.syncStorage();
                this.render();
            }
        },

        syncStorage() {
            localStorage.setItem('pl_pro_db', JSON.stringify(this.db));
        },

        showToast(message, type = "success") {
            const toast = document.getElementById('toast');
            
            toast.style.background = type === "success" ? "#2c1a12" : "#c0392b";
            toast.style.color = "#fff";
            toast.innerHTML = `
                <i class="fa-solid ${type === "success" ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${message}</span>
            `;
            
            toast.style.display = 'flex';
            
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3200);
        }
    };

    function proSearch() {
        const query = document.getElementById('lawSearch').value.trim();
        if (!query) return;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}+filetype:pdf`, "_blank");
    }

    // تشغيل التطبيق
    window.onload = () => PartageApp.init();
</script>
</body>
</html>
