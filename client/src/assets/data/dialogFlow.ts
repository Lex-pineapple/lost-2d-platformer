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
      story: ['...',
      '...',
      '...Hng...Catnip...'],
      idle: [
        '...',
        '...',
        '...Hng...Catnip...',
      ],
    },
    NPC3: {
      story: ["Wow you're back! Are you looking for the elder? He is just down the path. I would have shown you but  I've been waiting for the flower delivery all day and can't really and can't really leave my home..."],
      idle: [
        'Oh flowers... on my window...',
        "What is taking them so long? I'm growing impatient!",
      ],
    },
    NPC4: {
      story: ["Oh, oh! Look at you, you're all grown up now, my dear boy. It... came to my knowledge that you've been seeking the Magnetic Plant. Let me tell you  it's a tough goal you've chosen to pursue. Nothing good ever came from this idea...But if you wish for it... I will be your reluctant guide.",
      "Your goal lies in the Greenwood Forest but the only path to it has been blocked by an unbreakable door, and... I'm willing to give you a key though you shall head my warnings!",
      "The path lies through the Chrystal caves - a very... misleading place. It's endless passageways could lead you astray and you will be wandering the caves for all eternity, looking for a way out. Many souls have been lost in this place...",
      'If you manage to find your way out of caves though you will find yourselve in The Darlkling Woods - a dreadful place , these woods never knew the light of day, always being shrouded in darkness. And beyond that lies the Greenwood Forest - a peaceful place, but only open to ones who have went through the tough journey. There you will find your goal - The Magnetic Plant.',
      "I'm... not going to lie, your odds are not looking very good, but if you manage to complete your voyage successfully you will be praised as a hero! Oh, but I've been talking for a long time, must've tired you out. Off you go, my boy and be careful!"],
      idle: [
        "Don't look at me like that! I might be old but I'm not feeble.",
        '*Whistling*',
      ],
    },
  },
  PlaySceneTwo: {
    NPC1: {
      story: ['You! Yes you! What are you doing here?! No one have been here for almost 10 years! Oh I was so lonely! There are bugs, those creepy crawlies ugh... But they are no company! You on the other hand... Oh oh ha-ha-ha-ha!',
      "I feel weird... Haven't talked to anyone in a long time...",
      'Oh by the way you can go no further! There is a solid wall up ahead. Ha! Tough luck. Ha-ha-ha-ha!',
      "Oh if you want some entertainment there is a weird can lying around here somewhere, you can  play with it - but don't drink it! Aha-ha-ha-ha!"],
      idle: [
        '...',
        'hehehe',
      ],
    },
    NPC2: {
      story: ['Youre looking for the magnetic plant huh... There is someone living in the Darkling woods, a peculiar individual, speaks mostly in riddles, but... he might have some answers.',
      'Oh well, good luck...'],
      idle: [
        'I feel like someone is speaking to me... Might be echo...',
      ],
    },
    NPC3: {
      story: ['Hm? The woods? Go up. Up. Up. Beware of the monster.',
      'Mmm... mmm...',
      '...'],
      idle: [
        '...',
      ],
    },
  },
  PlaySceneThree: {
    NPC1: {
      story: ["Are you looking for me? Well it seems you have found me. The plant you've been searching for is indeed located just beyond the forest.",
      "But beware! The fateful meeting is right behind the corner, Sif is waiting for you... though you've gotten faster, am I right? He-he-he...",
      'Survive the night child and we might meet again...',
    'You might have reached your goal at the but your story have only just began. You must go. And remember...',
    'Never give up on your dreams.'],
      idle: [
        '...',
      ],
    },
  },
};
export default dialogFlow;
