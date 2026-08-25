// ============================================================
// Para Santé Abail — shared behaviour
// ============================================================
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight current page in nav
  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var target = a.getAttribute("href");
    if (target === here || (here === "" && target === "index.html")) {
      a.classList.add("active");
    }
  });

  // Save contact (vCard)
  document.querySelectorAll("[data-save-contact]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Abail;Para Santé;;;",
        "FN:Para Santé Abail",
        "ORG:Para Santé Abail — Parapharmacie",
        "TEL;TYPE=CELL:+212786747079",
        "ADR;TYPE=WORK:;;Imm 26, Andalous GH 8, Mag 3;Mohammedia;;28803;Maroc",
        "URL:https://wa.me/212786747079",
        "NOTE:Parapharmacie - Soins - Compléments",
        "END:VCARD",
      ].join("\n");

      var blob = new Blob([vcard], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "Para-Sante-Abail.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      var toast = document.getElementById("toast");
      if (toast) {
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2200);
      }
    });
  });
})();
