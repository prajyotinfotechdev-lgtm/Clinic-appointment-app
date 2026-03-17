import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Joint Pain Treatment in Wakad Pune | Orthopedic Specialist Dr Rahul Kalekar",
  description: "Expert joint pain treatment in Wakad, Pune by Dr. Rahul Kalekar (MBBS, DNB, D.ORTHO, FIJR). Treating arthritis, cartilage damage, joint inflammation. Book appointment: 8073311622",
  keywords: ["joint pain treatment Wakad", "joint pain doctor Wakad Pune", "arthritis treatment Wakad", "orthopedic doctor Wakad", "Dr Rahul Kalekar joint pain"],
  alternates: { canonical: "/joint-pain-treatment-wakad" },
  openGraph: {
    title: "Joint Pain Treatment in Wakad Pune | Dr Rahul Kalekar",
    description: "Expert joint pain treatment in Wakad, Pune. Arthritis, cartilage damage, and joint inflammation treated by specialist orthopedic doctor.",
    url: "https://drkalekarstarclinic.com/joint-pain-treatment-wakad",
  },
};

export default function JointPainPage() {
  return (
    <ServicePageLayout
      heroBadge="Orthopaedic Care"
      heroTitle="Joint Pain Treatment in Wakad, Pune"
      heroSubtitle="Expert diagnosis and treatment for all types of joint pain by Dr. Rahul Kalekar, experienced Orthopaedic Specialist at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      heroImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80"
      intro="Joint pain is one of the most common conditions affecting people across all age groups in Wakad and Pune. Whether caused by arthritis, injury, overuse, or age-related degeneration, untreated joint pain can severely impact your quality of life. At Kalekar's Star Ortho & Women Care Clinic in Wakad, Dr. Rahul Kalekar provides comprehensive evaluation and personalised treatment to relieve joint pain and restore full mobility."
      sections={[
        {
          heading: "What Causes Joint Pain?",
          content: "Joint pain can arise from a variety of underlying conditions. Understanding the root cause is essential to providing effective treatment. Common causes of joint pain include:",
          list: [
            "Osteoarthritis – wear and tear of cartilage in joints, especially knees, hips, and fingers",
            "Rheumatoid arthritis – an autoimmune condition causing chronic joint inflammation",
            "Gout – buildup of uric acid crystals in joints causing sudden, severe pain",
            "Cartilage damage – due to sports injuries or repetitive stress",
            "Bursitis – inflammation of fluid-filled sacs cushioning the joints",
            "Ligament injuries and tendonitis",
            "Post-fracture joint stiffness",
          ],
        },
        {
          heading: "Symptoms to Watch For",
          content: "Joint pain presents differently depending on the underlying cause, but common symptoms that indicate you should consult an orthopedic doctor in Wakad include:",
          list: [
            "Persistent aching or sharp pain in one or more joints",
            "Swelling, redness, or warmth around the joint",
            "Stiffness, especially in the morning or after periods of inactivity",
            "Reduced range of motion or difficulty performing daily activities",
            "Grinding or popping sounds when moving the joint",
            "Weakness in the muscles surrounding the joint",
          ],
        },
        {
          heading: "Treatment Options for Joint Pain",
          content: "Dr. Rahul Kalekar offers a full spectrum of evidence-based treatments for joint pain in Wakad, tailored to your specific diagnosis and lifestyle:",
          list: [
            "Detailed clinical assessment and imaging (X-ray, MRI) for accurate diagnosis",
            "Physiotherapy and targeted exercise programs to strengthen joint-supporting muscles",
            "Medications – anti-inflammatories, pain relievers, and disease-modifying agents for arthritis",
            "Intra-articular injections – corticosteroid or hyaluronic acid injections for rapid relief",
            "Lifestyle modifications and dietary guidance for long-term joint health",
            "Minimally invasive surgical procedures when conservative treatment is insufficient",
            "Joint replacement surgery for severe cases of arthritis or joint degeneration",
          ],
        },
        {
          heading: "Benefits of Early Joint Pain Treatment",
          content: "Seeking early treatment for joint pain from an orthopedic specialist in Wakad has significant advantages. Early intervention can prevent the condition from worsening, avoid the need for surgery, and help you maintain an active, pain-free lifestyle. Patients who receive timely care experience faster recovery, better mobility, and improved overall well-being. Do not ignore persistent joint pain — book a consultation with Dr. Rahul Kalekar today.",
        },
      ]}
      whyPoints={[
        "Dr. Rahul Kalekar holds MBBS, DNB, D.ORTHO, FIJR qualifications with extensive orthopedic experience",
        "Located conveniently in Wakad — serving Wakad, Pimple Saudagar, Baner, Hinjewadi, and nearby Pune areas",
        "Modern diagnostic facilities including X-ray and advanced imaging",
        "Patient-focused, affordable treatment with personalised care plans",
        "Both surgical and non-surgical treatment options available",
        "Clinic timing: Everyday 5:00 PM – 9:00 PM for working professionals",
      ]}
      doctorName="Dr. Rahul Kalekar"
      doctorQual="MBBS, DNB, D.ORTHO, FIJR"
      doctorTitle="Consultant Orthopaedic Surgeon"
      doctorInitial="RK"
      color="teal"
      relatedLinks={[
        { label: "Knee Pain Treatment", href: "/knee-pain-treatment-wakad" },
        { label: "Spine Care", href: "/spine-specialist-wakad" },
        { label: "Sports Injury Treatment", href: "/sports-injury-treatment-wakad" },
        { label: "Shoulder Pain Treatment", href: "/shoulder-pain-treatment-wakad" },
      ]}
    />
  );
}
