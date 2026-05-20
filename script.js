
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".global-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => nav.classList.toggle("active"));
  }

  const modal = document.getElementById("aiModal");
  const openButtons = document.querySelectorAll(".open-ai");
  const closeButtons = document.querySelectorAll(".close-ai");
  openButtons.forEach(btn => btn.addEventListener("click", () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }));
  closeButtons.forEach(btn => btn.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }));

  const form = document.getElementById("aiForm");
  const result = document.getElementById("aiResult");

  if (form && result) {
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
      if (["ひび割れ", "チョーキング", "コケ・カビ"].includes(symptom)) score += 2;
      if (symptom === "雨漏り") score += 4;
      if (symptom === "よく分からない") score += 1;

      let level = "低め";
      let message = "今すぐ大きな工事が必要とは限りませんが、定期点検をおすすめします。";
      if (score >= 3) {
        level = "中程度";
        message = "外壁塗装・屋根塗装の検討時期です。早めの現地確認がおすすめです。";
      }
      if (score >= 6) {
        level = "高め";
        message = "劣化が進んでいる可能性があります。雨漏りや下地劣化につながる前に、早めの確認をおすすめします。";
      }

      let price = "70万円〜120万円前後";
      if (target === "屋根塗装") price = "30万円〜80万円前後";
      if (target === "外壁と屋根") price = "100万円〜180万円前後";
      if (target === "まず相談したい") price = "状態確認後に目安をご案内";

      let action = "無料見積もりフォームから現地調査をご依頼ください。";
      if (contact === "LINE") action = "LINEで写真を送ると、よりスムーズに確認できます。";
      if (contact === "電話") action = "お急ぎの場合は 0120-000-000 へお電話ください。";
      if (contact === "メール") action = "フォームから詳細を送ると、後ほど担当者が返信します。";

      result.hidden = false;
      result.innerHTML = `
        <p class="result-level">診断結果：劣化レベル ${level}</p>
        <p><strong>おすすめ対応：</strong>${message}</p>
        <p><strong>料金目安：</strong>${price}</p>
        <p><strong>次にするべき行動：</strong>${action}</p>
        <p class="note">※この診断はデモ用の簡易判定です。正確な判断には現地確認が必要です。</p>
        <div class="btn-row">
          <a class="btn line-btn" href="#">LINEで写真を送る</a>
          <a class="btn primary" href="contact.html">無料見積もりフォームへ</a>
          <a class="btn secondary" href="tel:0120000000">電話で相談する</a>
        </div>
      `;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
});
