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
} from "@react-pdf/renderer";

// --- 🛠️ ICON LIBRARY (ALL Size 10, ALL Color #374151 or Accent) ---

// 1. CONTACT ICONS
const IconMail = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
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
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
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
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGithub = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151" // Fixed to dark gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151" // Fixed to dark gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🛑 THE ALIEN FIX: Size 10, Color #374151 (Dark Gray)
const IconMapPin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151" // Dark Gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151" // Dark Gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 2. SECTION ICONS
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
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
    style={{ transform: "translateY(-2)" }}
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
    style={{ transform: "translateY(-2)" }}
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
    style={{ transform: "translateY(-2)" }}
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
    style={{ transform: "translateY(-2)" }}
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
    style={{ transform: "translateY(-2)" }}
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

const IconUser = IconSummary;

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

  jobBlock: { marginBottom: 10 },
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
    paddingVertical: 5,
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

  // 📐 ICON ALIGNMENT (Nudge up for perfect centering)
  refIcon: {
    transform: "translateY(-1.5)",
  },
});

const CVDocument = ({ data, breaks = {} }) => {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  return (
    <Document>
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
                    <IconMail />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
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
            {breaks["summary"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            {breaks["exp-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconExperience />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>

            {data.experience.map((job, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`exp-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{job.role}</Text>
                  <Text style={styles.jobDate}>
                    {job.startDate} — {job.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.description}>{job.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            {breaks["edu-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconEducation />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`edu-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{edu.school}</Text>
                  <Text style={styles.jobDate}>{edu.date}</Text>
                </View>
                <Text style={styles.description}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <View wrap={false} style={styles.section}>
            {breaks["skills"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSkills />
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CERTIFICATES */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            {breaks["cert-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconCert />
              <Text style={styles.sectionTitle}>Certificates</Text>
            </View>
            {data.certificates.map((cert, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`cert-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{cert.name}</Text>
                  <Text style={styles.jobDate}>{cert.date}</Text>
                </View>
                <Text style={styles.description}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* REFERENCES (Grid) */}
        {data.references?.length > 0 && (
          <View style={styles.section}>
            {breaks["ref-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUsers />
              <Text style={styles.sectionTitle}>References</Text>
            </View>
            <View style={styles.refGrid}>
              {data.references.map((ref, index) => (
                <View key={index} style={styles.refItem} wrap={false}>
                  {breaks[`ref-${index}`] && <View break />}
                  <Text
                    style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}
                  >
                    {ref.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "medium",
                      color: "#1f2937",
                    }}
                  >
                    {ref.position}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#374151" }}>
                    {ref.company}
                  </Text>

                  {/* Location Icon (Corrected Size & Color) */}
                  {ref.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <IconMapPin style={styles.refIcon} />
                      <Text
                        style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}
                      >
                        {ref.location}
                      </Text>
                    </View>
                  )}

                  <View style={{ marginTop: 4 }}>
                    {/* Phone Icon */}
                    {ref.phone && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <IconPhone style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.phone}
                        </Text>
                      </View>
                    )}
                    {/* Email Icon */}
                    {ref.email && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <IconMail style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.email}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PERSONAL INFO */}
        {hasBioData && (
          <View wrap={false} style={styles.section}>
            {breaks["personal"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUser />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", paddingRight: 10 }}>
                {data.personalInfo.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.address}
                    </Text>
                  </View>
                )}
                {data.personalInfo.dob && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>DOB</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.dob}
                    </Text>
                  </View>
                )}
                {data.personalInfo.gender && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.gender}
                    </Text>
                  </View>
                )}
                {data.personalInfo.maritalStatus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.maritalStatus}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ width: "50%", paddingLeft: 10 }}>
                {data.personalInfo.nationality && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nationality</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.nationality}
                    </Text>
                  </View>
                )}
                {data.personalInfo.idNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>NIC/ID</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.idNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;
