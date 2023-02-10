const dialogFlow = {
  PlaySceneOne: {
    NPC1: {
      story: [
        "Oh hey! Hello. Haven't seen you in awhile. Heard you've been doing some adventuring on your own! Oh what I would give to go venture into the great unknow of the Big Forest...",
        "Anyways the Elder has been waiting to speak to you, something about the plant you've been seeking? He is somewhere up there near the Pits!",
      ],
      idle: [
        'Do you think the Great Fish exists? Wish I could see it someday...',
        'I will go on my own adventure too, just you wait!',
        'Being on guard duty sure is boring...',
      ],
    },
    NPC2: {
      story: [],
      idle: [
        '...',
        '...',
        '...Hng...Catnip...',
      ],
    },
  },
  // "PlaySceneTwo":,
  // "PlaySceneThree":
};
export default dialogFlow;
