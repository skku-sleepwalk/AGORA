import { Container, ContainerProps } from "@mantine/core";
import { useCardContainerStyles } from "./CardContainer.styles";

export interface CardContainerProps extends ContainerProps {
  children: React.ReactNode;
  shadow?: number;
  borderRadius?: number | string;
}

function CardContainer({
  children,
  shadow = 10,
  borderRadius = 15,
  className,
  ...others
}: CardContainerProps) {
  const { classes, cx } = useCardContainerStyles({ shadow, borderRadius });

  return (
    <Container className={cx(classes.cardContainer, className)} {...others}>
      {children}
    </Container>
  );
}

export default CardContainer;
