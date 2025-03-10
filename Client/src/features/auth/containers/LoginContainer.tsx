import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { loginAction, selectAuthError, selectIsLoading } from '../store/authSlice';
import type { AppDispatch } from '../../../core/store';

export const LoginContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (credentials: { username: string; password: string }) => {
    try {
      await dispatch(loginAction(credentials)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // Error handling is managed by the error middleware and the slice
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error ?? undefined}
        />
      </div>
    </div>
  );
}; 