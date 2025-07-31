// Login.tsx
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />;
}

export default Login;
