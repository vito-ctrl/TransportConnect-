import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', values);
      alert('Registration successful!');
      resetForm();
      setSubmitting(false);
    }, 1000);
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
          {({ isSubmitting, errors, touched }) => (
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  transition-colors ${
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  transition-colors ${
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  transition-colors ${
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  transition-colors ${
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  transition-colors ${
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
                    // This would normally be handled by Formik's Form component
                    // For demo purposes, we'll simulate form submission
                    console.log('Form would be submitted here');
                  }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 focus:outline-none  ffset-2 lack transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="#" className="font-medium text-black hover:text-gray-800 transition-colors underline">
                    login
                  </a>
                </p>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;