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
import { THEMES, ELEGANT_THEMES } from "../../../data/themes";

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

const IconGithub = ({ color }) => (
  <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 8 }}>
    <Path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --------------------------------------------------------------------------
// 🎨 DYNAMIC STYLES GENERATOR
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 🎨 CUSTOM DARK PALETTE (Overrides Global Themes for this Template)
// --------------------------------------------------------------------------


const createStyles = (themeColor) => {
  const theme = ELEGANT_THEMES[themeColor] || ELEGANT_THEMES.blue;
  const activeColor = theme.colors;

  return StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5,
      paddingTop: 35, // 🟢 Standardized Page Margins
      paddingBottom: 35,
      flexDirection: "row", // 🟢 Standard Flexbox Layout
    },

    // 🟢 Sidebar Background (Visual Only - Absolute)
    sidebarBackground: {
      position: "absolute",
      top: -35,
      left: 0,
      bottom: -35,
      width: "35%", 
      backgroundColor: activeColor.primary, 
    },

    // 🟢 Left Column (Content - Relative in Flex Row)
    leftColumn: {
      width: "35%", 
      paddingHorizontal: 20,
      paddingTop: 0, 
      color: "#ffffff",
    },

    // 🟢 Right Column (Content - Relative in Flex Row)
    rightColumn: {
      flex: 1, 
      paddingLeft: 30,
      paddingRight: 30,
    },

    // Header
    headerName: {
      fontSize: 30,
      fontWeight: "bold",
      color: activeColor.text, // 🟢 Dynamic Title Color
      marginBottom: 4,
      textAlign: "left",
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },

    headerRole: {
      fontSize: 10,
      color: activeColor.secondary, // 🟢 Dynamic Subtitle
      marginBottom: 15,
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
      marginBottom: 25,
      objectFit: "cover",
      alignSelf: "center",
    },

    // Sidebar: Headings
    sidebarTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: "#ffffff",
      textTransform: "uppercase",
      marginBottom: 8,
      marginTop: 10,
      letterSpacing: 2,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(197, 197, 197, 1)", // 🟢 Keeping User's Gray
      paddingBottom: 4,
    },

    // Sidebar: Items
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    contactText: {
      fontSize: 8.5,
      color: "#ffffff", // White text for contrast on dark bg
      flex: 1,
      lineHeight: 1.4,
    },

    // Sidebar: Reference Block
    referenceBlockSidebar: {
       marginBottom: 10,
       paddingBottom: 10,
    },
    referenceSeparator: {
       borderBottomWidth: 0.5,
       borderBottomColor: "#B8B9BA", // Solid Slate 700 (No opacity/green tint)
    },
    
    // Skills
    skillText: {
      fontSize: 9,
      color: "#ffffff",
      fontWeight: "medium",
    },

    // 🟢 Modern Glass Tags for Skills
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillTag: {
      backgroundColor: "rgba(255, 255, 255, 0.15)", // Slightly stronger bg
      borderRadius: 12, // Capsule shape
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 6,
      marginBottom: 6,
    },

    // 🟢 TIMELINE STYLES
    timelineContainer: {
      borderLeftWidth: 1.5,
      borderLeftColor: "#e2e8f0", // 🟢 Neutral Light Gray Line
      paddingLeft: 22,
      marginLeft: 4, 
      marginBottom: 10,
      position: "relative",
    },

    mainSectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: activeColor.text, // 🟢 Dynamic Section Title
      textTransform: "uppercase",
      letterSpacing: 2.5,
      marginBottom: 10,
      marginTop: 4,
      borderBottomWidth: 1.5,
      borderBottomColor: activeColor.text, // 🟢 Dynamic Border
      paddingBottom: 6,
      width: "100%",
    },

    // Entry Styles
    entryBlock: {
      marginBottom: 12,
      position: "relative",
      minHeight: 20, // Ensure it has height
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
      borderColor: activeColor.primary, 
      zIndex: 10,
    },
    
    // ... items ...
    
    entryDate: {
      fontSize: 9.5,
      color: activeColor.primary, 
      fontWeight: "bold", 
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: 11.5,
      fontWeight: "extraBold", 
      color: activeColor.text, // 🟢 Dynamic Entry Title
      marginBottom: 1,
    },
    entrySubtitle: {
      fontSize: 9.5,
      color: "#475569", // Slate 600
      fontWeight: "medium",
      marginBottom: 2,
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
      gap: 10,
    },
    referenceItemMain: {
      width: "48%", 
      marginBottom: 10,
    }
  });
};

const formatUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
};

// --------------------------------------------------------------------------
// 🧩 RENDER HELPERS
// --------------------------------------------------------------------------

// Sidebar
const ContactSection = ({ data, styles, theme }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={styles.sidebarTitle}>Contact</Text>
    {data.phone && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconPhone color={"#ffffff"} /></View>
        <Text style={styles.contactText}>{data.phone}</Text>
      </View>
    )}
    {data.email && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconMail color={"#ffffff"} /></View>
        <Text style={styles.contactText}>{data.email}</Text>
      </View>
    )}
    {data.address && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconPin color={"#ffffff"} /></View>
        <Text style={styles.contactText}>{data.address}</Text>
      </View>
    )}
    {data.linkedin && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconLinkedin color={"#ffffff"} /></View>
        <Link src={data.linkedin} style={styles.contactText}>
          {formatUrl(data.linkedin)}
        </Link>
      </View>
    )}
    {data.github && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconGithub color={"#ffffff"} /></View>
        <Link src={data.github} style={styles.contactText}>
          {formatUrl(data.github)}
        </Link>
      </View>
    )}
    {data.website && (
      <View style={styles.contactItem}>
        <View style={{ width: 20 }}><IconGlobe color={"#ffffff"} /></View>
        <Link src={data.website} style={styles.contactText}>
          {formatUrl(data.website)}
        </Link>
      </View>
    )}
  </View>
);

const SkillsSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={styles.sidebarTitle}>Skills</Text>
    <View style={styles.skillsContainer}>
      {data.map((skill, i) => (
        <View key={i} style={styles.skillTag}>
          <Text style={styles.skillText}>{skill.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const ToolsSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={styles.sidebarTitle}>Tools</Text>
    <View style={styles.skillsContainer}>
      {data.map((tool, i) => (
        <View key={i} style={styles.skillTag}>
          <Text style={styles.skillText}>{tool.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const LanguagesSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
      <Text style={styles.sidebarTitle}>Languages</Text>
      {data[0] && (
        <View style={{ marginBottom: 4 }}>
          <Text style={styles.skillText}>
            {data[0].language} ({data[0].proficiency})
          </Text>
        </View>
      )}
    </View>
    {data.slice(1).map((lang, i) => (
      <View key={i} style={{ marginBottom: 4 }}>
        <Text style={styles.skillText}>
          {lang.language} ({lang.proficiency})
        </Text>
      </View>
    ))}
  </View>
);

const ReferencesSidebar = ({ data, styles }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
      <Text style={styles.sidebarTitle}>References</Text>
      {data[0] && (
        <View style={[styles.referenceBlockSidebar, data.length > 1 && styles.referenceSeparator]}>
          <Text style={{ ...styles.skillText, fontWeight: 'bold', color: '#fff' }}>{data[0].name}</Text>
          <Text style={{ ...styles.skillText, fontSize: 8.5, fontStyle: 'italic' }}>{data[0].position}</Text>
          <Text style={{ ...styles.skillText, fontSize: 8.5 }}>{data[0].company}</Text>
          <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{data[0].phone}</Text>
          <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{data[0].email}</Text>
        </View>
      )}
    </View>
    {data.slice(1).map((ref, i) => (
      <View 
        key={i} 
        style={[
          styles.referenceBlockSidebar,
          i < data.slice(1).length - 1 && styles.referenceSeparator 
        ]}
      >
        <Text style={{ ...styles.skillText, fontWeight: 'bold', color: '#fff' }}>{ref.name}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, fontStyle: 'italic' }}>{ref.position}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5 }}>{ref.company}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{ref.phone}</Text>
        <Text style={{ ...styles.skillText, fontSize: 8.5, opacity: 0.7 }}>{ref.email}</Text>
      </View>
    ))}
  </View>
);



const PersonalDetails = ({ data, styles, theme }) => (
  <View style={{ marginBottom: 20, marginTop: 15 }} wrap={false}>
    <Text style={styles.sidebarTitle}>Personal Details</Text>
    {data.dob && (
       <View style={{ marginBottom: 6 }}>
         <Text style={{ fontSize: 9, color: "#ffffff", opacity: 0.9, lineHeight: 1.5 }}>DOB: {data.dob}</Text>
       </View>
    )}
    {data.gender && (
       <View style={{ marginBottom: 6 }}>
         <Text style={{ fontSize: 9, color: "#ffffff", opacity: 0.9, lineHeight: 1.5 }}>Gender: {data.gender}</Text>
       </View>
    )}
    {data.nationality && (
       <View style={{ marginBottom: 6 }}>
         <Text style={{ fontSize: 9, color: "#ffffff", opacity: 0.9, lineHeight: 1.5 }}>Nationality: {data.nationality}</Text>
       </View>
    )}
    {data.maritalStatus && (
       <View style={{ marginBottom: 6 }}>
         <Text style={{ fontSize: 9, color: "#ffffff", opacity: 0.9, lineHeight: 1.5 }}>Status: {data.maritalStatus}</Text>
       </View>
    )}
    {data.idNumber && (
       <View style={{ marginBottom: 6 }}>
         <Text style={{ fontSize: 9, color: "#ffffff", opacity: 0.9, lineHeight: 1.5 }}>ID: {data.idNumber}</Text>
       </View>
    )}
  </View>
);

const ExtracurricularSection = ({ data, styles, theme }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
       <Text style={styles.mainSectionTitle}>Extracurricular</Text>
       {data[0] && (
         <View style={[styles.timelineContainer, { marginBottom: 0 }]}>
            <View style={styles.entryBlock}>
              <View style={styles.timelineDot} />
              <Text style={styles.entryTitle}>{data[0].title}</Text>
              <Text style={styles.entryDate}>{data[0].date}</Text>
              <Text style={styles.entrySubtitle}>{data[0].organization}</Text>
              <Text style={styles.description}>{data[0].description}</Text>
            </View>
         </View>
       )}
    </View>
    <View style={styles.timelineContainer}>
      {data.slice(1).map((item, index) => (
        <View key={index} style={styles.entryBlock} wrap={false}>
          <View style={styles.timelineDot} />
           <Text style={styles.entryTitle}>{item.title}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
          <Text style={styles.entrySubtitle}>{item.organization}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </View>
  </View>
);
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
// Grid References for Main Area
// Grid References for Main Area
const ReferencesGrid = ({ data, styles }) => (
  <View>
    <View wrap={false}>
       <Text style={styles.mainSectionTitle}>References</Text>
       {data[0] && (
          <View style={styles.referencesGrid}>
            <View style={styles.referenceItemMain}>
              <Text style={{ ...styles.entryTitle, fontSize: 10.5 }}>{data[0].name}</Text>
              <Text style={{ ...styles.entrySubtitle, marginBottom: 2, fontSize: 9 }}>{data[0].position} / {data[0].company}</Text>
              <Text style={{ ...styles.description, fontSize: 8.5 }}>{data[0].phone}</Text>
              <Text style={{ ...styles.description, fontSize: 8.5 }}>{data[0].email}</Text>
            </View>
          </View>
       )}
    </View>
    <View style={styles.referencesGrid}>
      {data.slice(1).map((ref, i) => (
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

const CertificatesSection = ({ certificates, styles, theme }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
      <Text style={styles.mainSectionTitle}>Certificates</Text>
      {certificates[0] && (
        <View style={[styles.timelineContainer, { marginBottom: 0 }]}>
           <View style={styles.entryBlock}>
              <View style={styles.timelineDot} />
              <Text style={styles.entryTitle}>{certificates[0].name}</Text>
              <Text style={styles.entryDate}>{certificates[0].date}</Text>
              <Text style={styles.entrySubtitle}>{certificates[0].issuer}</Text>
              {certificates[0].link && (
                <Link
                  src={certificates[0].link}
                  style={{ ...styles.entrySubtitle, color: theme.colors.primary, textDecoration: "none", marginTop: 2 }}
                >
                  {certificates[0].link.replace(/^https?:\/\//, "")}
                </Link>
              )}
           </View>
        </View>
      )}
    </View>
    <View style={styles.timelineContainer}>
      {certificates.slice(1).map((item, index) => (
        <View key={index} style={styles.entryBlock} wrap={false}>
          <View style={styles.timelineDot} />
          <Text style={styles.entryTitle}>{item.name}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
          <Text style={styles.entrySubtitle}>{item.issuer}</Text>
          {item.link && (
            <Link
              src={item.link}
              style={{ ...styles.entrySubtitle, color: theme.colors.primary, textDecoration: "none", marginTop: 2 }}
            >
              {item.link.replace(/^https?:\/\//, "")}
            </Link>
          )}
        </View>
      ))}
    </View>
  </View>
);

const ProjectsSection = ({ projects, styles, theme }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
      <Text style={styles.mainSectionTitle}>Projects</Text>
      {projects[0] && (
        <View style={[styles.timelineContainer, { marginBottom: 0 }]}>
           <View style={styles.entryBlock}>
              <View style={styles.timelineDot} />
              <View style={styles.entryHeader}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
                  <Text style={styles.entryTitle}>
                    {projects[0].title}
                    {projects[0].isCurrent && (
                      <Text
                        style={{
                          color: theme.colors.primary,
                          fontSize: 10,
                          fontWeight: "normal",
                        }}
                      >
                         {"  "}● Ongoing
                      </Text>
                    )}
                  </Text>
                </View>
                {projects[0].technologies && (
                  <Text style={styles.entryDate}>{projects[0].technologies}</Text>
                )}
              </View>
              {projects[0].link && (
                <Link
                  src={projects[0].link}
                  style={{ ...styles.entrySubtitle, color: theme.colors.secondary, textDecoration: "none", marginTop: 2 }}
                >
                  {projects[0].link.replace(/^https?:\/\//, "")}
                </Link>
              )}
              <Text style={styles.description}>{projects[0].description}</Text>
           </View>
        </View>
      )}
    </View>
    <View style={styles.timelineContainer}>
      {projects.slice(1).map((item, index) => (
        <View key={index} style={styles.entryBlock} wrap={false}>
          <View style={styles.timelineDot} />
          <View style={styles.entryHeader}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
              <Text style={styles.entryTitle}>
                {item.title}
                {item.isCurrent && (
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: 10,
                      fontWeight: "normal",
                    }}
                  >
                     {"  "}● Ongoing
                  </Text>
                )}
              </Text>
            </View>
            {item.technologies && (
              <Text style={styles.entryDate}>{item.technologies}</Text>
            )}
          </View>
          {item.link && (
            <Link
              src={item.link}
              style={{ ...styles.entrySubtitle, color: theme.colors.secondary, textDecoration: "none", marginTop: 2 }}
            >
              {item.link.replace(/^https?:\/\//, "")}
            </Link>
          )}
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </View>
  </View>
);

const AwardsSection = ({ awards, styles, theme }) => (
  <View style={{ marginBottom: 20 }}>
    <View wrap={false}>
      <Text style={styles.mainSectionTitle}>Awards</Text>
      {awards[0] && (
        <View style={[styles.timelineContainer, { marginBottom: 0 }]}>
          <View style={styles.entryBlock}>
            <View style={styles.timelineDot} />
             <Text style={styles.entryTitle}>{awards[0].title}</Text>
            <Text style={styles.entryDate}>{awards[0].date}</Text>
            <Text style={styles.entrySubtitle}>{awards[0].awarder}</Text>
            <Text style={styles.description}>{awards[0].summary}</Text>
          </View>
        </View>
      )}
    </View>
    <View style={styles.timelineContainer}>
      {awards.slice(1).map((item, index) => (
        <View key={index} style={styles.entryBlock} wrap={false}>
          <View style={styles.timelineDot} />
           <Text style={styles.entryTitle}>{item.title}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
          <Text style={styles.entrySubtitle}>{item.awarder}</Text>
          <Text style={styles.description}>{item.summary}</Text>
        </View>
      ))}
    </View>
  </View>
);

const TimelineSection = ({ title, data, type, styles, theme }) => {
  if (!data || data.length === 0) return null;
  
  const renderItem = (item, i) => {
    const titleText =
      type === "edu" ? item.degree : type === "exp" ? item.role : item.title;
    const subtitleText =
      type === "edu" ? item.school : type === "exp" ? item.company : "";
    const dateText =
      type === "edu"
        ? item.startDate && item.endDate
          ? `${item.startDate} - ${item.isCurrent ? "Present" : item.endDate}`
          : item.date
        : type === "exp"
        ? `${item.startDate} - ${item.isCurrent ? "Present" : item.endDate}`
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
  };

  return (
    <View>
      <View wrap={false}>
         <Text style={styles.mainSectionTitle}>{title}</Text>
         {data[0] && (
            <View style={[styles.timelineContainer, { marginBottom: 0 }]}>
               {renderItem(data[0], 0)}
            </View>
         )}
      </View>
      <View style={styles.timelineContainer}>
        {data.slice(1).map((item, i) => renderItem(item, i))}
      </View>
    </View>
  );
};

// --------------------------------------------------------------------------
// 🏁 MAIN COMPONENT
// --------------------------------------------------------------------------

const ElegantTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo, themeColor = "blue" } = data;
  const theme = THEMES[themeColor] || THEMES.blue; // Keep for non-color styling if needed
  const styles = useMemo(() => createStyles(themeColor), [themeColor]);

  const SIDEBAR_SECTIONS = ["skills", "tools", "languages", "references"];
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

        {/* 🟢 Personal Details (Bio) - Added */}
        <PersonalDetails data={personalInfo} styles={styles} theme={theme} />

        {activeSections.map((section) => {
          if (!SIDEBAR_SECTIONS.includes(section.id)) return null;
          
          switch (section.id) {
            case "skills":
              return data.skills?.length > 0 && (
                <SkillsSidebar key={section.id} data={data.skills} styles={styles} />
              );
            case "tools":
              return data.tools?.length > 0 && (
                <ToolsSidebar key={section.id} data={data.tools} styles={styles} />
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
        <View style={{ marginBottom: 20, alignItems: "flex-start" }}> 
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
            case "certificates":
              return data.certificates?.length > 0 && (
                <CertificatesSection key={section.id} certificates={data.certificates} styles={styles} theme={theme} />
              );
            case "awards":
              return data.awards?.length > 0 && (
                <AwardsSection key={section.id} awards={data.awards} styles={styles} theme={theme} />
              );
            case "extracurricular":
              return data.extracurricular?.length > 0 && (
                 <ExtracurricularSection key={section.id} data={data.extracurricular} styles={styles} theme={theme} />
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
