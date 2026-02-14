import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
  Circle,
} from "@react-pdf/renderer";
import { THEMES } from "../../../data/themes";

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

const IconMapPin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- 🛠️ ICONS (Sections) ---
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
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
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
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
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
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
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
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
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
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
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🆕 NEW ICONS
const IconGlobe = ({ style, stroke = "#1f2937" }) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={style}
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
  >
    <Path
      d="M18 19a5 5 0 0 1-5-5v8"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="13"
      cy="12"
      r="2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="20"
      cy="19"
      r="2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconTrophy = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
  >
    <Path
      d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M4 22h16" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
      stroke="#1f2937"
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
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.5 21 14 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 21 10 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5 21 12 15l-3.5 6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21h20"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🆕 BIO ICON (Proper User Icon)
const IconUser = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },
  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },
  jobBlock: { marginBottom: 10, flexShrink: 0 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },
  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingTop: 6,
    paddingBottom: 3,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },
  refIcon: { transform: "translateY(-1.5)" },
});

// --- RENDER HELPERS ---
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

const SkillsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconSkills />
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((skill, index) => (
        <Text key={index} style={styles.skillBadge}>
          {skill.name}
        </Text>
      ))}
    </View>
  </View>
);

const IconTools = () => (
   <Svg
     width={12}
     height={12}
     viewBox="0 0 24 24"
   >
     <Path
       d="M14 17H5"
       stroke="#1f2937"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     <Path
       d="M19 7h-9"
       stroke="#1f2937"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     <Circle
       cx="17"
       cy="17"
       r="3"
       stroke="#1f2937"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     <Circle
       cx="7"
       cy="7"
       r="3"
       stroke="#1f2937"
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
   </Svg>
 );

const ToolsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconTools />
      <Text style={styles.sectionTitle}>Tools</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((tool, index) => (
        <Text key={index} style={styles.skillBadge}>
          {tool.name}
        </Text>
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

const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconUsers />
      <Text style={styles.sectionTitle}>References</Text>
    </View>
    <View style={styles.refGrid}>
      {data.map((ref, index) => (
        <View key={index} style={styles.refItem}>
          <Text style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}>
            {ref.name}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "medium", color: "#1f2937" }}>
            {ref.position}
          </Text>
          <Text style={{ fontSize: 9, color: "#374151" }}>{ref.company}</Text>
          {ref.location && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMapPin style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.location}
              </Text>
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
              <IconPhone style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.phone}
              </Text>
            </View>
          )}
          {ref.email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMail style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.email}
              </Text>
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
        <Text key={index} style={styles.skillBadge}>
          {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ""}
        </Text>
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
                     {"  "}- Ongoing
                   </Text>
                 )}
               </Text>
             </View>
             {data[0].technologies && (
               <Text style={styles.jobDate}>{data[0].technologies}</Text>
             )}
           </View>
           {data[0].link && (
             <Link src={data[0].link} style={{ ...styles.company, textDecoration: "none" }}>
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
                   {"  "}- Ongoing
                 </Text>
               )}
             </Text>
           </View>
          {item.technologies && (
            <Text style={styles.jobDate}>{item.technologies}</Text>
          )}
        </View>
        {item.link && (
          <Link src={item.link} style={{ ...styles.company, textDecoration: "none" }}>
            {item.link}
          </Link>
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
          <IconTrophy />
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
          <IconActivity />
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

// 🆕 BIO SECTION RENDERER (Previously hardcoded at bottom)
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

function ModernTemplate({ data, activeSections = [] }) {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  const { themeColor = "blue" } = data;
  const theme = THEMES[themeColor] || THEMES.blue;

  const RENDER_MAP = {
    exp: (d, theme) => <ExperienceSection data={d.experience} />,
    education: (d, theme) => <EducationSection data={d.education} />,
    skills: (d, theme) => <SkillsSection data={d.skills} />,
    tools: (d, theme) => <ToolsSection data={d.tools} />,
    certificates: (d, theme) => <CertificatesSection data={d.certificates} />,
    references: (d, theme) => <ReferencesSection data={d.references} />,
    languages: (d, theme) => <LanguagesSection data={d.languages} />,
    projects: (d, theme) => <ProjectsSection data={d.projects} theme={theme} />,
    achievements: (d, theme) => <AchievementsSection data={d.achievements} />,
    extracurricular: (d, theme) => (
      <ExtracurricularSection data={d.extracurricular} />
    ),
    bio: (d, theme) => <BioSection data={d.personalInfo} />,
  };

  return (
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View wrap={false}>
        <View style={styles.header}>
          {data.personalInfo.photo && (
            <Image src={data.personalInfo.photo} style={styles.photo} />
          )}
          <View style={styles.headerRight}>
            <Text style={styles.name}>
              {data.personalInfo.fullName || "Your Name"}
            </Text>
            <Text style={styles.role}>
              {data.personalInfo.role || "Job Title"}
            </Text>
            <View style={styles.contactRow}>
              {data.personalInfo.email && (
                <View style={styles.contactItem}>
                  <IconMail style={{ transform: "translateY(-0.5)" }} />
                  <Text style={{ marginLeft: 4 }}>
                    {data.personalInfo.email}
                  </Text>
                </View>
              )}
              {data.personalInfo.phone && (
                <View style={styles.contactItem}>
                  <IconPhone style={{ transform: "translateY(-0.5)" }} />
                  <Text style={{ marginLeft: 4 }}>
                    {data.personalInfo.phone}
                  </Text>
                </View>
              )}
              {data.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <IconLinkedin style={{ transform: "translateY(-0.5)" }} />
                  <Link
                    src={data.personalInfo.linkedin}
                    style={{ marginLeft: 4, ...styles.link }}
                  >
                    {data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                  </Link>
                </View>
              )}
              {data.personalInfo.github && (
                <View style={styles.contactItem}>
                  <IconGithub style={{ transform: "translateY(-0.5)" }} />
                  <Link
                    src={data.personalInfo.github}
                    style={{ marginLeft: 4, ...styles.link }}
                  >
                    {data.personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                  </Link>
                </View>
              )}
              {data.personalInfo.website && (
                <View style={styles.contactItem}>
                  <IconGlobe
                    style={{ transform: "translateY(-0.5)" }}
                    stroke="#374151"
                  />
                  <Link
                    src={data.personalInfo.website}
                    style={{ marginLeft: 4, ...styles.link }}
                  >
                    {data.personalInfo.website.replace(/^https?:\/\//, "")}
                  </Link>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* SUMMARY */}
      {data.personalInfo.summary && (
        <View wrap={false} style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <IconSummary />
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.description}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* 🔀 DYNAMIC SECTIONS (Now includes Bio) */}
      {activeSections.map((section) => {
        const renderFunc = RENDER_MAP[section.id];

        // SPECIAL CHECK: Bio is an Object, others are Arrays
        if (section.id === "bio") {
          return hasBioData ? (
            <View key={section.id}>{renderFunc(data)}</View>
          ) : null;
        }

        // STANDARD CHECK: Arrays
        if (renderFunc && data[section.id] && data[section.id].length > 0) {
          return <View key={section.id}>{renderFunc(data, theme)}</View>;
        }
        return null;
      })}
    </Page>
  );
}

export default ModernTemplate;
