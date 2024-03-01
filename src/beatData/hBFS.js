const beatSets = [
  { label: "Work it", set: 1 },
  { label: "Make it", set: 1 },
  { label: "Do it", set: 1 },
  { label: "Makes us", set: 1 },
  { label: "Harder", set: 2 },
  { label: "Better", set: 2 },
  { label: "Faster", set: 2 },
  { label: "Stronger", set: 2 },
  { label: "More than", set: 3 },
  { label: "Hour", set: 3 },
  { label: "Never", set: 3 },
  { label: "", set: 3 },
  { label: "Ever", set: 4 },
  { label: "After", set: 4 },
  { label: "Work is", set: 4 },
  { label: "Over", set: 4 },
];

const wordEvents = [
  {
    word: "Work it",
    beat: [48, 107, 171, 203, 235, 251, 267, 283],
  },
  {
    word: "Make it",
    beat: [56, 109, 173, 205, 237, 253, 269, 285],
  },
  {
    word: "Do it",
    beat: [64, 111, 175, 207, 239, 255, 271, 287],
  },
  {
    word: "Makes us",
    beat: [72, 113, 177, 209, 241, 257, 273, 289],
  },
  {
    word: "Harder",
    beat: [16, 124, 188, 204, 236, 252, 268, 284],
  },
  {
    word: "Better",
    beat: [17, 126, 190, 206, 238, 254, 270, 286],
  },
  {
    word: "Faster",
    beat: [18, 128, 192, 208, 240, 256, 272, 288],
  },
  {
    word: "Stronger",
    beat: [19, 130, 194, 210, 242, 258, 274, 290],
  },
  {
    word: "More than",
    beat: [28, 139, 219, 243, 259, 275, 291],
  },
  {
    word: "Hour",
    beat: [29, 141, 143, 221, 223, 245, 247, 261, 263, 277, 279, 293, 295],
  },
  {
    word: "Never",
    beat: [30, 145, 225, 249, 265, 281, 297],
  },
  {
    word: "",
    beat: [31],
  },
  {
    word: "Ever",
    beat: [32, 156, 220, 244, 260, 276, 292],
  },
  {
    word: "After",
    beat: [33, 158, 222, 246, 262, 278, 294],
  },
  {
    word: "Work is",
    beat: [34, 160, 224, 248, 264, 280, 296],
  },
  {
    word: "Over",
    beat: [35, 162, 226, 250, 266, 282, 298],
  },
];

const beatRuleBuilder = () => {
  let beatRule = [];
  for (let i = 0; i < 461; i++) {
    let beat = i;
    let goodwords = [];
    for (let j = 0; j < beatRule.length; j++) {
      let label = beatSets[j].label;
      let set = beatSets[j].set;
      if (set.includes(beat)) {
        goodwords.push({ label: label, beatSet: set });
      }
    }
  }
};
