const hsbfGameData = {
  tempo: 121,
  beatMod: 393,
  skipTimePosition: 47,
  wordsPosition: [
    {
      label: "Work it",
      beats: [0, 256, 384, 512, 576, 640, 704],
    },
    {
      label: "Make it",
      beats: [8, 264, 392, 520, 584, 648, 712],
    },
    {
      label: "Do it",
      beats: [16, 272, 400, 528, 592, 656, 720],
    },
    {
      label: "Makes us",
      beats: [24, 280, 408, 536, 600, 664, 728],
    },
    {
      label: "Harder",
      beats: [68, 324, 388, 516, 580, 644, 708],
    },
    {
      label: "Better",
      beats: [76, 332, 396, 524, 588, 652, 716],
    },
    {
      label: "Faster",
      beats: [84, 340, 404, 532, 596, 660, 724],
    },
    {
      label: "Stronger",
      beats: [92, 348, 412, 540, 604, 668, 732],
    },

    // 2nd
    {
      label: "More than",
      beats: [128, 448, 544],
    },
    {
      label: "Hour",
      beats: [136, 144, 456, 464, 552, 560],
    },
    {
      label: "Never",
      beats: [152, 472, 568],
    },
    {
      label: "check synchro",
      beats: [
        -32, -64, -96, -128, -160, -192, -224, -256, -288, -320, -352, -384,
      ],
    },
    {
      label: "Ever",
      beats: [196, 452, 548],
    },
    {
      label: "After",
      beats: [204, 460, 556],
    },
    {
      label: "Work is",
      beats: [212, 468, 564],
    },
    {
      label: "Over",
      beats: [220, 476, 572],
    },
  ],
};

//--> calculates the number of words in the all song and adds it to data
const wordsNumberCalculator = (gameData) => {
  let totalLength = 0;
  gameData.wordsPosition.forEach((word) => {
    const filteredBeats = word.beats.filter((beat) => beat >= 0);
    totalLength += filteredBeats.length;
  });
  hsbfGameData.wordsNumber = totalLength;
  return totalLength;
};

wordsNumberCalculator(hsbfGameData);

export default hsbfGameData;
