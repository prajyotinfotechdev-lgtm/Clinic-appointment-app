import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "PCOS Treatment in Wakad Pune | Gynecologist Dr Aparna Kalekar",
  description: "Expert PCOS/PCOD treatment in Wakad, Pune by Dr. Aparna Kalekar (MBBS, MS OBGY). Hormonal treatment, lifestyle management, infertility support. Call 8073311622.",
  keywords: ["PCOS treatment Wakad", "PCOD treatment Wakad Pune", "PCOS doctor Wakad", "polycystic ovary treatment Wakad", "best gynecologist Wakad PCOS", "PCOD specialist near me"],
  alternates: { canonical: "/pcos-treatment-wakad" },
  openGraph: {
    title: "PCOS Treatment in Wakad Pune | Dr Aparna Kalekar",
    description: "Expert PCOS and PCOD treatment in Wakad, Pune. Hormonal therapy, lifestyle management and fertility support by Dr. Aparna Kalekar.",
    url: "https://drkalekarstarclinic.com/pcos-treatment-wakad",
  },
};

export default function PCOSPage() {
  return (
    <ServicePageLayout
      heroBadge="Women's Health"
      heroTitle="PCOS Treatment in Wakad, Pune"
      heroSubtitle="Holistic PCOS/PCOD treatment by Dr. Aparna Kalekar — hormonal therapy, lifestyle intervention, and fertility support at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      intro="Polycystic Ovary Syndrome (PCOS), also known as PCOD (Polycystic Ovarian Disease), is one of the most common hormonal disorders affecting women of reproductive age in Wakad and across India. It affects nearly 1 in 5 women and can cause irregular periods, hormonal imbalances, unwanted hair growth, weight gain, acne, and fertility challenges. With the right treatment from a specialist gynaecologist in Wakad, PCOS can be effectively managed to restore hormonal balance, regular cycles, and overall well-being."
      sections={[
        {
          heading: "What is PCOS?",
          content: "PCOS is a hormonal condition in which the ovaries produce an excess of androgens (male hormones), causing the development of small cysts on the ovaries. Despite the name, not all women with PCOS actually have ovarian cysts. The core issue is hormonal and metabolic imbalance. PCOS is associated with insulin resistance, which drives many of its symptoms and long-term health risks including type 2 diabetes and cardiovascular disease.",
        },
        {
          heading: "Symptoms of PCOS",
          content: "PCOS symptoms vary from woman to woman, which is why it is often underdiagnosed. Common signs that should prompt a visit to a PCOS specialist in Wakad include:",
          list: [
            "Irregular, infrequent, or absent menstrual periods",
            "Heavy or prolonged bleeding when periods do occur",
            "Unwanted facial and body hair growth (hirsutism)",
            "Acne, oily skin, and persistent pimples",
            "Hair thinning or loss from the scalp",
            "Unexplained weight gain, especially around the abdomen",
            "Difficulty conceiving (infertility) due to irregular ovulation",
            "Darkening of skin in body folds (acanthosis nigricans)",
          ],
        },
        {
          heading: "Causes and Risk Factors",
          content: "The exact cause of PCOS is not fully understood, but several factors contribute to its development:",
          list: [
            "Insulin resistance — excess insulin stimulates androgen production by the ovaries",
            "Genetic predisposition — PCOS often runs in families",
            "Low-grade inflammation triggering androgen production",
            "Sedentary lifestyle and unhealthy diet worsening hormonal imbalance",
            "Obesity — excess weight aggravates insulin resistance and hormonal disruption",
          ],
        },
        {
          heading: "Hormonal Treatment for PCOS",
          content: "Dr. Aparna Kalekar creates individualised treatment plans for each PCOS patient in Wakad, targeting the specific hormonal and metabolic imbalances present. Medical treatment options include:",
          list: [
            "Hormonal contraceptives (combined pill) to regulate cycles and reduce androgens",
            "Anti-androgen medications to reduce hair growth and acne",
            "Metformin for insulin resistance management and cycle regularisation",
            "Ovulation induction medications (clomiphene, letrozole) for women trying to conceive",
            "Progesterone therapy to protect the uterus and regulate periods",
          ],
        },
        {
          heading: "Lifestyle Management for PCOS",
          content: "Lifestyle changes are a cornerstone of PCOS management and can significantly reduce symptoms. Dr. Aparna Kalekar counsels PCOS patients on practical, sustainable changes including weight management through a low-glycaemic diet, regular moderate exercise to improve insulin sensitivity, stress reduction techniques, and sleep optimisation. Even a modest weight loss of 5–10% can dramatically improve cycle regularity and hormonal balance in women with PCOS in Wakad and Pune.",
        },
      ]}
      whyPoints={[
        "Dr. Aparna Kalekar has extensive experience managing PCOS and PCOD in women of all ages",
        "Comprehensive evaluation including hormonal blood tests and pelvic ultrasound",
        "Personalised treatment combining medication and lifestyle guidance",
        "Fertility support for women with PCOS trying to conceive",
        "Compassionate, confidential consultations in Wakad — best gynaecologist near you",
        "Convenient evening clinic hours (5–9 PM everyday) for working women",
      ]}
      doctorName="Dr. Aparna Kalekar"
      doctorQual="MBBS, MS OBGY"
      doctorTitle="Consultant Obstetrician & Gynaecologist"
      doctorInitial="AK"
      color="rose"
      relatedLinks={[
        { label: "Gynecologist Consultation", href: "/gynecologist-wakad" },
        { label: "Menstrual Disorder Treatment", href: "/menstrual-disorder-treatment-wakad" },
        { label: "Pregnancy Care", href: "/pregnancy-care-wakad" },
        { label: "Laparoscopic Surgery", href: "/laparoscopic-surgery-wakad" },
      ]}
    />
  );
}
