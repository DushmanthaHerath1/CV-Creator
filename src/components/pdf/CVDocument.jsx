import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Standard Helvetica Font (No crashing)
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
  headerRight: { marginLeft: 20, flex: 1 }, // Spacing fix
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  }, // Overlap fix
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: { fontSize: 9, color: "#374151" },
  link: { color: "#2563eb", textDecoration: "none" },

  // Sections
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },

  // Jobs
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

  // Skills & Info
  skillBadge: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 8,
    color: "#1f2937",
    border: "1pt solid #e5e7eb",
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },
});

// 🧠 THE SMART ENGINE: Accepts `breaks` map
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
        {/* HEADER (Always Atomic) */}
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
                  <Text style={styles.contactItem}>
                    {data.personalInfo.email}
                  </Text>
                )}
                {data.personalInfo.phone && (
                  <Text style={styles.contactItem}>
                    {data.personalInfo.phone}
                  </Text>
                )}
                {data.personalInfo.linkedin && (
                  <Link
                    src={data.personalInfo.linkedin}
                    style={[styles.contactItem, styles.link]}
                  >
                    LinkedIn
                  </Link>
                )}
                {data.personalInfo.github && (
                  <Link
                    src={data.personalInfo.github}
                    style={[styles.contactItem, styles.link]}
                  >
                    GitHub
                  </Link>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View wrap={false}>
            {/* 🧠 CONDITIONAL BREAK */}
            {breaks["summary"] && <View break />}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.description}>
                {data.personalInfo.summary}
              </Text>
            </View>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            {breaks["exp-header"] && <View break />}
            <Text style={styles.sectionTitle}>Experience</Text>

            {data.experience.map((job, index) => (
              <View key={index} wrap={false}>
                {breaks[`exp-${index}`] && <View break />}
                <View style={styles.jobBlock}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobRole}>{job.role}</Text>
                    <Text style={styles.jobDate}>
                      {job.startDate} — {job.endDate}
                    </Text>
                  </View>
                  <Text style={styles.company}>{job.company}</Text>
                  <Text style={styles.description}>{job.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            {breaks["edu-header"] && <View break />}
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} wrap={false}>
                {breaks[`edu-${index}`] && <View break />}
                <View style={styles.jobBlock}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobRole}>{edu.school}</Text>
                    <Text style={styles.jobDate}>{edu.date}</Text>
                  </View>
                  <Text style={styles.description}>{edu.degree}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <View wrap={false}>
            {breaks["skills"] && <View break />}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* PERSONAL INFO */}
        {hasBioData && (
          <View wrap={false}>
            {breaks["personal"] && <View break />}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              {data.personalInfo.address && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>
                    {data.personalInfo.address}
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: "50%", paddingRight: 10 }}>
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
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;
