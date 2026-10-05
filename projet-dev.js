(function () {
  const RETOUR = "index.html#developpement";

  const id = new URLSearchParams(window.location.search).get("id");
  const projet = PROJETS_DEV.find((p) => p.id === id) || (id ? null : PROJETS_DEV[0]);

  if (!projet) {
    window.location.replace(RETOUR);
    return;
  }

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  document.title = `${projet.titre} | Manel Ben Halima`;
  document.querySelectorAll("[data-retour]").forEach((a) => (a.href = RETOUR));
  $("[data-titre]").textContent = projet.titre;
  $("[data-texte]").textContent = projet.texte;

  // Infos à gauche (étiquette + valeur), une ligne par champ renseigné
  const meta = $("[data-meta]");
  const lignes = [
    ["Catégorie", projet.categorie],
    ["Année", projet.annee],
    ["Rôle", projet.role],
    ["Contexte", projet.contexte],
    ["Technologies", projet.technologies],
  ];
  lignes.forEach(([label, valeur]) => {
    if (!valeur || (Array.isArray(valeur) && !valeur.length)) return;
    const row = el("div", "meta-ligne");
    row.appendChild(el("dt", null, label));
    const dd = el("dd");
    if (label === "Technologies") {
      dd.appendChild(el("span", null, valeur.join(" · ")));
    } else {
      (Array.isArray(valeur) ? valeur : [valeur]).forEach((v) => dd.appendChild(el("span", null, v)));
    }
    row.appendChild(dd);
    meta.appendChild(row);
  });

  // Lien (retiré si le projet n'en a pas)
  const lien = $("[data-lien]");
  if (projet.lien) {
    lien.href = projet.lien.url;
    $("[data-lien-texte]").textContent = projet.lien.libelle || "accéder au site";
  } else {
    lien.remove();
  }

  // Galerie : un titre centré au-dessus de chaque capture
  const galerie = $("[data-galerie]");
  const total = projet.captures.length;

  projet.captures.forEach((c, i) => {
    const bloc = el("figure", "capture reveal");
    bloc.appendChild(el("figcaption", "capture-titre", c.titre));

    const cadre = el("div", c.mobile ? "capture-cadre capture-mobile" : "capture-cadre");
    const sources = c.video ? [] : c.mobile || [c.src];
    if (c.video) {
      const video = document.createElement("video");
      video.src = c.video;
      video.controls = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", `Vidéo de ${projet.titre} : ${c.alt}`);
      cadre.appendChild(video);
    }
    sources.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Capture d'écran de ${projet.titre} : ${c.alt} (${i + 1}/${total})`;
      img.loading = i === 0 ? "eager" : "lazy";
      cadre.appendChild(img);
    });
    bloc.appendChild(cadre);
    galerie.appendChild(bloc);
  });

  // Apparition douce au défilement
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    galerie.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
  } else {
    galerie.querySelectorAll(".reveal").forEach((n) => n.classList.add("visible"));
  }
})();
