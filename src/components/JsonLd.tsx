const SITE_URL = "https://ahmedabdelwahed.me";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export default function JsonLd() {
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ahmed Shehata Said Abdelwahed",
        givenName: "Ahmed",
        additionalName: "Shehata Said",
        familyName: "Abdelwahed",
        alternateName: [
          "Ahmed Abdelwahed",
          "Ahmed Shehata",
          "Ahmed Said Abdelwahed",
          "Ahmed Shehata Abdelwahed",
          "Ahmed Abdel Wahed",
          "Ahmed Abdelwahid",
          "أحمد شحاته",
          "أحمد شحاتة",
          "أحمد شحاتة سعيد",
          "أحمد شحاته سعيد عبدالواحد",
          "أحمد شحاتة سعيد عبدالواحد",
          "أحمد عبدالواحد",
          "أحمد عبد الواحد",
          "أحمد شحاتة عبدالواحد",
          "أحمد سعيد عبدالواحد",
        ],
        url: `${SITE_URL}/`,
        image: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#primaryimage`,
          url: `${SITE_URL}/og-image.png`,
          width: 1600,
          height: 800,
          caption: "Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) — Data Engineer",
        },
        jobTitle: ["Data Engineer", "Junior Data Engineer", "مهندس بيانات"],
        description:
          "Data Engineer (Ahmed Shehata Said Abdelwahed / أحمد شحاتة سعيد عبدالواحد) who designs systems, builds automated ETL pipelines, models PostgreSQL schemas, and turns ideas into working products. Experienced at Cyan Group and formerly Data Engineering Intern at Volvo Cars in Gothenburg, Sweden.",
        email: "mailto:contact@ahmedabdelwahed.me",
        worksFor: {
          "@type": "Organization",
          name: "Cyan Group",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KW",
          },
        },
        affiliation: [
          {
            "@type": "Organization",
            name: "Volvo Cars",
            url: "https://www.volvocars.com/",
            location: {
              "@type": "Place",
              name: "Gothenburg, Sweden",
            },
          },
          {
            "@type": "Organization",
            name: "IEEE Mansoura Computer Society Chapter",
          },
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Mansoura University",
          department: "Faculty of Specific Education — Computer Science and Education",
          sameAs: "https://www.mans.edu.eg/",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Data Analyst Professional Certificate - IBM",
            url: "https://www.credly.com/badges/771aa249-d545-4e8c-9ff4-98a0a24a97bd/public_url",
            recognizedBy: {
              "@type": "Organization",
              name: "IBM",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Databases and SQL for Data Science - IBM",
            url: "https://www.credly.com/badges/29ad6e62-7522-4c39-94b5-aa735b49701a/public_url",
            recognizedBy: {
              "@type": "Organization",
              name: "IBM",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Python for Data Science and AI - IBM",
            url: "https://www.credly.com/badges/6bb53c3e-c6b4-4db5-83a2-eb262849571b/public_url",
            recognizedBy: {
              "@type": "Organization",
              name: "IBM",
            },
          },
        ],
        knowsLanguage: [
          {
            "@type": "Language",
            name: "Arabic",
            alternateName: "ar",
          },
          {
            "@type": "Language",
            name: "English",
            alternateName: "en",
          },
        ],
        knowsAbout: [
          "Data Engineering",
          "Data Architecture",
          "Python",
          "SQL",
          "PostgreSQL",
          "MySQL",
          "Supabase",
          "ETL Pipelines",
          "ELT Pipelines",
          "Data Modeling",
          "Data Warehousing",
          "Data Cleaning",
          "Database Systems",
          "Data Analytics",
          "Exploratory Data Analysis",
          "Pandas",
          "NumPy",
          "Software Engineering",
          "هندسة البيانات",
          "تصميم قواعد البيانات",
        ],
        sameAs: [
          "https://linkedin.com/in/ahmed-abdelwahed",
          "https://github.com/ahmed-abdelwahed1",
          "https://x.com/BinShehata",
          "https://medium.com/@ahmed-abdelwahed",
          "https://www.credly.com/badges/771aa249-d545-4e8c-9ff4-98a0a24a97bd/public_url",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: "Ahmed Abdelwahed — Data Engineer",
        alternateName: [
          "Ahmed Shehata Said Abdelwahed",
          "Ahmed Abdelwahed Portfolio",
          "أحمد عبدالواحد — مهندس بيانات",
          "أحمد شحاتة سعيد عبدالواحد",
        ],
        description:
          "Official portfolio and technical blog of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed / أحمد عبدالواحد), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
        inLanguage: ["en", "ar"],
        author: {
          "@id": PERSON_ID,
        },
        publisher: {
          "@id": PERSON_ID,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graphSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
