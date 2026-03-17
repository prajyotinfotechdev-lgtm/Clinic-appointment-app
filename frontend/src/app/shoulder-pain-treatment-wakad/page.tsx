import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Shoulder Pain Treatment in Wakad Pune | Orthopedic Doctor Dr Rahul Kalekar",
  description: "Specialist shoulder pain treatment in Wakad, Pune. Frozen shoulder, rotator cuff injuries, shoulder instability treated by Dr. Rahul Kalekar. Call 8073311622.",
  keywords: ["shoulder pain treatment Wakad", "frozen shoulder doctor Wakad Pune", "rotator cuff injury Wakad", "shoulder specialist Wakad", "orthopedic doctor Wakad Pune"],
  alternates: { canonical: "/shoulder-pain-treatment-wakad" },
  openGraph: {
    title: "Shoulder Pain Treatment in Wakad Pune | Dr Rahul Kalekar",
    description: "Expert shoulder pain treatment in Wakad, Pune. Frozen shoulder, rotator cuff tears, shoulder instability managed by specialist orthopedic doctor.",
    url: "https://drkalekarstarclinic.com/shoulder-pain-treatment-wakad",
  },
};

export default function ShoulderPainPage() {
  return (
    <ServicePageLayout
      heroBadge="Orthopaedic Care"
      heroTitle="Shoulder Pain Treatment in Wakad, Pune"
      heroSubtitle="Expert shoulder pain diagnosis and treatment by Dr. Rahul Kalekar — rotator cuff repairs, frozen shoulder, and instability management at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
      intro="Shoulder pain is a highly debilitating condition that can restrict even the simplest daily tasks like lifting, dressing, or reaching overhead. The shoulder joint has the greatest range of motion of any joint in the body, making it vulnerable to a variety of injuries and degenerative conditions. Dr. Rahul Kalekar, an orthopaedic specialist at Kalekar's Star Clinic in Wakad, provides accurate diagnosis and effective treatment for all types of shoulder conditions — helping patients regain full, pain-free movement."
      sections={[
        {
          heading: "Common Causes of Shoulder Pain",
          content: "Shoulder pain can stem from injuries, overuse, or degenerative changes. The most common shoulder problems treated at our orthopedic clinic in Wakad include:",
          list: [
            "Frozen shoulder (adhesive capsulitis) — stiffness and pain from capsule thickening",
            "Rotator cuff tears — partial or complete tears of the shoulder muscles and tendons",
            "Shoulder impingement syndrome — tendons getting pinched during arm movement",
            "Shoulder dislocation or instability — recurrent slipping of the joint",
            "Shoulder arthritis — cartilage breakdown causing chronic pain",
            "Biceps tendonitis — inflammation of the bicep tendon at the shoulder",
            "Bursitis — inflamed bursa sac in the shoulder joint",
          ],
        },
        {
          heading: "Frozen Shoulder — Causes and Treatment",
          content: "Frozen shoulder is one of the most common shoulder conditions seen in patients in Wakad and Pune, particularly in individuals with diabetes or after periods of shoulder immobility. It causes progressive pain, stiffness, and eventually significant loss of shoulder movement. Treatment involves physiotherapy, anti-inflammatory medications, steroid injections, and in persistent cases, manipulation under anaesthesia or arthroscopic capsular release.",
        },
        {
          heading: "Rotator Cuff Injuries",
          content: "The rotator cuff is a group of four muscles and tendons that stabilise the shoulder. Tears can occur due to acute injury (fall, lifting) or gradual degeneration. Symptoms include weakness, pain when lifting the arm, and night pain disturbing sleep. Small tears are often managed conservatively with physiotherapy and injections, while larger tears may require arthroscopic surgical repair for full recovery.",
        },
        {
          heading: "Shoulder Instability",
          content: "Shoulder instability occurs when the joint is loose and prone to dislocation. Patients experience a feeling of the shoulder slipping or giving way, especially during overhead activities. Recurrent dislocations cause progressive damage to the joint. Dr. Rahul Kalekar evaluates instability and recommends the appropriate treatment — from physiotherapy-based strengthening to surgical stabilisation (Bankart repair) for recurring dislocations.",
        },
        {
          heading: "Treatment Methods for Shoulder Pain",
          content: "At Kalekar's Star Ortho & Women Care Clinic in Wakad, shoulder pain is treated using a stepwise, evidence-based approach:",
          list: [
            "Thorough clinical examination and imaging (X-ray, MRI, ultrasound)",
            "Physiotherapy focusing on range-of-motion and strength restoration",
            "Steroid or hyaluronic acid injections for inflammation and pain relief",
            "Shockwave therapy for chronic tendon conditions",
            "Arthroscopic (keyhole) surgery for rotator cuff repairs and capsular release",
            "Open surgery for complex shoulder reconstructions when necessary",
            "Post-operative rehabilitation programme for complete recovery",
          ],
        },
      ]}
      whyPoints={[
        "Dr. Rahul Kalekar specialises in both surgical and non-surgical shoulder treatments",
        "Minimally invasive arthroscopic techniques for faster recovery and less scarring",
        "Personalised care plans adapted to patient age, activity level and severity",
        "Comprehensive imaging and diagnostic workup before treatment",
        "Conveniently located in Wakad, serving Baner, Pimple Saudagar, Hinjewadi",
        "Evening clinic hours (5–9 PM everyday) for working patients",
      ]}
      doctorName="Dr. Rahul Kalekar"
      doctorQual="MBBS, DNB, D.ORTHO, FIJR"
      doctorTitle="Consultant Orthopaedic Surgeon"
      doctorInitial="RK"
      color="teal"
      relatedLinks={[
        { label: "Joint Pain Treatment", href: "/joint-pain-treatment-wakad" },
        { label: "Sports Injury Treatment", href: "/sports-injury-treatment-wakad" },
        { label: "Knee Pain Treatment", href: "/knee-pain-treatment-wakad" },
        { label: "Spine Care", href: "/spine-specialist-wakad" },
      ]}
    />
  );
}
