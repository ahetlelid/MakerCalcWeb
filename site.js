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
      segment: "Segment",
      segmentBlurb: "Lengder og kappvinkel for ramme, boks og segmentring.",
      spacing: "Fordeling",
      spacingBlurb: "Jevne mellomrom for hyller, dybler og hyllepinner.",
      arc: "Bue",
      arcBlurb: "Radius, buelengde og trammel fra korde og pil.",
      brace: "Avstiver",
      braceBlurb: "Lengde og kappvinkel for skråstag i en lysåpning.",
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
      segment: "Segment",
      segmentBlurb: "Längder och kappvinkel för ram, låda och segmentring.",
      spacing: "Fördelning",
      spacingBlurb: "Jämna mellanrum för hyllor, pluggar och hyllstift.",
      arc: "Båge",
      arcBlurb: "Radie, båglängd och trammel från korda och pilhöjd.",
      brace: "Sträva",
      braceBlurb: "Längd och kappvinkel för snedstag i en öppning.",
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
      segment: "Segment",
      segmentBlurb: "Længder og kappevinkel til ramme, kasse og segmentring.",
      spacing: "Fordeling",
      spacingBlurb: "Jævne mellemrum til hylder, dyvler og hyldestifter.",
      arc: "Bue",
      arcBlurb: "Radius, buelængde og trammel fra korde og pilehøjde.",
      brace: "Afstiver",
      braceBlurb: "Længde og kappevinkel til skråstag i en lysning.",
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
      segment: "Segmentti",
      segmentBlurb: "Pituudet ja katkaisukulma kehykselle, laatikolle ja segmenttirenkaalle.",
      spacing: "Jako",
      spacingBlurb: "Tasaiset välit hyllyille, tulpille ja hyllytapille.",
      arc: "Kaari",
      arcBlurb: "Säde, kaaren pituus ja trammeli jänteestä ja nuolesta.",
      brace: "Tuki",
      braceBlurb: "Pituus ja katkaisukulma vinotuelle aukon sisällä.",
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
      segment: "Segment",
      segmentBlurb: "Lengths and cut angle for frames, boxes and segmented rings.",
      spacing: "Spacing",
      spacingBlurb: "Even gaps for shelves, dowels and shelf pins.",
      arc: "Arc",
      arcBlurb: "Radius, arc length and trammel from chord and rise.",
      brace: "Brace",
      braceBlurb: "Length and cut angles for a diagonal brace in an opening.",
      language: "Language"
    }
  };

  var lang = "no";
  var page = "home";
  var onChange = null;
  var LINK_KEYS = ["miter", "cove", "dovetail", "segment", "spacing", "arc", "brace"];

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
    for (var k = 0; k < LINK_KEYS.length; k += 1) {
      var id = LINK_KEYS[k];
      var nameEl = document.getElementById("link-" + id + "-name");
      if (nameEl) nameEl.textContent = text(id);
      var blurbEl = document.getElementById("link-" + id + "-blurb");
      if (blurbEl) blurbEl.textContent = text(id + "Blurb");
    }
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
