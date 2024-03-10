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
    {
      label: "More than",
      beats: [128, 448, 544, 608, 672, 736],
    },
    {
      label: "Hour",
      beats: [136, 144, 456, 464, 552, 560, 616, 624, 680, 688, 744, 752],
    },
    {
      label: "Never",
      beats: [152, 472, 568, 632, 696, 760],
    },
    {
      label: "check synchro",
      beats: [
        -68, -72, -76, -80, -84, -88, -92, -96, -132, -136, -140, -144, -148,
        -152, -156, -160, -192, -196, -200, -204, -208, -212, -216, -220, -224,
        -256,
      ],
    },
    {
      label: "Ever",
      beats: [196, 452, 548, 612, 676, 740],
    },
    {
      label: "After",
      beats: [204, 460, 556, 620, 684, 748],
    },
    {
      label: "Work is",
      beats: [212, 468, 564, 628, 692, 756],
    },
    {
      label: "Over",
      beats: [220, 476, 572, 636, 700, 764],
    },
  ],
};

//--> calculates the number of words in the all song and adds it to data
const wordsNumberCalculator = (gameData) => {
  let totalLength = 0;
  gameData.wordsPosition.forEach((word) => {
    //--> filters the check synchro beats
    const filteredBeats = word.beats.filter((beat) => beat >= 0);
    totalLength += filteredBeats.length;
  });
  hsbfGameData.wordsNumber = totalLength;
  return totalLength;
};

wordsNumberCalculator(hsbfGameData);

export default hsbfGameData;
