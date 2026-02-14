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
  Circle,
} from "@react-pdf/renderer";
import { THEMES, CREATIVE_THEMES } from "../../../data/themes";

// --------------------------------------------------------------------------
// 🛠️ ICONS
// --------------------------------------------------------------------------

const IconMail = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconActivity = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path d="M3.5 21 14 3" stroke={color || "#374151"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20.5 21 10 3" stroke={color || "#374151"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.5 21 12 15l-3.5 6" stroke={color || "#374151"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 21h20" stroke={color || "#374151"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconPhone = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1 2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconLinkedin = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke={color || "#2563eb"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke={color || "#2563eb"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke={color || "#2563eb"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGithub = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconMapPin = ({ color, style }) => (
  <Svg width={11} height={11} viewBox="0 0 24 24" style={style}>
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke={color || "#374151"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUser = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconExperience = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M12 12h.01" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 13a18.15 18.15 0 0 1-20 0" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconEducation = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 10v6" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconSkills = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 18h6" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 22h4" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconGlobe = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M2 12h20" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
  </Svg>
);

const IconProject = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path
      d="M18 19a5 5 0 0 1-5-5v8"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="13"
      cy="12"
      r="2"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="20"
      cy="19"
      r="2"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconTrophy = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M4 22h16" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
    <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" />
  </Svg>
);

const IconCode = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconUsers = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 3.128a4 4 0 0 1 0 7.744" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z" stroke={color || "#1f2937"} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconCert = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconTools = ({ color, style }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" style={style}>
    <Path
      d="M14 17H5"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 7h-9"
      stroke={color || "#1f2937"}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
       cx="17"
       cy="17"
       r="3"
       stroke={color || "#1f2937"}
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     <Circle
       cx="7"
       cy="7"
       r="3"
       stroke={color || "#1f2937"}
       strokeWidth={2}
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
  </Svg>
);

// --------------------------------------------------------------------------
// 🎨 STYLES
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 🎨 STYLES
// --------------------------------------------------------------------------

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      fontFamily: "Helvetica",
      fontSize: 9,
      lineHeight: 1.5,
      paddingTop: 35,
      paddingBottom: 35,
      paddingLeft: 0,
      paddingRight: 0,
      flexDirection: "row", // 🟢 Switch to Flex Layout
    },
    
    // Sidebar background - fixed position (Kept absolute for bleed)
    sidebarBackground: {
      position: "absolute",
      top: -35, // 🟢 Offset padding
      left: 0,
      bottom: -35, // 🟢 Offset padding
      width: "35%",
      backgroundColor: theme.colors.sidebarBg,
    },

    // Left sidebar column (Flows naturally now)
    leftColumn: {
      width: "35%",
      paddingTop: 0, // 🟢 Removed padding to align Photo with Name
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    // Right main content column (Flows naturally now)
    rightColumn: {
      flex: 1, // 🟢 Take remaining space
      paddingLeft: 28,
      paddingRight: 28,
      paddingTop: 0, 
      paddingBottom: 0, 
    },

    // Profile photo container and styling
    photoContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 16,
    },
    photo: {
      width: 115,
      height: 115,
      borderRadius: 58,
      objectFit: "cover",
      borderWidth: 3,
      borderColor: "#e2e8f0",
      borderStyle: "solid",
    },

    // Name and role in header
    name: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.colors.text,
      textTransform: "uppercase",
      letterSpacing: 1.8,
      marginBottom: 6,
      lineHeight: 1.2,
    },
    role: {
      fontSize: 13,
      color: theme.colors.icon,
      letterSpacing: 0.8,
      marginBottom: 18,
      fontWeight: "medium",
    },

    // Contact section in sidebar
    contactSection: {
      marginBottom: 18,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.text, 
    },
    contactText: {
        fontSize: 8.5,
        color: theme.colors.icon,
        lineHeight: 1.4,
        marginLeft: 6,
        flex: 1, // 🟢 Allow wrapping text to take space
    },

    // Section titles
    // Section titles
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 12,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.text,
      marginTop: 6,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      flexDirection: "row",
      alignItems: "center",
    },
    
    sidebarSectionTitle: {
      fontSize: 11,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 10,
      paddingBottom: 4,
      borderBottomWidth: 1.5,
      borderBottomColor: theme.colors.text,
      marginTop: 18,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      flexDirection: "row",
      alignItems: "center",
    },

    // Body text
    bodyText: {
      fontSize: 9,
      color: theme.colors.icon,
      textAlign: "justify",
      marginBottom: 6,
      lineHeight: 1.6,
    },

    // Entry blocks (Experience, Education, Projects)
    entryBlock: {
      marginBottom: 12,
    },
    entryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 2,
    },
    entryTitle: {
      fontSize: 11,
      fontWeight: "bold",
      color: theme.colors.text,
      flex: 1,
      lineHeight: 1.3,
      marginRight: 10,
    },
    entryDate: {
      fontSize: 9,
      fontWeight: "bold",
      color: theme.colors.icon,
      textAlign: "right",
      flexShrink: 0,
      minWidth: 90,
    },
    entrySubtitle: {
      fontSize: 10,
      fontWeight: "medium",
      color: theme.colors.icon,
      marginBottom: 4,
      fontStyle: "italic",
    },
    
    // Rewards/Achievements
    rewardBlock: {
      marginBottom: 8,
    },
    rewardDate: {
      fontSize: 8,
      marginBottom: 1,
      color: theme.colors.icon,
      fontStyle: "italic",
    },
    rewardTitle: {
      fontWeight: "bold",
      fontSize: 9.5,
      color: theme.colors.text,
      marginBottom: 1,
    },
    rewardIssuer: {
      fontSize: 8.5,
      color: theme.colors.icon,
    },

    // Skills - Modern Badges (Ported from Professional)
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
      alignItems: "center", // 🟢 Fix centering
      justifyContent: "center", // 🟢 Fix centering
    },
    skillText: {
      color: theme.colors.text,
      fontSize: 9,
      fontWeight: "bold",
    },

    // Languages
    languageItem: {
      marginBottom: 5,
      paddingBottom: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.text,
    },
    languageText: {
      fontSize: 9,
      color: theme.colors.icon,
      lineHeight: 1.4,
    },
    
    // References
    referenceItem: {
        marginBottom: 10
    },
    referenceName: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    referencePosition: {
        fontSize: 9,
        color: theme.colors.icon,
        fontStyle: 'italic',
        marginBottom: 2
    },
    referenceContact: {
        fontSize: 8.5,
        color: theme.colors.icon
    }
  });

// --------------------------------------------------------------------------
// 🧩 COMPONENT SECTIONS
// --------------------------------------------------------------------------

const ContactSection = ({ data, styles, theme }) => (
  <View style={styles.contactSection}>
    <View style={styles.sidebarSectionTitle} wrap={false}>
        <IconUser color={theme.colors.text} />
        <Text style={{ marginLeft: 7 }}>Contact</Text>
    </View>
    {data.phone && (
      <View style={styles.contactItem} wrap={false}>
        <IconPhone color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.phone}</Text>
      </View>
    )}
    {data.email && (
      <View style={styles.contactItem} wrap={false}>
        <IconMail color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.email}</Text>
      </View>
    )}
    {data.address && (
      <View style={styles.contactItem} wrap={false}>
        <IconMapPin color={theme.colors.icon} />
        <Text style={styles.contactText}>{data.address}</Text>
      </View>
    )}
    {data.linkedin && (
      <View style={styles.contactItem} wrap={false}>
        <IconLinkedin color={theme.colors.icon} />
        <Link src={data.linkedin} style={{...styles.contactText, textDecoration:'none', color: theme.colors.icon }}>
          {data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
        </Link>
      </View>
    )}
    {data.github && (
      <View style={styles.contactItem} wrap={false}>
        <IconGithub color={theme.colors.icon} />
        <Link src={data.github} style={{...styles.contactText, textDecoration:'none', color: theme.colors.icon }}>
          {data.github.replace(/^https?:\/\/(www\.)?/, '')}
        </Link>
      </View>
    )}
    {data.website && (
      <View style={styles.contactItem} wrap={false}>
        <IconGlobe color={theme.colors.icon} />
        <Link src={data.website} style={{...styles.contactText, textDecoration:'none', color: theme.colors.icon }}>
          {data.website.replace(/^https?:\/\//, '')}
        </Link>
      </View>
    )}

    {/* Bio Details - Regional Requirement (Robust Layout) */}
    {(data.dob || data.gender || data.nationality || data.maritalStatus || data.idNumber) && (
      <View style={{ marginTop: 10 }} wrap={false}> {/* 🟢 Reduced margin from 15 */}
        <View style={styles.sidebarSectionTitle}>
            <IconUser color={theme.colors.text} />
            <Text style={{ marginLeft: 7 }}>Personal Details</Text>
        </View>
        <View>
          {data.dob && (
            <View style={{ marginBottom: 4 }}>
               <Text style={{ fontSize: 8.5, color: theme.colors.icon }}>DOB: {data.dob}</Text>
            </View>
          )}
          {data.gender && (
            <View style={{ marginBottom: 4 }}>
               <Text style={{ fontSize: 8.5, color: theme.colors.icon }}>Gender: {data.gender}</Text>
            </View>
          )}
          {data.nationality && (
            <View style={{ marginBottom: 4 }}>
               <Text style={{ fontSize: 8.5, color: theme.colors.icon }}>Nationality: {data.nationality}</Text>
            </View>
          )}
          {data.maritalStatus && (
            <View style={{ marginBottom: 4 }}>
               <Text style={{ fontSize: 8.5, color: theme.colors.icon }}>Status: {data.maritalStatus}</Text>
            </View>
          )}
          {data.idNumber && (
            <View style={{ marginBottom: 4 }}>
               <Text style={{ fontSize: 8.5, color: theme.colors.icon }}>ID: {data.idNumber}</Text>
            </View>
          )}
        </View>
      </View>
    )}
  </View>
);

const AboutSection = ({ summary, styles, theme }) => (
    <View style={{ marginBottom: 18 }}>
        <View style={styles.sidebarSectionTitle}>
            <IconUser color={theme.colors.text} />
            <Text style={{ marginLeft: 7 }}>About Me</Text>
        </View>
        <Text style={styles.bodyText}>{summary}</Text>
    </View>
);

const SkillsSection = ({ skills, styles, theme }) => (
  // 🟢 Fixed Layout: Reverted complicated sticky header for badges.
  // Using wrap={false} for the block is safer for grid items.
  <View style={{ marginBottom: 14 }} wrap={false}>
    <View style={styles.sidebarSectionTitle}>
      <IconSkills color={theme.colors.text} />
      <Text style={{ marginLeft: 7 }}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {skills.map((skill, index) => (
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skillText}>{skill.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const LanguagesSection = ({ languages, styles, theme }) => (
  <View style={{ marginBottom: 14 }}>
    <View wrap={false}>
       <View style={styles.sidebarSectionTitle}>
         <IconGlobe color={theme.colors.text} />
         <Text style={{ marginLeft: 7 }}>Languages</Text>
       </View>
       {languages[0] && (
         <View style={styles.languageItem}>
            <Text style={styles.languageText}>
              {languages[0].language}{languages[0].proficiency ? ` (${languages[0].proficiency})` : ""}
            </Text>
         </View>
       )}
    </View>
    {languages.slice(1).map((lang, index) => (
      <View key={index} style={styles.languageItem} wrap={false}>
        <Text style={styles.languageText}>
          {lang.language}{lang.proficiency ? ` (${lang.proficiency})` : ""}
        </Text>
      </View>
    ))}
  </View>
);

const AchievementsSection = ({ achievements, styles, theme }) => (
  <View style={{ marginBottom: 14 }}>
    <View wrap={false}>
       <View style={styles.sidebarSectionTitle}>
         <IconTrophy color={theme.colors.text} />
         <Text style={{ marginLeft: 7 }}>Awards</Text>
       </View>
       {achievements[0] && (
        <View style={styles.rewardBlock}>
          {achievements[0].date && <Text style={styles.rewardDate}>{achievements[0].date}</Text>}
          <Text style={styles.rewardTitle}>{achievements[0].title}</Text>
          {achievements[0].issuer && <Text style={styles.rewardIssuer}>{achievements[0].issuer}</Text>}
        </View>
       )}
    </View>
    {achievements.slice(1).map((item, index) => (
      <View key={index} style={styles.rewardBlock} wrap={false}>
        {item.date && <Text style={styles.rewardDate}>{item.date}</Text>}
        <Text style={styles.rewardTitle}>{item.title}</Text>
        {item.issuer && <Text style={styles.rewardIssuer}>{item.issuer}</Text>}
      </View>
    ))}
  </View>
);



const ToolsSection = ({ tools, styles, theme }) => (
  <View style={{ marginBottom: 14 }} wrap={false}>
    <View style={styles.sidebarSectionTitle}>
       <IconTools color={theme.colors.text} />
       <Text style={{ marginLeft: 7 }}>Tools</Text>
    </View>
    <View style={styles.skillsContainer}>
      {tools.map((tool, index) => (
        <View key={index} style={styles.skillBadge}>
           <Text style={styles.skillText}>{tool.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const ExperienceSection = ({ experience, styles, theme }) => (
  <View>
    <View wrap={false}>
       <View style={styles.sectionTitle}>
         <IconExperience color={theme.colors.text} />
         <Text style={{ marginLeft: 8 }}>Experience</Text>
       </View>
       {experience[0] && (
          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{experience[0].role}</Text>
              <Text style={styles.entryDate}>
                {experience[0].startDate} – {experience[0].isCurrent ? "Present" : experience[0].endDate}
              </Text>
            </View>
            <Text style={styles.entrySubtitle}>{experience[0].company}</Text>
            {experience[0].description && <Text style={styles.bodyText}>{experience[0].description}</Text>}
          </View>
       )}
    </View>
    {experience.slice(1).map((job, index) => (
      <View key={index} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{job.role}</Text>
          <Text style={styles.entryDate}>
            {job.startDate} – {job.isCurrent ? "Present" : job.endDate}
          </Text>
        </View>
        <Text style={styles.entrySubtitle}>{job.company}</Text>
        {job.description && <Text style={styles.bodyText}>{job.description}</Text>}
      </View>
    ))}
  </View>
);

const EducationSection = ({ education, styles, theme }) => (
  <View>
    <View wrap={false}>
       <View style={styles.sectionTitle}>
         <IconEducation color={theme.colors.text} />
         <Text style={{ marginLeft: 8 }}>Education</Text>
       </View>
       {education[0] && (
          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{education[0].degree}</Text>
              <Text style={styles.entryDate}>
                {education[0].startDate && education[0].endDate
                  ? `${education[0].startDate} – ${
                      education[0].isCurrent ? "Present" : education[0].endDate
                    }`
                  : education[0].date}
              </Text>
            </View>
            <Text style={styles.entrySubtitle}>{education[0].school}</Text>
            {education[0].description && <Text style={styles.bodyText}>{education[0].description}</Text>}
          </View>
       )}
    </View>
    {education.slice(1).map((edu, index) => (
      <View key={index} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{edu.degree}</Text>
          <Text style={styles.entryDate}>
            {edu.startDate && edu.endDate
              ? `${edu.startDate} – ${
                  edu.isCurrent ? "Present" : edu.endDate
                }`
              : edu.date}
          </Text>
        </View>
        <Text style={styles.entrySubtitle}>{edu.school}</Text>
        {edu.description && <Text style={styles.bodyText}>{edu.description}</Text>}
      </View>
    ))}
  </View>
);

const ProjectsSection = ({ projects, styles, theme }) => (
  <View>
    <View wrap={false}>
        <View style={styles.sectionTitle}>
          <IconProject color={theme.colors.text} />
          <Text style={{ marginLeft: 8 }}>Projects</Text>
        </View>
        {projects[0] && (
           <View style={styles.entryBlock}>
              <View style={styles.entryHeader}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
                  <Text style={styles.entryTitle}>
                    {projects[0].title}
                    {projects[0].isCurrent && (
                      <Text style={{ color: theme.colors.accents, fontSize: 10, fontWeight: "bold" }}>
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
               <Text style={{ ...styles.entrySubtitle, color: theme.colors.text, marginBottom: 4 }}>
                 {projects[0].link}
               </Text>
             )}
             {projects[0].description && <Text style={styles.bodyText}>{projects[0].description}</Text>}
           </View>
        )}
    </View>
    {projects.slice(1).map((item, index) => (
      <View key={index} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginRight: 8 }}>
            <Text style={styles.entryTitle}>
              {item.title}
              {item.isCurrent && (
                <Text style={{ color: theme.colors.accents, fontSize: 10, fontWeight: "bold" }}>
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
          <Text style={{ ...styles.entrySubtitle, color: theme.colors.text, marginBottom: 4 }}>
            {item.link}
          </Text>
        )}
        {item.description && <Text style={styles.bodyText}>{item.description}</Text>}
      </View>
    ))}
  </View>
);

const CertificatesSection = ({ certificates, styles, theme }) => (
  <View>
    <View wrap={false}>
       <View style={styles.sectionTitle}>
         <IconCert color={theme.colors.text} />
         <Text style={{ marginLeft: 8 }}>Certificates</Text>
       </View>
       {certificates[0] && (
          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
               <Text style={styles.entryTitle}>{certificates[0].name}</Text>
               <Text style={styles.entryDate}>{certificates[0].date}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{certificates[0].issuer}</Text>
            {certificates[0].link && (
              <Link src={certificates[0].link} style={{ ...styles.entrySubtitle, color: theme.colors.text, textDecoration: "none", marginTop: 2 }}>
                {certificates[0].link.replace(/^https?:\/\//, "")}
              </Link>
            )}
          </View>
       )}
    </View>
    {certificates.slice(1).map((item, index) => (
      <View key={index} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{item.name}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
        </View>
        <Text style={styles.entrySubtitle}>{item.issuer}</Text>
        {item.link && (
          <Link src={item.link} style={{ ...styles.entrySubtitle, color: theme.colors.text, textDecoration: "none", marginTop: 2 }}>
            {item.link.replace(/^https?:\/\//, "")}
          </Link>
        )}
      </View>
    ))}
  </View>
);

const ExtracurricularSection = ({ extracurricular, styles, theme }) => (
  <View>
    <View wrap={false}>
       <View style={styles.sectionTitle}>
         <IconActivity color={theme.colors.text} />
         <Text style={{ marginLeft: 8 }}>Extracurricular</Text>
       </View>
       {extracurricular[0] && (
          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{extracurricular[0].role}</Text>
              <Text style={styles.entryDate}>{extracurricular[0].date}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{extracurricular[0].organization}</Text>
            {extracurricular[0].description && <Text style={styles.bodyText}>{extracurricular[0].description}</Text>}
          </View>
       )}
    </View>
    {extracurricular.slice(1).map((item, index) => (
      <View key={index} style={styles.entryBlock} wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{item.role}</Text>
          <Text style={styles.entryDate}>{item.date}</Text>
        </View>
        <Text style={styles.entrySubtitle}>{item.organization}</Text>
        {item.description && <Text style={styles.bodyText}>{item.description}</Text>}
      </View>
    ))}
  </View>
);

const ReferencesSection = ({ references, styles, theme }) => (
  <View style={{ marginTop: 14 }}>
    <View style={{ flexDirection: "column" }}>
      <View wrap={false}>
         <View style={styles.sectionTitle}>
           <IconUsers color={theme.colors.text} />
           <Text style={{ marginLeft: 8 }}>References</Text>
         </View>
         {references[0] && (
            <View style={styles.referenceItem}>
              <Text style={styles.referenceName}>{references[0].name}</Text>
              <Text style={styles.referencePosition}>
                {references[0].position} @ {references[0].company}
              </Text>
              {references[0].phone && (
                <Text style={styles.referenceContact}>{references[0].phone}</Text>
              )}
              {references[0].email && (
                <Text style={styles.referenceContact}>{references[0].email}</Text>
              )}
            </View>
         )}
      </View>
      {references.slice(1).map((ref, index) => (
        <View key={index} style={styles.referenceItem} wrap={false}>
          <Text style={styles.referenceName}>{ref.name}</Text>
          <Text style={styles.referencePosition}>
            {ref.position} @ {ref.company}
          </Text>
          {ref.phone && (
            <Text style={styles.referenceContact}>{ref.phone}</Text>
          )}
          {ref.email && (
            <Text style={styles.referenceContact}>{ref.email}</Text>
          )}
        </View>
      ))}
    </View>
  </View>
);

// --------------------------------------------------------------------------
// 🏁 MAIN COMPONENT
// --------------------------------------------------------------------------

const CreativeTemplate = ({ data, activeSections = [] }) => {
  const { personalInfo, themeColor = "blue" } = data;
  const theme = CREATIVE_THEMES[themeColor] || CREATIVE_THEMES.blue;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Sections that belong in the Left Sidebar
  const SIDEBAR_IDS = ["skills", "achievements", "languages"];

  return (
    <Page size="A4" style={styles.page}>
      {/* Sidebar background - fixed */}
      <View fixed style={styles.sidebarBackground} />

      {/* LEFT SIDEBAR */}
      <View style={styles.leftColumn}>
        {/* Profile Photo */}
        {personalInfo.photo && (
          <View style={styles.photoContainer}>
            <Image src={personalInfo.photo} style={styles.photo} />
          </View>
        )}

        {/* About Me */}
        {personalInfo.summary && (
          <AboutSection summary={personalInfo.summary} styles={styles} theme={theme} />
        )}

        {/* Contact Info (Fixed Name) */}
        <ContactSection data={personalInfo} styles={styles} theme={theme} />

        {/* Sidebar Dynamic Sections */}
        {activeSections.map((section) => {
          if (!SIDEBAR_IDS.includes(section.id)) return null;
          
          if (section.id === "skills" && data.skills?.length > 0) {
            return <SkillsSection key="skills" skills={data.skills} styles={styles} theme={theme} />;
          }
          if (section.id === "tools" && data.tools?.length > 0) {
            return <ToolsSection key="tools" tools={data.tools} styles={styles} theme={theme} />;
          }
          if (section.id === "achievements" && data.achievements?.length > 0) {
            return <AchievementsSection key="achievements" achievements={data.achievements} styles={styles} theme={theme} />;
          }
          if (section.id === "languages" && data.languages?.length > 0) {
            return <LanguagesSection key="languages" languages={data.languages} styles={styles} theme={theme} />;
          }
          return null;
        })}
      </View>

      {/* RIGHT MAIN CONTENT */}
      <View style={styles.rightColumn}>
        {/* Name and Role */}
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        <Text style={styles.role}>{personalInfo.role}</Text>

        {/* Main Dynamic Sections */}
        {activeSections.map((section) => {
          // Skip sections already in sidebar
          if (SIDEBAR_IDS.includes(section.id)) return null;

          if (section.id === "experience" && data.experience?.length > 0) {
            return <ExperienceSection key="experience" experience={data.experience} styles={styles} theme={theme} />;
          }
          if (section.id === "education" && data.education?.length > 0) {
            return <EducationSection key="education" education={data.education} styles={styles} theme={theme} />;
          }
          if (section.id === "projects" && data.projects?.length > 0) {
            return <ProjectsSection key="projects" projects={data.projects} styles={styles} theme={theme} />;
          }
          if (section.id === "references" && data.references?.length > 0) {
            return <ReferencesSection key="references" references={data.references} styles={styles} theme={theme} />;
          }
          if (section.id === "certificates" && data.certificates?.length > 0) {
            return <CertificatesSection key="certificates" certificates={data.certificates} styles={styles} theme={theme} />;
          }
          if (section.id === "extracurricular" && data.extracurricular?.length > 0) {
            return <ExtracurricularSection key="extracurricular" extracurricular={data.extracurricular} styles={styles} theme={theme} />;
          }
          return null;
        })}
      </View>
    </Page>
  );
};

export default CreativeTemplate;
