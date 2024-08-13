import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import RockIcon from "./react_icons/RockIcon";
import PaperIcon from "./react_icons/PaperIcon";
import ScissorsIcon from "./react_icons/ScissorsIcon";
import { useFonts } from "expo-font";

interface Result {
  result: string;
  resultTitle: string;
  text: string;
  playerDecision: string;
  computerDecision: string;
}

export default function App() {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<null | Result>(null);

  const [fontsLoaded] = useFonts({
    "Exo-Regular": require("./assets/fonts/Exo-Regular.ttf"),
    "Exo2-Regular": require("./assets/fonts/Exo2-Regular.ttf"),
  });

  const gameLogic = (playerChoice: string, computerChoice: string) => {
    if (playerChoice == computerChoice) {
      return 0;
    } else if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Scissors" && computerChoice === "Paper") ||
      (playerChoice === "Paper" && computerChoice === "Rock")
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const playerDecision = (playerChoice: string) => {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const scoreValue = gameLogic(playerChoice, computerChoice);

    if (scoreValue === 1) {
      setShowResult({
        result: "W",
        resultTitle: "Player win",
        text: `${playerChoice} beats ${computerChoice}`,
        playerDecision: playerChoice,
        computerDecision: computerChoice,
      });
      setPlayerScore(playerScore + 1);
    } else if (scoreValue === -1) {
      setShowResult({
        result: "L",
        resultTitle: "Player lose",
        text: `${computerChoice} beats ${playerChoice}`,
        playerDecision: playerChoice,
        computerDecision: computerChoice,
      });
      setComputerScore(computerScore + 1);
    } else {
      setShowResult({
        result: "T",
        resultTitle: "No winners",
        playerDecision: playerChoice,
        text: `It's a draw`,
        computerDecision: computerChoice,
      });
    }
  };

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rock Paper Scissors</Text>
        <View style={styles.scoreBoard}>
          <View style={styles.scoreTable}>
            <Text
              style={[styles.score, styles.scoreText]}
              adjustsFontSizeToFit
            >
              Player
            </Text>
            <View style={styles.scoreCountView}>
              <Text style={styles.score} adjustsFontSizeToFit>
                {playerScore}
              </Text>
            </View>
          </View>
          <View style={styles.scoreTable}>
            <Text
              style={[styles.score, styles.scoreText]}
              adjustsFontSizeToFit
            >
              Computer
            </Text>
            <View style={styles.scoreCountView}>
              <Text style={styles.score} adjustsFontSizeToFit>
                {computerScore}
              </Text>
            </View>
          </View>
        </View>
        {!showResult ? (
          <View style={styles.gameView}>
            <Pressable
              style={styles.iconView}
              onPress={() => playerDecision("Rock")}
            >
              <RockIcon size={45} />
              <Text style={styles.iconText} adjustsFontSizeToFit>
                Rock
              </Text>
            </Pressable>
            <Pressable
              style={styles.iconView}
              onPress={() => playerDecision("Paper")}
            >
              <PaperIcon size={45} />
              <Text style={styles.iconText} adjustsFontSizeToFit>
                Paper
              </Text>
            </Pressable>
            <Pressable
              style={styles.iconView}
              onPress={() => playerDecision("Scissors")}
            >
              <ScissorsIcon size={45} />
              <Text style={styles.iconText} adjustsFontSizeToFit>
                Scissors
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  height: 65,
                  lineHeight: 55,
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "Exo2-Regular",
                },
              ]}
              adjustsFontSizeToFit
            >
              {showResult.resultTitle}
            </Text>
            <View
              style={[
                styles.gameView,
                {
                  marginTop: 0,
                  gap: 50,
                },
              ]}
            >
              <View
                style={[
                  styles.iconView,
                  {
                    borderColor:
                      showResult.result === "W"
                        ? "#51b553"
                        : showResult.result === "L"
                        ? "#ff5a5a"
                        : "#bbae3d",
                  },
                ]}
              >
                <WichGameIcon val={showResult.playerDecision} />
                <Text style={styles.iconText}>Player</Text>
              </View>
              <View>
                <View
                  style={[
                    styles.iconView,
                    {
                      borderColor:
                        showResult.result === "L"
                          ? "#51b553"
                          : showResult.result === "W"
                          ? "#ff5a5a"
                          : "#bbae3d",
                    },
                  ]}
                >
                  <WichGameIcon val={showResult.computerDecision} />
                  <Text style={styles.iconText}>Computer</Text>
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginTop: 20,
                  fontSize: 20,
                },
              ]}
              adjustsFontSizeToFit
            >
              {showResult.text}
            </Text>
            <Pressable onPress={() => setShowResult(null)}>
              <Text
                style={[
                  styles.text,
                  {
                    padding: 3,
                    borderRadius: 3,
                    marginTop: 50,
                    width: 150,
                    fontSize: 20,
                    alignSelf: "center",
                    backgroundColor: "#fff",
                    color: "#000",
                  },
                ]}
                adjustsFontSizeToFit
              >
                Play again
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
}

const WichGameIcon = ({ val }: { val: string }) => {
  if (val === "Rock") {
    return <RockIcon size={45} />;
  } else if (val === "Paper") {
    return <PaperIcon size={45} />;
  } else {
    return <ScissorsIcon size={45} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 33,
    color: "#fff",
    fontFamily: "Exo2-Regular",
  },
  scoreBoard: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 110,
    gap: 2,
    minWidth: 270,
    backgroundColor: "#708090",
    borderColor: "#708090",
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 10,
  },
  scoreTable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    backgroundColor: "#36454F",
  },
  scoreText: {
    backgroundColor: "#3f3f46",
    fontSize: 21,
    fontFamily: "Exo2-Regular",
  },
  score: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Exo-Regular",
  },
  scoreCountView: {
    borderColor: "#708090",
    borderTopWidth: 2,
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 65,
    maxHeight: 130,
  },
  iconView: {
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#5a5aff",
    minWidth: 110,
    minHeight: 110,
    flexGrow: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  iconText: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: "Exo-Regular",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Exo-Regular",
  },
});
