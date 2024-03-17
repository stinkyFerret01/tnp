const hsbfGameData = {
  tempo: 121,
  beatMod: 393,
  skipTimePosition: 47,
  wordsPosition: [
    {
      label: "Work it",
      beats: [
        0, 256, 384, 512, 576, 640, 704, 768, 832, 960, 1023, 1090, 1153, 1218,
        1282, 1346,
      ],
    },
    {
      label: "Make it",
      beats: [
        8, 264, 392, 520, 584, 648, 712, 776, 840, 968, 1032, 1098, 1162, 1226,
        1354,
      ],
    },
    {
      label: "Do it",
      beats: [
        16, 272, 400, 528, 592, 656, 720, 783, 848, 975, 1039, 1106, 1169, 1233,
        1298, 1362,
      ],
    },
    {
      label: "Makes us",
      beats: [
        24, 280, 408, 536, 600, 664, 728, 792, 856, 984, 1048, 1114, 1178, 1243,
        1370,
      ],
    },
    {
      label: "Harder",
      beats: [
        68, 324, 388, 516, 580, 644, 708, 772, 836, 964, 1028, 1158, 1222, 1286,
        1350,
      ],
    },
    {
      label: "Better",
      beats: [
        76, 332, 396, 524, 588, 652, 716, 779, 844, 1035, 1102, 1165, 1229,
        1358,
      ],
    },
    {
      label: "Faster",
      beats: [
        84, 340, 404, 532, 596, 660, 724, 788, 852, 980, 1044, 1110, 1174, 1238,
        1302, 1366,
      ],
    },
    {
      label: "Stronger",
      beats: [
        92, 348, 412, 540, 604, 668, 732, 860, 1053, 1118, 1183, 1247, 1374,
      ],
    },
    {
      label: "More than",
      beats: [
        128, 448, 544, 608, 672, 736, 800, 864, 992, 1055, 1120, 1185, 1250,
        1314, 1378,
      ],
    },
    {
      label: "Hour",
      beats: [
        136, 144, 456, 464, 552, 560, 616, 624, 680, 688, 744, 752, 806, 816,
        872, 880, 1000, 1008, 1064, 1072, 1130, 1138, 1194, 1202, 1258, 1266,
        1330, 1386, 1394,
      ],
    },
    {
      label: "Never",
      beats: [
        152, 472, 568, 632, 696, 760, 824, 888, 1016, 1079, 1146, 1209, 1274,
        1338, 1402,
      ],
    },
    {
      label: "check synchro",
      beats: [
        -72, -80, -88, -96, -136, -144, -152, -160, -192, -200, -208, -216,
        -224, -256,
      ],
    },
    {
      label: "Ever",
      beats: [
        196, 452, 548, 612, 676, 740, 803, 868, 996, 1060, 1126, 1190, 1254,
        1318, 1382,
      ],
    },
    {
      label: "After",
      beats: [204, 460, 556, 620, 684, 748, 812, 876, 1005, 1390],
    },
    {
      label: "Work is",
      beats: [
        212, 468, 564, 628, 692, 756, 821, 884, 1012, 1076, 1141, 1206, 1269,
        1334, 1398,
      ],
    },
    {
      label: "Over",
      beats: [
        220, 476, 572, 636, 700, 764, 828, 892, 1019, 1084, 1149, 1214, 1277,
        1342, 1406,
      ],
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
