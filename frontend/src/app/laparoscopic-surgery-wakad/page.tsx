import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Laparoscopic Gynec Surgery in Wakad Pune | Dr Aparna Kalekar",
  description: "Expert laparoscopic gynaecological surgery in Wakad, Pune by Dr. Aparna Kalekar. Fibroid removal, ovarian cyst surgery, minimally invasive procedures. Call 8073311622.",
  keywords: ["laparoscopic surgery Wakad", "laparoscopic gynec surgery Wakad Pune", "fibroid treatment Wakad", "ovarian cyst surgery Wakad", "minimally invasive surgery Wakad", "laparoscopic surgeon near me"],
  alternates: { canonical: "/laparoscopic-surgery-wakad" },
  openGraph: {
    title: "Laparoscopic Gynec Surgery in Wakad Pune | Dr Aparna Kalekar",
    description: "Minimally invasive laparoscopic surgery for fibroids, ovarian cysts, and gynaecological conditions in Wakad, Pune by Dr. Aparna Kalekar.",
    url: "https://drkalekarstarclinic.com/laparoscopic-surgery-wakad",
  },
};

export default function LaparoscopicSurgeryPage() {
  return (
    <ServicePageLayout
      heroBadge="Women's Health"
      heroTitle="Laparoscopic Surgery in Wakad, Pune"
      heroSubtitle="Minimally invasive laparoscopic surgery for ovarian cysts, fibroids, endometriosis by Dr. Aparna Kalekar at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80"
      intro="Laparoscopic surgery, also known as keyhole surgery or minimally invasive surgery, has revolutionised the treatment of many gynaecological conditions. Instead of large incisions, tiny cuts (5–10mm) are made, through which a thin camera and surgical instruments are inserted. This results in significantly less post-operative pain, minimal scarring, shorter hospital stay, and faster return to normal activities. Dr. Aparna Kalekar, an experienced laparoscopic gynaecological surgeon in Wakad, Pune, performs a range of advanced laparoscopic procedures to treat conditions that previously required open surgery."
      sections={[
        {
          heading: "What is Laparoscopic Surgery?",
          content: "Laparoscopic (keyhole) surgery is a modern surgical technique that allows gynaecological procedures to be performed through tiny incisions in the abdomen. A laparoscope — a thin tube with a high-definition camera — provides a magnified view of the pelvic organs on a screen, allowing precise surgical work. The benefits over traditional open surgery include:",
          list: [
            "Smaller incisions and significantly reduced scarring",
            "Less post-operative pain and discomfort",
            "Shorter hospital stay — often day surgery or overnight admission",
            "Faster recovery and return to normal activities (days rather than weeks)",
            "Lower risk of infection and complications compared to open surgery",
            "Better cosmetic outcome",
          ],
        },
        {
          heading: "Fibroid Treatment (Laparoscopic Myomectomy)",
          content: "Uterine fibroids are non-cancerous growths in the uterus that can cause heavy bleeding, pelvic pain, pressure, and fertility problems. For women in Wakad who wish to preserve their uterus and fertility, laparoscopic myomectomy (fibroid removal) is an excellent option. Dr. Aparna Kalekar removes fibroids laparoscopically while carefully preserving the uterine structure, allowing for future pregnancy in most cases.",
        },
        {
          heading: "Ovarian Cyst Surgery",
          content: "Ovarian cysts are fluid-filled sacs on the ovaries and are common in women of reproductive age. While many small cysts resolve on their own, larger cysts or those that persist, cause pain, or show suspicious features may require surgical removal. Laparoscopic cystectomy allows removal of the cyst while preserving healthy ovarian tissue. Dr. Aparna Kalekar evaluates each cyst carefully before recommending surgery and performs the procedure laparoscopically wherever possible.",
        },
        {
          heading: "Other Laparoscopic Gynaecological Procedures",
          content: "Dr. Aparna Kalekar performs a range of laparoscopic gynaecological procedures at our Wakad clinic, including:",
          list: [
            "Laparoscopic treatment of endometriosis — excision of endometrial deposits",
            "Diagnostic laparoscopy — investigation of pelvic pain, infertility causes",
            "Laparoscopic tubal ligation — permanent contraception procedure",
            "Adhesiolysis — removal of adhesions (scar tissue) in the pelvis",
            "Laparoscopic hysterectomy — minimally invasive uterus removal when indicated",
            "Ectopic pregnancy surgery — removal of ectopic (non-uterine) pregnancy",
          ],
        },
        {
          heading: "Benefits of Laparoscopy Over Open Surgery",
          content: "For eligible patients, laparoscopic surgery offers significant advantages over traditional open surgery. Patients in Wakad who undergo laparoscopic procedures with Dr. Aparna Kalekar typically experience minimal post-operative pain requiring simple pain relief, discharge within 24 hours for most procedures, return to light daily activities within 3–5 days, return to full work within 1–2 weeks, and excellent cosmetic results with small, barely visible scars. Patient safety and surgical excellence are the highest priorities at Kalekar's Star Ortho & Women Care Clinic in Wakad.",
        },
      ]}
      whyPoints={[
        "Dr. Aparna Kalekar is a trained laparoscopic gynaecological surgeon with significant operative experience",
        "Minimally invasive techniques providing less pain, faster recovery, and better outcomes",
        "Fibroid removal, ovarian cyst surgery, endometriosis treatment and more — all available in Wakad",
        "Thorough pre-operative evaluation ensures patient safety and optimal surgical planning",
        "Post-operative care and follow-up included for complete recovery",
        "Best laparoscopic gynaecological surgeon near Pimple Saudagar, Baner, Hinjewadi, Aundh",
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
        { label: "Menstrual Disorder Treatment", href: "/menstrual-disorder-treatment-wakad" },
      ]}
    />
  );
}
