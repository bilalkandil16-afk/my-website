// مصفوفة لتخزين الملفات المرفوعة (محاكاة لقاعدة البيانات)
let uploadedFiles = [
    { name: "شرح قانون الالتزامات والعقود", category: "قانون مدني", user: "أحمد", date: "منذ ساعة" },
    { name: "دليل المحامي المبتدئ", category: "مهنة المحاماة", user: "سارة", date: "منذ يوم" }
];

// وظيفة الرفع التلقائي الذكي
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // محرك ذكي لاستخراج التصنيف من اسم الملف تلقائياً
    let fileName = file.name;
    let category = "عام"; // التصنيف الافتراضي

    if (fileName.includes("مدني")) category = "قانون مدني";
    else if (fileName.includes("جنائي") || fileName.includes("عقوبات")) category = "قانون جنائي";
    else if (fileName.includes("تجاري")) category = "قانون تجاري";
    else if (fileName.includes("أسرة")) category = "قانون الأسرة";
    else if (fileName.includes("دستوري")) category = "قانون دستوري";

    // إضافة الملف الجديد للمصفوفة
    const newFile = {
        name: fileName,
        category: category,
        user: "مساهم جديد",
        date: "الآن"
    };

    uploadedFiles.unshift(newFile); // وضعه في البداية
    renderFiles(); // إعادة تحديث الواجهة
    alert("تم رفع الملف وتصنيفه تلقائياً تحت قسم: " + category);
}

// وظيفة عرض الملفات في الواجهة
function renderFiles() {
    const container = document.getElementById('communityFiles');
    container.innerHTML = uploadedFiles.map(file => `
        <div class="file-card">
            <div style="background: var(--gold); color: var(--navy); padding: 2px 10px; border-radius: 5px; font-size: 0.7rem; display: inline-block; margin-bottom: 5px;">
                ${file.category}
            </div>
            <h3>${file.name}</h3>
            <span class="file-info">بواسطة: ${file.user} • ${file.date}</span>
            <a href="#" class="btn-download"><i class="fa-solid fa-download"></i> تحميل الملف</a>
        </div>
    `).join('');
}

// تشغيل العرض عند فتح الصفحة أول مرة
renderFiles();
