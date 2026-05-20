document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".global-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("active"));
  }

  const modal = document.getElementById("aiModal");
  document.querySelectorAll(".js-open-ai").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    });
  });
  document.querySelectorAll(".js-close-ai").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });
  });

  const form = document.getElementById("aiForm");
  const result = document.getElementById("aiResult");
  if (!form || !result) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const age = data.get("age");
    const symptom = data.get("symptom");
    const target = data.get("target");
    const contact = data.get("contact");

    let score = 0;
    if (age === "10〜15年") score += 1;
    if (age === "15〜20年") score += 2;
    if (age === "20年以上") score += 3;
    if (["ひび割れ","チョーキング"].includes(symptom)) score += 2;
    if (["コケ・カビ","色あせ","よく分からない"].includes(symptom)) score += 1;
    if (symptom === "雨漏り") score += 4;

    let level = "経過観察";
    let message = "すぐに大きな工事が必要とは限りません。写真相談や点検で状態を確認しましょう。";
    if (score >= 3) {
      level = "点検推奨";
      message = "外壁塗装・屋根塗装の検討時期です。早めの現地確認がおすすめです。";
    }
    if (score >= 6) {
      level = "早めの確認推奨";
      message = "劣化が進んでいる可能性があります。雨漏りや下地劣化につながる前に確認しましょう。";
    }

    let price = "70万円〜120万円前後";
    if (target === "屋根塗装") price = "30万円〜80万円前後";
    if (target === "外壁と屋根") price = "100万円〜180万円前後";
    if (target === "まず相談したい") price = "現地確認後にご案内";

    let action = "無料見積もりフォームからお問い合わせください。";
    if (contact === "LINE") action = "LINEで写真を送ると、よりスムーズに確認できます。";
    if (contact === "電話") action = "お急ぎの場合は 0120-000-000 へお電話ください。";
    if (contact === "メール") action = "フォームから送信すると、担当者が折り返します。";

    result.hidden = false;
    result.innerHTML = `
      <p class="result-level">劣化レベル：${level}</p>
      <p><strong>診断結果：</strong>${message}</p>
      <p><strong>料金目安：</strong>${price}</p>
      <p><strong>次の行動：</strong>${action}</p>
      <div class="hero-links">
        <a href="#">LINEで写真を送る</a>
        <a href="contact.html">無料見積もりフォームへ</a>
        <a href="tel:0120000000">電話で相談する</a>
      </div>
    `;
  });
});
