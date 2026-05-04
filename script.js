// 1. مصفوفة البيانات المحدثة
let uploadedFiles = [
    { id: 1, name: "الوجيز في القانون المدني", category: "قانون مدني", user: "أمين", date: "منذ ساعة", downloads: 150, likes: 45 },
    { id: 2, name: "محاضرات القانون الجنائي العام", category: "قانون جنائي", user: "إيمان", date: "منذ يوم", downloads: 90, likes: 22 }
];

// 2. دالة الإعجاب (Like)
function toggleLike(id) {
    const file = uploadedFiles.find(f => f.id === id);
    if (file) {
        file.likes++; // زيادة الإعجابات
        renderFiles();
    }
}

// 3. دالة التحميل (Download)
function incrementDownload(id) {
    const file = uploadedFiles.find(f => f.id === id);
    if (file) {
        file.downloads++;
        renderFiles();
    }
}

// 4. تحديث العرض ليظهر الأزرار الجديدة
function renderFiles() {
    const container = document.getElementById('communityFiles');
    container.innerHTML = uploadedFiles.map(file => `
        <div class="file-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="background: rgba(197, 160, 89, 0.2); color: var(--gold); padding: 3px 12px; border-radius: 20px; font-size: 0.75rem; border: 1px solid var(--gold);">
                    ${file.category}
                </span>
                <div style="display: flex; gap: 10px; font-size: 0.85rem;">
                    <span title="إعجابات" style="color: #ff4d4d; cursor: pointer;" onclick="toggleLike(${file.id})">
                        <i class="fa-solid fa-heart"></i> ${file.likes}
                    </span>
                    <span title="تحميلات" style="color: var(--gold);">
                        <i class="fa-solid fa-fire"></i> ${file.downloads}
                    </span>
                </div>
            </div>
            <h3>${file.name}</h3>
            <p style="font-size: 0.8rem; color: #8892b0; margin: 5px 0 15px 0;">بواسطة: ${file.user} • ${file.date}</p>
            
            <a href="javascript:void(0)" onclick="incrementDownload(${file.id})" class="btn-download">
                <i class="fa-solid fa-download"></i> تحميل الملف
            </a>
        </div>
    `).join('');
}

renderFiles();
