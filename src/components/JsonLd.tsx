export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Shehata Said Abdelwahed",
    alternateName: [
      "Ahmed Abdelwahed",
      "Ahmed Shehata Abdelwahed",
      "Ahmed Said Abdelwahed",
      "Ahmed Shehata",
    ],
    url: "https://ahmedabdelwahed.me",
    jobTitle: "Data Engineer",
    description:
      "Data Engineer who designs systems, builds data pipelines, and turns ideas into working products. Specializing in data engineering, Python, ETL, AI-driven tools, and practical software.",
    email: "ahmedshehatasaid1@gmail.com",
    sameAs: [
      "https://linkedin.com/in/ahmed-abdelwahed",
      "https://github.com/ahmed-abdelwahed1",
      "https://x.com/BinShehata",
      "https://medium.com/@ahmed-abdelwahed",
    ],
    knowsAbout: [
      "Data Engineering",
      "Python",
      "ETL Pipelines",
      "Data Pipelines",
      "Software Engineering",
      "AI Tools",
      "Data Architecture",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ahmed Shehata Said Abdelwahed",
    alternateName: ["Ahmed Abdelwahed Portfolio", "Ahmed Abdelwahed"],
    url: "https://ahmedabdelwahed.me",
    description:
      "Personal portfolio and blog of Ahmed Shehata Said Abdelwahed — Data Engineer.",
    author: {
      "@type": "Person",
      name: "Ahmed Shehata Said Abdelwahed",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
