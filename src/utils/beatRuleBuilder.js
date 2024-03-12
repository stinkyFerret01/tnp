import hsbfGameData from "../Data/hbfsGameData";

const beatRuleBuilder = (musicGameData) => {
  let wordsPosition = musicGameData.wordsPosition;
  let beatRuleWIP = [];
  for (let i = 0; i < 1880; i++) {
    let beatToCheck = i - hsbfGameData.beatMod;
    let beat = { beat: i, goodWords: [] };
    for (let j = 0; j < wordsPosition.length; j++) {
      let labelToCheck = wordsPosition[j];
      if (labelToCheck.beats.includes(beatToCheck)) {
        beat.goodWords.push(labelToCheck.label);
      }
    }
    if (beat.goodWords.length === 0) {
      beat.goodWords = null;
    }
    beatRuleWIP.push(beat);
  }
  return beatRuleWIP;
};

export default beatRuleBuilder;
