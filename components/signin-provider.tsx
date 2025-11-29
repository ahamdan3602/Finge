import { Image } from "expo-image";
import { getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
  auth,
  googleProvider,
  microsoftProvider
} from "/Users/abody/Desktop/Finge/firebaseConfig.ts";

import { Button, ButtonText } from "@/components/ui/button";
import { JSX } from "react";
import { Platform, StyleSheet } from "react-native";


// mock commit
// mock commit 2
const googleAuthentication = async () => {
  try {
    if (Platform.OS == "web") {
      const res = signInWithPopup(auth, googleProvider);
      const user = (await res).user
      console.log(user.displayName)
      return {
        name: user.displayName,
        profile: user.photoURL,
        email: user.email
      }
    } else {
      await signInWithRedirect(auth, googleProvider)
    }
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};

const handleRedirectResult = async () => {
  try {
    const res = await getRedirectResult(auth)
    if (res) {
      const user = res.user;
      return {
        success: true,
        user: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }
      }
    
      }
    } catch (error) {
        console.error("Redirect result error: ", error);
        return { success: false, error}
    }
}


const microsoftAuthentication = async () => {
  await signInWithRedirect(auth, microsoftProvider);
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
}: {
  text: string | JSX.Element;
  image?: any; // expect a static require(...) module or a remote { uri }
}) => {
  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        style={styles.newButton} // make each button ~48% width
      >
        <Image
          source={image}
          style={{
            width: 18,
            height: 18,
            marginRight: 8, // moves just the image down within the button
          }}
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
  },
  userText: {
    color: "#d3d3d3",
  },
});

