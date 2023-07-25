import { NotificationProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import exp from "constants";

export function showNotification(
  title: string | null,
  message: string | null,
  option?: Omit<NotificationProps, "title" | "message">
) {
  notifications.show({
    title,
    message,
    ...option,
  });
}

export function showError(
  title: string | null,
  message: string | null,
  option?: Omit<NotificationProps, "title" | "message">
) {
  notifications.show({
    title,
    message,
    color: "red",
    icon: <IconX />,
    ...option,
  });
}

export function cleanNotification() {
  notifications.clean();
}
