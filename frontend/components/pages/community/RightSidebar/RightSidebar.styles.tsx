import { createStyles } from "@mantine/core";

export const useRightSidebarStyles = createStyles((theme) => ({
  SideBarContainer: {
    width: "16.375rem",
    height: "100vh",
    
    position: "fixed",
    float: "right",

    backgroundColor: "#F9FEFF",
    padding: "0, 0.875rem",
    boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.2)",
  },

  Search: {
    width: "100%",
    height: "2rem",

    marginTop: "1.25rem",

    ".mantine-TextInput-wrapper": {
      borderRadius: "15px",
      border: "none",
      backgroundColor: "#F3F3F3",
    },
    ".mantine-TextInput-input": {
      border: "none",
      backgroundColor: "transparent",
    },
  },
  QuickIconButton: {
    width: "46.5%",
    height: "2.5rem",

    borderRadius: "15px",
    backgroundColor: "#F3F3F3",
    padding: 0,
    margin: 0,
  },

  QuickIcon: {
    width: "100%",
    height: "100%",

    border: 'none',
    backgroundColor: "transparent",
    margin: 0,
    paddingLeft: '0.6rem',

    justifyContent: 'flex-start',

    ".mantine-Badge-inner": {
      color: "black",
      fontWeight: "normal",
      fontSize: "0.8rem",

      cursor: "pointer",
    },
    ".mantine-Badge-leftSection": {
      marginRight: '0.5rem',
    },
  },
}));
