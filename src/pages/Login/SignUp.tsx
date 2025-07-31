// Register.tsx
import { SignUp } from '@clerk/clerk-react';

const Register = () => {
  return <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />;
}

export default Register;
