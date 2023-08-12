import { useForm } from "@mantine/form";
import LoginForm from "../LoginForm/LoginForm";
import { showNotification } from "../../../utils/notifications";
import { register } from "../../../utils/api/users";

export interface SignUpFormProps {
  onCompleted: () => void;
}

function SignUpForm({ onCompleted }: SignUpFormProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      description: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "이메일 형식이 올바르지 않습니다."),
      password: (value) => (value.length >= 8 ? null : "비밀번호는 8자 이상이어야 합니다."),
      passwordConfirm: (value, values) =>
        value === values.password ? null : "비밀번호가 일치하지 않습니다.",
      name: (value) => (value.trim().length > 0 ? null : "닉네임을 입력해주세요."),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(({ email, password, name, description }) => {
        console.log(email, password, name, description);
        register({
          email,
          password,
          name,
          description,
        }).then((response) => {
          showNotification("회원가입 완료!", "회원가입이 완료되었습니다.");
          onCompleted();
        });
      })}
    >
      <LoginForm>
        <LoginForm.Label>이메일</LoginForm.Label>
        <LoginForm.TextInput placeholder="이메일" {...form.getInputProps("email")} />
        <LoginForm.Label>닉네임</LoginForm.Label>
        <LoginForm.TextInput placeholder="닉네임" {...form.getInputProps("name")} />
        <LoginForm.Label>비밀번호</LoginForm.Label>
        <LoginForm.TextInput
          placeholder="비밀번호"
          type="password"
          {...form.getInputProps("password")}
        />
        <LoginForm.TextInput
          placeholder="비밀번호 확인"
          type="password"
          {...form.getInputProps("passwordConfirm")}
        />
        <LoginForm.Label>한 줄 소개</LoginForm.Label>
        <LoginForm.TextInput placeholder="한 줄 소개" {...form.getInputProps("description")} />
        <LoginForm.SubmitButton>가입 완료</LoginForm.SubmitButton>
      </LoginForm>
    </form>
  );
}

export default SignUpForm;
