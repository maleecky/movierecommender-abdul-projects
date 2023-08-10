let id = 1;
export const Questions = [
  {
    id: `question${id++}`,
    label: "How are you today?",
    options: ["Happy", "Neutral", "Sad"],
  },
  {
    id: `question${id++}`,
    label: "What comes closest to your occasion",
    options: [
      "Just watching a movie by myself",
      "Movie night with friend",
      "Watching a movie with family or relatives",
      "Date night with boyfriend or girlfriend",
    ],
  },
  {
    id: `question${id++}`,
    label: "Please choose the genre that you are interested in?",
    options: [],
    multiple: true,
  },
  {
    id: `question${id++}`,
    label:
      "On a scale of 0 to 10, how would you rate the movies you prefer to watch?",
    options: [],
    input: true,
  },
];
