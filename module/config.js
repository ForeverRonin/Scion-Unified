export const exaltedthird = {};

//Localization doesn't work here for some reason
// exaltedthird.languages = {
//     "lowrealm": "Ex3.LowRealm",
//     "highrealm": "Ex3.HighRealm",
//     "oldrealm": "Ex3.OldRealm",
//     "dragontongue": "Ex3.Dragontongue",
//     "riverspeak": "Ex3.Riverspeak",
//     "skytongue": "Ex3.Skytongue",
//     "flametongue": "Ex3.Flametongue",
//     "foresttongue": "Ex3.Foresttongue",
//     "seatongue": "Ex3.Seatongue",
//     "guildcant": "Ex3.GuildCant",
//     "localtongue": "Ex3.LocalTongue",
// };

exaltedthird.activeEffectChanges = {
  '': 'Ex3.None',
  'system.attributes.strength.value': 'Ex3.Strength',
  'system.attributes.dexterity.value': 'Ex3.Dexterity',
  'system.attributes.stamina.value': 'Ex3.Stamina',
  'system.attributes.charisma.value': 'Ex3.Charisma',
  'system.attributes.manipulation.value': 'Ex3.Manipulation',
  'system.attributes.appearance.value': 'Ex3.Appearance',
  'system.attributes.perception.value': 'Ex3.Perception',
  'system.attributes.intelligence.value': 'Ex3.Intelligence',
  'system.attributes.wits.value': 'Ex3.Wits',
  'system.abilities.archery.value': 'Ex3.Archery',
  'system.abilities.athletics.value': 'Ex3.Athletics',
  'system.abilities.awareness.value': 'Ex3.Awareness',
  'system.abilities.brawl.value': 'Ex3.Brawl',
  'system.abilities.bureaucracy.value': 'Ex3.Bureaucracy',
  'system.abilities.craft.value': 'Ex3.Craft',
  'system.abilities.dodge.value': 'Ex3.Dodge',
  'system.abilities.integrity.value': 'Ex3.Integrity',
  'system.abilities.investigation.value': 'Ex3.Investigation',
  'system.abilities.larceny.value': 'Ex3.Larceny',
  'system.abilities.linguistics.value': 'Ex3.Linguistics',
  'system.abilities.lore.value': 'Ex3.Lore',
  'system.abilities.martialarts.value': 'Ex3.MartialArts',
  'system.abilities.medicine.value': 'Ex3.Medicine',
  'system.abilities.melee.value': 'Ex3.Melee',
  'system.abilities.occult.value': 'Ex3.Occult',
  'system.abilities.performance.value': 'Ex3.Performance',
  'system.abilities.presence.value': 'Ex3.Presence',
  'system.abilities.resistance.value': 'Ex3.Resistance',
  'system.abilities.ride.value': 'Ex3.Ride',
  'system.abilities.sail.value': 'Ex3.Sail',
  'system.abilities.socialize.value': 'Ex3.Socialize',
  'system.abilities.stealth.value': 'Ex3.Stealth',
  'system.abilities.survival.value': 'Ex3.Survival',
  'system.abilities.thrown.value': 'Ex3.Thrown',
  'system.abilities.war.value': 'Ex3.War',
  'system.appearance.value': 'Ex3.Appearance(NPC)',
  'system.pools.command.value': 'Ex3.Command(NPC)',
  'system.pools.grapple.value': 'Ex3.GrappleControl(NPC)',
  'system.pools.joinbattle.value': 'Ex3.JoinBattle(NPC)',
  'system.pools.movement.value': 'Ex3.Movement(NPC)',
  'system.pools.readintentions.value': 'Ex3.ReadIntentions(NPC)',
  'system.pools.resistance.value': 'Ex3.Resistance(NPC)',
  'system.pools.social.value': 'Ex3.Social(NPC)',
  'system.sorcery.value': 'Ex3.Sorcery(NPC)',
  "system.settings.rollsettings.attacks.bonus": "Ex3.Attacks",
  "system.settings.rollsettings.attackrollsettings.withering.bonus": "Ex3.WitheringAttacks",
  "system.settings.rollsettings.attackrollsettings.decisive.bonus": "Ex3.DecisiveAttacks",
  "system.settings.rollsettings.attackrollsettings.gambit.bonus": "Ex3.Gambits",
  "system.settings.rollsettings.attackrollsettings.withering.damage": "Ex3.WitheringAttackDamage",
  "system.settings.rollsettings.attackrollsettings.decisive.damage": "Ex3.DecisiveAttackDamage",
  "system.settings.rollsettings.attackrollsettings.gambit.damage": "Ex3.GambitInitiative",
  "system.settings.rollsettings.attackrollsettings.withering.overwhelming": "Ex3.Overwhelming",
  "system.settings.rollsettings.command.bonus": "Ex3.Command",
  "system.settings.rollsettings.craft.bonus": "Ex3.Craft",
  "system.settings.rollsettings.disengage.bonus": "Ex3.Disengage",
  "system.settings.rollsettings.grapplecontrol.bonus": "Ex3.GrappleControl",
  "system.settings.rollsettings.joinbattle.bonus": "Ex3.JoinBattle",
  "system.settings.rollsettings.readintentions.bonus": "Ex3.ReadIntentions",
  "system.settings.rollsettings.rush.bonus": "Ex3.Rush",
  "system.settings.rollsettings.social.bonus": "Ex3.Social",
  "system.settings.rollsettings.sorcery.bonus": "Ex3.Sorcery",
  "system.resolve.value": 'Ex3.Resolve',
  "system.guile.value": 'Ex3.Guile',
  "system.health.penaltymod": 'Ex3.HealthPenaltyModifier',
  "system.parry.value": 'Ex3.Parry',
  "system.evasion.value": 'Ex3.Evasion',
  "system.soak.value": 'Ex3.Soak',
  "system.naturalsoak.value": 'Ex3.NaturalSoak',
  "system.armoredsoak.value": 'Ex3.ArmoredSoak',
  "system.hardness.value": 'Ex3.Hardness',
  'system.effectivestrength.value': 'Ex3.EffectiveStrength',
  'system.dicemodifier.value': 'Ex3.DiceModifier',
  'system.baseinitiative.value': 'Ex3.BaseInitiative',
  'system.negateevasionpenalty.value': 'Ex3.NegateEvasionPenalty',
  'system.negateparrypenalty.value': 'Ex3.NegateParryPenalty',
  'system.motes.cost.round': 'Ex3.MoteCostPerRound',
  'system.motes.cost.turn': 'Ex3.MoteCostPerTurn',
  'system.damage.round.initiative.bashing': 'Ex3.InitiativeDamageRoundBashing',
  'system.damage.round.initiative.lethal': 'Ex3.InitiativeDamageRoundLethal',
  'system.damage.round.bashing': 'Ex3.BashingDamageRound',
  'system.damage.round.lethal': 'Ex3.LethalDamageRound',
  'system.damage.round.aggravated': 'Ex3.AggravatedDamageRound',
};

exaltedthird.equipmentStats = {
  light: {
    accuracy: 4,
    damage: 7,
    defense: 0,
    overwhelming: 1,
    attunement: 5,
    soak: 3,
    hardness: 0,
    penalty: 0,
  },
  medium: {
    accuracy: 2,
    damage: 9,
    defense: 1,
    overwhelming: 1,
    attunement: 5,
    soak: 5,
    hardness: 0,
    penalty: 1,
  },
  heavy: {
    accuracy: 0,
    damage: 11,
    defense: -1,
    overwhelming: 1,
    attunement: 5,
    soak: 7,
    hardness: 0,
    penalty: 2,
  },
  siege: {
    accuracy: -3,
    damage: 15,
    defense: 0,
    overwhelming: 3,
    attunement: 5,
  },
  bolt: {
    accuracy: 5,
    damage: 10,
    defense: 0,
    overwhelming: 1,
    attunement: 0,
  }
};
exaltedthird.artifactEquipmentStats = {
  light: {
    accuracy: 5,
    damage: 10,
    defense: 0,
    overwhelming: 3,
    attunement: 5,
    soak: 5,
    hardness: 4,
    penalty: 0,
  },
  medium: {
    accuracy: 3,
    damage: 12,
    defense: 1,
    overwhelming: 4,
    attunement: 5,
    soak: 8,
    hardness: 7,
    penalty: 1,
  },
  heavy: {
    accuracy: 1,
    damage: 14,
    defense: 0,
    overwhelming: 5,
    attunement: 5,
    soak: 11,
    hardness: 10,
    penalty: 2,
  },
  siege: {
    accuracy: -2,
    damage: 20,
    defense: 0,
    overwhelming: 5,
    attunement: 5,
  },
};

exaltedthird.targetableRollTypes = [
  'readIntentions',
  'social',
  'command',
  'accuracy',
  'damage',
  'withering',
  'decisive',
  'gambit',
  'withering-split',
  'decisive-split',
  'gambit-split',
]

exaltedthird.rollTypeTargetLabels = {
  readIntentions: "Ex3.ReadIntentions",
  social: "Ex3.Social",
  command: "Ex3.Command",
  grappleControl: "Ex3.GrappleControl",
  accuracy: "Ex3.Accuracy",
  damage: "Ex3.Damage",
  withering: "Ex3.Withering",
  decisive: "Ex3.Decisive",
  gambit: "Ex3.Gambit",
  'withering-split': "Ex3.Withering",
  'decisive-split': "Ex3.Decisive",
  'gambit-split': "Ex3.Gambit",
  'sorcery': "Ex3.Sorcery",
  'working': "Ex3.SorcerousWorking",
  'rush': 'Ex3.Movement',
  'disengage': 'Ex3.Dodge',
  'prophecy': 'Ex3.Prophecy',
  'steady': 'Ex3.Steady',
  'simpleCraft': 'Ex3.Craft',
  'craft': 'Ex3.Craft',
  'rout': 'Ex3.Rout',
  'joinBattle': 'Ex3.JoinBattle',
  'archery': 'Ex3.Archery',
  'athletics': 'Ex3.Athletics',
  'awareness': 'Ex3.Awareness',
  'brawl': 'Ex3.Brawl',
  'bureaucracy': 'Ex3.Bureaucracy',
  'dodge': 'Ex3.Dodge',
  'integrity': 'Ex3.Integrity',
  'investigation': 'Ex3.Investigation',
  'larceny': 'Ex3.Larceny',
  'linguistics': 'Ex3.Linguistics',
  'lore': 'Ex3.Lore',
  'martialarts': 'Ex3.MartialArts',
  'medicine': 'Ex3.Medicine',
  'melee': 'Ex3.Melee',
  'occult': 'Ex3.Occult',
  'performance': 'Ex3.Performance',
  'presence': 'Ex3.Presence',
  'resistance': 'Ex3.Resistance',
  'ride': 'Ex3.Ride',
  'sail': 'Ex3.Sail',
  'socialize': 'Ex3.Socialize',
  'stealth': 'Ex3.Stealth',
  'survival': 'Ex3.Survival',
  'thrown': 'Ex3.Thrown',
  'war': 'Ex3.War',
}

exaltedthird.rollTypeTargetImages = {
  readIntentions: "systems/exaltedthird/assets/icons/spy.svg",
  social: "systems/exaltedthird/assets/icons/heartburn.svg",
  command: "systems/exaltedthird/assets/icons/rally-the-troops.svg",
  grappleControl: "systems/exaltedthird/assets/icons/grab.svg",
  withering: "systems/exaltedthird/assets/icons/sword-clash.svg",
  decisive: "systems/exaltedthird/assets/icons/bloody-sword.svg",
  gambit: "systems/exaltedthird/assets/icons/punch-blast.svg",
  'withering-split': "systems/exaltedthird/assets/icons/sword-clash.svg",
  'decisive-split': "systems/exaltedthird/assets/icons/bloody-sword.svg",
  'gambit-split': "systems/exaltedthird/assets/icons/punch-blast.svg",
  'sorcery': 'systems/exaltedthird/assets/icons/magic-swirl.svg',
  'working': 'systems/exaltedthird/assets/icons/magic-portal.svg',
  'rush': 'systems/exaltedthird/assets/icons/sprint.svg',
  'disengage': 'systems/exaltedthird/assets/icons/dodging.svg',
  'prophecy': 'systems/exaltedthird/assets/icons/magic-portal.svg',
  'steady': 'icons/svg/upgrade.svg',
  'simpleCraft': 'systems/exaltedthird/assets/icons/anvil-impact.svg',
  'craft': 'systems/exaltedthird/assets/icons/anvil-impact.svg',
  'rout': 'systems/exaltedthird/assets/icons/tattered-banner.svg',
  'joinBattle': 'icons/svg/combat.svg',

  //Abilities
  'archery': 'systems/exaltedthird/assets/icons/striking-arrows.svg',
  'athletics': 'systems/exaltedthird/assets/icons/sprint.svg',
  'awareness': 'systems/exaltedthird/assets/icons/semi-closed-eye.svg',
  'brawl': 'systems/exaltedthird/assets/icons/fist.svg',
  'bureaucracy': 'systems/exaltedthird/assets/icons/progression.svg',
  'dodge': 'systems/exaltedthird/assets/icons/dodging.svg',
  'integrity': 'systems/exaltedthird/assets/icons/meditation.svg',
  'investigation': 'systems/exaltedthird/assets/icons/magnifying-glass.svg',
  'larceny': 'systems/exaltedthird/assets/icons/hooded-figure.svg',
  'linguistics': 'systems/exaltedthird/assets/icons/scroll-quill.svg',
  'lore': 'systems/exaltedthird/assets/icons/spell-book.svg',
  'martialarts': 'systems/exaltedthird/assets/icons/fist.svg',
  'medicine': 'systems/exaltedthird/assets/icons/caduceus.svg',
  'melee': 'icons/svg/sword.svg',
  'occult': 'systems/exaltedthird/assets/icons/magic-swirl.svg',
  'performance': 'systems/exaltedthird/assets/icons/musical-notes.svg',
  'presence': 'systems/exaltedthird/assets/icons/deadly-strike.svg',
  'resistance': 'systems/exaltedthird/assets/icons/fire-silhouette.svg',
  'ride': 'systems/exaltedthird/assets/icons/horse-head.svg',
  'sail':  'systems/exaltedthird/assets/icons/trireme.svg',
  'socialize': "systems/exaltedthird/assets/icons/heartburn.svg",
  'stealth': 'systems/exaltedthird/assets/icons/hidden.svg',
  'survival': 'systems/exaltedthird/assets/icons/forest-camp.svg',
  'thrown': 'systems/exaltedthird/assets/icons/thrown-daggers.svg',
  'war': "systems/exaltedthird/assets/icons/rally-the-troops.svg",
}

exaltedthird.exaltcharmtypes = {
  abyssal: "Ex3.Abyssal",
  alchemical: "Ex3.Alchemical",
  architect: "Ex3.Architect",
  dragonblooded: "Ex3.Dragonblooded",
  dreamsouled: "Ex3.DreamSouled",
  eclipse: "Ex3.Eclipse",
  evocation: "Ex3.Evocation",
  exigent: "Ex3.Exigent",
  getimian: "Ex3.Getimian",
  hearteater: "Ex3.Hearteater",
  infernal: "Ex3.Infernal",
  janest: "Ex3.Janest",
  liminal: "Ex3.Liminal",
  lunar: "Ex3.Lunar",
  martialarts: "Ex3.MartialArts",
  puppeteer: "Ex3.Puppeteer",
  sidereal: "Ex3.Sidereal",
  solar: "Ex3.Solar",
  sovereign: "Ex3.Sovereign",
  umbral: "Ex3.Umbral",
  other: "Ex3.Other"
};

exaltedthird.rolltypes = {
  attacks: "Ex3.Attacks",
  command: "Ex3.Command",
  craft: "Ex3.Craft",
  disengage: "Ex3.Disengage",
  grapplecontrol: "Ex3.GrappleControl",
  joinbattle: "Ex3.JoinBattle",
  readintentions: "Ex3.ReadIntentions",
  rush: "Ex3.Rush",
  social: "Ex3.Social",
  sorcery: "Ex3.Sorcery",
  steady: "Ex3.Steady",
};

exaltedthird.attackrolltypes = {
  "withering": "Ex3.Withering",
  "decisive": "Ex3.Decisive",
  "gambit": "Ex3.Gambit",
};

exaltedthird.statictypes = {
  "parry": "Ex3.Parry",
  "evasion": "Ex3.Evasion",
  "resolve": "Ex3.Resolve",
  "guile": "Ex3.Guile",
  "soak": "Ex3.Soak",
};

exaltedthird.castes = {
  solar: {
    '': 'Ex3.None',
    dawn: 'Ex3.Dawn',
    zenith: 'Ex3.Zenith',
    twilight: 'Ex3.Twilight',
    night: 'Ex3.Night',
    eclipse: 'Ex3.Eclipse',
  },
  lunar: {
    '': 'Ex3.None',
    fullmoon: 'Ex3.FullMoon',
    changingmoon: 'Ex3.ChangingMoon',
    nomoon: 'Ex3.NoMoon',
    casteless: 'Ex3.Casteless',
  },
  dragonblooded: {
    '': 'Ex3.None',
    air: 'Ex3.Air',
    earth: 'Ex3.Earth',
    fire: 'Ex3.Fire',
    water: 'Ex3.Water',
    wood: 'Ex3.Wood',
  },
  sidereal: {
    '': 'Ex3.None',
    journeys: 'Ex3.Journeys',
    serenity: 'Ex3.Serenity',
    battles: 'Ex3.Battles',
    secrets: 'Ex3.Secrets',
    endings: 'Ex3.Endings',
  },
  abyssal: {
    '': 'Ex3.None',
    dusk: 'Ex3.Dusk',
    midnight: 'Ex3.Midnight',
    daybreak: 'Ex3.Daybreak',
    day: 'Ex3.Day',
    moonshadow: 'Ex3.Moonshadow',
  },
  alchemical: {
    '': 'Ex3.None',
    adamant: 'Ex3.Adamant',
    jade: 'Ex3.Jade',
    moonsilver: 'Ex3.Moonsilver',
    orichalcum: 'Ex3.Orichalcum',
    soulsteel: 'Ex3.Soulsteel',
    starmetal: 'Ex3.Starmetal',
  },
  getimian: {
    '': 'Ex3.None',
    spring: 'Ex3.Spring',
    summer: 'Ex3.Summer',
    autumn: 'Ex3.Autumn',
    winter: 'Ex3.Winter',
  },
  infernal: {
    '': 'Ex3.None',
    azimuth: 'Ex3.Azimuth',
    ascendant: 'Ex3.Ascendant',
    horizon: 'Ex3.Horizon',
    nadir: 'Ex3.Nadir',
    penumbra: 'Ex3.Penumbra',
  },
  sovereign: {
    '': 'Ex3.None',
    diamond: 'Ex3.Diamond',
    emerald: 'Ex3.Emerald',
    opal: 'Ex3.Opal',
    ruby: 'Ex3.Ruby',
    sapphire: 'Ex3.Sapphire',
  },
  liminal: {
    '': 'Ex3.None',
    blood: 'Ex3.Blood',
    breath: 'Ex3.Breath',
    flesh: 'Ex3.Flesh',
    marrow: 'Ex3.Marrow',
    soil: 'Ex3.Soil',
  },
};

exaltedthird.attributes = {
  strength: 'Ex3.Strength',
  dexterity: 'Ex3.Dexterity',
  stamina: 'Ex3.Stamina',
  charisma: 'Ex3.Charisma',
  manipulation: 'Ex3.Manipulation',
  appearance: 'Ex3.Appearance',
  perception: 'Ex3.Perception',
  intelligence: 'Ex3.Intelligence',
  wits: 'Ex3.Wits',
};

exaltedthird.abilities = {
  archery: 'Ex3.Archery',
  athletics: 'Ex3.Athletics',
  awareness: 'Ex3.Awareness',
  brawl: 'Ex3.Brawl',
  bureaucracy: 'Ex3.Bureaucracy',
  craft: 'Ex3.Craft',
  dodge: 'Ex3.Dodge',
  integrity: 'Ex3.Integrity',
  investigation: 'Ex3.Investigation',
  larceny: 'Ex3.Larceny',
  linguistics: 'Ex3.Linguistics',
  lore: 'Ex3.Lore',
  martialarts: 'Ex3.MartialArts',
  medicine: 'Ex3.Medicine',
  melee: 'Ex3.Melee',
  occult: 'Ex3.Occult',
  performance: 'Ex3.Performance',
  presence: 'Ex3.Presence',
  resistance: 'Ex3.Resistance',
  ride: 'Ex3.Ride',
  sail: 'Ex3.Sail',
  socialize: 'Ex3.Socialize',
  stealth: 'Ex3.Stealth',
  survival: 'Ex3.Survival',
  thrown: 'Ex3.Thrown',
  war: 'Ex3.War',
};

exaltedthird.abilityMaidens = {
  archery: 'battles',
  athletics: 'endings',
  awareness: 'endings',
  brawl: 'battles',
  bureaucracy: 'endings',
  craft: 'serenity',
  dodge: 'serenity',
  integrity: 'endings',
  investigation: 'secrets',
  larceny: 'secrets',
  linguistics: 'serenity',
  lore: 'secrets',
  martialarts: '',
  medicine: 'endings',
  melee: 'battles',
  occult: 'secrets',
  performance: 'serenity',
  presence: 'battles',
  resistance: 'journeys',
  ride: 'journeys',
  sail: 'journeys',
  socialize: 'serenity',
  stealth: 'secrets',
  survival: 'journeys',
  thrown: 'journeys',
  war: 'battles',
};

exaltedthird.abilitiesList = [
  'archery',
  'athletics',
  'awareness',
  'brawl',
  'bureaucracy',
  'craft',
  'dodge',
  'integrity',
  'investigation',
  'larceny',
  'linguistics',
  'lore',
  'medicine',
  'melee',
  'occult',
  'performance',
  'presence',
  'resistance',
  'ride',
  'sail',
  'socialize',
  'stealth',
  'survival',
  'thrown',
  'war',
];

exaltedthird.abilityExalts = [
  'solar',
  'sidereal',
  'abyssal',
  'infernal'
]

exaltedthird.npcpools = {
  command: 'Ex3.Command',
  grapple: 'Ex3.GrappleControl',
  joinbattle: 'Ex3.JoinBattle',
  movement: 'Ex3.Movement',
  resistance: 'Ex3.Resistance',
  readintentions: 'Ex3.ReadIntentions',
  social: 'Ex3.Social',
  sorcery: 'Ex3.Sorcery',
};

exaltedthird.charmabilities = {
  offensive: 'Ex3.Offensive',
  defensive: 'Ex3.Defensive',
  social: 'Ex3.Social',
  mobility: 'Ex3.Mobility',
  strength: 'Ex3.Strength',
  dexterity: 'Ex3.Dexterity',
  stamina: 'Ex3.Stamina',
  charisma: 'Ex3.Charisma',
  manipulation: 'Ex3.Manipulation',
  appearance: 'Ex3.Appearance',
  perception: 'Ex3.Perception',
  intelligence: 'Ex3.Intelligence',
  wits: 'Ex3.Wits',
  archery: 'Ex3.Archery',
  athletics: 'Ex3.Athletics',
  awareness: 'Ex3.Awareness',
  battles: 'Ex3.Battles',
  brawl: 'Ex3.Brawl',
  bureaucracy: 'Ex3.Bureaucracy',
  craft: 'Ex3.Craft',
  dodge: 'Ex3.Dodge',
  endings: 'Ex3.Endings',
  integrity: 'Ex3.Integrity',
  investigation: 'Ex3.Investigation',
  journeys: 'Ex3.Journeys',
  larceny: 'Ex3.Larceny',
  linguistics: 'Ex3.Linguistics',
  lore: 'Ex3.Lore',
  martialarts: 'Ex3.MartialArts',
  medicine: 'Ex3.Medicine',
  melee: 'Ex3.Melee',
  occult: 'Ex3.Occult',
  performance: 'Ex3.Performance',
  presence: 'Ex3.Presence',
  resistance: 'Ex3.Resistance',
  ride: 'Ex3.Ride',
  sail: 'Ex3.Sail',
  secrets: 'Ex3.Secrets',
  serenity: 'Ex3.Serenity',
  socialize: 'Ex3.Socialize',
  stealth: 'Ex3.Stealth',
  survival: 'Ex3.Survival',
  thrown: 'Ex3.Thrown',
  war: 'Ex3.War',
  evocation: 'Ex3.Evocation',
  other: 'Ex3.Other',
  universal: 'Ex3.Universal',
};

exaltedthird.charmAbilitiesSectioned = {
  abilities: {
    label: "Ex3.Abilities",
    entries: {
      archery: 'Ex3.Archery',
      athletics: 'Ex3.Athletics',
      awareness: 'Ex3.Awareness',
      brawl: 'Ex3.Brawl',
      bureaucracy: 'Ex3.Bureaucracy',
      craft: 'Ex3.Craft',
      dodge: 'Ex3.Dodge',
      integrity: 'Ex3.Integrity',
      investigation: 'Ex3.Investigation',
      larceny: 'Ex3.Larceny',
      linguistics: 'Ex3.Linguistics',
      lore: 'Ex3.Lore',
      martialarts: 'Ex3.MartialArts',
      medicine: 'Ex3.Medicine',
      melee: 'Ex3.Melee',
      occult: 'Ex3.Occult',
      performance: 'Ex3.Performance',
      presence: 'Ex3.Presence',
      resistance: 'Ex3.Resistance',
      ride: 'Ex3.Ride',
      sail: 'Ex3.Sail',
      socialize: 'Ex3.Socialize',
      stealth: 'Ex3.Stealth',
      survival: 'Ex3.Survival',
      thrown: 'Ex3.Thrown',
      war: 'Ex3.War',
    },
  },
  attributes: {
    label: "Ex3.Attributes",
    entries: {
      strength: 'Ex3.Strength',
      dexterity: 'Ex3.Dexterity',
      stamina: 'Ex3.Stamina',
      charisma: 'Ex3.Charisma',
      manipulation: 'Ex3.Manipulation',
      appearance: 'Ex3.Appearance',
      perception: 'Ex3.Perception',
      intelligence: 'Ex3.Intelligence',
      wits: 'Ex3.Wits',
    },
  },
  maidens: {
    label: "Ex3.Maidens",
    entries: {
      journeys: 'Ex3.Journeys',
      serenity: 'Ex3.Serenity',
      battles: 'Ex3.Battles',
      secrets: 'Ex3.Secrets',
      endings: 'Ex3.Endings',
    },
  },
  npc: {
    label: "Ex3.NPC",
    entries: {
      offensive: 'Ex3.Offensive',
      defensive: 'Ex3.Defensive',
      mobility: 'Ex3.Mobility',
      social: 'Ex3.Social',
    },
  },
  other: {
    label: "Ex3.Other",
    entries: {
      evocation: 'Ex3.Evocation',
      universal: 'Ex3.Universal',
      other: 'Ex3.Other',
    },
  },
  custom: {
    label: "Ex3.Custom",
    entries: {},
  }
};

exaltedthird.circles = {
  terrestrial: 'Ex3.Terrestrial',
  celestial: 'Ex3.Celestial',
  solar: 'Ex3.Solar',
  ivory: 'Ex3.Ivory',
  shadow: 'Ex3.Shadow',
  void: 'Ex3.Void',
};

exaltedthird.languages = {
  "lowrealm": "Low Realm",
  "highrealm": "High Realm",
  "oldrealm": "Old Realm",
  "dragontongue": "Dragontongue",
  "riverspeak": "Riverspeak",
  "skytongue": "Skytongue",
  "flametongue": "Flametongue",
  "foresttongue": "Foresttongue",
  "seatongue": "Seatongue",
  "guildcant": "Guild Cant",
  "localtongue": "Local Tongue",
};

exaltedthird.resonance = {
  "adamant": "Adamant",
  "orichalcum": "Orichalcum",
  "moonsilver": "Moonsilver",
  "starmetal": "Starmetal",
  "soulsteel": "Soulsteel",
  "blackjade": "Black Jade",
  "bluejade": "Blue Jade",
  "greenjade": "Green Jade",
  "redjade": "Red Jade",
  "whitejade": "White Jade",
};

exaltedthird.dissonance = {
  "adamant": "Adamant",
  "orichalcum": "Orichalcum",
  "moonsilver": "Moonsilver",
  "starmetal": "Starmetal",
  "soulsteel": "Soulsteel",
  "blackjade": "Black Jade",
  "bluejade": "Blue Jade",
  "greenjade": "Green Jade",
  "redjade": "Red Jade",
  "whitejade": "White Jade",
};

exaltedthird.weapons = {
  "axes": "Axes",
  "batons": "Batons",
  "bows": "Bows",
  "cestus": "Cestus",
  "chakrams": "Chakrams",
  "choppingswords": "Chopping Swords",
  "crossbows": "Crossbows",
  "dualswords": "Dual Swords",
  "flame": "Flame Weapons",
  "fightingchains": "Fighting Chains",
  "garrotes": "Garrotes",
  "greatswords": "Greatswords",
  "handneedles": "Hand-Needles",
  "hookswords": "Hook Swords",
  "improvised": "Improvised Weapons",
  "ironboots": "Iron Boots",
  "kamas": "Kamas",
  "khatars": "Khatars",
  "kiais": "Kiais",
  "knives": "Knives",
  "kusarigamas": "Kusarigamas",
  "melee": "Melee Weapons",
  "meteorhammers": "Meteor Hammers",
  "nunchakus": "Nunchakus",
  "pairedswords": "Paired Swords",
  "ropedarts": "Rope Darts",
  "sais": "Sais",
  "scythes": "Scythes",
  "sevenectionstaffs": "Seven-Section Staffs",
  "shortswords": "Short Swords",
  "straightswords": "Straight Swords",
  "spears": "Spears",
  "staffs": "Staffs",
  "slashingswords": "Slashing Swords",
  "tetsubos": "Tetsubos",
  "tigerclaws": "Tiger Claws",
  "unarmed": "Unarmed",
  "warfans": "War Fans",
  "windandfirewheels": "Wind-and-Fire Wheels",
  "whips": "Whips"
};

exaltedthird.weapontags = {
  "aggravated": "Aggravated",
  "archery": "Archery",
  "artifact": "Artifact",
  "balanced": "Balanced",
  "bashing": "Bashing",
  "binding": "Binding",
  "bombard": "Bombard",
  "brawl": "Brawl",
  "chopping": "Chopping",
  "concealable": "Concealable",
  "crossbow": "Crossbow",
  "cutting": "Cutting",
  "disarming": "Disarming",
  "extreme": "Extreme Range",
  "flame": "Flame",
  "flexible": "Flexible",
  "improvised": "Improvised",
  "grappling": "Grappling",
  "lance": "Lance",
  "lethal": "Lethal",
  "long": "Long Range",
  "magicdamage": "Magic Damage",
  "martialarts": "Martial Arts",
  "medium": "Medium Range",
  "melee": "Melee",
  "mounted": "Mounted",
  "natural": "Natural",
  "onehande": "One-Handed",
  "piercing": "Piercing",
  "poisonable": "Poisonable",
  "powerful": "Powerful",
  "reaching": "Reaching",
  "shield": "Shield",
  "short": "Short Range",
  "slow": "Slow",
  "siege": "Siege",
  "smashing": "Smashing",
  "special": "Special",
  "subtle": "Subtle",
  "thrown": "Thrown",
  "twohanded": "Two-Handed",
  "unblockable": "Unblockable",
  "undodgeable": "Undodgeable",
  "worn": "Worn",
};

exaltedthird.armortags = {
  "artifact": "Artifact",
  "buoyant": "Buoyant",
  "concealable": "Concealable",
  "silent": "Silent",
};

exaltedthird.martialarts = [
  "Snake Style",
  "Tiger Style",
  "Single Point Shining Into the Void Style",
  "White Reaper Style",
  "Ebon Shadow Style",
  "Crane Style",
  "Silver-Voiced Nightingale Style",
  "Righteous Devil Style",
  "Black Claw Style",
  "Dreaming Pearl Courtesan Style",
  "Steel Devil Style",
  "Air Dragon Style",
  "Earth Dragon Style",
  "Fire Dragon Style",
  "Water Dragon Style",
  "Wood Dragon Style",
  "Golden Janissary Style",
  "Mantis Style",
  "White Veil Style",
  "Centipede Style",
  "Falcon Style",
  "Laughing Monster Style",
  "Swaying Grass Style",
  "Throne Shadow Style",
  "Violet Bier of Sorrows Style",
  "Hungry Ghost Style",
];


exaltedthird.casteabilitiesmap = {
  'dawn': [
    'archery', 'awareness', 'brawl', 'martialarts', 'dodge', 'melee', 'resistance', 'thrown', 'war'
  ],
  'zenith': [
    'athletics', 'integrity', 'performance', 'lore', 'presence', 'resistance', 'survival', 'war',
  ],
  'twilight': [
    'bureaucracy', 'craft', 'integrity', 'investigation', 'linguistics', 'lore', 'medicine', 'occult'
  ],
  'night': [
    'athletics', 'awareness', 'dodge', 'investigation', 'larceny', 'ride', 'stealth', 'socialize'
  ],
  'eclipse': [
    'bureaucracy', 'larceny', 'linguistics', 'occult', 'presence', 'ride', 'sail', 'socialize'
  ],
  'air': [
    'linguistics', 'lore', 'occult', 'stealth', 'thrown'
  ],
  'earth': [
    'awareness', 'craft', 'integrity', 'resistance', 'war'
  ],
  'fire': [
    'athletics', 'dodge', 'melee', 'presence', 'socialize'
  ],
  'water': [
    'brawl', 'martialarts', 'bureaucracy', 'investigation', 'larceny', 'sail'
  ],
  'wood': [
    'archery', 'medicine', 'performance', 'ride', 'survival'
  ],
  'fullmoon': [
    'dexterity', 'stamina', 'strength'
  ],
  'changingmoon': [
    'appearance', 'charisma', 'manipulation'
  ],
  'nomoon': [
    'intelligence', 'perception', 'wits'
  ],
  'journeys': [
    'resistance', 'ride', 'sail', 'survival', 'thrown', 'martialarts'
  ],
  'serenity': [
    'craft', 'dodge', 'linguistics', 'performance', 'socialize', 'martialarts'
  ],
  'battles': [
    'archery', 'brawl', 'melee', 'presence', 'war', 'martialarts'
  ],
  'secrets': [
    'investigation', 'larceny', 'lore', 'occult', 'stealth', 'martialarts'
  ],
  'endings': [
    'athletics', 'awareness', 'bureaucracy', 'integrity', 'medicine', 'martialarts'
  ],
  'janest': [
    'athletics', 'awareness', 'presence', 'resistance', 'survival'
  ],
  'strawmaiden': [
    'athletics', 'awareness', 'presence', 'resistance', 'survival'
  ],
  'sovereign': [
    'craft', 'integrity', 'performance', 'socialize', 'war'
  ],
  'puppeteer': [
    'craft', 'larceny', 'performance'
  ],
  'dusk': [
    'archery', 'athletics', 'brawl', 'melee', 'resistance', 'ride', 'thrown', 'war',
  ],
  'midnight': [
    'integrity', 'larceny', 'linguistics', 'lore', 'performance', 'presence', 'resistance', 'survival',
  ],
  'daybreak': [
    'awareness', 'bureaucracy', 'craft', 'investigation', 'lore', 'medicine', 'occult', 'sail'
  ],
  'day': [
    'athletics', 'awareness', 'investigation', 'dodge', 'larceny', 'socialize', 'stealth', 'survival',
  ],
  'moonshadow': [
    'bureaucracy', 'integrity', 'linguistics', 'occult', 'presence', 'ride', 'sail', 'socialize'
  ],
};

exaltedthird.maidenabilities = {
  'journeys': [
    'resistance', 'ride', 'sail', 'survival', 'thrown', 'journeys'
  ],
  'serenity': [
    'craft', 'dodge', 'linguistics', 'performance', 'socialize', 'serenity'
  ],
  'battles': [
    'archery', 'brawl', 'melee', 'presence', 'war', 'battles'
  ],
  'secrets': [
    'investigation', 'larceny', 'lore', 'occult', 'stealth', 'secrets'
  ],
  'endings': [
    'athletics', 'awareness', 'bureaucracy', 'integrity', 'medicine', 'endings'
  ],
}

exaltedthird.statusEffects = [
  {
    icon: 'systems/exaltedthird/assets/icons/targeting.svg',
    id: 'aiming',
    label: 'Ex3.Aiming',
    name: 'aiming',
    description: '<p>Character is aiming, can make ranged attacked beyond short range.  Aiming again or at short range gives +3 dice to attack rolls.</p>'
  },
  {
    icon: 'icons/svg/falling.svg',
    id: 'prone',
    label: 'Ex3.Prone',
    name: 'prone',
    description: '<p>Character suffers a -3 penalty to attack rolls, -1 to Parry, and -2 to Evasion</p>'
  },
  {
    icon: 'icons/svg/ruins.svg',
    id: 'lightcover',
    label: 'Ex3.LightCover',
    name: 'lightcover',
    description: "<p>Character is behind light cover, Character adds +1 to Defense</p>"
  },
  {
    icon: 'icons/svg/castle.svg',
    id: 'heavycover',
    label: 'Ex3.HeavyCover',
    name: 'heavycover',
    description: "<p>Character is behind heavy cover, +2 to Defense</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/brick-wall.svg',
    id: 'fullcover',
    label: 'Ex3.FullCover',
    name: 'fullcover',
    description: "<p>Character cannot be targeted, if a opponent has an ability to target her anyway add +3 to Defense</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/grab.svg',
    id: 'grappled',
    label: 'Ex3.Grappled',
    name: 'grappled',
    description: "<p>Character is grapped by an opponent, -2 to Defense and -1 die to attack rolls</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/shaking-hands.svg',
    id: 'grappling',
    label: 'Ex3.Grappling',
    name: 'grappling',
    description: "<p>Character has initiated a grapple, -2 to Defense</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/drop-weapon.svg',
    id: 'disarmed',
    label: 'Ex3.Disarmed',
    name: 'disarmed',
  },
  {
    icon: 'icons/svg/shield.svg',
    id: 'fulldefense',
    label: 'Ex3.FullDefense',
    name: 'fulldefense',
    description: "<p>Character has taken the Full Defense action, +2 to Defense</p>"
  },
  {
    icon: 'icons/svg/daze.svg',
    id: 'surprised',
    label: 'Ex3.Surprised',
    name: 'surprised',
    description: "<p>Character is suprised, -2 Defense</p>"
  },
  {
    icon: 'icons/svg/blood.svg',
    id: 'bleeding',
    label: 'EFFECT.StatusBleeding',
    name: 'bleeding',
    description: ""
  },
  {
    icon: 'icons/svg/poison.svg',
    id: 'poisoned',
    label: 'EFFECT.StatusPoison',
    name: 'poisoned',
  },
  {
    icon: 'icons/svg/fire.svg',
    id: 'burning',
    label: 'EFFECT.StatusBurning',
    name: 'burning',
  },
  {
    icon: 'icons/svg/invisible.svg',
    id: 'dematerialized',
    label: 'Ex3.Dematerialized',
    name: 'dematerialized',
    description: "<p>Character is dematerialized, cannot be attacked without special techniques or magic.</p>"
  },
  {
    icon: 'icons/svg/blind.svg',
    id: 'blind',
    label: 'EFFECT.StatusBlind',
    name: 'blind',
    description: "<p>Character is blinded, -3 Dice to all rolls</p>"
  },
  {
    icon: 'icons/svg/paralysis.svg',
    id: 'paralyzed',
    label: 'Ex3.Paralyzed',
    name: 'paralyzed',
  },
  {
    icon: 'systems/exaltedthird/assets/icons/cobweb.svg',
    id: 'entangled',
    label: 'Ex3.Entangled',
    name: 'entangled',
    description: "<p>Character is entangled, +1 Mobility Penalty.</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/horse-head.svg',
    id: 'mounted',
    label: 'Ex3.Mounted',
    description: "<p>Character is mounted, +1 Defense and +1 die to attack rolls unless attacker has the reaching tag.</p>"
  },
  {
    icon: 'systems/exaltedthird/assets/icons/hidden.svg',
    id: 'hidden',
    label: 'Ex3.Hidden',
  },
  {
    icon: 'icons/svg/skull.svg',
    id: 'incapacitated',
    label: 'Ex3.Incapacitated',
  },
]

exaltedthird.siderealSigns = {
  journeys: {
    label: "Journeys",
    signs: {
      captain: "Ex3.Captain",
      gull: "Ex3.Gull",
      mast: "Ex3.Captain",
      messenger: "Ex3.Messenger",
      shipswheel: "Ex3.ShipsWheel",
    },
  },
  serenity: {
    label: "Serenity",
    signs: {
      ewer: "Ex3.Ewer",
      lovers: "Ex3.Lovers",
      musician: "Ex3.Musician",
      peacock: "Ex3.Peacock",
      pillar: "Ex3.Pillar",
    },
  },
  battles: {
    label: "Battles",
    signs: {
      banner: "Ex3.Banner",
      gauntlet: "Ex3.Gauntlet",
      quiver: "Ex3.Quiver",
      shield: "Ex3.Shield",
      spear: "Ex3.Spear",
    },
  },
  secrets: {
    label: "Secrets",
    signs: {
      gaurdians: "Ex3.Gaurdians",
      key: "Ex3.Key",
      mask: "Ex3.Mask",
      sorcerer: "Ex3.Sorcerer",
      treasuretrove: "Ex3.TreasureTrove",
    },
  },
  endings: {
    label: "Endings",
    signs: {
      corpse: "Ex3.Corpse",
      crow: "Ex3.Crow",
      haywain: "Ex3.Haywain",
      risingsmoke: "Ex3.RisingSmoke",
      sword: "Ex3.Sword",
    },
  },
  none: {
    label: "None",
    signs: {
      '': 'Ex3.None',
    }
  }
}

exaltedthird.oxBody = {
  'solar': {
    zero: {
      zero: 0,
      one: 1,
      two: 1,
      four: 0,
    },
    three: {
      zero: 0,
      one: 1,
      two: 2,
      four: 0,
    },
    five: {
      zero: 1,
      one: 1,
      two: 1,
      four: 0,
    },
  },
  'abyssal': {
    zero: {
      zero: 0,
      one: 1,
      two: 1,
      four: 0,
    },
    three: {
      zero: 0,
      one: 1,
      two: 2,
      four: 0,
    },
    five: {
      zero: 1,
      one: 1,
      two: 1,
      four: 0,
    },
  },
  'lunar': {
    zero: {
      zero: 0,
      one: 0,
      two: 2,
      four: 0,
    },
    three: {
      zero: 0,
      one: 0,
      two: 2,
      four: 1,
    },
    five: {
      zero: 0,
      one: 0,
      two: 2,
      four: 2,
    },
  },
  'dragonblooded': {
    zero: {
      zero: 0,
      one: 0,
      two: 2,
      four: 0,
    },
    three: {
      zero: 0,
      one: 1,
      two: 1,
      four: 0,
    },
    five: {
      zero: 0,
      one: 1,
      two: 2,
      four: 0,
    },
  },
  'sidereal': {
    zero: {
      zero: 1,
      one: 0,
      two: 0,
      four: 0,
    },
    three: {
      zero: 1,
      one: 1,
      two: 0,
      four: 0,
    },
    five: {
      zero: 2,
      one: 0,
      two: 0,
      four: 0,
    },
  },
  'puppeteer': {
    zero: {
      zero: 0,
      one: 0,
      two: 2,
      four: 0,
    },
    three: {
      zero: 0,
      one: 1,
      two: 1,
      four: 0,
    },
    five: {
      zero: 0,
      one: 2,
      two: 0,
      four: 0,
    },
  },
  'architect': {
    zero: {
      zero: 0,
      one: 0,
      two: 2,
      four: 0,
    },
    three: {
      zero: 0,
      one: 0,
      two: 2,
      four: 1,
    },
    five: {
      zero: 0,
      one: 1,
      two: 2,
      four: 0,
    },
  },
  'sovereign': {
    zero: {
      zero: 0,
      one: 0,
      two: 1,
      four: 1,
    },
    three: {
      zero: 0,
      one: 0,
      two: 1,
      four: 2,
    },
    five: {
      zero: 0,
      one: 0,
      two: 1,
      four: 3,
    },
  },
};

exaltedthird.weaponStats = {
  light: {
    accuracy: 4,
    damage: 7,
    defense: 0,
    overwhelming: 1,
    attunement: 5,
  },
  medium: {
    accuracy: 2,
    damage: 9,
    defense: 1,
    overwhelming: 1,
    attunement: 5,
  },
  heavy: {
    accuracy: 0,
    damage: 11,
    defense: -1,
    overwhelming: 1,
    attunement: 5,
  },
  siege: {
    accuracy: -3,
    damage: 15,
    defense: 0,
    overwhelming: 3,
    attunement: 5,
  },
};
exaltedthird.artifactWeaponStats = {
  light: {
    accuracy: 5,
    damage: 10,
    defense: 0,
    overwhelming: 3,
    attunement: 5,
  },
  medium: {
    accuracy: 3,
    damage: 12,
    defense: 1,
    overwhelming: 4,
    attunement: 5,
  },
  heavy: {
    accuracy: 1,
    damage: 14,
    defense: 0,
    overwhelming: 5,
    attunement: 5,
  },
  siege: {
    accuracy: -2,
    damage: 20,
    defense: 0,
    overwhelming: 5,
    attunement: 5,
  },
};

exaltedthird.armorStats = {
  light: {
    attunement: 0,
    soak: 3,
    hardness: 0,
    penalty: 0,
  },
  medium: {
    attunement: 0,
    soak: 5,
    hardness: 0,
    penalty: 1,
  },
  heavy: {
    attunement: 0,
    soak: 7,
    hardness: 0,
    penalty: 2,
  },
};
exaltedthird.artifactArmorStats = {
  light: {
    attunement: 4,
    soak: 5,
    hardness: 4,
    penalty: 0,
  },
  medium: {
    attunement: 5,
    soak: 8,
    hardness: 7,
    penalty: 1,
  },
  heavy: {
    attunement: 6,
    soak: 11,
    hardness: 10,
    penalty: 2,
  },
};

exaltedthird.maidens = [
  "journeys",
  "serenity",
  "battles",
  "secrets",
  "endings"
];

exaltedthird.bonusTypes = {
  none: {
    label: "Ex3.None",
    bonuses: {
      "": "Ex3.None",
    }
  },
  diceRoll: {
    label: "Ex3.DiceRoll",
    bonuses: {
      diceModifier: "Ex3.DiceModifier",
      successModifier: "Ex3.SuccessModifier",
      doubleSuccess: "Ex3.DoubleSuccess",
      decreaseTargetNumber: "Ex3.DecreaseTargetNumber",
      rerollNumber: "Ex3.RerollNumberDice",
      diceToSuccesses: "Ex3.DicetoSuccesses",
      reduceDifficulty: "Ex3.ReduceDifficulty",
      rerollDieFace: "Ex3.RerollDieFace",
      rollTwice: "Ex3.RollTwiceKeepHighest",
      excludeOnes: "Ex3.ExcludeOnesFromRerolls",
      rerollFailed: "Ex3.RerollFailed",
      triggerOnTens: "Ex3.TriggerTens",
      triggerNinesAndTens: "Ex3.TriggerNines&Tens",
      triggerTensCap: "Ex3.TriggerTensCap",
      fullExcellency: "Ex3.FullExcellency"
    },
  },
  damage: {
    label: "Ex3.Damage",
    bonuses: {
      damageDice: "Ex3.DamageDiceModifier",
      damageSuccessModifier: "Ex3.DamageSuccessModifier",
      'doubleSuccess-damage': "Ex3.DamageDoubleSuccess",
      'diceToSuccesses-damage': "Ex3.DamageDicetoSuccesses",
      'decreaseTargetNumber-damage': "Ex3.DamageDecreaseTargetNumber",
      'rerollDieFace-damage': "Ex3.DamageRerollDieFace",
      'rerollNumber-damage': "Ex3.DamageRerollNumberDice",
      'rollTwice-damage': "Ex3.DamageRollTwiceKeepHighest",
      'excludeOnes-damage': "Ex3.DamageExcludeOnesFromRerolls",
      'rerollFailed-damage': "Ex3.DamageRerollFailed",
      'triggerOnTens-damage': "Ex3.DamageTriggerTens",
      'triggerTensCap-damage': "Ex3.DamageTriggerTensCap",
      'triggerNinesAndTens-damage': "Ex3.DamageTriggerNines&Tens",
      threshholdToDamage: "Ex3.ThreshholdToDamage",
      doubleRolledDamage: "Ex3.DoubleRolledDamage",
      resetInit: "Ex3.ResetInitiative",
      ignoreSoak: "Ex3.IgnoreSoak",
      ignoreHardness: "Ex3.IgnoreHardness",
      overwhelming: "Ex3.Overwhelming",
      postSoakDamage: "Ex3.PostSoakDamage",
      reduceGambitDifficulty: "Ex3.ReduceGambitDifficulty",
      setDamageType: "Ex3.SetDamageType",
    }
  },
  spend: {
    label: "Ex3.Spend",
    bonuses: {
      'motes-spend': "Ex3.SpendMotes",
      'muteMotes-spend': "Ex3.SpendMuteMotes",
      'initiative-spend': "Ex3.SpendInitiative",
      'anima-spend': "Ex3.SpendAnima",
      'willpower-spend': "Ex3.SpendWillpower",
      'grappleControl-spend': "Ex3.SpendGrappleControl",
      'health-spend': "Ex3.SpendHealth",
      'aura-spend': "Ex3.SpendAura",
      'penumbra-spend': "Ex3.SpendPenumbra",
      'silverxp-spend': "Ex3.SpendSilverXP",
      'goldxp-spend': "Ex3.SpendGoldXP",
      'whitexp-spend': "Ex3.SpendWhiteXP",
    }
  },
  restore: {
    label: "Ex3.Restore",
    bonuses: {
      'motes-restore': "Ex3.RestoreMotes",
      'willpower-restore': "Ex3.RestoreWillpower",
      'health-restore': "Ex3.RestoreHealth",
      'initiative-restore': "Ex3.RestoreInitiative",
    }
  },
  steal: {
    label: "Ex3.Steal",
    bonuses: {
      'motes-steal': "Ex3.StealMotes",
      'initiative-steal': "Ex3.StealInitiative",
    }
  },
  other: {
    label: "Ex3.Other",
    bonuses: {
      triggerSelfDefensePenalty: "Ex3.SelfDefensePenalty",
      triggerTargetDefensePenalty: "Ex3.TargetDefensePenalty",
      activateAura: "Ex3.ActivateAura",
      ignoreLegendarySize: "Ex3.IgnoreLegendarySize",
      inflictDicePenalty: "Ex3.InflictDicePenalty",
      displayMessage: "Ex3.DisplayMessage",
    }
  },
  defense: {
    label: "Ex3.Defense",
    bonuses: {
      defense: "Ex3.Defense",
      soak: "Ex3.Soak",
      hardness: "Ex3.Hardness",
      resolve: "Ex3.Resolve",
      guile: "Ex3.Guile",
    }
  }
}

exaltedthird.requirementTypes = {
  none: {
    label: "Ex3.None",
    requirements: {
      "": "Ex3.None"
    }
  },
  roll: {
    label: "Ex3.Roll",
    requirements: {
      attackType: "Ex3.AttackType",
      charmAddedAmount: "Ex3.CharmAddedAmount",
      range: "Ex3.Range",
    },
  },
  character: {
    label: "Ex3.Character",
    requirements: {
      hasAura: 'Ex3.HasAura',
      martialArtsLevel: "Ex3.MartialArtsTier",
      smaEnlightenment: "Ex3.SMAEnlightenment",
      materialResonance: "Ex3.MaterialResonance",
      materialStandard: "Ex3.MaterialStandard",
      materialDissonance: "Ex3.MaterialDissonance",
      formula: "Ex3.Formula",
      hasStatus: "Ex3.HasStatus",
    },
  },
  target: {
    label: "Ex3.Target",
    requirements: {
      targetHasStatus: "Ex3.TargetHasStatus",
      targetIsBattlegroup: "Ex3.TargetIsBattlegroup",
      targetIsCrashed: "Ex3.TargetIsCrashed",
    },
  },
  rollResults: {
    label: "Ex3.RollResults",
    requirements: {
      thresholdSuccesses: "Ex3.ThresholdSuccesses",
      initiativeDamageDealt: "Ex3.InitiativeDamageDealt",
      damageLevelsDealt: "Ex3.DamageLevelsDealt",
      crashedTheTarget: "Ex3.CrashedTheTarget",
    },
  },
}

exaltedthird.selects = {
  exaltTypes: {
    abyssal: "Ex3.Abyssal",
    alchemical: "Ex3.Alchemical",
    dragonblooded: "Ex3.Dragonblooded",
    dreamsouled: "Ex3.DreamSouled",
    exigent: "Ex3.Exigent",
    getimian: "Ex3.Getimian",
    hearteater: "Ex3.Hearteater",
    infernal: "Ex3.Infernal",
    liminal: "Ex3.Liminal",
    lunar: "Ex3.Lunar",
    mortal: "Ex3.Mortal",
    sidereal: "Ex3.Sidereal",
    solar: "Ex3.Solar",
    sovereign: "Ex3.Sovereign",
    umbral: "Ex3.Umbral",
    other: "Ex3.Other"
  },
  exigentNames: {
    "architect": "Ex3.Architect",
    "janest": "Ex3.Janest",
    "puppeteer": "Ex3.Puppeteer",
    "": "Ex3.Other",
  },
  attributePriority: {
    primary: 'Ex3.Primary',
    secondary: 'Ex3.Secondary',
    tertiary: "Ex3.Tertiary"
  },
  elements: {
    '': 'Ex3.None',
    air: 'Ex3.Air',
    earth: 'Ex3.Earth',
    fire: 'Ex3.Fire',
    water: 'Ex3.Water',
    wood: 'Ex3.Wood',
  },
  costElements: {
    '': 'Ex3.None',
    any: 'Ex3.Any',
    air: 'Ex3.Air',
    earth: 'Ex3.Earth',
    fire: 'Ex3.Fire',
    water: 'Ex3.Water',
    wood: 'Ex3.Wood',
  },
  sizeCategory: {
    standard: 'Ex3.Standard',
    legendary: 'Ex3.Legendary',
    tiny: 'Ex3.Tiny',
    minuscule: 'Ex3.Minuscule',
  },
  attributes: {
    '': 'Ex3.None',
    strength: 'Ex3.Strength',
    dexterity: 'Ex3.Dexterity',
    stamina: 'Ex3.Stamina',
    charisma: 'Ex3.Charisma',
    manipulation: 'Ex3.Manipulation',
    appearance: 'Ex3.Appearance',
    perception: 'Ex3.Perception',
    intelligence: 'Ex3.Intelligence',
    wits: 'Ex3.Wits',
  },
  abilities: {
    '': 'Ex3.None',
    archery: 'Ex3.Archery',
    athletics: 'Ex3.Athletics',
    awareness: 'Ex3.Awareness',
    brawl: 'Ex3.Brawl',
    bureaucracy: 'Ex3.Bureaucracy',
    craft: 'Ex3.Craft',
    dodge: 'Ex3.Dodge',
    integrity: 'Ex3.Integrity',
    investigation: 'Ex3.Investigation',
    larceny: 'Ex3.Larceny',
    linguistics: 'Ex3.Linguistics',
    lore: 'Ex3.Lore',
    martialarts: 'Ex3.MartialArts',
    medicine: 'Ex3.Medicine',
    melee: 'Ex3.Melee',
    occult: 'Ex3.Occult',
    performance: 'Ex3.Performance',
    presence: 'Ex3.Presence',
    resistance: 'Ex3.Resistance',
    ride: 'Ex3.Ride',
    sail: 'Ex3.Sail',
    socialize: 'Ex3.Socialize',
    stealth: 'Ex3.Stealth',
    survival: 'Ex3.Survival',
    thrown: 'Ex3.Thrown',
    war: 'Ex3.War',
  },
  creatureTypes: {
    animal: 'Ex3.Animal',
    behemoth: 'Ex3.Behemoth',
    construct: 'Ex3.Construct',
    demon: 'Ex3.Demon',
    elemental: 'Ex3.Elemental',
    exalt: 'Ex3.Exalt',
    fae: 'Ex3.Fae',
    god: 'Ex3.God',
    magiccreature: 'Ex3.MagicCreature',
    mortal: 'Ex3.Mortal',
    undead: 'Ex3.Undead',
    wyldmonster: 'Ex3.WyldMonster',
    other: 'Ex3.Other',
  },
  demons: {
    first: 'Ex3.FirstCircle',
    second: 'Ex3.SecondCircle',
    third: 'Ex3.ThirdCircle',
    other: 'Ex3.Other',
  },
  wyldCreatures: {
    creature: 'Ex3.Creature',
    raksha: 'Ex3.Raksha',
    other: 'Ex3.Other',
  },
  drill: {
    "0": 'Ex3.Poor',
    "1": 'Ex3.Average',
    "2": 'Ex3.Elite',
  },
  motePools: {
    personal: "Ex3.Personal",
    peripheral: "Ex3.Peripheral",
  },
  maxAnima: {
    "3": "Ex3.Bonfire",
    "4": "Ex3.Transcendent",
  },
  martialArtsMastery: {
    terrestrial: "Ex3.Terrestrial",
    standard: "Ex3.Standard",
    mastery: "Ex3.Mastery",
  },
  sheetBackgrounds: {
    default: "Ex3.Default",
    db: "Ex3.Dragonblooded",
    exigent: "Ex3.Exigent",
    janest: "Ex3.Janest",
    leaves: "Ex3.Leaves",
    lunar: "Ex3.Lunar",
    puppeteer: "Ex3.Puppeteer",
    solar: "Ex3.Solar",
    sovereign: "Ex3.Sovereign",
    tree: "Ex3.Tree",
  },
  allSpellCircles: {
    terrestrial: "Ex3.Terrestrial",
    celestial: "Ex3.Celestial",
    solar: "Ex3.Solar",
    ivory: "Ex3.Ivory",
    shadow: "Ex3.Shadow",
    void: "Ex3.Void",
  },
  sorceryCircles: {
    none: "Ex3.None",
    terrestrial: "Ex3.Terrestrial",
    celestial: "Ex3.Celestial",
    solar: "Ex3.Solar",
  },
  necromancyCircles: {
    none: "Ex3.None",
    ivory: "Ex3.Ivory",
    shadow: "Ex3.Shadow",
    void: "Ex3.Void",
  },
  exigentTypes: {
    '': "Ex3.None",
    terrestrial: "Ex3.Terrestrial",
    celestial: "Ex3.Celestial",
  },
  endTriggers: {
    'none': 'Ex3.None',
    'startturn': 'Ex3.StartTurn',
    'endturn': 'Ex3.EndTurn',
    'endscene': 'Ex3.EndScene',
  },
  meritTypes: {
    '': "Ex3.None",
    flaw: "Ex3.Flaw",
    story: "Ex3.Story",
    innate: "Ex3.Innate",
    purchased: "Ex3.Purchased",
    sorcery: "Ex3.Sorcery",
    thaumaturgy: "Ex3.Thaumaturgy",
  },
  ritualTypes: {
    necromancy: "Ex3.Necromancy",
    sorcery: "Ex3.Sorcery",
  },
  damageTypes: {
    'bashing': "Ex3.Bashing",
    'lethal': "Ex3.Lethal",
    'aggravated': "Ex3.Aggravated",
  },
  essenceLevels: {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
  },
  abilityRequirementLevels: {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
  },
  triggerOnTensOptions: {
    'none': "Ex3.None",
    'damage': "Ex3.Damage",
    'extraSuccess': "Ex3.ExtraSuccess",
    'ignoreHardness': "Ex3.IgnoreHardness",
    'postSoakDamage': "Ex3.PostSoakDamage",
    'rerolllDie': "Ex3.RerollDie",
    'restoreMote': "Ex3.RestoreMote",
  },
  triggerOnTensDamageOptions: {
    'none': "Ex3.None",
    'subtractTargetInitiative': "Ex3.SubtractTargetInitiative",
  },
  triggerOnOnesOptions: {
    'none': "Ex3.None",
    'soak': "Ex3.IncreaseSoak",
    'defense': "Ex3.IncreaseDefense",
    'rerollSuccesses': "Ex3.RerollSuccesses",
    'subtractInitiative': "Ex3.SubtractEnemyInitiative",
    'subtractSuccesses': "Ex3.SubtractEnemySuccesses",
  },
  autoAddToRollOptions: {
    '': "Ex3.None",
    'action': "Ex3.CharacterRolls",
    'opposedRolls': "Ex3.OpposedRolls",
    'sameAbility': "Ex3.NonSameAbilityAttribute",
    'attacks': "Ex3.Attacks",
    'command': "Ex3.Command",
    'grapple': "Ex3.Grapple",
    'joinBattle': "Ex3.JoinBattle",
    'movement': "Ex3.Movement",
    'readIntentions': "Ex3.ReadIntentions",
    'resistance': "Ex3.Resistance",
    'social': "Ex3.Social",
    'sorcery': "Ex3.Sorcery",
  },
  previousCharmsPrerequisitesOptions: {
    '': "Ex3.None",
    'combat': "Ex3.AnyCombatAbility",
    'physicalAttribute': "Ex3.PhysicalAttribute",
    'mentalAttribute': "Ex3.MentalAttribute",
    'socialAttribute': "Ex3.SocialAttribute",
  },
  uniqueArchetypeAbilityOptions: {
    '': "Ex3.None",
    'combat': "Ex3.AnyCombatAbility",
  },
  craftTypes: {
    'basic': "Ex3.Basic",
    'major': "Ex3.Major",
    'superior': "Ex3.Superior",
    'legendary': "Ex3.Legendary",
  },
  armorWeights: {
    'light': "Ex3.Light",
    'medium': "Ex3.Medium",
    'heavy': "Ex3.Heavy",
    'other': "Ex3.Other",
  },
  customAbilityTypes: {
    'craft': "Ex3.Craft",
    'martialart': "Ex3.MartialArt",
    'other': "Ex3.Other",
  },
  martialArtsArmorAllowances: {
    'none': "Ex3.NoArmor",
    'light': "Ex3.Light",
    'medium': "Ex3.Medium",
    'heavy': "Ex3.Heavy",
    '': "Ex3.NotSet",
  },
  smaNatures: {
    '': "Ex3.None",
    'flowing': "Ex3.Flowing",
    'still': "Ex3.Still",
    'both': "Ex3.Both",
  },
  maidens: {
    '': "Ex3.None",
    'journeys': "Ex3.Journeys",
    'serenity': "Ex3.Serenity",
    'battles': "Ex3.Battles",
    'secrets': "Ex3.Secrets",
    'endings': "Ex3.Endings",
  },
  intimacyStrengths: {
    'minor': "Ex3.Minor",
    'major': "Ex3.Major",
    'defining': "Ex3.Defining",
  },
  intimacyTypes: {
    'tie': "Ex3.Tie",
    'principle': "Ex3.Principle",
  },
  itemTypes: {
    'item': "Ex3.Item",
    'artifact': "Ex3.Artifact",
    'hearthstone': "Ex3.Hearthstone",
  },
  weaponTypes: {
    'melee': "Ex3.Melee",
    'bolt': "Ex3.Bolt",
    'ranged': "Ex3.Ranged",
    'siege': "Ex3.Siege",
    'thrown': "Ex3.Thrown",
  },
  decisiveDamageTypes: {
    'initiative': "Ex3.Initiative",
    'static': "Ex3.Static",
  },
  weaponWeightTypes: {
    'light': "Ex3.Light",
    'medium': "Ex3.Medium",
    'heavy': "Ex3.Heavy",
    'bolt': "Ex3.Bolt",
    'siege': "Ex3.Siege",
    'other': "Ex3.Other",
  },
  targetDefenseStats: {
    'defense': "Ex3.Defense",
    'resolve': "Ex3.Resolve",
    'guile': "Ex3.Guile",
  },
  poisonDamageTypes: {
    'none': "Ex3.None",
    'initiative.bashing': "Ex3.InitiativeBashing",
    'initiative.lethal': "Ex3.InitiativeLethal",
    'bashing': "Ex3.Bashing",
    'lethal': "Ex3.Lethal",
    'aggravated': "Ex3.Aggravated",
  },
  attackEffectPresets: {
    'arrow': "Ex3.Arrow",
    'bite': "Ex3.Bite",
    'brawl': "Ex3.Brawl",
    'claws': "Ex3.Claws",
    'fireball': "Ex3.Fireball",
    'firebreath': "Ex3.Firebreath",
    'flamepiece': "Ex3.Flamepiece",
    'glaive': "Ex3.Glaive",
    'goremaul': "Ex3.Goremaul",
    'greatsaxe': "Ex3.Greataxe",
    'greatsword': "Ex3.Greatsword",
    'handaxe': "Ex3.Handaxe",
    'lightning': "Ex3.Lightning",
    'quarterstaff': "Ex3.Quarterstaff",
    'rapier': "Ex3.Rapier",
    'scimitar': "Ex3.Scimitar",
    'shortsword': "Ex3.Shortsword",
    'spear': "Ex3.Spear",
    'throwdagger': "Ex3.ThrownDagger",
    'none': "Ex3.None",
  },
  //Template Importer
  templateItemTypes: {
    'armor': "Ex3.Armor",
    'hearthstone': "Ex3.Hearthstone",
    'item': "Ex3.Item",
    'martialArt': "Ex3.MartialArt",
    'merit': "Ex3.Merit",
    'ritual': "Ex3.ShapingRitual",
    'weapon': "Ex3.Weapon",
  },
  //Prophecies
  ambitionLevels: {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
  },
  cooperationLevels: {
    "0": "0",
    "1": "1",
    "2": "2",
  },
  intervalTimesLevels: {
    "0": "Ex3.OneWeek",
    "1": "Ex3.OneMonth",
    "2": "Ex3.ThreeMonths",
  },
  //NPC Generator
  npcTemplates: {
    'custom': "Ex3.Custom",
    'assassin': "Ex3.Assassin",
    'detective': "Ex3.Detective",
    'eliteWarrior': "Ex3.EliteWarrior",
    'godOrDemon': "Ex3.God/Demon",
    'merchant': "Ex3.Merchant",
    'mortalSorcerer': "Ex3.MortalSorcerer",
    'socialite': "Ex3.Socialite",
    'trainedSoldier': "Ex3.TrainedSoldier",
    'wyldMutantWarrior': "Ex3.WyldMutantWarrior",
  },
  poolNumberTypes: {
    'low': "Ex3.Low",
    'mid': "Ex3.Middle",
    'high': "Ex3.High",
  },
  skillLevels: {
    'weak': "Ex3.Weak",
    'skilled': "Ex3.Skilled",
    'exceptional': "Ex3.Exceptional",
    'legendary': "Ex3.Legendary",
  },
  npcSpellCircles: {
    terrestrial: "Ex3.Terrestrial",
    celestial: "Ex3.Celestial",
    solar: "Ex3.Solar",
    ivory: "Ex3.Ivory",
    shadow: "Ex3.Shadow",
    void: "Ex3.Void",
  },
  npcItemCategory: {
    random: "Ex3.Random",
    set: "Ex3.Set",
    none: "Ex3.None",
  },
  npcWeaponType: {
    any: "Ex3.Any",
    melee: "Ex3.Melee",
    ranged: "Ex3.Ranged",
    thrown: "Ex3.Thrown",
  },
  npcWeaponWeight: {
    any: "Ex3.Any",
    light: "Ex3.Light",
    medium: "Ex3.Medium",
    heavy: "Ex3.Heavy",
    siege: "Ex3.Siege",
  },
  npcArmorType: {
    any: "Ex3.Any",
    light: "Ex3.Light",
    medium: "Ex3.Medium",
    heavy: "Ex3.Heavy",
  },
  //Template importer
  templateImporterTypes: {
    character: "Ex3.Character",
    folder: "Ex3.Folder",
  },
  templateImporterMainTextOptions: {
    description: "Ex3.Description",
    summary: "Ex3.Summary",
  },
  //Item Search
  searchAbilityRequirementLevels: {
    "": "",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
  },
  searchEssenceLevels: {
    "": "",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
  },
  //Dice Roller
  ranges: {
    "close": "Ex3.Close",
    "short": "Ex3.Short",
    "medium": "Ex3.Medium",
    "long": "Ex3.Long",
    "extreme": "Ex3.Extreme",
  },
  attackTypes: {
    "withering": "Ex3.Withering",
    "decisive": "Ex3.Decisive",
    "gambit": "Ex3.Gambit",
  },
  decisiveSplits: {
    "evenSplit": "Ex3.EvenSplit",
    "half": "Ex3.Half",
    "thirds": "Ex3.Thirds",
  },
  craftRatings: {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
  },
  craftFinesseRatings: {
    "1": "1",
    "3": "3",
    "5": "5",
  },
  craftAmbitionRatings: {
    "5": "Ex3.Terrestrial1",
    "10": "Ex3.Terrestrial2",
    "20": "Ex3.Terrestrial3",
    "25": "Ex3.Celestial1",
    "30": "Ex3.Celestial2",
    "35": "Ex3.Celestial3",
    "40": "Ex3.Solar1",
    "50": "Ex3.Solar2",
    "75": "Ex3.Solar3",
  },
  supportingIntimacyValues: {
    "0": "Ex3.None",
    "1": "Ex3.Minor",
    "2": "Ex3.Major",
    "3": "Ex3.Defining",
  },
  opposedIntimacyValues: {
    "0": "Ex3.None",
    "2": "Ex3.Minor",
    "3": "Ex3.Major",
    "4": "Ex3.Defining",
  },
  gambits: {
    standard: {
      label: "Standard",
      gambitTypes: {
        grapple: "Ex3.Grapple",
        disarm: "Ex3.Disarm",
        distract: "Ex3.Distract",
        unhorse: "Ex3.Unhorse",
      },
    },
    essence: {
      label: "Essence",
      gambitTypes: {
        knockback: "Ex3.Knockback",
        knockdown: "Ex3.Knockdown",
        pilfer: "Ex3.Pilfer",
        pull: "Ex3.Pull",
        revealWeakness: "Ex3.RevealWeakness",
      },
    },
    adversaries: {
      label: "Adversaries",
      gambitTypes: {
        bind: "Ex3.Bind",
        detonate: "Ex3.Detonate",
        goad: "Ex3.Goad",
        leech: "Ex3.Leech",
        pileon: "Ex3.PileOn",
        riposte: "Ex3.Riposte",
      },
    },
    warstrider: {
      label: "Warstrider",
      gambitTypes: {
        blockvision: "Ex3.BlockVision",
        disablearm: "Ex3.DisableArm",
        disableleg: "Ex3.DisableLeg",
        breachframe: "Ex3.BreachFrame",
      },
    },
    exaltSpecific: {
      label: "Exalt Specific",
      gambitTypes: {
        entangle: "Ex3.Entangle",
      },
    },
    none: {
      label: "None",
      gambitTypes: {
        none: "Ex3.None",
      },
    },
  },
  triggerTimes: {
    "beforeRoll": "Ex3.BeforeRoll",
    "afterRoll": "Ex3.AfterRoll",
    "beforeDamageRoll": "Ex3.BeforeDamageRoll",
    "afterDamageRoll": "Ex3.AfterDamageRoll",
  }
};