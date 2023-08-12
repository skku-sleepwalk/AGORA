import { Button, ButtonProps, Stack, TextInput, TextInputProps, Title } from "@mantine/core";
import { useLoginFormStyles } from "./LoginForm.styles";

export interface LoginFormProps {
  children?: React.ReactNode;
}

function LoginForm({ children }: LoginFormProps) {
  const { classes } = useLoginFormStyles();
  return (
    <Stack spacing={15} className={classes.container}>
      {children}
    </Stack>
  );
}

export interface LoginFormLabelProps {
  children: string;
}

LoginForm.Label = ({ children }: LoginFormLabelProps) => {
  return <Title order={4}>{children}</Title>;
};

export interface LoginFormTextInputProps extends Omit<TextInputProps, "radius"> {}

LoginForm.TextInput = ({ placeholder, ...others }: LoginFormTextInputProps) => {
  const { classes } = useLoginFormStyles();
  return (
    <TextInput placeholder={placeholder} radius="lg" {...others} className={classes.textInput} />
  );
};

export interface LoginFormSubmitButtonProps extends Omit<ButtonProps, "radius"> {
  children: string;
}

LoginForm.SubmitButton = ({ children, ...others }: LoginFormSubmitButtonProps) => {
  const { classes } = useLoginFormStyles();
  return (
    <Button type="submit" radius="lg" className={classes.submitButton} {...others}>
      {children}
    </Button>
  );
};

export default LoginForm;
