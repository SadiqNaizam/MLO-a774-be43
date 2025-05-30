import React from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormHeading from './FormHeading';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import SecondaryTextLink from './SecondaryTextLink';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  // Example: add email validation: .email({ message: 'Invalid email address' })
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSubmit?: (data: LoginFormValues) => Promise<void> | void;
  onNavigateToSignUp?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onLoginSubmit,
  onNavigateToSignUp,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (onLoginSubmit) {
        await onLoginSubmit(data);
      } else {
        // Fallback dummy login logic
        console.log('Login form submitted with:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        if (data.username === "user@example.com" && data.password === "password") {
          alert("Logged in successfully (dummy)!");
        } else {
          throw new Error("Invalid username or password (dummy).");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = React.useCallback(() => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      console.log('Navigate to sign up page triggered');
      alert("Navigate to sign up (dummy)!");
    }
  }, [onNavigateToSignUp]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-full space-y-6', className)}
      noValidate
    >
      <FormHeading text="Log in" />

      <div className="space-y-4">
        <div>
          <InputField
            id="username"
            type="text" // Or "email" if username is an email
            placeholder="Username"
            {...register('username')}
            aria-invalid={errors.username ? 'true' : 'false'}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <p id="username-error" className="mt-1.5 text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="mt-1.5 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-destructive text-center">{submitError}</p>
      )}

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </PrimaryButton>

      <SecondaryTextLink
        textBeforeLink="or,"
        linkText="sign up"
        onLinkClick={handleSignUpClick}
        className="text-center" // Centers the text block
      />
    </form>
  );
};

export default LoginForm;
