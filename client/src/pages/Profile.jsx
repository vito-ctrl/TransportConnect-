// Profile.jsx - Composant de profil utilisateur
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Edit, 
  Save, 
  X,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

const Profile = () => {
  const { user, getUserPermissions, ROLES } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const userPermissions = getUserPermissions();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
      .max(20, 'Le nom d\'utilisateur doit contenir moins de 20 caractères')
      .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
      .email('Format d\'email invalide')
      .required('L\'email est requis'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Numéro de téléphone invalide'),
    firstName: Yup.string()
      .max(50, 'Le prénom doit contenir moins de 50 caractères'),
    lastName: Yup.string()
      .max(50, 'Le nom de famille doit contenir moins de 50 caractères'),
    bio: Yup.string()
      .max(500, 'La biographie doit contenir moins de 500 caractères')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Simuler une API call
      console.log('Updating profile:', values);
      
      // Ici vous feriez un appel API réel
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(values)
      // });
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUpdateSuccess(true);
      setIsEditing(false);
      
      // Cacher le message de succès après 3 secondes
      setTimeout(() => setUpdateSuccess(false), 3000);
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case ROLES.ADMIN:
        return 'bg-red-100 text-red-800 border-red-200';
      case ROLES.MANAGER:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case ROLES.USER:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isEditing
                    ? 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500'
                    : 'text-white bg-black hover:bg-gray-800 focus:ring-black'
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success Message */}
          {updateSuccess && (
            <div className="px-6 py-3 bg-green-50 border-l-4 border-green-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Save className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Profil mis à jour avec succès !
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 py-6">
            <Formik
              initialValues={{
                username: user?.username || user?.user || '',
                email: user?.email || '',
                phone: user?.phone || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                bio: user?.bio || ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Profile Picture and Role */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {user?.username || user?.user || 'Utilisateur'}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
                          {user?.role || 'Non défini'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User className="inline h-4 w-4 mr-1" />
                        Nom d'utilisateur
                      </label>
                      <Field
                        name="username"
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : ''
                        }`}
                      />
                      <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : ''
                        }`}
                      />
                      <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Téléphone
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : ''
                        }`}
                        placeholder="Numéro de téléphone"
                      />
                      <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : ''
                        }`}
                        placeholder="Votre prénom"
                      />
                      <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de famille
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : ''
                        }`}
                        placeholder="Votre nom de famille"
                      />
                      <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biographie
                    </label>
                    <Field
                      as="textarea"
                      name="bio"
                      rows={4}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black ${
                        !isEditing ? 'bg-gray-50 text-gray-500' : ''
                      }`}
                      placeholder="Parlez-nous de vous..."
                    />
                    <ErrorMessage name="bio" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sauvegarde...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Sauvegarder
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Permissions et Accès
            </h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Role Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Informations de rôle
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      Rôle actuel: <span className="font-medium">{user?.role || 'Non défini'}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      Membre depuis: <span className="font-medium">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Non disponible'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Permissions List */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Permissions ({userPermissions.length})
                </h3>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {userPermissions.length > 0 ? (
                    userPermissions.map((permission, index) => (
                      <div key={index} className="flex items-center">
                        <Eye className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-xs text-gray-600">
                          {permission.replace(/_/g, ' ').toLowerCase()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">
                      Aucune permission spéciale assignée
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;