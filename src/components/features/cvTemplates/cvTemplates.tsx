"use client";

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { CVOrderType } from "@/backend/types/cv.types";

// Реєстрація шрифтів
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

Font.register({
  family: 'Times-Roman',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Times/times.ttf'
});

Font.register({
  family: 'Courier',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Courier/cour.ttf'
});

// Розбір тексту на секції
const parseCVContent = (content: string) => {
  const sections: Record<string, string> = {
    SUMMARY: '',
    EXPERIENCE: '',
    EDUCATION: '',
    SKILLS: ''
  };
  
  const lines = content.split('\n');
  let currentSection = '';
  
  for (const line of lines) {
    const upperLine = line.toUpperCase();
    if (upperLine.includes('SUMMARY:')) {
      currentSection = 'SUMMARY';
      sections[currentSection] = line.replace('SUMMARY:', '').trim();
    } else if (upperLine.includes('EXPERIENCE:')) {
      currentSection = 'EXPERIENCE';
      sections[currentSection] = line.replace('EXPERIENCE:', '').trim();
    } else if (upperLine.includes('EDUCATION:')) {
      currentSection = 'EDUCATION';
      sections[currentSection] = line.replace('EDUCATION:', '').trim();
    } else if (upperLine.includes('SKILLS:')) {
      currentSection = 'SKILLS';
      sections[currentSection] = line.replace('SKILLS:', '').trim();
    } else if (currentSection && line.trim()) {
      sections[currentSection] += '\n' + line.trim();
    }
  }
  
  return sections;
};

// ========== CLASSIC CV (як у classic.pdf) ==========
export const ClassicCV = (order: CVOrderType) => {
  const sections = parseCVContent(order.response);
  const fontFamily = order.fontStyle === 'Times-Roman' ? 'Times-Roman' : 
                    order.fontStyle === 'Courier' ? 'Courier' : 'Helvetica';
  
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: fontFamily,
      fontSize: 11,
      lineHeight: 1.4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      paddingBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    contact: {
      fontSize: 10,
      textAlign: 'right',
      color: '#666',
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      borderBottomStyle: 'solid',
      paddingBottom: 3,
    },
    subSection: {
      marginBottom: 12,
    },
    jobTitle: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    company: {
      fontStyle: 'italic',
      fontSize: 11,
      color: '#555',
    },
    date: {
      fontSize: 10,
      color: '#777',
    },
    bullet: {
      marginLeft: 15,
      marginBottom: 4,
    },
    skillItem: {
      marginBottom: 3,
    },
  });

  const renderExperience = (exp: string) => {
    return exp.split('\n').map((line, i) => {
      if (line.includes('(') && line.includes(')')) {
        const parts = line.split('(');
        const titleCompany = parts[0].trim();
        const datePart = '(' + parts[1];
        
        return (
          <View key={i} style={styles.subSection}>
            <Text style={styles.jobTitle}>{titleCompany}</Text>
            <Text style={styles.date}>{datePart}</Text>
          </View>
        );
      } else if (line.trim().startsWith('-')) {
        return (
          <Text key={i} style={styles.bullet}>
            • {line.substring(1).trim()}
          </Text>
        );
      } else if (line.trim()) {
        return <Text key={i}>{line.trim()}</Text>;
      }
      return null;
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{order.fullName}</Text>
          <View style={styles.contact}>
            <Text>{order.email}</Text>
            <Text>{order.phone}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text>{sections.SUMMARY || order.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {sections.EXPERIENCE ? renderExperience(sections.EXPERIENCE) : renderExperience(order.workExperience)}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <Text>{sections.EDUCATION || order.education}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          {sections.SKILLS ? (
            sections.SKILLS.split(',').map((skill, i) => (
              <Text key={i} style={styles.skillItem}>• {skill.trim()}</Text>
            ))
          ) : (
            order.skills.split(',').map((skill, i) => (
              <Text key={i} style={styles.skillItem}>• {skill.trim()}</Text>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
};

// ========== MODERN CV (як у modern.pdf) ==========
export const ModernCV = (order: CVOrderType) => {
  const sections = parseCVContent(order.response);
  const fontFamily = order.fontStyle === 'Times-Roman' ? 'Times-Roman' : 
                    order.fontStyle === 'Courier' ? 'Courier' : 'Helvetica';
  
  const accentColor = order.themeColor === 'Default' ? '#2563eb' : 
                     order.themeColor === '#DC2626' ? '#DC2626' :
                     order.themeColor === '#059669' ? '#059669' :
                     order.themeColor === '#7C3AED' ? '#7C3AED' :
                     order.themeColor === '#F59E0B' ? '#F59E0B' : order.themeColor;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      padding: 0,
      fontFamily: fontFamily,
      fontSize: 10,
    },
    sidebar: {
      width: '35%',
      backgroundColor: accentColor === '#2563eb' ? '#e8f0ff' : 
                     accentColor === '#DC2626' ? '#fee2e2' :
                     accentColor === '#059669' ? '#d1fae5' :
                     accentColor === '#7C3AED' ? '#ede9fe' :
                     accentColor === '#F59E0B' ? '#fef3c7' : '#e8f0ff',
      padding: 25,
      paddingTop: 40,
    },
    main: {
      width: '65%',
      padding: 30,
      paddingTop: 40,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 5,
    },
    title: {
      fontSize: 12,
      color: accentColor,
      marginBottom: 25,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    contactItem: {
      fontSize: 9,
      color: '#475569',
      marginBottom: 6,
    },
    skillItem: {
      fontSize: 9,
      color: '#334155',
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: 2,
    },
    company: {
      fontSize: 10,
      color: '#475569',
      fontStyle: 'italic',
    },
    bullet: {
      fontSize: 9,
      color: '#334155',
      marginBottom: 4,
      marginLeft: 10,
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: '#fff',
    },
  });

  const renderExperience = (exp: string) => {
    const lines = exp.split('\n');
    let currentJob: any[] = [];
    const jobs: any[] = [];
    
    lines.forEach((line, i) => {
      if (line.includes('(') && line.includes(')')) {
        if (currentJob.length > 0) {
          jobs.push([...currentJob]);
          currentJob = [];
        }
        currentJob.push(<Text key={`title-${i}`} style={styles.jobTitle}>{line}</Text>);
      } else if (line.trim().startsWith('-')) {
        currentJob.push(
          <Text key={`bullet-${i}`} style={styles.bullet}>
            • {line.substring(1).trim()}
          </Text>
        );
      } else if (line.trim()) {
        if (currentJob.length === 1) {
          currentJob.push(<Text key={`company-${i}`} style={styles.company}>{line.trim()}</Text>);
        }
      }
    });
    
    if (currentJob.length > 0) {
      jobs.push(currentJob);
    }
    
    return jobs.map((job, i) => (
      <View key={i} style={{ marginBottom: 15 }}>
        {job}
      </View>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {order.photo && order.photo !== "data:," && (
            <Image src={order.photo} style={styles.photo} />
          )}
          
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>CONTACT</Text>
            <Text style={styles.contactItem}>{order.email}</Text>
            <Text style={styles.contactItem}>{order.phone}</Text>
          </View>
          
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            {(sections.SKILLS || order.skills).split(',').map((skill, i) => (
              <Text key={i} style={styles.skillItem}>• {skill.trim()}</Text>
            ))}
          </View>
          
          <View>
            <Text style={styles.sectionTitle}>INDUSTRY</Text>
            <Text style={styles.skillItem}>{order.industry}</Text>
            <Text style={styles.skillItem}>{order.experienceLevel}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.name}>{order.fullName}</Text>
          <Text style={styles.title}>
            {order.industry} • {order.experienceLevel}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#334155' }}>
              {sections.SUMMARY || order.summary}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {sections.EXPERIENCE ? renderExperience(sections.EXPERIENCE) : renderExperience(order.workExperience)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#334155' }}>
              {sections.EDUCATION || order.education}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ========== CREATIVE CV (як у creative.pdf) ==========
export const CreativeCV = (order: CVOrderType) => {
  const sections = parseCVContent(order.response);
  const fontFamily = order.fontStyle === 'Times-Roman' ? 'Times-Roman' : 
                    order.fontStyle === 'Courier' ? 'Courier' : 'Helvetica';
  
  const accentColor = order.themeColor === 'Default' ? '#7C3AED' : 
                     order.themeColor === '#DC2626' ? '#DC2626' :
                     order.themeColor === '#059669' ? '#059669' :
                     order.themeColor === '#2563eb' ? '#2563eb' :
                     order.themeColor === '#F59E0B' ? '#F59E0B' : order.themeColor;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: fontFamily,
      fontSize: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 25,
    },
    nameContainer: {
      flex: 1,
    },
    name: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 5,
    },
    title: {
      fontSize: 14,
      color: accentColor,
      fontWeight: 'bold',
    },
    contactContainer: {
      alignItems: 'flex-end',
    },
    contact: {
      fontSize: 9,
      color: '#6b7280',
      marginBottom: 2,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    gridItem: {
      width: '50%',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 8,
      textTransform: 'uppercase',
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      borderBottomStyle: 'solid',
      paddingBottom: 3,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    skillTag: {
      backgroundColor: accentColor,
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
      fontSize: 8,
      marginRight: 5,
      marginBottom: 5,
    },
    highlights: {
      backgroundColor: accentColor === '#7C3AED' ? '#ede9fe' : 
                     accentColor === '#DC2626' ? '#fee2e2' :
                     accentColor === '#059669' ? '#d1fae5' :
                     accentColor === '#2563eb' ? '#dbeafe' :
                     accentColor === '#F59E0B' ? '#fef3c7' : '#ede9fe',
      padding: 15,
      borderRadius: 8,
      marginTop: 10,
    },
    highlightItem: {
      fontSize: 9,
      color: '#111827',
      marginBottom: 4,
    },
    bullet: {
      fontSize: 9,
      color: '#374151',
      marginBottom: 4,
      marginLeft: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{order.fullName}</Text>
            <Text style={styles.title}>
              {order.industry} • {order.experienceLevel}
            </Text>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contact}>{order.email}</Text>
            <Text style={styles.contact}>{order.phone}</Text>
          </View>
        </View>

        {/* Skills Grid */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {(sections.SKILLS || order.skills).split(',').map((skill, i) => (
                <Text key={i} style={styles.skillTag}>{skill.trim()}</Text>
              ))}
            </View>
          </View>
          
          <View style={styles.gridItem}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
              {sections.EDUCATION || order.education}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text style={{ fontSize: 10, lineHeight: 1.5 }}>
            {sections.SUMMARY || order.summary}
          </Text>
        </View>

        {/* Experience */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {(sections.EXPERIENCE || order.workExperience).split('\n').map((line, i) => {
            if (line.trim().startsWith('-')) {
              return (
                <Text key={i} style={styles.bullet}>
                  • {line.substring(1).trim()}
                </Text>
              );
            } else if (line.trim()) {
              return (
                <Text key={i} style={{ 
                  fontSize: 10, 
                  fontWeight: line.includes('(') ? 'bold' : 'normal',
                  marginBottom: line.includes('(') ? 5 : 2,
                  color: line.includes('(') ? '#111827' : '#4b5563'
                }}>
                  {line.trim()}
                </Text>
              );
            }
            return null;
          })}
        </View>

        {/* Highlights/Achievements */}
        <View style={styles.highlights}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 8, color: accentColor }}>
            HIGHLIGHTS
          </Text>
          <Text style={styles.highlightItem}>• Improved project delivery efficiency by 30%</Text>
          <Text style={styles.highlightItem}>• Mentored junior developers</Text>
          <Text style={styles.highlightItem}>• Implemented scalable UI components</Text>
          {order.extrasData?.achievements && (
            order.extrasData.achievements.split('\n').map((item, i) => (
              <Text key={`achievement-${i}`} style={styles.highlightItem}>{item}</Text>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
};

// ========== COVER LETTER TEMPLATE ==========
export const CoverLetterCV = (order: CVOrderType) => {
  const fontFamily = order.fontStyle === 'Times-Roman' ? 'Times-Roman' : 
                    order.fontStyle === 'Courier' ? 'Courier' : 'Helvetica';
  
  const styles = StyleSheet.create({
    page: {
      padding: 50,
      fontFamily: fontFamily,
      fontSize: 11,
      lineHeight: 1.5,
    },
    address: {
      marginBottom: 30,
    },
    date: {
      marginBottom: 30,
    },
    recipient: {
      marginBottom: 30,
    },
    salutation: {
      marginBottom: 20,
    },
    body: {
      marginBottom: 20,
    },
    closing: {
      marginTop: 30,
    },
    signature: {
      marginTop: 50,
    },
  });

  const coverLetterContent = order.extrasData?.coverLetter || `Dear Hiring Manager,

I am writing to express my enthusiasm for the ${order.industry} role at [Company Name]. With my experience as a ${order.experienceLevel} professional in ${order.industry}, I have consistently demonstrated my ability to build scalable applications that place a strong emphasis on user-centric design and performance enhancements.

In my most recent role, I successfully designed and implemented user interfaces, leading to a remarkable 30% improvement in load times and enhancing the overall user experience. I take pride in mentoring junior developers and fostering collaborative team environments.

I hold a degree in Computer Science where I honed my technical skills, and I am committed to continuous learning in the rapidly evolving field of technology.

Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your team.

Sincerely,
${order.fullName}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.address}>
          <Text>[Your Address]</Text>
          <Text>[City, State, Zip Code]</Text>
          <Text>{order.email}</Text>
          <Text>{order.phone}</Text>
        </View>
        
        <View style={styles.date}>
          <Text>[Date]</Text>
        </View>
        
        <View style={styles.recipient}>
          <Text>[Hiring Manager's Name]</Text>
          <Text>[Company's Name]</Text>
          <Text>[Company's Address]</Text>
          <Text>[City, State, Zip Code]</Text>
        </View>
        
        <View style={styles.salutation}>
          <Text>Dear [Hiring Manager's Name],</Text>
        </View>
        
        <View style={styles.body}>
          {coverLetterContent.split('\n\n').map((paragraph, i) => (
            <Text key={i} style={{ marginBottom: 15 }}>
              {paragraph}
            </Text>
          ))}
        </View>
        
        <View style={styles.closing}>
          <Text>Sincerely,</Text>
          <View style={styles.signature}>
            <Text>{order.fullName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ========== LINKEDIN SUMMARY TEMPLATE ==========
export const LinkedInCV = (order: CVOrderType) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 11,
      lineHeight: 1.6,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    paragraph: {
      marginBottom: 15,
    },
  });

  const linkedinContent = order.extrasData?.linkedin || `As a seasoned ${order.industry} professional with experience in ${order.experienceLevel} roles, I have consistently demonstrated a commitment to driving technological innovation and excellence. My career is marked by successful leadership in designing and implementing complex systems that enhance organizational efficiency and productivity.

Throughout my journey, I have developed a robust skill set encompassing ${(order.skills || '').split(',').slice(0, 3).join(', ')}. I pride myself on my ability to cultivate a culture of inclusivity and continuous improvement, empowering teams to reach their full potential and deliver exceptional results.

Notable achievements include spearheading system improvements resulting in efficiency gains, successfully deploying initiatives that safeguarded data and strengthened organizational resilience.

I hold relevant education and certifications, ensuring that I remain at the forefront of technological advancements. With a strong belief in the power of mentorship, I actively support the development of emerging talent in the ${order.industry} sector.

As I continue to advance in my career, I am excited to explore new challenges and opportunities that allow me to impact the ${order.industry} landscape significantly. Let's connect and discuss how we can collaborate to drive innovation and achieve extraordinary outcomes.`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>LINKEDIN SUMMARY</Text>
        
        {linkedinContent.split('\n\n').map((paragraph, i) => (
          <Text key={i} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </Page>
    </Document>
  );
};

// ========== MANAGER REVIEWED (комбінує все) ==========
export const ManagerReviewedCV = (order: CVOrderType) => {
  let CVTemplate;
  switch (order.cvStyle) {
    case "Modern":
      CVTemplate = ModernCV;
      break;
    case "Creative":
      CVTemplate = CreativeCV;
      break;
    default:
      CVTemplate = ClassicCV;
  }
  
  return (
    <Document>
      {/* Основне CV */}
      {CVTemplate(order)}
      
      {/* Додаткові сторінки якщо є */}
      {order.extrasData?.coverLetter && CoverLetterCV(order)}
      {order.extrasData?.linkedin && LinkedInCV(order)}
    </Document>
  );
};