import { Anchor, Group, Header as MantineHeader, Text } from "@mantine/core";
import { useHeaderStyles } from "./Header.styles";
import { useState } from "react";
import { UserMenu } from "./UserMenu/UserMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../../../hooks/useAuth";

export interface HeaderProps {
  links: { label: string; link: string }[];
}

export function Header({ links }: HeaderProps) {
  const { classes, cx } = useHeaderStyles();
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const { user } = useAuth();

  return (
    <MantineHeader height={69} className={classes.header}>
      <Group className={classes.container} position="apart" noWrap>
        <Group spacing={40} className={classes.fullHeight} noWrap>
          <Text size={32} weight="bold" color="white">
            Agora
          </Text>
          <Group spacing={0} className={classes.fullHeight} noWrap>
            {links.map((link) => (
              <Link
                href={link.link}
                key={link.label}
                className={cx(classes.link, { [classes.linkActive]: active === link.link })}
                onClick={(event) => {
                  setActive(link.link);
                }}
              >
                {link.label}
              </Link>
            ))}
          </Group>
        </Group>
        <Group>
          {user && (
            <UserMenu
              image="https://avatars.githubusercontent.com/u/52057157?v=4"
              name={user.name}
            />
          )}
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;
