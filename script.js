function startSearch() {
    const bookTitle = document.getElementById("lawInput").value.trim();
    
    if (bookTitle === "") {
        alert("يرجى إدخال اسم المرجع القانوني أولاً");
        return;
    }

    // القائمة الذهبية للمواقع القانونية التي اخترتها
    const sites = [
        "talibdroit.com",
        "elkanoon.blogspot.com",
        "droitetentreprise.com",
        "lib-books.com",
        "bibliotdroit.com",
        "kanonin.com",
        "fsjesouissi.com"
    ];

    // تحويل المواقع إلى صيغة يفهمها Google (site:example.com OR site:test.com)
    const sitesQuery = sites.map(site => `site:${site}`).join(" OR ");
    
    // بناء رابط البحث الاحترافي: يبحث عن العنوان + المواقع المحددة + نوع الملف PDF
    const finalQuery = `"${bookTitle}" (${sitesQuery}) filetype:pdf`;
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;

    // فتح النتائج في نافذة جديدة
    window.open(searchUrl, "_blank");
}
