import { Button, ButtonText } from "@/components/ui/button";
import { auth, googleProvider, microsoftProvider } from "@/firebaseConfig";
import { Image } from "expo-image";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { JSX, useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";

const API_URL = "http://localhost:3000"; // Use port 3001 to avoid conflicts

const saveUser = async (userData: {
  displayName: string | null;
  email: string | null;
  uid: string | null;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: userData.displayName,
        email: userData.email,
        uid: userData.uid,
      }),
    });
    const result = await res.json();
    console.log("User saved to backend:", result);
    return result;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// Export these functions so they can be used in other components
export const microsoftAuthentication = async () => {
  try {
    if (Platform.OS === "web") {
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log("User signed in:", result.user.displayName);

      // Save to backend via API
      await saveUser({
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      });

      return result;
    } else {
      await signInWithRedirect(auth, microsoftProvider);
    }
  } catch (error) {
    console.error("Microsoft sign-in error:", error);
  }
};

export const googleAuthentication = async () => {
  try {
    if (Platform.OS === "web") {
      console.log("Platform:", Platform.OS);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { displayName, email, uid } = user;

      console.log("Google sign-in successful:", displayName, email);

      // Save to backend via API instead of direct MongoDB
      await saveUser({
        displayName: displayName,
        email: email,
        uid: uid,
      });

      console.log("Google User signed in:", result.user.displayName);
      return result;
    } else {
      console.log("Mobile platform, using redirect");
      await signInWithRedirect(auth, googleProvider);
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
    // Log more detailed error information
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.message) {
      console.error("Error message:", error.message);
    }
  }
};

const handleRedirectResultMS = async () => {
  try {
    const res = await getRedirectResult(auth);
    if (res) {
      const user = res.user;
      return {
        success: true,
        user: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        },
      };
    }
    return { success: false, user: null };
  } catch (error) {
    console.error("Redirect result error: ", error);
    return { success: false, error };
  }
};

export const useAuthRedirect = () => {
  const [authResult, setAuthResult] = useState(null);

  useEffect(() => {
    // Only check redirect results on mobile platforms
    if (Platform.OS !== "web") {
      const checkRedirectResult = async () => {
        const result = await handleRedirectResultMS();
        setAuthResult(result);
      };

      checkRedirectResult();
    }
  }, []);

  return authResult;
};

// Keep these for internal use if needed
const googleButton = ({
  text,
  image,
}: {
  text: string | JSX.Element;
  image?: any;
}) => {
  return (
    <Button onPress={googleAuthentication}>
      {image && <Image source={image} style={{ width: 20, height: 20 }} />}
      <ButtonText>{text}</ButtonText>
    </Button>
  );
};

const newButton = ({
  text,
  image,
  onPress,
}: {
  text: string | JSX.Element;
  image?: any;
  onPress?: () => void;
}) => {
  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        style={styles.newButton}
        onPress={onPress}
      >
        <Image
          source={image}
          style={{ width: 18, height: 18, marginRight: 8 }}
          contentFit="contain"
        />
        <ButtonText style={styles.buttonTextContent}>{text}</ButtonText>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  newButton: {
    width: "47%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextContent: {
    flexDirection: "row",
    color: "#d3d3d3",
  },
});

// Export the button components as well if needed
export { googleButton, newButton };
