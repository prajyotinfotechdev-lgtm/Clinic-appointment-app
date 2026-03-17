import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Knee Pain Treatment in Wakad Pune | Orthopedic Doctor Dr Rahul Kalekar",
  description: "Specialist knee pain treatment in Wakad, Pune by Dr. Rahul Kalekar. Treating arthritis, ligament injuries, meniscus tears, knee replacement. Call 8073311622.",
  keywords: ["knee pain treatment Wakad", "knee pain doctor Wakad Pune", "knee replacement Wakad", "knee arthritis treatment Wakad", "orthopedic doctor Wakad Pune"],
  alternates: { canonical: "/knee-pain-treatment-wakad" },
  openGraph: {
    title: "Knee Pain Treatment in Wakad Pune | Dr Rahul Kalekar",
    description: "Expert knee pain treatment in Wakad, Pune. Arthritis, ligament injuries, knee replacement by specialist orthopedic doctor Dr. Rahul Kalekar.",
    url: "https://drkalekarstarclinic.com/knee-pain-treatment-wakad",
  },
};

export default function KneePainPage() {
  return (
    <ServicePageLayout
      heroBadge="Orthopaedic Care"
      heroTitle="Knee Pain Treatment in Wakad, Pune"
      heroSubtitle="Comprehensive knee pain diagnosis and treatment by Dr. Rahul Kalekar — from physiotherapy to advanced knee replacement surgery at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      intro="Knee pain is one of the most frequent orthopaedic complaints among patients in Wakad and across Pune. The knee joint bears the full weight of your body during walking, climbing, and everyday activities, making it highly susceptible to injury and degeneration. Dr. Rahul Kalekar, an experienced orthopedic doctor in Wakad, provides accurate diagnosis and effective treatment for all types of knee conditions — from mild inflammation to complex surgical cases."
      sections={[
        {
          heading: "Common Causes of Knee Pain",
          content: "Knee pain can result from acute injury or chronic wear over time. The most common causes seen by patients visiting our orthopedic clinic in Wakad include:",
          list: [
            "Osteoarthritis – gradual breakdown of knee cartilage causing pain and stiffness",
            "Ligament injuries – ACL, PCL, MCL or LCL tears from sports or accidents",
            "Meniscus tears – damage to the cartilage pads between knee bones",
            "Patellar tendinitis – inflammation of the tendon connecting kneecap to shinbone",
            "Bursitis – swelling of fluid-filled sacs around the knee",
            "Rheumatoid arthritis affecting the knee joints",
            "Patellofemoral syndrome (runner's knee) from repetitive strain",
          ],
        },
        {
          heading: "Arthritis and Ligament Injuries in the Knee",
          content: "Knee arthritis is extremely common among adults over 40 years in Wakad and Pune, causing progressive pain, stiffness, and loss of mobility. Ligament injuries are frequent in younger, active individuals involved in sports or physical work. Both conditions require specialist evaluation to determine the most appropriate treatment pathway — conservative management or surgical intervention.",
        },
        {
          heading: "Physiotherapy and Non-Surgical Treatment",
          content: "Not all knee conditions require surgery. Dr. Rahul Kalekar prioritises conservative treatment wherever possible. Non-surgical options include:",
          list: [
            "Targeted physiotherapy and strengthening exercises for knee muscles",
            "Anti-inflammatory medications and pain management",
            "Knee bracing and orthotics for support and stability",
            "Intra-articular steroid or PRP (Platelet-Rich Plasma) injections",
            "Weight management advice to reduce load on knee joints",
            "Activity modification and lifestyle guidance",
          ],
        },
        {
          heading: "Knee Replacement and Surgical Options",
          content: "When conservative treatment no longer provides adequate relief, surgical options are considered. Dr. Rahul Kalekar is experienced in knee surgical procedures including arthroscopic surgery for meniscus and ligament repair, and total or partial knee replacement for severe arthritis. Knee replacement significantly reduces pain and restores function, allowing patients to resume normal daily activities.",
        },
        {
          heading: "Recovery and Rehabilitation",
          content: "Recovery after knee treatment depends on the procedure undertaken. After non-surgical treatment, most patients see improvement within a few weeks. Post-surgical rehabilitation typically involves a structured physiotherapy programme that restores strength, flexibility, and confidence in using the knee. Our team at Kalekar's Star Clinic in Wakad supports patients through every stage of their recovery journey.",
        },
      ]}
      whyPoints={[
        "Experienced orthopedic specialist with MBBS, DNB, D.ORTHO, FIJR qualifications",
        "Accurate diagnosis using X-ray and MRI imaging",
        "Both non-surgical and surgical treatment options under one roof in Wakad",
        "Personalised rehabilitation plans for faster recovery",
        "Convenient location in Wakad serving Pimple Saudagar, Baner, Hinjewadi, Aundh",
        "Evening clinic hours (5–9 PM) suitable for working professionals",
      ]}
      doctorName="Dr. Rahul Kalekar"
      doctorQual="MBBS, DNB, D.ORTHO, FIJR"
      doctorTitle="Consultant Orthopaedic Surgeon"
      doctorInitial="RK"
      color="teal"
      relatedLinks={[
        { label: "Joint Pain Treatment", href: "/joint-pain-treatment-wakad" },
        { label: "Sports Injury Treatment", href: "/sports-injury-treatment-wakad" },
        { label: "Spine Care", href: "/spine-specialist-wakad" },
        { label: "Shoulder Pain Treatment", href: "/shoulder-pain-treatment-wakad" },
      ]}
    />
  );
}
