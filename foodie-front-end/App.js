import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, AdminProvider, LocationProvider,CommentProvider, RestaurantProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RestaurantProvider>
        <LocationProvider>
          <PlacesProvider>
            <AdminProvider>
              <CommentProvider>
                <Main/>
              </CommentProvider>
            </AdminProvider>
          </PlacesProvider>
        </LocationProvider>
        </RestaurantProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

