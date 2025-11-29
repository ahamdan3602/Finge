import { Button, ButtonText } from "@/components/ui/button";
import { auth, googleProvider, microsoftProvider } from "@/firebaseConfig"; // Add googleProvider import
import { Image } from "expo-image";
import { signInWithRedirect } from "firebase/auth";

import { JSX } from "react";
import { StyleSheet } from "react-native";

const microsoftAuthentication = async () => {
  try {
    if (Platform.OS === "web") {
      // Web: Use popup
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log("User signed in:", result.user.displayName);
      return result;
    } else {
      // Mobile (iOS/Android): Use redirect
      await signInWithRedirect(auth, microsoftProvider);
    }
  } catch (error) {
    console.error("Microsoft sign-in error:", error);
  }
};

const googleAuthentication = async () => {
  try {
    if (Platform.OS === "web") {
      // Web: Use popup
      console.log(Platform.OS);
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User signed in:", result.user.displayName);
      return result;
    } else {
      // Mobile (iOS/Android): Use redirect
      await signInWithRedirect(auth, googleProvider);
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
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
  image?: any; // expect a static require(...) module or a remote { uri }
  onPress?: () => void; // Add onPress prop
}) => {
  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        style={styles.newButton} // make each button ~48% width
        onPress={onPress} // Add onPress handler
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
    width: "47%", // each of the two buttons will be ~48% so together match actionButton
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
