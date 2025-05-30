import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

// Define a type for the data structure LoginForm will pass on submission.
// This should match the structure inferred from loginSchema in LoginForm.tsx.
interface LoginFormSubmitData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: LoginFormSubmitData) => {
    console.log('Login attempt from LoginPage:', data);
    // This function is called by LoginForm and overrides its internal dummy submission logic.
    // It should handle the actual login attempt (e.g., API call).
    // For demonstration, simulate an API call and logic:
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network latency

    if (data.username === "user@example.com" && data.password === "password") {
      console.log("Login successful (handled by LoginPage)!");
      // In a real application, you might store a token and navigate to a dashboard.
      // For example: localStorage.setItem('authToken', 'dummyToken');
      alert("Login successful! You would typically be redirected."); // Placeholder feedback
      // navigate('/dashboard'); // Example redirect after successful login
    } else {
      console.error("Login failed (handled by LoginPage).");
      // Throw an error to be caught by LoginForm's submit handler, which updates its UI.
      throw new Error("Invalid username or password. Please try again.");
    }
  };

  const handleNavigateToSignUp = () => {
    console.log('Navigate to sign up page requested from LoginPage');
    // Navigate to the sign-up page. Assumes a '/signup' route is configured in your router.
    navigate('/signup');
  };

  return (
    // Overall page layout: Full-height flex container, centering its content.
    // Conforms to Project Requirements -> Layout Requirements -> "overall".
    <div className="flex items-center justify-center h-screen bg-background">
      {/* 
        Login card container: Styled card, centered within the page.
        Conforms to Project Requirements -> Layout Requirements -> "mainContent".
        - `w-full max-w-md`: Responsive width for the card, common for login forms.
        - `bg-card text-card-foreground`: Theming for card background and text color, from tailwind.config.ts.
        - `p-6 rounded-lg shadow-md`: Padding, border radius, and shadow as specified in requirements.
        - `flex flex-col items-center`: Internal layout for centering form elements within the card.
      */}
      <div className="w-full max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-md flex flex-col items-center">
        <LoginForm
          onLoginSubmit={handleLoginSubmit}
          onNavigateToSignUp={handleNavigateToSignUp}
          // LoginForm is expected to be w-full of this container and manage its internal layout (e.g. spacing, alignment of its children).
        />
      </div>
    </div>
  );
};

export default LoginPage;
