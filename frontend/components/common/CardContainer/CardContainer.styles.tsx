import { createStyles } from "@mantine/core";

export interface CardContainerStyles {
  shadow: number;
  borderRadius: number | string;
}

export const useCardContainerStyles = createStyles(
  (theme, { shadow, borderRadius }: CardContainerStyles) => ({
    cardContainer: {
      boxShadow: `0px 3px ${shadow}px rgba(0, 0, 0, 0.2)`,
      borderRadius,
      margin: "0",
    },
  })
);
