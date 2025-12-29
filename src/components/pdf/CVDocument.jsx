import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// 1. Define Styles (CSS doesn't work here!)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica", // Standard PDF font
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#111",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  jobTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  experienceBlock: {
    marginBottom: 10,
  },
  role: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#444",
  },
  description: {
    fontSize: 10,
    marginTop: 5,
    lineHeight: 1.5,
  },
  // Add these to your const styles = ...
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillTag: {
    backgroundColor: "#eee",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});

// 2. The Document Component
// It receives "data" as a prop (just like any React component)
const CVDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalInfo.fullName || "Your Name"}
          </Text>
          <Text style={styles.jobTitle}>
            {data.personalInfo.role || "Job Title"}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 5 }}>
            {data.personalInfo.email} | {data.personalInfo.phone}
          </Text>
        </View>

        {/* Experience Section */}
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>

          {/* Map through the Experience Array */}
          {/* We use specific "checks" to ensure we don't crash if data is missing */}
          {data.experience?.map((job, index) => (
            <View key={index} style={styles.experienceBlock}>
              <Text style={styles.role}>{job.role}</Text>
              <Text style={styles.company}>
                {job.company} | {job.startDate} - {job.endDate}
              </Text>
              <Text style={styles.description}>{job.description}</Text>
            </View>
          ))}
        </View>
        {/* Education Section */}
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                {edu.school}
              </Text>
              <Text style={{ fontSize: 10 }}>
                {edu.degree} | {edu.date}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillRow}>
            {data.skills?.map((skill, index) => (
              <Text key={index} style={styles.skillTag}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
