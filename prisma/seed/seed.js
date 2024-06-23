const { prisma } = require("./client");

const course = [
    { name: "Bachelor of Science in Computer Science" },
    { name: "Bachelor of Science in Information Technology" },
    { name: "Bachelor of Science in Civil Engineering" },
    { name: "Bachelor of Science in Computer Engineering" },
    { name: "Bachelor of Science in Electrical Engineering" },
    { name: "Bachelor of Science in Electronic Engineering" },
    { name: "Bachelor of Science in Mechanical Engineering" },
    { name: "Bachelor of Early Childhood Education" },
    { name: "Bachelor of Elementary Education" },
    { name: "Bachelor of Elementary Education Major in Early Childhood Education" },
    { name: "Bachelor of Elementary Education Major in General Education" },
    { name: "Bachelor of Elementary Education Major in Special Education" },
    { name: "Bachelor of Secondary Education Major in English" },
    { name: "Bachelor of Secondary Education Major in Filipino" },
    { name: "Bachelor of Secondary Education Major in Mathematics" },
    { name: "Bachelor of Secondary Education Major in Science" },
    { name: "Bachelor of Special Needs Education: Generalist" },
    { name: "Bachelor of Science in Accountancy" },
    { name: "Bachelor of Science in Business Administration Major in Financial Management" },
    { name: "Bachelor of Science in Business Administration Major in Management Accounting" },
    { name: "Bachelor of Science in Business Administration Major in Marketing Management" },
    { name: "Bachelor of Science in Tourism Management" },
    { name: "Bachelor of Arts in Mass Communication" },
    { name: "Bachelor of Science in Hospitality Management" },
    { name: "Bachelor of Science in Psychology" },
    { name: "Bachelor of Science in Nursing" },
    { name: "Bachelor of Science in Criminology" },
    { name: "Doctor of Philosophy Educational Leadership and Management" },
    { name: "Master in Education Major in Educational Leadership" },
    { name: "Master in Education Major in English Language Teaching" },
    { name: "Master in Information Technology" },
    { name: "Master of Arts in Education Major in Educational Management" },
];

const scholarship = [
    { name: "Tertiary Education Subsidy" },
    { name: "Tulong Dunong Program" },
    { name: "Presidential Scholarship" },
]

const skills = [
  { category: "IT", name: "Programming" },
  { category: "IT", name: "Web Development" },
  { category: "IT", name: "Database Management" },
  { category: "IT", name: "Networking" },
  { category: "IT", name: "Cybersecurity" },
  { category: "IT", name: "Cloud Computing" },
  { category: "IT", name: "Data Science" },
  { category: "IT", name: "Software Testing and Quality Assurance" },
  { category: "IT", name: "Mobile App Development" },
  { category: "IT", name: "IT Support and Helpdesk Management" },
  { category: "Nursing", name: "Patient Assessment and Care Planning" },
  { category: "Nursing", name: "Medication Administration" },
  { category: "Nursing", name: "Wound Care Management" },
  { category: "Nursing", name: "Clinical Documentation" },
  { category: "Nursing", name: "Critical Thinking and Problem Solving" },
  { category: "Nursing", name: "Health Promotion and Disease Prevention" },
  { category: "Nursing", name: "Infection Control Procedures" },
  { category: "Nursing", name: "Patient Education and Counseling" },
  { category: "Nursing", name: "Emergency Response and CPR" },
  { category: "Nursing", name: "Ethics and Professionalism in Nursing" },
  { category: "Criminology", name: "Criminal Law and Procedure" },
  { category: "Criminology", name: "Forensic Science Techniques" },
  { category: "Criminology", name: "Crime Scene Investigation" },
  { category: "Criminology", name: "Criminal Psychology" },
  { category: "Criminology", name: "Victimology and Victim Assistance" },
  { category: "Criminology", name: "Juvenile Justice Systems" },
  { category: "Criminology", name: "Policing Strategies and Community Policing" },
  { category: "Criminology", name: "Criminal Justice Ethics" },
  { category: "Criminology", name: "Risk Assessment and Management" },
  { category: "Criminology", name: "Crime Prevention Strategies" },
  { category: "Engineering", name: "Mechanical Engineering Design" },
  { category: "Engineering", name: "Electrical Circuit Analysis" },
  { category: "Engineering", name: "Structural Analysis and Design" },
  { category: "Engineering", name: "Thermodynamics and Fluid Mechanics" },
  { category: "Engineering", name: "Engineering Mathematics" },
  { category: "Engineering", name: "CAD/CAM Software Proficiency" },
  { category: "Engineering", name: "Project Management in Engineering" },
  { category: "Engineering", name: "Materials Science and Engineering" },
  { category: "Engineering", name: "Environmental Engineering Principles" },
  { category: "Engineering", name: "Robotics and Automation" },
  { category: "Architecture", name: "Architectural Design Principles" },
  { category: "Architecture", name: "Building Information Modeling" },
  { category: "Architecture", name: "Construction Documents and Specifications" },
  { category: "Architecture", name: "Urban Planning and Design" },
  { category: "Architecture", name: "Sustainable Architecture" },
  { category: "Architecture", name: "Interior Design Concepts" },
  { category: "Architecture", name: "Historical Preservation and Restoration" },
  { category: "Architecture", name: "Architectural Visualization Techniques" },
  { category: "Architecture", name: "Building Codes and Regulations" },
  { category: "Architecture", name: "Site Analysis and Planning" },
  { category: "Dance", name: "Ballet Technique and Performance" },
  { category: "Dance", name: "Contemporary Dance Styles" },
  { category: "Dance", name: "Jazz Dance Techniques" },
  { category: "Dance", name: "Hip Hop and Street Dance" },
  { category: "Dance", name: "Partner and Group Choreography" },
  { category: "Dance", name: "Dance History and Appreciation" },
  { category: "Dance", name: "Improvisation names" },
  { category: "Dance", name: "Physical Conditioning for Dancers" },
  { category: "Dance", name: "Stage Presence and Performance names" },
  { category: "Dance", name: "Dance Production and Event Management" },
  { category: "Arts", name: "Drawing and Sketching Techniques" },
  { category: "Arts", name: "Painting with Various Media" },
  { category: "Arts", name: "Sculpture and 3D Art Forms" },
  { category: "Arts", name: "Printmaking Techniques" },
  { category: "Arts", name: "Mixed Media Artistry" },
  { category: "Arts", name: "Art History and Criticism" },
  { category: "Arts", name: "Color Theory and Composition" },
  { category: "Arts", name: "Digital Art and Graphic Design" },
  { category: "Arts", name: "Art Exhibition Curation and Management" },
  { category: "Arts", name: "Art Education and Community Outreach" },
  { category: "Music", name: "Music Business and Marketing" },
  { category: "Music", name: "Live Sound Engineering and Mixing" },
  { category: "Music", name: "Music Education and Pedagogy" },
  { category: "Music", name: "Stage Performance and Presence" },
  { category: "Music", name: "Music Technology and Digital Instruments" },
  { category: "Business", name: "Business Management and Leadership" },
  { category: "Business", name: "Financial Analysis and Reporting" },
  { category: "Business", name: "Marketing Strategy and Brand Management" },
  { category: "Business", name: "Entrepreneurship and Business Development" },
  { category: "Business", name: "Project Management" },
  { category: "Business", name: "Supply Chain Management" },
  { category: "Business", name: "Business Ethics and Corporate Social Responsibility" },
  { category: "Business", name: "Market Research and Analysis" },
  { category: "Business", name: "Human Resource Management" },
  { category: "Business", name: "Business Communication and Negotiation" },
  { category: "Communication", name: "Public Speaking and Presentation names" },
  { category: "Communication", name: "Written Communication" },
  { category: "Communication", name: "Interpersonal Communication names" },
  { category: "Communication", name: "Media Production" },
  { category: "Communication", name: "Social Media Management" },
  { category: "Communication", name: "Cross-Cultural Communication" },
  { category: "Communication", name: "Conflict Resolution and Mediation" },
  { category: "Communication", name: "Journalism and News Reporting" },
  { category: "Communication", name: "Editing and Proofreading" },
  { category: "Communication", name: "Technical Writing and Documentation" }
]

const admin = [
  { email: "superadmin123@cdd.edu.ph", password: "$2a$10$pWtBnaB09a62XSNzmA.Il.7EMF6qlNhdvxELc1yLpHungZyQCFnkC", firstName: "Super", lastName: "Admin", schoolId: "200028421", emailVerified: new Date(), isEmailVerified: true },
  { email: "admin123@cdd.edu.ph", password: "$2a$10$pWtBnaB09a62XSNzmA.Il.7EMF6qlNhdvxELc1yLpHungZyQCFnkC", firstName: "Super", lastName: "Admin", schoolId: "200028421", emailVerified: new Date(), isEmailVerified: true }
]

async function Seed(){
    // await prisma.skill.createMany({
    //     data: skills,
    // })
    // await prisma.scholarship.createMany({
    //     data: scholarship,
    // });
    // await prisma.course.createMany({
    //     data: course,
    // });
        // await prisma.user.createMany({
    //     data: admin,
    // });
    console.log("Undo the comment");
};

Seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// run node prisma/seed/seed.js