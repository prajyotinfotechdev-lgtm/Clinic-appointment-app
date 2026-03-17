import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Pregnancy Care in Wakad Pune | Antenatal Care Specialist Dr Aparna Kalekar",
  description: "Expert pregnancy care and antenatal services in Wakad, Pune by Dr. Aparna Kalekar (MBBS, MS OBGY). High-risk pregnancy, safe delivery planning, postnatal care. Call 8073311622.",
  keywords: ["pregnancy care Wakad", "pregnancy doctor Wakad Pune", "antenatal care Wakad", "high risk pregnancy Wakad", "best obstetrician near me", "maternity clinic Wakad Pune"],
  alternates: { canonical: "/pregnancy-care-wakad" },
  openGraph: {
    title: "Pregnancy Care in Wakad Pune | Dr Aparna Kalekar",
    description: "Complete pregnancy care in Wakad, Pune. Antenatal care, high-risk pregnancy monitoring, safe delivery planning by specialist obstetrician Dr. Aparna Kalekar.",
    url: "https://drkalekarstarclinic.com/pregnancy-care-wakad",
  },
};

export default function PregnancyCarePage() {
  return (
    <ServicePageLayout
      heroBadge="Women's Health"
      heroTitle="Pregnancy Care in Wakad, Pune"
      heroSubtitle="Complete antenatal care, high-risk pregnancy management, and safe delivery planning by Dr. Aparna Kalekar at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1920&q=80"
      intro="Pregnancy is one of the most important journeys of a woman's life, and expert medical support throughout this period ensures the health and safety of both mother and baby. Dr. Aparna Kalekar, an experienced Consultant Obstetrician and Gynaecologist at our women's care clinic in Wakad, provides personalised, evidence-based pregnancy care — from conception through delivery and beyond. Whether it is a routine first pregnancy or a high-risk case requiring close monitoring, our team in Wakad is with you every step of the way."
      sections={[
        {
          heading: "Antenatal Care — What to Expect",
          content: "Antenatal care (pregnancy check-ups) is crucial for monitoring the health of both mother and developing baby. Dr. Aparna Kalekar's antenatal care programme at our Wakad clinic includes:",
          list: [
            "First trimester consultation — confirmation of pregnancy, dating scan, risk assessment",
            "Regular blood pressure, weight, and urine monitoring throughout pregnancy",
            "Routine blood tests — blood group, haemoglobin, thyroid, blood sugar, infections",
            "Anomaly scan (20-week scan) to check baby's development",
            "Growth scans and foetal well-being assessment in the third trimester",
            "Nutritional guidance, supplement prescriptions (folic acid, iron, calcium)",
            "Vaccination during pregnancy (Tetanus, COVID-19 as recommended)",
            "Birth planning discussions and preparation for labour",
          ],
        },
        {
          heading: "High-Risk Pregnancy Monitoring",
          content: "Some pregnancies carry higher risks for the mother or baby and require more intensive monitoring and specialised care. Dr. Aparna Kalekar has extensive experience managing high-risk pregnancies in Wakad and Pune. Conditions that make a pregnancy high-risk include:",
          list: [
            "Gestational diabetes — high blood sugar developing during pregnancy",
            "Pregnancy-induced hypertension (PIH) and pre-eclampsia",
            "Thyroid disorders (hypothyroidism or hyperthyroidism) in pregnancy",
            "Twin or multiple pregnancies",
            "Previous history of miscarriage, preterm birth, or caesarean section",
            "Advanced maternal age (above 35 years)",
            "Anaemia, heart disease, kidney disease, or other pre-existing medical conditions",
            "Foetal growth restriction or placental abnormalities",
          ],
        },
        {
          heading: "Safe Delivery Planning",
          content: "Dr. Aparna Kalekar believes in empowering her patients with clear, honest information about their delivery options. Whether you are planning a natural vaginal birth or require a Caesarean section for medical reasons, a personalised delivery plan is created well in advance. The aim is always a safe delivery for both mother and baby, with clear communication throughout the process.",
        },
        {
          heading: "Postnatal Care",
          content: "Care does not end at delivery. Postnatal follow-up is an important part of the maternity journey. After delivery, Dr. Aparna Kalekar monitors:",
          list: [
            "Mother's physical recovery — wound healing, blood pressure, anaemia",
            "Breastfeeding support and guidance",
            "Postnatal depression screening and mental health support",
            "Newborn health and immunisation guidance",
            "Contraception counselling after delivery",
            "Follow-up scans and blood tests as needed",
          ],
        },
      ]}
      whyPoints={[
        "Dr. Aparna Kalekar is a qualified Obstetrician with MBBS, MS OBGY — best pregnancy doctor in Wakad",
        "Experienced in managing both routine and high-risk pregnancies",
        "Personalised antenatal care plans for each patient",
        "Modern diagnostic support including ultrasound scans and laboratory investigations",
        "Convenient women's care clinic in Wakad, Pune serving nearby areas including Pimple Saudagar, Baner, Hinjewadi",
        "Evening clinic timings (5–9 PM everyday) ideal for working women",
      ]}
      doctorName="Dr. Aparna Kalekar"
      doctorQual="MBBS, MS OBGY"
      doctorTitle="Consultant Obstetrician & Gynaecologist"
      doctorInitial="AK"
      color="rose"
      relatedLinks={[
        { label: "Gynecologist Consultation", href: "/gynecologist-wakad" },
        { label: "PCOS Treatment", href: "/pcos-treatment-wakad" },
        { label: "Menstrual Disorder Treatment", href: "/menstrual-disorder-treatment-wakad" },
        { label: "Laparoscopic Surgery", href: "/laparoscopic-surgery-wakad" },
      ]}
    />
  );
}
