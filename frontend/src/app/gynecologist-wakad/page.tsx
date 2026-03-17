import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Best Gynecologist in Wakad Pune | Dr Aparna Kalekar | Women's Health Clinic",
  description: "Best Gynecologist in Wakad, Pune — Dr. Aparna Kalekar (MBBS, MS OBGY). Expert in women's health, preventive care, PCOS, pregnancy, menstrual disorders. Book: 8073311622.",
  keywords: ["gynecologist in Wakad", "best gynecologist Wakad Pune", "gynaec doctor near me", "women care clinic Wakad", "Dr Aparna Kalekar gynecologist", "obstetrician Wakad Pune"],
  alternates: { canonical: "/gynecologist-wakad" },
  openGraph: {
    title: "Best Gynecologist in Wakad Pune | Dr Aparna Kalekar",
    description: "Best Gynecologist in Wakad, Pune. Dr. Aparna Kalekar specialises in women's health, preventive care, PCOS, pregnancy and more. Call 8073311622.",
    url: "https://drkalekarstarclinic.com/gynecologist-wakad",
  },
};

export default function GynecologistPage() {
  return (
    <ServicePageLayout
      heroBadge="Women's Health"
      heroTitle="Best Gynecologist in Wakad, Pune"
      heroSubtitle="Comprehensive gynecology consultation and women's health care by Dr. Aparna Kalekar (MBBS, MS OBGY) at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&q=80"
      intro="Regular gynaecological consultations are an essential part of every woman's health routine — yet many women in Wakad and Pune delay or avoid these check-ups due to hesitation or lack of awareness. Dr. Aparna Kalekar, one of the best gynaecologists in Wakad, provides a safe, empathetic, and professional environment where women can openly discuss their health concerns. From adolescence through menopause, our women's care clinic in Wakad supports every stage of a woman's life."
      sections={[
        {
          heading: "Why Regular Gynaecological Check-ups Matter",
          content: "Preventive gynaecological care helps detect problems early — often before symptoms appear — enabling faster, simpler treatment. Routine check-ups at our women's health clinic in Wakad include:",
          list: [
            "Pap smear (cervical cancer screening) for early detection of cervical abnormalities",
            "Breast examination and guidance on self-examination",
            "Pelvic examination to assess uterus and ovarian health",
            "Hormonal profile testing for cycle irregularities, PCOS, or menopause",
            "Sexually transmitted infection (STI) screening when indicated",
            "Preconception health counselling for women planning pregnancy",
            "Bone density assessment and menopause management",
          ],
        },
        {
          heading: "Common Women's Health Issues",
          content: "Women in Wakad and across Pune commonly seek gynaecological care for a wide range of conditions. Dr. Aparna Kalekar has extensive experience managing:",
          list: [
            "PCOS (Polycystic Ovary Syndrome) — hormonal imbalance affecting cycles and fertility",
            "Irregular, heavy, or painful menstrual periods",
            "Vaginal infections, discharge, and urinary tract infections",
            "Endometriosis — uterine tissue growing outside the uterus",
            "Uterine fibroids and ovarian cysts",
            "Infertility evaluation and initial management",
            "Menopausal symptoms including hot flashes and hormonal changes",
          ],
        },
        {
          heading: "Preventive Care for Women",
          content: "Prevention is always better than cure. Our gynaecology clinic in Wakad emphasises regular health monitoring and early intervention. Dr. Aparna Kalekar counsels patients on nutrition, weight management, hormonal health, contraception options, and age-appropriate screenings. Whether you are a young woman, a new mother, or approaching menopause — personalised preventive care is available at our Wakad clinic.",
        },
        {
          heading: "Gynaecology Consultation Process",
          content: "Your first consultation with Dr. Aparna Kalekar at Kalekar's Star Women Care Clinic in Wakad includes:",
          list: [
            "Detailed medical history review including menstrual, obstetric, and family history",
            "Clinical examination tailored to your presenting concerns",
            "Relevant investigations — blood tests, ultrasound, hormonal panels",
            "Clear explanation of findings and diagnosis in simple language",
            "Personalised treatment plan with medication, lifestyle advice, or referral if needed",
            "Follow-up planning and ongoing health monitoring",
          ],
        },
      ]}
      whyPoints={[
        "Dr. Aparna Kalekar holds MBBS, MS OBGY with specialist training in obstetrics and gynaecology",
        "Safe, confidential, and empathetic consultation environment for women of all ages",
        "Comprehensive women's health services under one roof in Wakad, Pune",
        "Modern diagnostic support including ultrasound and laboratory investigations",
        "Serving women from Wakad, Pimple Saudagar, Baner, Hinjewadi, Aundh and nearby areas",
        "Evening clinic hours (5–9 PM everyday) convenient for working women",
      ]}
      doctorName="Dr. Aparna Kalekar"
      doctorQual="MBBS, MS OBGY"
      doctorTitle="Consultant Obstetrician & Gynaecologist"
      doctorInitial="AK"
      color="rose"
      relatedLinks={[
        { label: "PCOS Treatment", href: "/pcos-treatment-wakad" },
        { label: "Pregnancy Care", href: "/pregnancy-care-wakad" },
        { label: "Menstrual Disorder Treatment", href: "/menstrual-disorder-treatment-wakad" },
        { label: "Laparoscopic Surgery", href: "/laparoscopic-surgery-wakad" },
      ]}
    />
  );
}
