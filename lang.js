/* Language choice: send first-time Korean-language visitors to /ko/, remember an explicit choice on this device only. */
(function () {
  var KEY = "lang";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  if (document.documentElement.lang !== "ko") {
    var saved = get();
    var first = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    var wantsKo = saved ? saved === "ko" : /^ko(-|$)/i.test(first);
    var alt = document.querySelector('link[rel="alternate"][hreflang="ko"]');
    if (wantsKo && alt) {
      var u = new URL(alt.href);
      location.replace(u.pathname + location.search + location.hash);
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.lang");
    if (a) set(a.getAttribute("hreflang") === "ko" ? "ko" : "en");
  });
})();
