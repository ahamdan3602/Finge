import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';

export default function GoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setError('');
      console.log('Signed in as:', result.user.displayName);
    } catch (err: any) {
      setError(err.message);
      console.error('Error signing in:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError('');
      console.log('Signed out');
    } catch (err: any) {
      setError(err.message);
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {!user ? (
        <div>
          <h2>Sign In with Google</h2>
          <button
            onClick={handleGoogleSignIn}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔐 Sign in with Google
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <p>Email: {user.email}</p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ borderRadius: '50%', width: '100px', margin: '20px' }}
            />
          )}
          <br />
          <button
            onClick={handleSignOut}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#db4437',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}