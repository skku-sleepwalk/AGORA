import { createStyles } from "@mantine/core";

export const useLeftSidebarStyles = createStyles((theme) => ({
  CategoryBox: {
    boxSizing: 'border-box',
    width: 261,
    height: 390,

    position: 'relative',
    float: 'left',
    top: 10,

    backgroundColor: "#FFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px"
  },
  Category: {
    display: 'block',
    position: 'relative',
    top: 20,

    fontWeight: 500,
    fontSize: 20,
    color: '#000'
  },
  Checkbox: {
    display: 'block',
    position: 'relative',
    top: 30,
  }
}));