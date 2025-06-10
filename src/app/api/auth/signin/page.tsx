import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <button onClick={() => signIn("google", {
      callbackUrl: "/auth/return"   // ✅ 로그인 후 돌아올 경로
    })}>
      구글로 로그인
    </button>
  );
}
