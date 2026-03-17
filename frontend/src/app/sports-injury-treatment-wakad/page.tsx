import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Sports Injury Treatment in Wakad Pune | Orthopedic Specialist Dr Rahul Kalekar",
  description: "Expert sports injury treatment in Wakad, Pune. ACL tears, ligament injuries, meniscus repair, rehabilitation by Dr. Rahul Kalekar. Call 8073311622.",
  keywords: ["sports injury treatment Wakad", "ACL injury treatment Wakad Pune", "ligament injury doctor Wakad", "sports medicine Wakad", "orthopedic sports doctor Wakad Pune"],
  alternates: { canonical: "/sports-injury-treatment-wakad" },
  openGraph: {
    title: "Sports Injury Treatment in Wakad Pune | Dr Rahul Kalekar",
    description: "Specialist sports injury treatment in Wakad, Pune. ACL tears, meniscus injuries, ligament sprains treated by experienced orthopedic doctor.",
    url: "https://drkalekarstarclinic.com/sports-injury-treatment-wakad",
  },
};

export default function SportsInjuryPage() {
  return (
    <ServicePageLayout
      heroBadge="Orthopaedic Care"
      heroTitle="Sports Injury Treatment in Wakad, Pune"
      heroSubtitle="Specialized sports injury care by Dr. Rahul Kalekar — treating ACL tears, meniscus injuries, ligament sprains, and muscle strains at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      intro="Sports injuries are common among athletes, gym enthusiasts, and active individuals across Wakad and Pune. Whether you play cricket, football, badminton, or engage in regular fitness activities, injuries can occur suddenly and may sideline you for weeks if not treated properly. Dr. Rahul Kalekar, an experienced orthopedic sports injury specialist in Wakad, provides expert care for all acute and chronic sports-related injuries — from initial diagnosis to full rehabilitation."
      sections={[
        {
          heading: "Common Sports Injuries We Treat",
          content: "Our orthopedic sports injury clinic in Wakad treats a wide spectrum of conditions including:",
          list: [
            "ACL (Anterior Cruciate Ligament) tears — one of the most serious knee injuries in sports",
            "PCL, MCL, and LCL ligament injuries of the knee",
            "Meniscus tears — cartilage damage in the knee joint",
            "Ankle sprains and ligament injuries",
            "Shoulder dislocations and rotator cuff tears",
            "Tennis elbow and golfer's elbow",
            "Hamstring and quadriceps muscle tears",
            "Stress fractures from repetitive activity",
          ],
        },
        {
          heading: "ACL Injuries — Diagnosis and Treatment",
          content: "ACL tears are among the most feared sports injuries, often occurring during sudden twisting movements, jumping, or direct impact. Symptoms include a popping sound at the time of injury, immediate swelling, instability, and inability to bear weight. At our Wakad ortho clinic, Dr. Rahul Kalekar provides a thorough assessment followed by a tailored treatment plan — whether conservative management with physiotherapy or surgical ACL reconstruction for complete tears.",
        },
        {
          heading: "Meniscus Injuries",
          content: "The meniscus acts as a shock absorber in the knee. Tears can occur from sudden rotation or degenerative changes. Patients experience pain, swelling, locking, and giving-way of the knee. Treatment options range from physiotherapy and anti-inflammatory management to arthroscopic meniscus repair or partial meniscectomy, depending on the type and severity of the tear.",
        },
        {
          heading: "Treatment Methods for Sports Injuries",
          content: "Dr. Rahul Kalekar uses the latest evidence-based treatment methods for sports injuries in Wakad:",
          list: [
            "Immediate RICE protocol guidance (Rest, Ice, Compression, Elevation)",
            "Imaging including X-ray and MRI for accurate diagnosis",
            "Physiotherapy and sport-specific rehabilitation programmes",
            "Platelet-Rich Plasma (PRP) injections for faster tissue healing",
            "Arthroscopic surgery — minimally invasive technique for joint repairs",
            "Surgical ligament reconstruction for complete tears (ACL, PCL)",
            "Functional bracing and taping to support return to sport",
          ],
        },
        {
          heading: "Rehabilitation and Return to Sport",
          content: "Recovery from a sports injury is not just about the initial treatment — rehabilitation is equally important. Dr. Rahul Kalekar designs structured rehabilitation protocols based on the specific sport, injury type, and the patient's fitness level. The goal is not just pain relief but full functional recovery, strength restoration, and safe return to competitive or recreational sport. Most patients from Wakad and nearby Pune areas achieve excellent outcomes with our comprehensive sports injury care.",
        },
      ]}
      whyPoints={[
        "Experienced orthopedic specialist trained in sports injury management",
        "Arthroscopic and minimally invasive surgical techniques for faster recovery",
        "Comprehensive care from acute injury management to full rehabilitation",
        "PRP therapy and advanced non-surgical options available",
        "Serving active patients from Wakad, Hinjewadi, Baner, and Pimple Saudagar",
        "Evening clinic timings 5–9 PM for athletes and working professionals",
      ]}
      doctorName="Dr. Rahul Kalekar"
      doctorQual="MBBS, DNB, D.ORTHO, FIJR"
      doctorTitle="Consultant Orthopaedic Surgeon"
      doctorInitial="RK"
      color="teal"
      relatedLinks={[
        { label: "Knee Pain Treatment", href: "/knee-pain-treatment-wakad" },
        { label: "Joint Pain Treatment", href: "/joint-pain-treatment-wakad" },
        { label: "Shoulder Pain Treatment", href: "/shoulder-pain-treatment-wakad" },
        { label: "Spine Care", href: "/spine-specialist-wakad" },
      ]}
    />
  );
}
