function startSearch() {
    const bookTitle = document.getElementById("lawInput").value;
    if (bookTitle.trim() === "") {
        alert("يرجى إدخال اسم المرجع القانوني أولاً");
        return;
    }
    // صياغة بحث احترافية لجلب روابط التحميل المباشرة
    const searchUrl = `https://www.google.com/search?q=filetype:pdf "${bookTitle}"`;
    window.open(searchUrl, "_blank");
}
