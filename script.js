// 1. مصفوفة الملفات مع إضافة عداد التحميلات
let uploadedFiles = [
    { id: 1, name: "شرح قانون الالتزامات والعقود", category: "قانون مدني", user: "أحمد", date: "منذ ساعة", downloads: 124 },
    { id: 2, name: "دليل المحامي المبتدئ", category: "مهنة المحاماة", user: "سارة", date: "منذ يوم", downloads: 85 }
];

// 2. دالة زيادة عدد التحميلات
function incrementDownload(id) {
    const file = uploadedFiles.find(f => f.id === id);
    if (file) {
        file.downloads++; // زيادة العداد
        renderFiles();    // تحديث الواجهة فوراً
        console.log(`تم تحميل: ${file.name}. العداد الحالي: ${file.downloads}`);
    }
}

// 3. تحديث دالة الرفع لتشمل العداد الجديد
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    let fileName = file.name;
    let category = "عام";
    if (fileName.includes("مدني")) category = "قانون مدني";
    else if (fileName.includes("جنائي")) category = "قانون جنائي";

    const newFile = {
        id: Date.now(), // رقم فريد لكل ملف
        name: fileName,
        category: category,
        user: "مساهم جديد",
        date: "الآن",
        downloads: 0 // يبدأ من الصفر
    };

    uploadedFiles.unshift(newFile);
    renderFiles();
}

// 4. تحديث دالة العرض لتظهر الأيقونة والعداد
function renderFiles() {
    const container = document.getElementById('communityFiles');
    container.innerHTML = uploadedFiles.map(file => `
        <div class="file-card">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="background: var(--gold); color: var(--navy); padding: 2px 10px; border-radius: 5px; font-size: 0.7rem;">
                    ${file.category}
                </div>
                <div style="color: var(--gold); font-size: 0.85rem;">
                    <i class="fa-solid fa-fire"></i> ${file.downloads}
                </div>
            </div>
            <h3 style="margin-top: 10px;">${file.name}</h3>
            <span class="file-info">بواسطة: ${file.user} • ${file.date}</span>
            <a href="javascript:void(0)" onclick="incrementDownload(${file.id})" class="btn-download">
                <i class="fa-solid fa-download"></i> تحميل الملف
            </a>
        </div>
    `).join('');
}

renderFiles();
