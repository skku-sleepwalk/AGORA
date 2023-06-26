import { createStyles } from "@mantine/core";

export const useLeftSidebarStyles = createStyles((theme) => ({
  CategoryContainer: {
    boxSizing: 'border-box',
    width: 261,
    // height: 100,

    position: 'relative',
    float: 'left',
    top: 10,

    backgroundColor: "#FFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
  },

  CategoryText: {
    display: 'block',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 15,

    fontWeight: 500,
    fontSize: 20,
    color: '#000',
  },

  DropDownButton: {
    display: 'inline-block',

    boxSizing: 'border-box',
    height: 20,
    padding: '0px 5px',

  },

  CheckboxGroup: {
    display: 'block',
    position: 'relative',
    width: '100%',
  },

  PaddingTop: {
    paddingTop: 10,
  },

  PaddingBottom: {
    paddingBottom: 20,
  },
}));