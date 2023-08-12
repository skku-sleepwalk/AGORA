import { Checkbox, Group, Text } from "@mantine/core";
import LoginForm from "../LoginForm/LoginForm";
import InvisibleButton from "../InvisibleButton/InvisibleButton";
import { useForm } from "@mantine/form";
import useAuth from "../../../hooks/useAuth";

export interface SignInFormProps {
  onSignUpClick: () => void;
  onCompleted: () => void;
}

function SignInForm({ onSignUpClick, onCompleted }: SignInFormProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "이메일 형식이 올바르지 않습니다."),
      password: (value) => (value.length >= 8 ? null : "비밀번호는 8자 이상이어야 합니다."),
    },
  });
  const { login } = useAuth();

  return (
    <form
      onSubmit={form.onSubmit(({ email, password }) => {
        login(email, password).then((response) => {
          if (response) {
            onCompleted();
          }
        });
      })}
    >
      <LoginForm>
        <LoginForm.Label>로그인</LoginForm.Label>
        <LoginForm.TextInput placeholder="이메일" {...form.getInputProps("email")} />
        <LoginForm.TextInput
          placeholder="비밀번호"
          type="password"
          {...form.getInputProps("password")}
        />
        <Group position="apart" sx={{ padding: "0 5px" }}>
          <Checkbox label="로그인 유지" color="teal" sx={{ label: { color: "gray" } }} />
          <InvisibleButton onClick={onSignUpClick}>
            <Text color="gray">회원가입</Text>
          </InvisibleButton>
        </Group>
        <LoginForm.SubmitButton>로그인</LoginForm.SubmitButton>
      </LoginForm>
    </form>
  );
}

export default SignInForm;
