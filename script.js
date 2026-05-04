function startSearch() {
    const bookTitle = document.getElementById("lawInput").value.trim();
    
    if (bookTitle === "") {
        alert("يرجى إدخال اسم المرجع القانوني أولاً");
        return;
    }

    // قائمة المواقع
    const sites = [
        "talibdroit.com",
        "elkanoon.blogspot.com",
        "droitetentreprise.com",
        "lib-books.com",
        "bibliotdroit.com",
        "kanonin.com",
        "fsjesouissi.com"
    ];

    // صياغة بحث Google احترافية
    const sitesQuery = sites.map(site => `site:${site}`).join(" OR ");
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        `"\( {bookTitle}" ( \){sitesQuery}) filetype:pdf`
    )}`;

    window.open(searchUrl, "_blank");
}
