import React, { useMemo } from "react";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { THEMES } from "../../../data/themes";

// --------------------------------------------------------------------------
// 🛠️ ICONS
// --------------------------------------------------------------------------

const IconMail = ({ color }) => (
  <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 8 }}>
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="m22 6-10 7L2 6" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

const IconPhone = ({ color }) => (
  <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 8 }}>
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);

const IconPin = ({ color }) => (
  <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 8 }}>
    <Path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill={color} />
  </Svg>
);

const IconLinkedin = ({ color }) => (
  <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 8 }}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="M2 9h4v12H2z" fill={color} />
    <Path d="M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill={color} />
  </Svg>
);

// --------------------------------------------------------------------------
// 🎨 DYNAMIC STYLES GENERATOR
// --------------------------------------------------------------------------

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5,
      position: "relative",
      paddingTop: 30,
      paddingBottom: 30,
    },

    // 🟢 Sidebar Background
    sidebarBackground: {
      position: "absolute",
      top: -30,
      left: 0,
      bottom: -30,
      width: "35%", 
      backgroundColor: "#0f172a", // Slate 900
    },

    // 🟢 Left Column (Sidebar Content)
    leftColumn: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "35%", 
      paddingHorizontal: 25,
      paddingTop: 35,
      height: "100%",
      color: "#ffffff",
    },

    // 🟢 Right Column (Main Content)
    rightColumn: {
      marginLeft: "35%",
      paddingLeft: 35,
      paddingRight: 35,
    },

    // Header
    headerName: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#0f172a",
      marginBottom: 4,
      textAlign: "left",
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },

    headerRole: {
      fontSize: 10,
      color: "#475569", // Slate 600
      marginBottom: 25,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 4, 
      textAlign: "left",
    },

    // Sidebar: Photo
    // 🟢 Copied EXACTLY from ProfessionalTemplate (125px)
    photo: {
      width: 125,
      height: 125,
      borderRadius: 62.5, // Exactly half of 125
      marginBottom: 35,
      objectFit: "cover",
      alignSelf: "center",
    },

    // Sidebar: Headings
    sidebarTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: "#ffffff",
      textTransform: "uppercase",
      marginBottom: 12,
      marginTop: 15,
      letterSpacing: 2,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(197, 197, 197, 1)", // 🟢 Keeping User's Gray
      paddingBottom: 4,
    },

    // Sidebar: Items
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    contactText: {
      fontSize: 8.5,
      color: "#cbd5e1", // Slate 300
      flex: 1,
      lineHeight: 1.4,
    },

    // Sidebar: Reference Block
    referenceBlockSidebar: {
       marginBottom: 12,
    },
    
    // Skills
    skillText: {
      fontSize: 9,
      color: "#cbd5e1",
      marginBottom: 5,
      fontWeight: "medium",
    },

    // 🟢 TIMELINE STYLES
    timelineContainer: {
      borderLeftWidth: 1.5,
      borderLeftColor: "#e2e8f0", // 🟢 Neutral Light Gray Line
      paddingLeft: 22,
      marginLeft: 4, 
      marginBottom: 15,
      position: "relative",
    },

    mainSectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#0f172a", // Dark Slate
      textTransform: "uppercase",
      letterSpacing: 2.5,
      marginBottom: 15,
      marginTop: 5,
      borderBottomWidth: 1.5,
      borderBottomColor: "#0f172a",
      paddingBottom: 6,
      width: "100%",
    },

    // Entry Styles
    entryBlock: {
      marginBottom: 20,
      position: "relative",
    },

    timelineDot: {
      position: "absolute",
      left: -27.25,
      top: 3,
      width: 9,
      height: 9,
      borderRadius: 4.5,
      backgroundColor: "#ffffff",
      borderWidth: 2,
      borderColor: "#0f172a",
      zIndex: 10,
    },
    
    entryDate: {
      fontSize: 9.5,
      color: "#0f172a", 
      fontWeight: "bold", 
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: 11.5,
      fontWeight: "extraBold", 
      color: "#0f172a",
      marginBottom: 1,
    },
    entrySubtitle: {
      fontSize: 9.5,
      color: "#475569", // Slate 600
      fontWeight: "medium",
      marginBottom: 4,
      fontStyle: "italic",
    },
    description: {
      fontSize: 9,
      color: "#334155", // Slate 700
      lineHeight: 1.5,
      textAlign: "justify",
    },
    
    // Grid for Main References
    referencesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 15,
    },
    referenceItemMain: {
      width: "48%", 
      marginBottom: 10,
    }
  });

// --------------------------------------------------------------------------
// 🧩 RENDER HELPERS
// --------------------------------------------------------------------------

// Sidebar
const ContactSection = ({ data, styles, theme }) => (
  <View style={{ marginBottom: 30 }}>
    <Text style={styles.sidebarTitle}>Contact</Text>
    {data.phone && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconPhone color={"#94a3b8"} /></View>
        <Text style={styles.contactText}>{data.phone}</Text>
      </View>
    )}
    {data.email && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconMail color={"#94a3b8"} /></View>
        <Text style={styles.contactText}>{data.email}</Text>
      </View>
    )}
    {data.address && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconPin color={"#94a3b8"} /></View>
        <Text style={styles.contactText}>{data.address}</Text>
      </View>
    )}
    {data.linkedin && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconLinkedin color={"#94a3b8"} /></View>
        <Link src={data.linkedin} style={styles.contactText}>
          LinkedIn
        </Link>
      </View>
    )}
  </View>
);

const SkillsSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 30 }}>
    <Text style={styles.sidebarTitle}>Skills</Text>
    {data.map((skill, i) => (
      <Text key={i} style={styles.skillText}>
        •  {skill.name}
      </Text>
    ))}
  </View>
);

const LanguagesSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 30 }}>
    <Text style={styles.sidebarTitle}>Languages</Text>
    {data.map((lang, i) => (
      <Text key={i} style={styles.skillText}>
        •  {lang.language}
      </Text>
    ))}
  </View>
);

const ReferencesSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 30 }}>
    <Text style={styles.sidebarTitle}>References</Text>
    {data.map((ref, i) => (
      <View key={i} style={styles.referenceBlockSidebar}>
        <Text style={{ ...styles.skillText, fontWeight: 'bold', color: '#fff' }}>{ref.name}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, fontStyle: 'italic' }}>{ref.position}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5 }}>{ref.company}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{ref.phone}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{ref.email}</Text>
      </View>
    ))}
  </View>
);

// Main Content - Timeline
const TimelineEntry = ({
  title,
  subtitle,
  date,
  description,
  styles,
}) => (
  <View style={styles.entryBlock} wrap={false}>
    <View style={styles.timelineDot} />
    {date && <Text style={styles.entryDate}>{date}</Text>} 
    <Text style={styles.entryTitle}>{title}</Text>
    {subtitle && <Text style={styles.entrySubtitle}>{subtitle}</Text>}
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

// Grid References for Main Area
const ReferencesGrid = ({ data, styles }) => (
  <View>
    <Text style={styles.mainSectionTitle}>References</Text>
    <View style={styles.referencesGrid}>
      {data.map((ref, i) => (
        <View key={i} style={styles.referenceItemMain}>
          <Text style={{ ...styles.entryTitle, fontSize: 10.5 }}>{ref.name}</Text>
          <Text style={{ ...styles.entrySubtitle, marginBottom: 2, fontSize: 9 }}>{ref.position} / {ref.company}</Text>
          <Text style={{ ...styles.description, fontSize: 8.5 }}>{ref.phone}</Text>
          <Text style={{ ...styles.description, fontSize: 8.5 }}>{ref.email}</Text>
        </View>
      ))}
    </View>
  </View>
);

const TimelineSection = ({ title, data, type, styles, theme }) => {
  if (!data || data.length === 0) return null;
  return (
    <View>
      <Text style={styles.mainSectionTitle}>{title}</Text>
      <View style={styles.timelineContainer}>
        {data.map((item, i) => {
          const titleText =
            type === "edu" ? item.degree : type === "exp" ? item.role : item.title;
          const subtitleText =
            type === "edu" ? item.school : type === "exp" ? item.company : "";
          const dateText =
            type === "edu"
              ? item.date
              : type === "exp"
              ? `${item.startDate} - ${item.endDate}`
              : item.date;

          return (
            <TimelineEntry
              key={i}
              title={titleText}
              subtitle={subtitleText}
              date={dateText}
              description={item.description}
              styles={styles}
            />
          );
        })}
      </View>
    </View>
  );
};

// --------------------------------------------------------------------------
// 🏁 MAIN COMPONENT
// --------------------------------------------------------------------------

const ElegantTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo, themeColor = "blue" } = data;
  const theme = THEMES[themeColor] || THEMES.blue;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const SIDEBAR_SECTIONS = ["skills", "languages", "references"];
  const MAIN_SECTIONS = [
    "experience",
    "education",
    "projects",
    "achievements",
    "extracurricular",
  ];

  return (
    <Page size="A4" style={styles.page}>
      {/* Fixed Sidebar Background */}
      <View fixed style={styles.sidebarBackground} />

      {/* Left Column (Sidebar) */}
      <View style={styles.leftColumn}>
        {personalInfo.photo && (
          <Image src={personalInfo.photo} style={styles.photo} />
        )}
        <ContactSection data={personalInfo} styles={styles} theme={theme} />

        {activeSections.map((section) => {
          if (!SIDEBAR_SECTIONS.includes(section.id)) return null;
          
          switch (section.id) {
            case "skills":
              return data.skills?.length > 0 && (
                <SkillsSidebar key={section.id} data={data.skills} styles={styles} />
              );
            case "languages":
              return data.languages?.length > 0 && (
                <LanguagesSidebar key={section.id} data={data.languages} styles={styles} />
              );
            case "references":
               return data.references?.length > 0 && (
                <ReferencesSidebar key={section.id} data={data.references} styles={styles} />
              );
            default:
              return null;
          }
        })}
      </View>

      {/* Right Column (Main) */}
      <View style={styles.rightColumn}>
        {/* Header (Top Left Aligned) */}
        <View style={{ marginBottom: 30, alignItems: "flex-start" }}> 
          <Text style={styles.headerName}>{personalInfo.fullName}</Text>
          <Text style={styles.headerRole}>{personalInfo.role}</Text>
          {personalInfo.summary && (
            <View style={{ width: "100%" }}>
              <Text style={styles.mainSectionTitle}>Professional Summary</Text>
              <Text style={{ ...styles.description, textAlign: "justify" }}> 
                {personalInfo.summary}
              </Text>
            </View>
          )}
        </View>

        {activeSections.map((section) => {
          if (SIDEBAR_SECTIONS.includes(section.id)) return null; 

          switch (section.id) {
            case "experience":
              return (
                <TimelineSection
                  key={section.id}
                  title="Experience"
                  data={data.experience}
                  type="exp"
                  styles={styles}
                  theme={theme}
                />
              );
            case "education":
              return (
                <TimelineSection
                  key={section.id}
                  title="Education"
                  data={data.education}
                  type="edu"
                  styles={styles}
                  theme={theme}
                />
              );
            case "projects":
              return (
                <TimelineSection
                  key={section.id}
                  title="Projects"
                  data={data.projects}
                  type="proj"
                  styles={styles}
                  theme={theme}
                />
              );
            case "references": 
               return (
                  <ReferencesGrid key={section.id} data={data.references} styles={styles} />
               );
            default:
              return null;
          }
        })}
      </View>
    </Page>
  );
};

export default ElegantTemplate;
