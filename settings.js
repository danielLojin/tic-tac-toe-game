export let players;
export let board;

export const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const init = function () {
  players = [
    {
      name: "Player1",
      turn: true,
    },
    {
      name: "Player2",
      turn: false,
    },
  ];

  board = [
    {
      id: "1",
      isClicked: false,
    },
    {
      id: "2",
      isClicked: false,
    },
    {
      id: "3",
      isClicked: false,
    },
    {
      id: "4",
      isClicked: false,
    },
    {
      id: "5",
      isClicked: false,
    },
    {
      id: "6",
      isClicked: false,
    },
    {
      id: "7",
      isClicked: false,
    },
    {
      id: "8",
      isClicked: false,
    },
    {
      id: "9",
      isClicked: false,
    },
  ];
};
