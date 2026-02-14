import React from "react";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
  Circle,
} from "@react-pdf/renderer";
import { THEMES } from "../../../data/themes";

// --------------------------------------------------------------------------
// 🛠️ ICONS (Cleaned up alignment)
// --------------------------------------------------------------------------

const IconMail = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconPhone = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconLinkedin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9h4v12H2z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconGithub = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- Section Icons (Kept but simplified) ---
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M12 12h.01"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconGlobe = ({ style, stroke = "#111827" }) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6, ...style }}
  >
    <Path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
      stroke={stroke}
      strokeWidth={2}
      fill="none"
    />
    <Path d="M2 12h20" stroke={stroke} strokeWidth={2} fill="none" />
    <Path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke={stroke}
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconProject = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M18 19a5 5 0 0 1-5-5v8"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="13"
      cy="12"
      r="2"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="20"
      cy="19"
      r="2"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconTrophy = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M4 22h16" stroke="#111827" strokeWidth={2} fill="none" />
    <Path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconActivity = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6 }}
  >
    <Path
      d="M3.5 21 14 3"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 21 10 3"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5 21 12 15l-3.5 6"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21h20"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
// 🆕 TOOLS ICON (Settings)
const IconTools = ({ style }) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ marginRight: 6, ...style }}
  >
    <Path
      d="M14 17H5"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 7h-9"
      stroke="#111827"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
       cx="17"
       cy="17"
       r="3"
       stroke="#111827"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     <Circle
       cx="7"
       cy="7"
       r="3"
       stroke="#111827"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
  </Svg>
);

// --------------------------------------------------------------------------
// 🎨 STYLES (Cleaned & Fixed)
// --------------------------------------------------------------------------

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#111827",
    paddingBottom: 20,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 4,
    objectFit: "cover",
    marginRight: 25,
  },
  headerRight: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000000",
    marginBottom: 8, // Increased to prevent overlap
    lineHeight: 1.2, // Ensure space for descending characters
    letterSpacing: 1,
  },
  role: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 10, // Increased spacing
    textTransform: "uppercase",
    fontWeight: "medium",
    letterSpacing: 1.5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center", // Perfect vertical alignment
    fontSize: 9,
    color: "#374151",
  },
  link: {
    color: "#111827",
    textDecoration: "none",
  },
  // Sections
  section: {
    marginBottom: 15,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 4,
    marginBottom: 4,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000000",
    letterSpacing: 0.5,
  },
  // Job Blocks
  jobBlock: { marginBottom: 10, flexShrink: 0 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#000000",
  },
  jobDate: {
    fontSize: 9,
    color: "#374151",
    textAlign: "right",
    fontStyle: "italic",
  },
  company: {
    color: "#374151",
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 3,
  },
  description: {
    fontSize: 9.5,
    textAlign: "justify",
    color: "#374151",
    lineHeight: 1.4,
  },
  // Clean Skills List
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6, // Tighter gap for chips
  },
  skillBadge: {
    paddingTop: 6,
    paddingBottom: 3,
    paddingHorizontal: 8,
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
    textTransform: "capitalize",
  },
  // Clean References (No Italics)
  refGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  refItem: {
    width: "45%",
    marginBottom: 10,
  },
  refName: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000",
    marginBottom: 2,
  },
  refRole: {
    fontSize: 9,
    color: "#374151", // No italics
    marginBottom: 1,
  },
  // Bio Info
  infoRow: {
    flexDirection: "row",
    paddingVertical: 2,
    alignItems: "center",
  },
  infoLabel: {
    width: "35%",
    fontSize: 9,
    color: "#6b7280",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoValue: {
    width: "65%",
    fontSize: 9.5,
    color: "#111827",
  },
});

// --------------------------------------------------------------------------
// 🧩 RENDER HELPERS
// --------------------------------------------------------------------------

const ExperienceSection = ({ data }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconExperience />
         <Text style={styles.sectionTitle}>Experience</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <Text style={styles.jobRole}>{data[0].role}</Text>
             <Text style={styles.jobDate}>
               {data[0].startDate} — {data[0].isCurrent ? "Present" : data[0].endDate}
             </Text>
           </View>
           <Text style={styles.company}>{data[0].company}</Text>
           <Text style={styles.description}>{data[0].description}</Text>
         </View>
       )}
    </View>
    {data.slice(1).map((job, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{job.role}</Text>
          <Text style={styles.jobDate}>
            {job.startDate} — {job.isCurrent ? "Present" : job.endDate}
          </Text>
        </View>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationSection = ({ data }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconEducation />
         <Text style={styles.sectionTitle}>Education</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <Text style={styles.jobRole}>{data[0].school}</Text>
             <Text style={styles.jobDate}>
               {data[0].startDate && data[0].endDate
                 ? `${data[0].startDate} — ${
                     data[0].isCurrent ? "Present" : data[0].endDate
                   }`
                 : data[0].date}
             </Text>
           </View>
           <Text style={styles.company}>{data[0].degree}</Text>
           {data[0].description && (
             <Text style={styles.description}>{data[0].description}</Text>
           )}
         </View>
       )}
    </View>
    {data.slice(1).map((edu, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{edu.school}</Text>
          <Text style={styles.jobDate}>
            {edu.startDate && edu.endDate
              ? `${edu.startDate} — ${
                  edu.isCurrent ? "Present" : edu.endDate
                }`
              : edu.date}
          </Text>
        </View>
        <Text style={styles.company}>{edu.degree}</Text>
        {edu.description && (
          <Text style={styles.description}>{edu.description}</Text>
        )}
      </View>
    ))}
  </View>
);

// ♻️ FIXED: Clean Text List for Skills
const SkillsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconSkills />
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((skill, index) => (
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skillText}>{skill.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const ToolsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconTools />
      <Text style={styles.sectionTitle}>Tools</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((tool, index) => (
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skillText}>{tool.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const CertificatesSection = ({ data }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconCert />
         <Text style={styles.sectionTitle}>Certificates</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <Text style={styles.jobRole}>{data[0].name}</Text>
             <Text style={styles.jobDate}>{data[0].date}</Text>
           </View>
           <Text style={styles.description}>{data[0].issuer}</Text>
           {data[0].link && (
             <Link src={data[0].link} style={{ ...styles.company, color: "#2563eb", textDecoration: "none", marginTop: 2 }}>
               {data[0].link.replace(/^https?:\/\//, "")}
             </Link>
           )}
         </View>
       )}
    </View>
    {data.slice(1).map((cert, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{cert.name}</Text>
          <Text style={styles.jobDate}>{cert.date}</Text>
        </View>
        <Text style={styles.description}>{cert.issuer}</Text>
        {cert.link && (
          <Link src={cert.link} style={{ ...styles.company, color: "#2563eb", textDecoration: "none", marginTop: 2 }}>
            {cert.link.replace(/^https?:\/\//, "")}
          </Link>
        )}
      </View>
    ))}
  </View>
);

// ♻️ FIXED: Unified Reference Styles
const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconUsers />
      <Text style={styles.sectionTitle}>References</Text>
    </View>
    <View style={styles.refGrid}>
      {data.map((ref, index) => (
        <View key={index} style={styles.refItem}>
          <Text style={styles.refName}>{ref.name}</Text>
          <Text style={styles.refRole}>{ref.position}</Text>
          <Text style={{ fontSize: 9, color: "#374151", marginBottom: 2 }}>
            {ref.company}
          </Text>
          {ref.email && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconMail
                style={{ marginRight: 4, transform: "translateY(-2)" }}
              />
              <Text style={{ fontSize: 9, color: "#374151" }}>{ref.email}</Text>
            </View>
          )}
          {ref.phone && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <IconPhone
                style={{ marginRight: 4, transform: "translateY(-2)" }}
              />
              <Text style={{ fontSize: 9, color: "#374151" }}>{ref.phone}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  </View>
);

const LanguagesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconGlobe />
      <Text style={styles.sectionTitle}>Languages</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((lang, index) => (
        <View key={index} style={styles.skillItem}>
          <Text style={styles.skillBullet}>•</Text>
          <Text style={styles.skillText}>
            {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ""}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const ProjectsSection = ({ data, theme }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconProject />
         <Text style={styles.sectionTitle}>Projects</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
               <Text style={styles.jobRole}>
                 {data[0].title}
                 {data[0].isCurrent && (
                   <Text style={{ color: theme.colors.primary, fontSize: 10, fontWeight: "normal" }}>
                     {"  "}● Ongoing
                   </Text>
                 )}
               </Text>
             </View>
             {data[0].technologies && (
               <Text style={styles.jobDate}>{data[0].technologies}</Text>
             )}
           </View>
           {data[0].link && (
             <Link
               src={data[0].link}
               style={{
                 ...styles.company,
                 color: "#111827",
                 textDecoration: "underline",
               }}
             >
               {data[0].link}
             </Link>
           )}
           <Text style={styles.description}>{data[0].description}</Text>
         </View>
       )}
    </View>
    {data.slice(1).map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
           <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
             <Text style={styles.jobRole}>
               {item.title}
               {item.isCurrent && (
                 <Text style={{ color: theme.colors.primary, fontSize: 10, fontWeight: "normal" }}>
                   {"  "}● Ongoing
                 </Text>
               )}
             </Text>
           </View>
          {item.technologies && (
            <Text style={styles.jobDate}>{item.technologies}</Text>
          )}
        </View>
        {item.link && (
          <Text
            style={{
              ...styles.company,
              color: "#111827",
              textDecoration: "underline",
            }}
          >
            {item.link}
          </Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const AchievementsSection = ({ data }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconTrophy style={{ marginRight: 6 }} />
         <Text style={styles.sectionTitle}>Achievements</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <Text style={styles.jobRole}>{data[0].title}</Text>
             <Text style={styles.jobDate}>{data[0].date}</Text>
           </View>
           <Text style={styles.description}>{data[0].description}</Text>
         </View>
       )}
    </View>
    {data.slice(1).map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.title}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const ExtracurricularSection = ({ data }) => (
  <View style={styles.section}>
    <View style={{ height: 1 }} />
    <View wrap={false} style={{ flexDirection: "column" }}>
       <View style={{ ...styles.sectionTitleRow, marginBottom: 0 }}>
         <IconActivity style={{ marginRight: 6 }} />
         <Text style={styles.sectionTitle}>Extracurricular</Text>
       </View>
       <View style={{ height: 6, flexShrink: 0 }} />
       {data[0] && (
         <View style={styles.jobBlock}>
           <View style={styles.jobHeader}>
             <Text style={styles.jobRole}>{data[0].role}</Text>
             <Text style={styles.jobDate}>{data[0].date}</Text>
           </View>
           <Text style={styles.company}>{data[0].organization}</Text>
           <Text style={styles.description}>{data[0].description}</Text>
         </View>
       )}
    </View>
    {data.slice(1).map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.role}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.company}>{item.organization}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const BioSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconUser />
      <Text style={styles.sectionTitle}>Personal Details</Text>
    </View>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      <View style={{ width: "50%", paddingRight: 10 }}>
        {data.address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{data.address}</Text>
          </View>
        )}
        {data.dob && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>DOB</Text>
            <Text style={styles.infoValue}>{data.dob}</Text>
          </View>
        )}
        {data.gender && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{data.gender}</Text>
          </View>
        )}
      </View>
      <View style={{ width: "50%", paddingLeft: 10 }}>
        {data.nationality && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nationality</Text>
            <Text style={styles.infoValue}>{data.nationality}</Text>
          </View>
        )}
        {data.maritalStatus && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Marital Status</Text>
            <Text style={styles.infoValue}>{data.maritalStatus}</Text>
          </View>
        )}
        {data.idNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NIC/ID</Text>
            <Text style={styles.infoValue}>{data.idNumber}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

// --------------------------------------------------------------------------
// 🏁 MAIN TEMPLATE COMPONENT
// --------------------------------------------------------------------------

const MinimalTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo, themeColor = "blue" } = data;
  const theme = THEMES[themeColor] || THEMES.blue;

  const hasBioData =
    personalInfo.address ||
    personalInfo.dob ||
    personalInfo.gender ||
    personalInfo.nationality ||
    personalInfo.maritalStatus ||
    personalInfo.idNumber;

  const RENDER_MAP = {
    exp: (d, theme) => <ExperienceSection data={d.experience} />,
    education: (d, theme) => <EducationSection data={d.education} />,
    skills: (d, theme) => <SkillsSection data={d.skills} />,
    tools: (d, theme) => <ToolsSection data={d.tools} />,
    certificates: (d, theme) => <CertificatesSection data={d.certificates} />,
    projects: (d, theme) => <ProjectsSection data={d.projects} theme={theme} />,
    achievements: (d, theme) => <AchievementsSection data={d.achievements} />,
    languages: (d, theme) => <LanguagesSection data={d.languages} />,
    extracurricular: (d, theme) => (
      <ExtracurricularSection data={d.extracurricular} />
    ),
    bio: (d, theme) => <BioSection data={d.personalInfo} />,
  };

  return (
    <Page size="A4" style={styles.page}>
      {/* 1. HEADER (Flex Row for optional photo support) */}
      <View style={styles.header} wrap={false}>
        {/* Photo Logic: Renders only if exists */}
        {personalInfo.photo && (
          <Image src={personalInfo.photo} style={styles.photo} />
        )}

        <View style={styles.headerRight}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Name"}
          </Text>
          <Text style={styles.role}>{personalInfo.role || "Job Title"}</Text>

          <View style={styles.contactRow}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <IconMail
                  style={{ marginRight: 6, transform: "translateY(-2)" }}
                />
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <IconPhone
                  style={{ marginRight: 6, transform: "translateY(-2)" }}
                />
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <IconLinkedin
                  style={{ marginRight: 6, transform: "translateY(-2)" }}
                />
                <Link src={personalInfo.linkedin} style={styles.link}>
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </Link>
              </View>
            )}
            {personalInfo.github && (
              <View style={styles.contactItem}>
                <IconGithub
                  style={{ marginRight: 6, transform: "translateY(-2)" }}
                />
                <Link src={personalInfo.github} style={styles.link}>
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </Link>
              </View>
            )}
            {personalInfo.website && (
              <View style={styles.contactItem}>
                <IconGlobe
                  style={{ marginRight: 6, transform: "translateY(-2)" }}
                  stroke="#374151"
                />
                <Link src={personalInfo.website} style={styles.link}>
                  {personalInfo.website.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 2. SUMMARY */}
      {personalInfo.summary && (
        <View style={styles.section} wrap={false}>
          <View style={styles.sectionTitleRow}>
            <IconSummary />
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.description}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* 3. DYNAMIC SECTIONS */}
      {activeSections.map((section) => {
        const renderFunc = RENDER_MAP[section.id];

        if (section.id === "bio") {
          return hasBioData ? (
            <View key={section.id}>{renderFunc(data)}</View>
          ) : null;
        }

        if (renderFunc && data[section.id] && data[section.id].length > 0) {
          return <View key={section.id}>{renderFunc(data, theme)}</View>;
        }
        return null;
      })}
    </Page>
  );
};

export default MinimalTemplate;
