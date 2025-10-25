import { Image } from "expo-image";
import { signInWithRedirect } from "firebase/auth";
import {
  auth,
  microsoftProvider,
} from "/Users/abody/Desktop/Finge/firebaseConfig.ts";

import { Button, ButtonText } from "@/components/ui/button";
import { JSX } from "react";
import { StyleSheet } from "react-native";

const microsoftAuthentication = async () => {
  await signInWithRedirect(auth, microsoftProvider);
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
