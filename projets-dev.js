// Pour ajouter un projet : copie un objet et change l'id.
// La page s'ouvre avec projet-dev.html?id=<id>
const PROJETS_DEV = [
  {
    id: "les-affutes",
    titre: "Les Affûtés",
    categorie: ["Développement web", "Design UI"],
    annee: "2026",
    role: ["Design", "Intégration", "Développement JavaScript"],
    contexte: "Exercice de formation : refonte d'un site existant",
    technologies: ["HTML", "CSS", "JavaScript", "JSON"],
    texte:
      "Les Affûtés est un espace montréalais d'ateliers collectifs et de makerspace dédié aux savoir-faire manuels. Pour cet exercice de ma formation en développement front-end, j'ai refait leur site : j'aime beaucoup ce qu'ils font, et j'ai voulu y apporter ma touche personnelle. J'ai conçu le design et l'intégration : une palette vive, un menu latéral en tuiles colorées, une liste d'ateliers filtrable par univers et une fiche détaillée générée dynamiquement pour chaque atelier à partir d'un fichier JSON. J'ai aussi développé un assistant conversationnel qui répond aux questions sur les prix, les dates et les lieux. Les illustrations sont celles du site original.",
    lien: {
      url: "https://github.com/ManelBenH/les-affutes",
      libelle: "voir le code sur GitHub",
    },
    captures: [
      { titre: "Visuel 01", src: "images/les-affutes-visuel01.webp", alt: "visuel 01 du site Les Affûtés" },
      { titre: "Visuel 02", src: "images/les-affutes-visuel02.webp", alt: "visuel 02 du site Les Affûtés" },
      { titre: "Visuel 03", src: "images/les-affutes-visuel03.webp", alt: "visuel 03 du site Les Affûtés" },
      { titre: "Visuel 04", src: "images/les-affutes-visuel04.webp", alt: "visuel 04 du site Les Affûtés" },
      { titre: "Visuel 05", src: "images/les-affutes-visuel05.webp", alt: "visuel 05 du site Les Affûtés" },
      { titre: "Visuel 06", src: "images/les-affutes-visuel06.webp", alt: "visuel 06 du site Les Affûtés" },
      { titre: "Visuel 07", src: "images/les-affutes-visuel07.webp", alt: "visuel 07 du site Les Affûtés" },
      { titre: "Visuel 08", src: "images/les-affutes-visuel08.webp", alt: "visuel 08 du site Les Affûtés" },
      { titre: "Vidéo de présentation", video: "video/les-affutes.mp4", alt: "navigation dans le site Les Affûtés" },
    ],
  },
];
