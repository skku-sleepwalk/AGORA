import { Anchor, Group, Header as MantineHeader, Text, TextInput } from "@mantine/core";
import { useHeaderStyles } from "./Header.styles";
import { useState } from "react";
import { UserMenu } from "./UserMenu/UserMenu";

export interface HeaderProps {
  links: { label: string; link: string }[];
}

export function Header({ links }: HeaderProps) {
  const { classes, cx } = useHeaderStyles();
  const [active, setActive] = useState(links[0].link);

  return (
    <MantineHeader height={76} className={classes.header}>
      <Group className={classes.container} position="apart">
        <Group spacing={40}>
          <Text size={28} weight="bold">
            AGORA
          </Text>
          <Group spacing={5}>
            {links.map((link) => (
              <Anchor
                key={link.label}
                href={link.link}
                className={cx(classes.link, { [classes.linkActive]: active === link.link })}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(link.link);
                }}
                size="lg"
              >
                {link.label}
              </Anchor>
            ))}
          </Group>
        </Group>
        <Group>
          <UserMenu
            image="https://avatars.githubusercontent.com/u/52057157?v=4"
            name="개발자자님"
          />
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;
