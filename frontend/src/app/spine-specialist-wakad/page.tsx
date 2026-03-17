import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/clinic/ServicePageLayout";

export const metadata: Metadata = {
  title: "Spine Specialist in Wakad Pune | Back Pain Treatment | Dr Rahul Kalekar",
  description: "Expert spine and back pain treatment in Wakad, Pune by Dr. Rahul Kalekar. Treating disc herniation, sciatica, spondylosis, and spinal injuries. Call 8073311622.",
  keywords: ["spine specialist Wakad", "back pain treatment Wakad Pune", "sciatica treatment Wakad", "disc herniation Wakad", "spine doctor near me Wakad"],
  alternates: { canonical: "/spine-specialist-wakad" },
  openGraph: {
    title: "Spine Specialist in Wakad Pune | Back Pain Treatment",
    description: "Expert spine care and back pain treatment in Wakad, Pune by Dr. Rahul Kalekar. Sciatica, disc herniation, spondylosis treatment available.",
    url: "https://drkalekarstarclinic.com/spine-specialist-wakad",
  },
};

export default function SpinePage() {
  return (
    <ServicePageLayout
      heroBadge="Orthopaedic Care"
      heroTitle="Spine Specialist & Back Pain Treatment in Wakad, Pune"
      heroSubtitle="Advanced diagnosis and treatment for all spinal conditions including back pain, disc herniation, and sciatica by Dr. Rahul Kalekar at Kalekar's Star Ortho & Women Care Clinic, Wakad."
      intro="Back and spine problems are increasingly common among working professionals, elderly individuals, and active adults in Wakad and Pune. Whether it is a dull aching lower back or sharp radiating pain from a disc problem, spinal conditions can severely disrupt daily life. Dr. Rahul Kalekar, a qualified spine specialist and orthopedic doctor in Wakad, offers comprehensive assessment and personalised treatment for all spinal conditions — from conservative physiotherapy to surgical care."
      sections={[
        {
          heading: "Common Causes of Back and Spine Pain",
          content: "Back pain can arise from a wide range of structural and functional problems in the spine. Common causes treated at our Wakad orthopedic clinic include:",
          list: [
            "Muscle strain and ligament sprain from poor posture or heavy lifting",
            "Degenerative disc disease – age-related breakdown of spinal discs",
            "Herniated or prolapsed disc pressing on spinal nerves",
            "Spondylosis – spinal arthritis causing bone spurs and stiffness",
            "Spinal stenosis – narrowing of the spinal canal compressing nerves",
            "Scoliosis – abnormal sideways curvature of the spine",
            "Compression fractures from osteoporosis or injury",
          ],
        },
        {
          heading: "Disc Herniation and Prolapsed Disc",
          content: "A herniated disc occurs when the soft inner material of a spinal disc pushes through its outer casing, pressing on nearby nerves. This is one of the most common causes of severe back pain and leg pain (sciatica) seen in patients from Wakad and the surrounding Pune suburbs. Symptoms include radiating pain, numbness, and weakness in the arms or legs depending on the level of herniation. Early treatment prevents permanent nerve damage.",
        },
        {
          heading: "Sciatica — Causes and Treatment",
          content: "Sciatica is characterised by sharp, shooting pain that travels from the lower back down through the buttock and into the leg. It is caused by compression of the sciatic nerve, most commonly due to a herniated disc or bone spur. Treatment at our spine clinic in Wakad includes:",
          list: [
            "Targeted physiotherapy and spinal decompression exercises",
            "Anti-inflammatory medications and nerve pain management",
            "Epidural steroid injections for fast, targeted relief",
            "Surgical discectomy or microdiscectomy for severe or persistent cases",
          ],
        },
        {
          heading: "Spine Treatment Options in Wakad",
          content: "Dr. Rahul Kalekar provides a full range of surgical and non-surgical spine treatment options:",
          list: [
            "Clinical examination and imaging-based (X-ray, MRI) diagnosis",
            "Physiotherapy, core strengthening, and postural correction programmes",
            "Pain management with medications, injections, and nerve blocks",
            "Minimally invasive spinal procedures for disc and nerve problems",
            "Spinal fusion or decompression surgery for advanced cases",
            "Post-surgical rehabilitation and recovery support",
          ],
        },
        {
          heading: "Surgical and Non-Surgical Spine Care",
          content: "The majority of back pain and spinal conditions can be successfully managed without surgery. Dr. Rahul Kalekar always explores the full range of conservative options before recommending surgical intervention. When surgery is necessary, minimally invasive techniques are preferred for faster recovery, less pain, and smaller incisions. Patients from Wakad, Pimple Saudagar, Baner, and Hinjewadi regularly benefit from our spine care services.",
        },
      ]}
      whyPoints={[
        "Specialist orthopedic doctor with advanced spinal care training in Wakad",
        "Accurate diagnosis through clinical assessment and advanced imaging (MRI/X-ray)",
        "Non-surgical first approach — surgery only when truly necessary",
        "Modern, minimally invasive surgical techniques for faster recovery",
        "Rehabilitation and physiotherapy guidance as part of complete care",
        "Evening clinic timings ideal for working patients — 5:00 PM to 9:00 PM everyday",
      ]}
      doctorName="Dr. Rahul Kalekar"
      doctorQual="MBBS, DNB, D.ORTHO, FIJR"
      doctorTitle="Consultant Orthopaedic Surgeon"
      doctorInitial="RK"
      color="teal"
      relatedLinks={[
        { label: "Joint Pain Treatment", href: "/joint-pain-treatment-wakad" },
        { label: "Knee Pain Treatment", href: "/knee-pain-treatment-wakad" },
        { label: "Sports Injury Treatment", href: "/sports-injury-treatment-wakad" },
        { label: "Shoulder Pain Treatment", href: "/shoulder-pain-treatment-wakad" },
      ]}
    />
  );
}
