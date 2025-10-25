import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, ButtonText } from "@/components/ui/button";
import { JSX } from "react";

// const someButton = () => {
//   return (
//     <Button variant="solid" size="md" action="primary">
//       <ButtonText>Hello World! My name is ...</ButtonText>
//     </Button>
//   );
// };

export default function HomeScreen() {
  const LoginButton = () => {
    return (
      <>
        <Button
          className="rounded-full mt-3"
          size="lg"
          variant="solid"
          action="primary"
          style={styles.actionButton} // added width for consistent sizing
        >
          <ButtonText>Sign in with Email!</ButtonText>
        </Button>
      </>
    );
  };

  const NewButton = ({
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

  return (
    <ThemedView style={{ flex: 1, flexDirection: "column" }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#000000" }}
        headerImage={
          <ThemedView style={styles.headerImageContainer}>
            <Image
              source={require("@/assets/images/main_header.png")}
              style={styles.reactLogo}
              accessibilityLabel="Finge header logo"
              contentFit="contain"
            />
          </ThemedView>
        }
      >
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title" className="mx-3 text-4xl">
            The best financial planning {"\n"}
            app you need!
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer} className="pt-6">
          <LoginButton></LoginButton>

          <ThemedView style={styles.secondStepContainer}>
            {/* Fixed the outlook filename */}
            <NewButton
              image={require("@/assets/images/icons8-google.svg")}
              text="Google"
            ></NewButton>
            <NewButton
              image={require("@/assets/images/icons8-outlook-2025.svg")}
              text="Outlook"
            ></NewButton>
          </ThemedView>
          <ThemedView style={styles.secondStepContainer}>
            <ThemedText style={styles.userText}>
              Not already a user? <u>Sign up!</u>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: "center", // center the sign-in button
    marginTop: 10,
  },
  secondStepContainer: {
    marginTop: 10,
    // removed flex: 1 to avoid forcing full height
    flexDirection: "row",
    justifyContent: "space-between", // space the two buttons evenly
    width: "100%", // match the sign-in container width
    alignSelf: "auto",
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    // make container span full width and allow horizontal padding so the image can grow
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 10,
    height: 520, // increased height to give more vertical room
    paddingTop: 60, // add more top space so the logo doesn't get cut off
    paddingBottom: 30,
  },
  headerTextContainer: {},
  reactLogo: {
    // size driven by width + aspectRatio; cap height so it stays within the container
    width: "95%",
    maxWidth: 1100,
    aspectRatio: 16 / 9,
    height: 320, // prevents overflow while allowing a larger logo
  },
  actionButton: {
    width: "100%", // width for the Sign in with Email button
  },
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
