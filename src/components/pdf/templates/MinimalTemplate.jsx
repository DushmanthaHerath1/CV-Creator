import React from "react";
import { Page, Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";

// 🎨 MINIMALIST STYLES (Black & White, High Readability)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: "Times-Roman", // Standard Serif for Classic look
    color: "#000000",
  },
  // Header
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontFamily: "Times-Italic",
    color: "#444",
    marginBottom: 8,
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 10,
    color: "#333",
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
  // Sections
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
    paddingBottom: 2,
    marginTop: 5,
  },
  // Items
  itemBlock: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
  },
  itemMeta: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    color: "#444",
  },
  itemSubtitle: {
    fontSize: 11,
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    textAlign: "justify",
    color: "#222",
  },
  // List Styles (Skills/Languages)
  listRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  listItem: {
    fontSize: 10,
    marginRight: 10,
  },
  // Bio Grid
  bioRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bioLabel: {
    width: 100,
    fontFamily: "Times-Bold",
    fontSize: 10,
  },
  bioValue: {
    fontSize: 10,
  },
});

// --- RENDER HELPERS ---

const ExperienceSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Experience</Text>
    {data.map((job, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{job.role}</Text>
          <Text style={styles.itemMeta}>
            {job.startDate} — {job.endDate}
          </Text>
        </View>
        <Text style={styles.itemSubtitle}>{job.company}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Education</Text>
    {data.map((edu, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{edu.school}</Text>
          <Text style={styles.itemMeta}>{edu.date}</Text>
        </View>
        <Text style={styles.itemSubtitle}>{edu.degree}</Text>
        {edu.description && (
          <Text style={styles.description}>{edu.description}</Text>
        )}
      </View>
    ))}
  </View>
);

// Minimal Skills: Comma separated text instead of badges
const SkillsSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>Skills</Text>
    <View style={styles.listRow}>
      <Text style={styles.description}>
        {data.map((skill) => skill.name).join(" • ")}
      </Text>
    </View>
  </View>
);

const LanguagesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>Languages</Text>
    <View style={styles.listRow}>
      {data.map((lang, index) => (
        <Text key={index} style={styles.listItem}>
          {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ""}
          {index < data.length - 1 ? "," : ""}
        </Text>
      ))}
    </View>
  </View>
);

const CertificatesSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Certificates</Text>
    {data.map((cert, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{cert.name}</Text>
          <Text style={styles.itemMeta}>{cert.date}</Text>
        </View>
        <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
      </View>
    ))}
  </View>
);

const ProjectsSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    {data.map((item, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemMeta}>{item.technologies}</Text>
        </View>
        {item.link && (
          <Link src={item.link} style={styles.link}>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>{item.link}</Text>
          </Link>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const AchievementsSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Achievements</Text>
    {data.map((item, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemMeta}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const ExtracurricularSection = ({ data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Extracurricular</Text>
    {data.map((item, index) => (
      <View key={index} style={styles.itemBlock} wrap={false}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.role}</Text>
          <Text style={styles.itemMeta}>{item.date}</Text>
        </View>
        <Text style={styles.itemSubtitle}>{item.organization}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>References</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
      {data.map((ref, index) => (
        <View key={index} style={{ width: "45%", marginBottom: 8 }}>
          <Text style={styles.itemTitle}>{ref.name}</Text>
          <Text style={styles.itemSubtitle}>{ref.position}</Text>
          <Text style={styles.description}>{ref.company}</Text>
          <Text style={styles.description}>
            {ref.email} {ref.phone ? `• ${ref.phone}` : ""}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const BioSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>Personal Details</Text>
    <View>
      {data.address && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Address:</Text>
          <Text style={styles.bioValue}>{data.address}</Text>
        </View>
      )}
      {data.dob && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Date of Birth:</Text>
          <Text style={styles.bioValue}>{data.dob}</Text>
        </View>
      )}
      {data.gender && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Gender:</Text>
          <Text style={styles.bioValue}>{data.gender}</Text>
        </View>
      )}
      {data.nationality && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Nationality:</Text>
          <Text style={styles.bioValue}>{data.nationality}</Text>
        </View>
      )}
      {data.maritalStatus && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Marital Status:</Text>
          <Text style={styles.bioValue}>{data.maritalStatus}</Text>
        </View>
      )}
      {data.idNumber && (
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>NIC/ID:</Text>
          <Text style={styles.bioValue}>{data.idNumber}</Text>
        </View>
      )}
    </View>
  </View>
);

// --- MAIN COMPONENT ---
const MinimalTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo } = data;

  // Check if bio has data (same logic as Modern)
  const hasBioData =
    personalInfo.address ||
    personalInfo.dob ||
    personalInfo.gender ||
    personalInfo.nationality ||
    personalInfo.maritalStatus ||
    personalInfo.idNumber;

  const RENDER_MAP = {
    experience: (d) => <ExperienceSection data={d.experience} />,
    education: (d) => <EducationSection data={d.education} />,
    skills: (d) => <SkillsSection data={d.skills} />,
    certificates: (d) => <CertificatesSection data={d.certificates} />,
    references: (d) => <ReferencesSection data={d.references} />,
    languages: (d) => <LanguagesSection data={d.languages} />,
    projects: (d) => <ProjectsSection data={d.projects} />,
    achievements: (d) => <AchievementsSection data={d.achievements} />,
    extracurricular: (d) => <ExtracurricularSection data={d.extracurricular} />,
    bio: (d) => <BioSection data={d.personalInfo} />,
  };

  return (
    <Page size="A4" style={styles.page}>
      {/* 1. HEADER (Simple, Centered or Left Aligned) */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        <Text style={styles.role}>{personalInfo.role}</Text>

        <View style={styles.contactLine}>
          {personalInfo.email && <Text>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text>• {personalInfo.phone}</Text>}
          {personalInfo.linkedin && (
            <Link src={personalInfo.linkedin} style={styles.link}>
              <Text>• LinkedIn</Text>
            </Link>
          )}
          {personalInfo.github && (
            <Link src={personalInfo.github} style={styles.link}>
              <Text>• GitHub</Text>
            </Link>
          )}
        </View>

        {/* Summary integrated into Header area for Minimal style */}
        {personalInfo.summary && (
          <Text style={{ ...styles.description, marginTop: 10 }}>
            {personalInfo.summary}
          </Text>
        )}
      </View>

      {/* 2. DYNAMIC SECTIONS LOOP (Exact same as Modern) */}
      {activeSections.map((section) => {
        const renderFunc = RENDER_MAP[section.id];

        if (section.id === "bio") {
          return hasBioData ? (
            <View key={section.id}>{renderFunc(data)}</View>
          ) : null;
        }

        if (renderFunc && data[section.id] && data[section.id].length > 0) {
          return <View key={section.id}>{renderFunc(data)}</View>;
        }
        return null;
      })}
    </Page>
  );
};

export default MinimalTemplate;
