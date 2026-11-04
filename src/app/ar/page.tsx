import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import VolunteeringSection from "@/components/VolunteeringSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import BadgesSection from "@/components/BadgesSection";
import GithubHeatmapSection from "@/components/GithubHeatmapSection";
import BlogSection from "@/components/BlogSection";
import { PERSON_ID, WEBSITE_ID } from "@/components/JsonLd";
import { loadJsonDir } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://ahmedabdelwahed.me";

export const metadata: Metadata = {
  title: {
    absolute: "أحمد عبدالواحد | مهندس بيانات — أحمد شحاتة سعيد عبدالواحد",
  },
  description:
    "الموقع الرسمي لـ أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد / أحمد شحاته / أحمد عبد الواحد)، مهندس بيانات متخصص في هندسة البيانات، بايثون (Python)، قواعد البيانات SQL، وبناء أنظمة خطوط أنابيب البيانات ETL. خبرة عملية في Cyan Group وتدريب سابق في شركة فولفو للسيارات (Volvo Cars) بالسويد.",
  keywords: [
    "أحمد شحاته",
    "أحمد شحاتة",
    "أحمد شحاتة سعيد",
    "أحمد شحاته سعيد عبدالواحد",
    "أحمد شحاتة سعيد عبدالواحد",
    "أحمد عبدالواحد",
    "أحمد عبد الواحد",
    "أحمد شحاتة عبدالواحد",
    "أحمد سعيد عبدالواحد",
    "مهندس بيانات",
    "أحمد عبدالواحد مهندس بيانات",
    "مهندس بيانات أحمد عبدالواحد",
    "هندسة البيانات",
    "Ahmed Abdelwahed",
    "Ahmed Shehata Said Abdelwahed",
  ],
  alternates: {
    canonical: `${SITE_URL}/ar/`,
    languages: {
      en: `${SITE_URL}/`,
      ar: `${SITE_URL}/ar/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: "profile",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: `${SITE_URL}/ar/`,
    siteName: "أحمد عبدالواحد — مهندس بيانات",
    title: "أحمد عبدالواحد | مهندس بيانات — أحمد شحاتة سعيد عبدالواحد",
    description:
      "الموقع الرسمي لـ أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد)، مهندس بيانات ومطور برمجيات متخصص في هندسة البيانات وبناء خطوط أنابيب البيانات ETL وتصميم قواعد البيانات.",
    firstName: "أحمد",
    lastName: "عبدالواحد",
    username: "ahmed-abdelwahed",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1600,
        height: 800,
        alt: "أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد) — مهندس بيانات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أحمد عبدالواحد | مهندس بيانات — أحمد شحاتة سعيد عبدالواحد",
    description:
      "الموقع الرسمي لـ أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد)، مهندس بيانات متخصص في هندسة البيانات وتصميم الأنظمة وقواعد البيانات.",
    creator: "@BinShehata",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const arabicHero = {
  name: "أحمد عبدالواحد",
  fullName: "أحمد شحاتة سعيد عبدالواحد",
  arabicName: "Ahmed Shehata Said Abdelwahed",
  title: "مهندس بيانات (Data Engineer)",
  bio: "أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد / أحمد عبد الواحد / أحمد شحاته) — مهندس بيانات ومطور برمجيات متخصص في هندسة البيانات (Data Engineering)، تصميم قواعد البيانات (Data Architecture)، وبناء خطوط أنابيب البيانات المؤتمتة (ETL Pipelines) باستخدام Python وSQL. أهتم بتحويل البيانات المعقدة إلى أنظمة عملية وموثوقة تدعم اتخاذ القرار.",
  openTo: "متاح للتعاون المهني والفرص في مجال هندسة البيانات وتطوير الأنظمة.",
  email: "contact@ahmedabdelwahed.me",
  linkedin: "https://linkedin.com/in/ahmed-abdelwahed",
  github: "https://github.com/ahmed-abdelwahed1",
  x: "https://x.com/BinShehata",
  medium: "https://medium.com/@ahmed-abdelwahed",
  cvFile: "/ahmed-abdelwahed-cv.pdf",
};

const arabicExperience = [
  {
    order: 1,
    jobTitle: "مهندس بيانات (Junior Data Engineer)",
    company: "Cyan Group",
    location: "الكويت (عن بُعد)",
    dateRange: "يناير 2026 – الحاضر",
    description:
      "تصميم مخططات قواعد بيانات PostgreSQL عالية الكفاءة (عبر Supabase) لإدارة تدفقات الطلبات المعقدة، وأتمتة حركة البيانات بين مراحل المخزون والإنتاج، وبناء قواعد التحقق من جودة البيانات لضمان دقة التتبع اللحظي ودعم اتخاذ القرار.",
    logo: "/images/logos/logo.svg",
  },
  {
    order: 2,
    jobTitle: "متدرب هندسة بيانات (Data Engineer Intern)",
    company: "Volvo Cars (فولفو للسيارات)",
    location: "غوتنبرغ، السويد",
    dateRange: "فبراير 2024 – يوليو 2024",
    description:
      "المشاركة في تطوير خطوط أنابيب بيانات مؤتمتة باستخدام لغة Python لتقليل المعالجة اليدوية والأخطاء، وإعداد التوثيق التقني الشامل لإجراءات جمع ومعالجة البيانات، وتطوير آليات موثوقة لتسجيل البيانات أثناء مراحل الاختبار، وتطبيق تقنيات تنظيف البيانات مما ساهم في رفع دقة التقارير بنسبة 25%.",
    logo: "/images/logos/volvo-logo.svg",
  },
  {
    order: 3,
    jobTitle: "مصمم جرافيك مستقل (Freelance Graphic Designer)",
    company: "عمل حر",
    location: "عن بُعد",
    dateRange: "يناير 2019 – ديسمبر 2023",
    description:
      "تقديم خدمات التصميم الجرافيكي والهويات البصرية والمواد التسويقية والأصول الرقمية لعملاء متعددين.",
    logo: "",
    isCrossedOut: true,
  },
];

const arabicSkills = [
  {
    order: 1,
    category: "لغات البرمجة",
    items: ["Python", "SQL", "TypeScript", "JavaScript", "C#", "VB.NET", "HTML & CSS"],
  },
  {
    order: 2,
    category: "هندسة وتصميم البيانات",
    items: [
      "خطوط أنابيب البيانات (ETL & ELT)",
      "نمذجة البيانات (Data Modeling)",
      "معمارية البيانات (Data Architecture)",
      "تنظيف والتحقق من البيانات",
      "تحليل البيانات الاستكشافي (EDA)",
      "تصوير البيانات (Data Visualization)",
    ],
  },
  {
    order: 3,
    category: "قواعد البيانات والأدوات",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Next.js",
      "Git & GitHub",
      "Ubuntu Linux",
    ],
  },
];

const arabicVolunteering = [
  {
    order: 1,
    role: "متطوع في لجنة هندسة البيانات (Data Engineering Committee)",
    organization: "فرع جمعية الحاسبات IEEE بجامعة المنصورة (IEEE Mansoura Computer Society Chapter)",
    dateRange: "نوفمبر 2024 – أكتوبر 2025",
    description:
      "المشاركة في أنشطة لجنة هندسة البيانات من خلال ورش العمل التطبيقية والتعاون في حل المشكلات التقنية في مجال البيانات.",
    logo: "/images/logos/ieee-mansoura-computer-society.svg",
  },
];

const arabicEducation = [
  {
    order: 1,
    degree: "بكالوريوس التربية النوعية في علوم الحاسب والتربية",
    institution: "جامعة المنصورة، كلية التربية النوعية (Mansoura University)",
    dateRange: "2022 – الحاضر (التخرج المتوقع: يوليو 2027)",
  },
];

const arabicProjects = [
  {
    order: 1,
    name: "Hevy Flow",
    description:
      "خط أنابيب بيانات متكامل (End-to-End Data Pipeline) لاستخراج وتحليل وتصوير بيانات وسجلات التمارين الرياضية من تطبيق Hevy.",
    githubUrl: "https://github.com/ahmed-abdelwahed1/hevy-flow",
  },
  {
    order: 2,
    name: "BUDGE",
    description:
      "تطبيق ذكي لإدارة وتتبع المصروفات الشخصية مبني باستخدام VB.NET وقاعدة بيانات MS Access مع لوحة تحكم لتحليل الدخل والمصروفات.",
    githubUrl: "https://github.com/ahmed-abdelwahed1/BUDGE",
  },
  {
    order: 3,
    name: "X-Unbookmarker",
    description:
      "إضافة متصفح كروم (Chrome Extension) لأتمتة إدارة وإزالة العلامات المرجعية (Bookmarks) على منصة X (تويتر سابقاً).",
    githubUrl: "https://github.com/ahmed-abdelwahed1/X-Unbookmarker.git",
  },
];

export default async function ArabicHomePage() {
  const badges = await loadJsonDir<{
    order: number;
    name: string;
    url: string;
  }>("badges");

  const allPosts = getAllPosts().slice(0, 3);

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/ar/#profilepage`,
    url: `${SITE_URL}/ar/`,
    name: "أحمد عبدالواحد | مهندس بيانات — أحمد شحاتة سعيد عبدالواحد",
    description:
      "الموقع الرسمي لـ أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد)، مهندس بيانات متخصص في هندسة البيانات وبناء خطوط أنابيب البيانات ETL وقواعد البيانات.",
    inLanguage: "ar",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ahmed Abdelwahed",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "أحمد عبدالواحد (العربية)",
          item: `${SITE_URL}/ar/`,
        },
      ],
    },
  };

  return (
    <main lang="ar" dir="rtl" className="rtl-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero
        data={arabicHero}
        greeting="أهلاً، أنا"
        downloadLabel="تحميل السيرة الذاتية (CV)"
        contactLabel="تواصل معي"
      />
      <ExperienceSection items={arabicExperience} title="الخبرات العملية" />
      <SkillsSection items={arabicSkills} title="المهارات التقنية" />
      <VolunteeringSection items={arabicVolunteering} title="العمل التطوعي" />
      <EducationSection items={arabicEducation} title="التعليم" />
      <ProjectsSection
        items={arabicProjects}
        title="المشاريع التقنية"
        ctaLabel="عرض على GitHub"
      />
      <GithubHeatmapSection username="ahmed-abdelwahed1" />
      <BadgesSection
        items={badges}
        title="الشهادات والاعتمادات المهنية"
        viewLabel="عرض الشهادة"
      />
      <BlogSection
        posts={allPosts}
        title="المدونة التقنية (بالإنجليزية)"
        viewAllLabel="عرض جميع المقالات"
        readLabel="اقرأ المقال"
      />
    </main>
  );
}
