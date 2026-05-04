// 1. تحديث دالة الرفع لتستقبل "رابط" بدلاً من ملف ثقيل
PartageApp.handleUpload = function() {
    const title = prompt("أدخل اسم الكتاب أو الملخص:");
    const url = prompt("ضع رابط التحميل (Google Drive, Dropbox, إلخ):");
    
    if(!title || !url) return this.showToast("يرجى ملء جميع البيانات");

    const category = this.detectCategory(title);
    const newEntry = {
        id: Date.now(),
        title: title,
        url: url, // حفظ الرابط فقط
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
};

// 2. تحديث دالة التحميل لتفتح الرابط مباشرة
PartageApp.handleDownload = function(id) {
    const item = this.db.find(x => x.id === id);
    if (item && item.url) {
        item.dl++;
        this.syncStorage();
        window.open(item.url, "_blank"); // فتح رابط التحميل في صفحة جديدة
        this.render();
    }
};
