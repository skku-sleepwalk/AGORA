import { createStyles } from "@mantine/core";

export const useLeftSidebarStyles = createStyles((theme) => ({
  CategoryContainer: {
    boxSizing: 'border-box',
    width: 261,
    // height: 390,

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
    top: 20,

    fontWeight: 500,
    fontSize: 20,
    color: '#000',
  },

  DropDown: {
    display: 'inline-block',

    boxSizing: 'border-box',
    height: 20,
  },

  CheckboxGroup: {
    display: 'block',
    position: 'relative',
    top: 35,
    margin: 0,
  }
}));