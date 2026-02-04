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
// 🛠️ ICONS (Updated to your Minimalist Set)
// --------------------------------------------------------------------------

const IconLinkedin = ({ color = "#6b7280" }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9h4v12H2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
// --------------------------------------------------------------------------

const IconMail = ({ color = "#6b7280" }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <Path
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPhone = ({ color = "#6b7280" }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <Path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPin = ({ color = "#6b7280" }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <Path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 13a3 3 0 100-6 3 3 0 000 6z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconBriefcase = ({ color = "#374151" }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGraduate = ({ color = "#374151" }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M22 10v6M2 10l10-5 10 5-10 5z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12v5a6 3 0 0012 0v-5"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUser = ({ color = "#374151" }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Added extra icons for other sections to match style
const IconTrophy = ({ color = "#374151" }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="M4 22h16" stroke={color} strokeWidth={2} fill="none" />
    <Path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);

const IconProject = ({ color = "#374151" }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Path
      d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="m12 10 2 2-2 2" stroke={color} strokeWidth={2} fill="none" />
    <Path d="m17 10-2 2 2 2" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

// --------------------------------------------------------------------------
// 🎨 STYLES
// --------------------------------------------------------------------------

const createStyles = (theme) => StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    position: "relative",
    paddingTop: 55, // 🟢 Increased Header Space
    paddingBottom: 65,
  },

  // 1. Fixed Sidebar Background (Appears on ALL pages)
  sidebarBackground: {
    position: "absolute",
    top: -55, // 🟢 Offset padding
    left: 0,
    bottom: -65, // 🟢 Offset padding
    width: "36%",
    backgroundColor: theme.colors.sidebarBg,
  },

  // 2. Sidebar Content (Only on Page 1)
  leftColumn: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "36%",
    padding: 24,
    paddingTop: 35, // 🟢 Pushing content down to match Page Padding
    height: "100%",
  },

  // 3. Main Content (Flows naturally)
  rightColumn: {
    marginLeft: "36%",
    padding: 32,
    paddingTop: 0,
    paddingRight: 40,
  },

  // Header (Centered in Sidebar)
  headerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 4,
    letterSpacing: 0.5,
    lineHeight: 1.2,
    textAlign: "center",
  },

  headerRole: {
    fontSize: 11,
    color: theme.colors.icon,
    marginBottom: 30,
    fontWeight: "normal",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
  },

  photo: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    marginBottom: 20,
    objectFit: "cover",
    alignSelf: "center",
  },

  // Sidebar sections
  sidebarSection: {
    marginBottom: 24,
    paddingRight: 10,
  },

  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors.text,
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accent,
    paddingBottom: 4,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  contactText: {
    fontSize: 9,
    color: theme.colors.icon,
    lineHeight: 1.4,
    flex: 1,
  },

  // New Skills Styling
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillBadge: {
    backgroundColor: theme.colors.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 9,
    color: theme.colors.text,
    fontWeight: "bold",
  },

  skillItem: {
    fontSize: 9,
    color: theme.colors.icon,
    marginBottom: 5,
    lineHeight: 1.3,
  },

  languageItem: {
    fontSize: 9,
    color: theme.colors.icon,
    marginBottom: 5,
  },

  // Main content sections
  mainSection: {
    marginBottom: 22,
  },
  
  // ... (Keep existing Main Section Styles but ensure they are untouched by replacement if possible) ...
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e2e8f0",
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: theme.colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  entryBlock: {
    marginBottom: 14,
  },

  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },

  entryTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: theme.colors.text,
    flex: 1,
  },

  entryDate: {
    fontSize: 8.5,
    color: theme.colors.icon,
    fontStyle: "italic",
    marginLeft: 10,
  },

  entrySubtitle: {
    fontSize: 9.5,
    color: theme.colors.icon,
    marginBottom: 5,
    fontStyle: "italic",
    fontWeight: "medium",
  },

  entryDescription: {
    fontSize: 9,
    color: theme.colors.icon,
    lineHeight: 1.5,
    textAlign: "justify",
  },

  aboutText: {
    fontSize: 9,
    color: theme.colors.icon,
    lineHeight: 1.6,
    textAlign: "justify",
  },

  referenceBlock: {
    marginBottom: 14,
  },

  referenceName: {
    fontSize: 9,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 2,
  },

  referenceDetails: {
    fontSize: 8,
    color: theme.colors.icon,
    lineHeight: 1.3,
  },
});

// --------------------------------------------------------------------------
// 🧩 RENDER HELPERS
// --------------------------------------------------------------------------

// ... (Keep Render Helpers: ContactSection, SkillsSidebar, etc. - No changes needed unless logic changes)

// 1. Sidebar Components
const ContactSection = ({ data, styles, theme }) => (
  <View style={styles.sidebarSection}>
    <Text style={styles.sidebarTitle}>Contact</Text>
    {data.phone && (
      <View style={styles.contactItem}>
        <IconPhone color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.phone}</Text>
      </View>
    )}
    {data.email && (
      <View style={styles.contactItem}>
        <IconMail color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.email}</Text>
      </View>
    )}
    {data.address && (
      <View style={styles.contactItem}>
        <IconPin color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.address}</Text>
      </View>
    )}
    {data.linkedin && (
      <View style={styles.contactItem}>
        <IconLinkedin color={theme.colors.icon} />
        <Link src={data.linkedin} style={styles.contactText}>
          LinkedIn Profile
        </Link>
      </View>
    )}
  </View>
);

const SkillsSidebar = ({ data, styles }) => (
  <View style={styles.sidebarSection}>
    <Text style={styles.sidebarTitle}>Skills</Text>
    <View style={styles.skillsContainer}>
      {data.map((skill, i) => (
        <Text key={i} style={styles.skillBadge}>
          {skill.name}
        </Text>
      ))}
    </View>
  </View>
);

const LanguagesSidebar = ({ data, styles }) => (
  <View style={styles.sidebarSection}>
    <Text style={styles.sidebarTitle}>Language</Text>
    {data.map((lang, i) => (
      <Text key={i} style={styles.languageItem}>
        • {lang.language} ({lang.proficiency})
      </Text>
    ))}
  </View>
);

const ReferencesSidebar = ({ data, styles }) => (
  <View style={styles.sidebarSection}>
    <Text style={styles.sidebarTitle}>References</Text>
    {data.map((ref, i) => (
      <View key={i} style={styles.referenceBlock}>
        <Text style={styles.referenceName}>{ref.name}</Text>
        <Text style={styles.referenceDetails}>
          {ref.position} @ {ref.company}
          {"\n"}
          {ref.phone}
          {"\n"}
          {ref.email}
        </Text>
      </View>
    ))}
  </View>
);

// 2. Main Column Components
const AboutSection = ({ text, styles, theme }) => (
  <View style={styles.mainSection}>
    <View style={styles.sectionHeader}>
      <IconUser color={theme.colors.text} />
      <Text style={styles.sectionTitle}>About Me</Text>
    </View>
    <Text style={styles.aboutText}>{text}</Text>
  </View>
);

const ExperienceMain = ({ data, styles, theme }) => (
  <View style={styles.mainSection}>
    <View style={styles.sectionHeader}>
      <IconBriefcase color={theme.colors.text} />
      <Text style={styles.sectionTitle}>Experience</Text>
    </View>
    {data.map((job, i) => (
      <View key={i} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{job.role}</Text>
          <Text style={styles.entryDate}>
            {job.startDate} – {job.endDate}
          </Text>
        </View>
        <Text style={styles.entrySubtitle}>{job.company}</Text>
        <Text style={styles.entryDescription}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationMain = ({ data, styles, theme }) => (
  <View style={styles.mainSection}>
    <View style={styles.sectionHeader}>
      <IconGraduate color={theme.colors.text} />
      <Text style={styles.sectionTitle}>Education</Text>
    </View>
    {data.map((edu, i) => (
      <View key={i} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{edu.degree}</Text>
          <Text style={styles.entryDate}>{edu.date}</Text>
        </View>
        <Text style={styles.entrySubtitle}>{edu.school}</Text>
        <Text style={styles.entryDescription}>{edu.description}</Text>
      </View>
    ))}
  </View>
);

const ProjectsMain = ({ data, styles, theme }) => (
  <View style={styles.mainSection}>
    <View style={styles.sectionHeader}>
      <IconProject color={theme.colors.text} />
      <Text style={styles.sectionTitle}>Projects</Text>
    </View>
    {data.map((item, i) => (
      <View key={i} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{item.title}</Text>
          {item.technologies && (
            <Text style={styles.entryDate}>{item.technologies}</Text>
          )}
        </View>
        {item.link && <Text style={styles.entrySubtitle}>{item.link}</Text>}
        <Text style={styles.entryDescription}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const AchievementsMain = ({ data, styles, theme }) => (
  <View style={styles.mainSection}>
    <View style={styles.sectionHeader}>
      <IconTrophy color={theme.colors.text} />
      <Text style={styles.sectionTitle}>Achievements</Text>
    </View>
    {data.map((item, i) => (
      <View key={i} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{item.title}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
        </View>
        <Text style={styles.entryDescription}>{item.description}</Text>
      </View>
    ))}
  </View>
);

// --------------------------------------------------------------------------
// 🏁 MAIN TEMPLATE COMPONENT
// --------------------------------------------------------------------------

const ProfessionalTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo, themeColor = "blue" } = data; // 🟢 Get themeColor (Default 'blue')

  // 🎨 Select Theme (Default blue if invalid)
  const theme = THEMES[themeColor] || THEMES.blue;

  // ⚡ Memoize Styles (Re-calculate only if theme changes)
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Configuration for Two-Column Split
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
      
      {/* 🟦 FIXED BACKGROUND (Visible on ALL Pages) */}
      <View fixed style={styles.sidebarBackground} />

      {/* 🟢 LEFT COLUMN (Content - Absolute on Page 1) */}
      <View style={styles.leftColumn}>
        {/* Name & Role */}
        {personalInfo.photo && (
          <Image src={personalInfo.photo} style={styles.photo} />
        )}
        <Text style={styles.headerName}>{personalInfo.fullName}</Text>
        <Text style={styles.headerRole}>{personalInfo.role}</Text>

        {/* Contact Info */}
        <ContactSection data={personalInfo} styles={styles} theme={theme} />

        {/* Dynamic Sidebar Sections */}
        {activeSections.map((section) => {
          if (!SIDEBAR_SECTIONS.includes(section.id)) return null;

          switch (section.id) {
            case "skills":
              return (
                data.skills?.length > 0 && (
                  <SkillsSidebar key={section.id} data={data.skills} styles={styles} />
                )
              );
            case "languages":
              return (
                data.languages?.length > 0 && (
                  <LanguagesSidebar key={section.id} data={data.languages} styles={styles} />
                )
              );
            case "references":
              return (
                data.references?.length > 0 && (
                  <ReferencesSidebar key={section.id} data={data.references} styles={styles} />
                )
              );
            default:
              return null;
          }
        })}
      </View>

      {/* 🟢 RIGHT COLUMN (Main Content - Flows with Margin) */}
      <View style={styles.rightColumn}>
        {/* Summary (Always top of main) */}
        {personalInfo.summary && <AboutSection text={personalInfo.summary} styles={styles} theme={theme} />}

        {/* Dynamic Main Sections */}
        {activeSections.map((section) => {
          if (!MAIN_SECTIONS.includes(section.id)) return null;

          switch (section.id) {
            case "experience":
              return (
                data.experience?.length > 0 && (
                  <ExperienceMain key={section.id} data={data.experience} styles={styles} theme={theme} />
                )
              );
            case "education":
              return (
                data.education?.length > 0 && (
                  <EducationMain key={section.id} data={data.education} styles={styles} theme={theme} />
                )
              );
            case "projects":
              return (
                data.projects?.length > 0 && (
                  <ProjectsMain key={section.id} data={data.projects} styles={styles} theme={theme} />
                )
              );
            case "achievements":
              return (
                data.achievements?.length > 0 && (
                  <AchievementsMain key={section.id} data={data.achievements} styles={styles} theme={theme} />
                )
              );
            default:
              return null;
          }
        })}
      </View>
    </Page>
  );
};

export default ProfessionalTemplate;
