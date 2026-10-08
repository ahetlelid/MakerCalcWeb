(function () {
  var LANGS = ["no", "sv", "da", "fi", "en"];
  var STORAGE_KEY = "compound-miter-lang";
  var NAV = {
    no: {
      siteTitle: "Verkstedverktøy",
      intro: "Enkle regnestykker for hobbyverkstedet. Sidene virker uten nett.",
      nav: "Verktøy",
      home: "Verktøy",
      miter: "Sammensatt gjæring",
      miterBlurb: "Gjæring og bladhelling for en mangekant.",
      cove: "Hulkil",
      coveBlurb: "Sporprofil og oppsett for et buet spor på sagen.",
      dovetail: "Svalehale",
      dovetailBlurb: "Pinner og haler for svalehale og fingerskjøt.",
      language: "Språk"
    },
    sv: {
      siteTitle: "Verkstadsverktyg",
      intro: "Enkla beräkningar för hobbyverkstaden. Sidorna fungerar utan nät.",
      nav: "Verktyg",
      home: "Verktyg",
      miter: "Sammansatt gering",
      miterBlurb: "Gering och klinglutning för en månghörning.",
      cove: "Hålkäl",
      coveBlurb: "Spårprofil och inställning för ett böjt spår på sågen.",
      dovetail: "Laxstjärt",
      dovetailBlurb: "Tappar och laxstjärtar för sinkning och fingerskarv.",
      language: "Språk"
    },
    da: {
      siteTitle: "Værkstedsværktøj",
      intro: "Enkle udregninger til hobbyværkstedet. Siderne virker uden net.",
      nav: "Værktøj",
      home: "Værktøj",
      miter: "Sammensat gering",
      miterBlurb: "Gering og klingehældning til en mangekant.",
      cove: "Hulkel",
      coveBlurb: "Sporprofil og indstilling til et buet spor på saven.",
      dovetail: "Svalehale",
      dovetailBlurb: "Tappe og haler til svalehale og fingersamling.",
      language: "Sprog"
    },
    fi: {
      siteTitle: "Verstasvälineet",
      intro: "Yksinkertaisia laskelmia harrasteverstaalle. Sivut toimivat ilman verkkoa.",
      nav: "Valikko",
      home: "Välineet",
      miter: "Yhdistetty jiiri",
      miterBlurb: "Jiirikulma ja terän kallistus monikulmiolle.",
      cove: "Kouru",
      coveBlurb: "Uran profiili ja asetukset kaarevaan sahaukseen.",
      dovetail: "Lohenpyrstö",
      dovetailBlurb: "Tapit ja lohenpyrstöt sinkkaukseen ja sormiliitokseen.",
      language: "Kieli"
    },
    en: {
      siteTitle: "Shop tools",
      intro: "Simple calculations for the hobby workshop. The pages work offline.",
      nav: "Menu",
      home: "Tools",
      miter: "Compound miter",
      miterBlurb: "Miter and bevel for a polygon.",
      cove: "Cove cut",
      coveBlurb: "Profile and setup for a curved groove on the saw.",
      dovetail: "Dovetail",
      dovetailBlurb: "Pins and tails for dovetails and box joints.",
      language: "Language"
    }
  };

  var lang = "no";
  var page = "home";
  var onChange = null;

  function detectLang(list) {
    var languages = list || (navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""]);
    for (var i = 0; i < languages.length; i += 1) {
      var base = String(languages[i] || "").toLowerCase().split("-")[0];
      if (base === "no" || base === "nb" || base === "nn") return "no";
      if (base === "sv" || base === "da" || base === "fi" || base === "en") return base;
    }
    return "no";
  }

  function loadLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (err) {
      return detectLang();
    }
    return detectLang();
  }

  function text(key) {
    return NAV[lang][key];
  }

  function applyChrome() {
    document.documentElement.lang = lang;
    var nav = document.getElementById("sitenav");
    if (nav) {
      nav.setAttribute("aria-label", text("nav"));
      var links = nav.querySelectorAll("a");
      for (var i = 0; i < links.length; i += 1) {
        var key = links[i].getAttribute("data-nav");
        links[i].textContent = text(key);
        if (key === page) links[i].setAttribute("aria-current", "page");
        else links[i].removeAttribute("aria-current");
      }
    }
    var langs = document.getElementById("langs");
    if (langs) {
      langs.setAttribute("aria-label", text("language"));
      if (langs.value !== lang) langs.value = lang;
    }
    var siteTitle = document.getElementById("site-title");
    if (siteTitle) siteTitle.textContent = text("siteTitle");
    var siteIntro = document.getElementById("site-intro");
    if (siteIntro) siteIntro.textContent = text("intro");
    var miterName = document.getElementById("link-miter-name");
    if (miterName) miterName.textContent = text("miter");
    var miterBlurb = document.getElementById("link-miter-blurb");
    if (miterBlurb) miterBlurb.textContent = text("miterBlurb");
    var coveName = document.getElementById("link-cove-name");
    if (coveName) coveName.textContent = text("cove");
    var coveBlurb = document.getElementById("link-cove-blurb");
    if (coveBlurb) coveBlurb.textContent = text("coveBlurb");
    var dovetailName = document.getElementById("link-dovetail-name");
    if (dovetailName) dovetailName.textContent = text("dovetail");
    var dovetailBlurb = document.getElementById("link-dovetail-blurb");
    if (dovetailBlurb) dovetailBlurb.textContent = text("dovetailBlurb");
    if (page === "home") document.title = text("siteTitle");
  }

  function setLang(next) {
    if (LANGS.indexOf(next) === -1) return;
    lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* keep the choice for this visit */
    }
    applyChrome();
    if (onChange) onChange(lang);
  }

  function init(options) {
    page = (options && options.page) || "home";
    onChange = options && options.onChange ? options.onChange : null;
    lang = loadLang();
    var langs = document.getElementById("langs");
    if (langs) {
      langs.addEventListener("change", function () {
        setLang(langs.value);
      });
    }
    applyChrome();
    if (window.matchMedia("(max-width: 700px)").matches) {
      var folds = document.querySelectorAll("details.fold");
      for (var f = 0; f < folds.length; f += 1) folds[f].open = false;
    }
    if (onChange) onChange(lang);
  }

  function decimalSep() {
    return lang === "en" ? "." : ",";
  }

  function formatNumber(value, digits) {
    return Number(value).toFixed(digits).replace(".", decimalSep());
  }

  function parseNumber(text) {
    var raw = String(text == null ? "" : text).trim().replace(",", ".");
    if (raw === "" || raw === "." || raw === "-" || raw === "-.") return null;
    if (!/^-?\d+(\.\d*)?$/.test(raw)) return null;
    var value = Number(raw);
    if (!Number.isFinite(value)) return null;
    return value;
  }

  window.Workshop = {
    init: init,
    lang: function () { return lang; },
    detectLang: detectLang,
    decimalSep: decimalSep,
    formatNumber: formatNumber,
    parseNumber: parseNumber,
    text: text
  };
})();
