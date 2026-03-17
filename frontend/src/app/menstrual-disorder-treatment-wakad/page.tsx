import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Irregular Period Treatment in Wakad Pune | Menstrual Disorder Gynecologist",
  description: "Expert menstrual disorder treatment in Wakad, Pune by Dr. Aparna Kalekar. Irregular periods, heavy bleeding, hormonal imbalance treatment. Call 8073311622.",
  keywords: ["irregular period treatment Wakad", "menstrual disorder treatment Wakad Pune", "heavy period treatment Wakad", "hormonal imbalance doctor Wakad", "gynecologist Wakad menstrual"],
  alternates: { canonical: "/menstrual-disorder-treatment-wakad" },
  openGraph: {
    title: "Irregular Period Treatment in Wakad Pune | Dr Aparna Kalekar",
    description: "Specialist treatment for irregular periods, heavy bleeding, and hormonal imbalance in Wakad, Pune by Dr. Aparna Kalekar.",
    url: "https://drkalekarstarclinic.com/menstrual-disorder-treatment-wakad",
  },
};

export default function MenstrualDisorderPage() {
  return (
    <ServicePageLayout
      heroBadge="Women's Health"
      heroTitle="Menstrual Disorder Treatment in Wakad, Pune"
      heroSubtitle="Expert treatment for irregular periods, heavy bleeding, dysmenorrhea, and endometriosis by Dr. Aparna Kalekar at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&q=80"
      intro="Menstrual disorders are among the most common yet frequently overlooked health concerns affecting women in Wakad and Pune. Irregular periods, heavy or painful bleeding, or the complete absence of periods are not just inconveniences — they can signal underlying hormonal, structural, or systemic conditions that require proper diagnosis and treatment. Dr. Aparna Kalekar, a specialist gynaecologist in Wakad, provides comprehensive evaluation and effective treatment to restore healthy menstrual cycles and improve quality of life."
      sections={[
        {
          heading: "Types of Menstrual Disorders",
          content: "Menstrual disorders cover a broad range of conditions. Common types managed at our gynaecology clinic in Wakad include:",
          list: [
            "Oligomenorrhoea — infrequent periods (cycles longer than 35 days)",
            "Amenorrhoea — absence of periods for 3 or more months (primary or secondary)",
            "Menorrhagia — abnormally heavy or prolonged menstrual bleeding",
            "Dysmenorrhoea — severe painful periods, often with cramping and pelvic pain",
            "Polymenorrhoea — periods occurring too frequently (cycle shorter than 21 days)",
            "Premenstrual syndrome (PMS) — physical and emotional symptoms before periods",
            "Intermenstrual bleeding — spotting or bleeding between periods",
          ],
        },
        {
          heading: "Irregular Periods — Causes and Concerns",
          content: "Irregular periods are one of the most common reasons women in Wakad visit a gynaecologist. They can result from a wide range of causes:",
          list: [
            "PCOS (Polycystic Ovary Syndrome) — the most common hormonal cause of irregular cycles",
            "Thyroid disorders — both hypothyroidism and hyperthyroidism affect cycles",
            "Stress, excessive exercise, or sudden weight changes",
            "Perimenopause — hormonal fluctuations as menopause approaches",
            "Uterine fibroids or polyps disrupting the uterine lining",
            "Endometriosis — uterine-like tissue outside the uterus",
            "Medications including contraceptives, steroids, or chemotherapy",
          ],
        },
        {
          heading: "Heavy Menstrual Bleeding (Menorrhagia)",
          content: "Heavy periods that soak through pads or tampons every hour, last longer than 7 days, or pass large clots are a medical concern. Prolonged heavy bleeding leads to iron-deficiency anaemia, fatigue, and poor quality of life. At our women's clinic in Wakad, Dr. Aparna Kalekar investigates the cause through blood tests and ultrasound, and provides effective medical or surgical treatment to normalise bleeding.",
        },
        {
          heading: "Hormonal Imbalance Treatment",
          content: "Many menstrual disorders are rooted in hormonal imbalances that disrupt the natural cycle. Treatment is tailored to the identified hormonal issue and individual patient goals:",
          list: [
            "Hormonal blood tests — FSH, LH, oestrogen, progesterone, thyroid, prolactin, androgens",
            "Pelvic ultrasound to evaluate uterus, ovaries, and endometrial lining",
            "Combined oral contraceptive pills to regulate cycles and reduce heavy bleeding",
            "Progesterone therapy for cycle regularisation and endometrial protection",
            "Thyroid treatment if thyroid disease is contributing to cycle irregularity",
            "Tranexamic acid or NSAIDs for heavy period management",
            "Surgical options (hysteroscopy, endometrial ablation) for structural causes",
          ],
        },
        {
          heading: "When to See a Gynaecologist in Wakad",
          content: "You should consult Dr. Aparna Kalekar at our Wakad gynaecology clinic if your periods are consistently irregular, extremely painful, very heavy, or have stopped. Early evaluation prevents complications such as anaemia, infertility, and progression of underlying conditions. Do not normalise severe period problems — expert help is available right in Wakad.",
        },
      ]}
      whyPoints={[
        "Dr. Aparna Kalekar has deep expertise in diagnosing and managing all types of menstrual disorders",
        "Comprehensive hormonal and ultrasound investigation for accurate diagnosis",
        "Medical and surgical treatment options available at our Wakad clinic",
        "Patient education and long-term monitoring for sustained cycle health",
        "Compassionate, private consultations for sensitive women's health concerns",
        "Evening clinic timings (5–9 PM everyday) for working women in Wakad and Pune",
      ]}
      doctorName="Dr. Aparna Kalekar"
      doctorQual="MBBS, MS OBGY"
      doctorTitle="Consultant Obstetrician & Gynaecologist"
      doctorInitial="AK"
      color="rose"
      relatedLinks={[
        { label: "Gynecologist Consultation", href: "/gynecologist-wakad" },
        { label: "PCOS Treatment", href: "/pcos-treatment-wakad" },
        { label: "Pregnancy Care", href: "/pregnancy-care-wakad" },
        { label: "Laparoscopic Surgery", href: "/laparoscopic-surgery-wakad" },
      ]}
    />
  );
}
