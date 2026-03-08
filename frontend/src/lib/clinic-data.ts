// ─── Real Clinic & Doctor Information ───────────────────────
// This file centralizes all clinic-specific data used across the UI.

export const CLINIC = {
    name: "STAR ORTHO AND WOMEN CARE",
    brandName: "Star Ortho & Women Care",
    address: {
        building: "Sanskruti Arcade",
        floor: "Ground Floor, Shop 6",
        area: "Wakad",
        city: "Pune",
        fullAddress: "Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune",
    },
};

export interface DoctorInfo {
    id: string;
    name: string;
    qualifications: string;
    specialization: string;
    title: string;
    shortBio: string;
    avatar: string; // Initials for avatar circle
}

export const DOCTORS: DoctorInfo[] = [
    {
        id: "dr-rahul",
        name: "Dr. Rahul Kalekar",
        qualifications: "MBBS, DNB, D.Ortho, FIJR",
        specialization: "Orthopaedic Surgery",
        title: "Consultant Orthopaedic Surgeon",
        shortBio: "Specialist in joint replacement, fractures & sports injuries",
        avatar: "RK",
    },
    {
        id: "dr-aparna",
        name: "Dr. Aparna Kalekar",
        qualifications: "MBBS, MS (OBGY)",
        specialization: "Obstetrics & Gynaecology",
        title: "Consultant Obstetrician & Gynaecologist, Laparoscopic Surgeon",
        shortBio: "Expert in high-risk pregnancy, laparoscopic surgery & women's health",
        avatar: "AK",
    },
];
