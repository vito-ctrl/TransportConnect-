import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Register = () => {
  const [user, setUser] = useState({
    user: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: ''
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const Navigate = useNavigate();
  // Validation schema with Yup
  const validationSchema = Yup.object({
    user: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required')
  });

  const handleSubmit = async(values, { setSubmitting, resetForm }) => {
    // Store user data in state
    setUser(values);
    // Add to registered users array (optional - for keeping track of multiple registrations)
    setRegisteredUsers(prev => [...prev, { ...values, id: Date.now() }]);
    
    // Simulate API call
      console.log('Registration data stored in state:', values);
      console.log('Current user state:', values);
      console.log('All registered users:', [...registeredUsers, { ...values, id: Date.now() }]);
      try{
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(values) 
        })
        if (res.ok) {
            console.log('Registration successful!');
            console.log('Registration data stored in state:', values);
            resetForm();
            Navigate('/login')
        } else {
            console.log('Registration failed:', res.status);
        }
    } catch (error) {
        console.error('Registration error:', error);
    } finally {
        setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-1 py-1">
      <div className="max-w-md w-full space-y-1">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Create Account</h2>
          <p className="mt-1 text-gray-600">Sign up to get started</p>
        </div>

        <Formik
          initialValues={{
            user: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirmation: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleSubmit }) => (
            <div className="mt-4 space-y-2">
              <div className="space-y-4">
                {/* Username Field */}
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-black mb-1">
                    Username
                  </label>
                  <Field
                    id="user"
                    name="user"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.user && touched.user
                        ? 'border-red-500 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="user"
                    component="div"
                    className="mt-1 text-sm text-red-600 font-medium"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.email && touched.email
                        ? 'border-red-500 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600 font-medium"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                    Phone Number
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.phone && touched.phone
                        ? 'border-red-500 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-sm text-red-600 font-medium"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.password && touched.password
                        ? 'border-red-500 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-600 font-medium"
                  />
                </div>

                {/* Password Confirmation Field */}
                <div>
                  <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-black mb-1">
                    Confirm Password
                  </label>
                  <Field
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.passwordConfirmation && touched.passwordConfirmation
                        ? 'border-red-500 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    component="div"
                    className="mt-1 text-sm text-red-600 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 focus:outline-none transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-black hover:text-gray-800 transition-colors underline">
                    login
                  </a>
                </p>
              </div>

              {/* Clear Data Button */}
              {user.user && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setUser({
                        user: '',
                        email: '',
                        phone: '',
                        password: '',
                        passwordConfirmation: ''
                      });
                      setRegisteredUsers([]);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear stored data
                  </button>
                </div>
              )}
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;