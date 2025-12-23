export const formSchemaCV = {
    personal: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "phone", label: "Phone Number", type: "text", required: true },
        { name: "photo", label: "Photo (optional)", type: "file" },
    ],
    selectors: [
        { name: "cvStyle", label: "CV Style", type: "select", options: ["Classic", "Modern", "Creative"], required: true },
        { name: "industry", label: "Industry", type: "select", options: ["IT","Marketing","Finance","Design","Education","Healthcare","Other"], required: true },
        { name: "experienceLevel", label: "Experience Level", type: "select", options: ["Junior","Mid-level","Senior","Lead"], required: true },
    ],
    content: [
        { name: "summary", label: "Professional Summary", type: "textarea", required: true },
        { name: "workExperience", label: "Work Experience", type: "textarea", required: true },
        { name: "education", label: "Education", type: "textarea", required: true },
        { name: "skills", label: "Skills", type: "textarea", required: true },
    ],
};