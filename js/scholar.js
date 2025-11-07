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
      <div style="display:flex; gap:12px; align-items:center; font:14px/1.45 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; border:1px solid #e5e7eb; border-radius:12px; padding:12px; max-width:520px;">
        ${d.photo ? `<img src="${d.photo}" alt="" style="width:56px;height:56px;border-radius:999px;object-fit:cover;">` : ""}
        <div style="flex:1;">
          <div style="font-weight:600">${nameHtml}</div>
          <div style="opacity:.7">${d.affiliation ?? ""}</div>
          <table style="margin-top:8px; width:100%; border-collapse:collapse">
            <tr><td>Citations</td> <td style="text-align:right">${fmt(d.metrics?.citations_all)}</td></tr>
            <tr><td>h-index</td>   <td style="text-align:right">${fmt(d.metrics?.h_index_all)}</td></tr>
            <tr><td>i10-index</td> <td style="text-align:right">${fmt(d.metrics?.i10_index_all)}</td></tr>
          </table>
          <div style="margin-top:6px; font-size:12px; opacity:.7">
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
