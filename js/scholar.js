// js/scholar.js
(async () => {
  const el = document.getElementById("scholar-badge");
  if (!el) return;

  try {
    // absolute path so it works from any page
    const res = await fetch("/data/scholar.json", { cache: "no-store" });
    const d = await res.json();

    const fmt = v => (v || v === 0) ? Number(v).toLocaleString() : "—";
    const nameHtml = d.scholar_url
      ? `<a href="${d.scholar_url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit">${d.name || "Google Scholar"}</a>`
      : (d.name || "Google Scholar");

el.innerHTML = `
  <div style="
    display:flex;
    gap:14px;
    align-items:center;
    font:15px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    border:1px solid #444;
    border-radius:14px;
    padding:16px 20px;
    max-width:520px;
    background:#111;
    color:#fff;
    box-shadow:0 4px 12px rgba(255,255,255,0.1);
  ">
    ${d.photo ? `<img src="${d.photo}" alt="" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid #555;">` : ""}
    <div style="flex:1; text-align:left;">
      <div style="font-weight:700; font-size:16px; color:#fff;">${nameHtml}</div>
      <div style="opacity:.8; font-weight:500; font-size:14px; color:#ccc; margin-bottom:6px;">${d.affiliation ?? ""}</div>
      <table style="margin-top:6px; width:100%; border-collapse:collapse; font-weight:600;">
        <tr><td style="color:#fff;">Citations</td> <td style="text-align:right; color:#fff;">${fmt(d.metrics?.citations_all)}</td></tr>
        <tr><td style="color:#fff;">h-index</td>   <td style="text-align:right; color:#fff;">${fmt(d.metrics?.h_index_all)}</td></tr>
        <tr><td style="color:#fff;">i10-index</td> <td style="text-align:right; color:#fff;">${fmt(d.metrics?.i10_index_all)}</td></tr>
      </table>
      <div style="margin-top:8px; font-size:12px; opacity:.6; font-weight:500; color:#ccc;">
        Updated: ${d.updated_at ? new Date(d.updated_at).toLocaleString() : "—"}
      </div>
    </div>
  </div>
`;

  } catch (e) {
    el.textContent = "Google Scholar stats unavailable.";
    console.error(e);
  }
})();
