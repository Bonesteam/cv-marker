export const formSchemaCV = {
    personal: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "phone", label: "Phone Number", type: "text", required: true },
        { name: "photo", label: "Photo (optional)", type: "file" },
    ],
    selectors: [
        { name: "cvStyle", label: "CV Style", type: "select", options: ["Executive","Portfolio","One-page","Infographic","Technical"], required: true },
        { name: "industry", label: "Industry", type: "select", options: ["Technology","Creative","Finance","Healthcare","Education","Consulting","Freelance","Other"], required: true },
        { name: "experienceLevel", label: "Experience Level", type: "select", options: ["Entry","Associate","Mid","Senior","Lead","Director","Executive"], required: true },
    ],
    content: [
        { name: "summary", label: "Professional Summary", type: "textarea", required: true },
        { name: "workExperience", label: "Work Experience", type: "textarea", required: true },
        { name: "education", label: "Education", type: "textarea", required: true },
        { name: "skills", label: "Skills", type: "textarea", required: true },
    ],
};
