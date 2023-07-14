import { NotificationProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export function showNotification(
  title: string,
  message: string,
  option?: Omit<NotificationProps, "title" | "message">
) {
  notifications.show({
    title,
    message,
    ...option,
  });
}

export function showError(
  message: string,
  title?: string,
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
