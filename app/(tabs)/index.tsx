import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";

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
          className="rounded-full"
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonText>Sign in with Email!</ButtonText>
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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            The best financial planning app that you will need!
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <LoginButton></LoginButton>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction
                title="Action"
                icon="cube"
                onPress={() => alert("Action pressed")}
              />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert("Share pressed")}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert("Delete pressed")}
                />
              </Link.Menu>
            </Link.Menu>
          </Link>

          <ThemedText>
            {`Tap the Explore tab to learn more about what's included in this starter app.`}
          </ThemedText>
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
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTextContainer: {},
  reactLogo: {
    height: 280,
    width: "85%",
    maxWidth: 480,
    aspectRatio: 16 / 9,
  },
});
