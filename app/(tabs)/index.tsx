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

  const NewButton = ({ text }: { text: string | JSX.Element }) => {
    return (
      <>
        <Button
          className="rounded-full"
          size="lg"
          variant="outline"
          style={styles.newButton} // make each button ~48% width
        >
          <ButtonText>{text}</ButtonText>
        </Button>
      </>
    );
  };
  return (
    <>
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
          <ThemedText type="title" className="mx-3">
            The best financial planning app that you will need!
          </ThemedText>
          <LoginButton></LoginButton>
        </ThemedView>
        <ThemedView style={styles.secondStepContainer}>
          <NewButton text="Google"></NewButton>
          <NewButton text="Outlook"></NewButton>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{" "}
            to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
            directory. This will move the current{" "}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
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
  },
  secondStepContainer: {
    gap: 10,
    marginTop: 8,
    // removed flex: 1 to avoid forcing full height
    flexDirection: "row",
    justifyContent: "space-between", // space the two buttons evenly
    width: "100%", // match the sign-in container width
    alignSelf: "center",
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTextContainer: {},
  reactLogo: {
    height: 400,
    width: "85%",
    maxWidth: 480,
    aspectRatio: 16 / 9,
    marginTop: 70,
  },
  actionButton: {
    width: "95%", // width for the Sign in with Email button
  },
  newButton: {
    width: "47%", // each of the two buttons will be ~48% so together match actionButton
  },
});
