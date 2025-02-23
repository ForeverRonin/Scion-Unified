export default class NPCGenerator extends FormApplication {
  constructor(app, options, object, data) {
    super(object, options);
    this.object.template = 'custom';
    this.object.poolNumbers = 'mid';
    this.object.characterType = 'npc';
    this.object.availableCastes = {};
    this.object.abilityList = CONFIG.exaltedthird.abilities;
    this.object.selects = CONFIG.exaltedthird.selects;
    this.object.character = {
      name: '',
      defaultName: 'New NPC',
      npcType: "mortal",
      exalt: "other",
      caste: "",
      essence: 1,
      skills: {
        agility: {
          label: 'Ex3.Agility',
          value: "weak"
        },
        body: {
          label: 'Ex3.Body',
          value: "weak"
        },
        combat: {
          label: 'Ex3.Combat',
          value: "weak"
        },
        perception: {
          label: 'Ex3.Perception',
          value: "weak"
        },
        mind: {
          label: 'Ex3.Mind',
          value: "weak"
        },
        social: {
          label: 'Ex3.Social',
          value: "weak"
        },
        strength: {
          label: 'Ex3.Strength',
          value: "weak"
        },
        willpower: {
          label: 'Ex3.Willpower',
          value: "weak"
        },
      },
      homebrew: {
        specialAbilities: 0,
      },
      equipment: {
        primaryWeapon: {
          "type": "random",
          "weaponType": "any",
          "weight": "any",
          "artifact": false,
        },
        secondaryWeapon: {
          "type": "random",
          "weaponType": "any",
          "weight": "any",
          "artifact": false,
        },
        armor: {
          "type": "random",
          "weight": "any",
          "artifact": false,
        }
      },
      sorcerer: 'none',
      sizeCategory: 'standard',
      battlegroup: false,
      battlegroupStats: {
        size: 1,
        might: 0,
        drill: 0,
      },
      numberTraits: {
        randomCharms: { label: 'Ex3.RandomCharms', value: 0 },
        randomMutations: { label: 'Ex3.RandomMutations', value: 0 },
        randomSpells: { label: 'Ex3.RandomSpells', value: 0 },
      },
      traits: {
        commander: { label: 'Ex3.Commander', value: false },
        godOrDemon: { label: 'Ex3.God/Demon', value: false },
        poisoner: { label: 'Ex3.Poisoner', value: false },
        martialArtist: { label: 'Ex3.MartialArtist', value: false },
        motePool: { label: 'Ex3.MotePool', value: false },
        spirit: { label: 'Ex3.Spirit', value: false },
        strikingAppearance: { label: 'Ex3.StrikingAppearance', value: false },
        stealthy: { label: 'Ex3.Stealthy', value: false },
        wealthy: { label: 'Ex3.Wealthy', value: false },
      }
    }
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dialog", `${game.settings.get("exaltedthird", "sheetStyle")}-background`],
      popOut: true,
      template: "systems/exaltedthird/templates/dialogues/npc-generator.html",
      id: "ex3-npc-generator",
      title: `Random NPC Generator`,
      width: 750,
      height: 1100,
      resizable: true,
      submitOnChange: true,
      closeOnSubmit: false
    });
  }

  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    const helpButton = {
      label: game.i18n.localize('Ex3.Help'),
      class: 'generator-help',
      icon: 'fas fa-question',
      onclick: async () => {
        let confirmed = false;
        const html = await renderTemplate("systems/exaltedthird/templates/dialogues/dialog-help.html", { 'link': 'https://github.com/Aliharu/Foundry-Ex3/wiki/NPC-Generator' });
        new Dialog({
          title: `ReadMe`,
          content: html,
          buttons: {
            cancel: { label: "Close", callback: () => confirmed = false }
          }
        }, { classes: ["dialog", `${game.settings.get("exaltedthird", "sheetStyle")}-background`] }).render(true);
      },
    };
    buttons = [helpButton, ...buttons];
    return buttons;
  }

  getData() {
    return {
      data: this.object,
    };
  }

  async _updateObject(event, formData) {
    foundry.utils.mergeObject(this, formData);
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.on("change", "#exalt", async ev => {
      if (CONFIG.exaltedthird.castes[this.object.character.exalt]) {
        this.object.availableCastes = CONFIG.exaltedthird.castes[this.object.character.exalt];
      }
      this.render();
    });

    html.on("change", "#template", async ev => {
      const templateNPCs = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/NPCTemplates.json', {}, { int: 30000 });
      var oldName = this.object.character.name;
      this.object.character = templateNPCs[this.object.template];
      this.object.character.name = oldName;
      this.render();
    });

    html.on("change", ".rerender", ev => {
      this.render();
    });

    html.find("#randomName").on("click", async (event) => {
      this.randomName();
    });

    html.find("#generate").on("click", async (event) => {
      this.createNPC();
    });

    html.find(".add-item").on("click", async (event) => {
      const type = event.currentTarget.dataset.type;
      if (type === 'specialties') {
        this.object.character.playerCharacter.specialties[Object.entries(this.object.character.playerCharacter['specialties']).length] = {
          name: 'Specialty',
          ability: 'archery',
        };
      }
      else {
        this.object.character.playerCharacter[type][Object.entries(this.object.character.playerCharacter[type]).length] = {
          name: 'Name',
          value: 0,
        };
      }
      this.render();
    });
  }

  async randomName() {
    const nameFormats = [
      { option: "common", weight: 10 },
    ];
    if (this.object.character.exalt === 'dragonblooded') {
      nameFormats.push(
        {
          option: "dynast", weight: 20
        }
      );
    }
    else {
      nameFormats.push(
        {
          option: "dynast", weight: 3
        }
      );
    }
    const totalWeight = nameFormats.reduce((acc, option) => acc + option.weight, 0);
    // Generate a random number between 0 and the total weight
    const randomWeight = Math.random() * totalWeight;

    // Iterate over the nameFormats until the cumulative weight surpasses the random weight
    let cumulativeWeight = 0;
    let selectedOption;
    for (const option of nameFormats) {
      cumulativeWeight += option.weight;
      if (randomWeight <= cumulativeWeight) {
        selectedOption = option.option;
        break;
      }
    }
    if (this.object.character.exalt === 'abyssal') {
      selectedOption = 'abyssal';
    }
    switch (selectedOption) {
      case "common":
        this.object.character.name = await this.getCommonName();
        break;
      case "dynast":
        this.object.character.name = await this.getDynastName();
        break;
      case "abyssal":
        this.object.character.name = await this.getAbyssalName();
        break;
    }
    this.render();
  }


  async getCommonName() {
    let newName = '';
    const randomName = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/randomNames.json', {}, { int: 30000 });
    const nameFormats = [
      { option: 1, weight: 4 },
      { option: 2, weight: 16 },
      { option: 3, weight: 8 },
      { option: 4, weight: 4 },
      { option: 5, weight: 2 },
      { option: 6, weight: 1 },
      { option: 7, weight: 8 },
    ];
    const totalWeight = nameFormats.reduce((acc, option) => acc + option.weight, 0);

    // Generate a random number between 0 and the total weight
    const randomWeight = Math.random() * totalWeight;

    // Iterate over the nameFormats until the cumulative weight surpasses the random weight
    let cumulativeWeight = 0;
    let selectedOption;
    let optionsSection;
    let optionsSectionIndex;
    for (const option of nameFormats) {
      cumulativeWeight += option.weight;
      if (randomWeight <= cumulativeWeight) {
        selectedOption = option.option;
        break;
      }
    }
    switch (selectedOption) {
      case 1:
        optionsSection = randomName.noun[Math.floor(Math.random() * randomName.noun.length)];
        newName = optionsSection[Math.floor(Math.random() * optionsSection.length)];
        break;
      case 2:
        optionsSection = randomName.adjective[Math.floor(Math.random() * randomName.adjective.length)];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        optionsSection = randomName.noun[Math.floor(Math.random() * randomName.noun.length)];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        break;
      case 3:
        optionsSection = randomName.adjective[Math.floor(Math.random() * randomName.adjective.length)];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        for (let i = 0; i < 2; i++) {
          optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
          optionsSection = randomName.noun[optionsSectionIndex];
          newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
          randomName.noun.splice(optionsSectionIndex, 1);
        }
        break;
      case 4:
        optionsSection = randomName.adjective[Math.floor(Math.random() * randomName.adjective.length)];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        randomName.noun.splice(optionsSectionIndex, 1);
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' of the ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        break;
      case 5:
        optionsSection = randomName.adjective[Math.floor(Math.random() * randomName.adjective.length)];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        randomName.noun.splice(optionsSectionIndex, 1);
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' of the ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        randomName.noun.splice(optionsSectionIndex, 1);
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        break;
      case 6:
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        randomName.noun.splice(optionsSectionIndex, 1);
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' and ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        randomName.noun.splice(optionsSectionIndex, 1);
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        break;
      case 7:
        optionsSection = randomName.verb[Math.floor(Math.random() * randomName.verb.length)];
        newName += optionsSection[Math.floor(Math.random() * optionsSection.length)];
        optionsSectionIndex = Math.floor(Math.random() * randomName.noun.length);
        optionsSection = randomName.noun[optionsSectionIndex];
        newName += (' ' + optionsSection[Math.floor(Math.random() * optionsSection.length)]);
        break;
    }
    return newName;
  }

  async getDynastName() {
    const randomName = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/randomDynastNames.json', {}, { int: 30000 });
    return `${randomName.house[Math.floor(Math.random() * randomName.house.length)]} ${randomName.name1[Math.floor(Math.random() * randomName.name1.length)]}${randomName.name2[Math.floor(Math.random() * randomName.name2.length)]}`;
  }

  async getAbyssalName() {
    const randomName = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/randomAbyssalTitles.json', {}, { int: 30000 });
    return `The ${randomName.name1[Math.floor(Math.random() * randomName.name1.length)]} ${randomName.name2[Math.floor(Math.random() * randomName.name2.length)]} ${randomName.name3[Math.floor(Math.random() * randomName.name3.length)]} ${randomName.name4[Math.floor(Math.random() * randomName.name4.length)]}`;
  }

  async createNPC() {
    const martialArts = CONFIG.exaltedthird.martialarts;

    const poisons = [
      '3i/round, (L in Crash) 5 rounds, -2, Damage or ingestion',
      '2L/day, 7 days -0, Ingestion',
      '1i/round, (B in Crash) 10 rounds, -2, Damage',
      '2L/hour, 5 hours, -4, Ingestion',
      '2i/round, (L in Crash), 3 rounds, -3, Damage',
      '1L/minute, 10 minutes, -5, Damage',
    ]
    const attributeAbilityMap = {
      "weak": 1,
      "skilled": 3,
      "exceptional": 4,
      "legendary": 5,
    }

    var charmToPoolMap = {
      archery: 'combat',
      athletics: 'strength',
      awareness: 'perception',
      brawl: 'combat',
      bureaucracy: 'mind',
      craft: 'mind',
      dodge: 'agility',
      integrity: 'mind',
      investigation: 'social',
      larceny: 'agility',
      linguistics: 'mind',
      lore: 'mind',
      medicine: 'mind',
      melee: 'combat',
      occult: 'mind',
      performance: 'social',
      presence: 'social',
      resistance: 'body',
      ride: 'agility',
      sail: 'agility',
      socialize: 'social',
      stealth: 'agility',
      survival: 'body',
      thrown: 'combat',
      war: 'combat',
      strength: 'strength',
      dexterity: 'agility',
      stamina: 'body',
      appearance: 'social',
      charisma: 'social',
      manipulation: 'social',
      wits: 'mind',
      perception: 'perception',
      intelligence: 'mind',
    }

    const willpowerMap = {
      "weak": 3,
      "skilled": 5,
      "exceptional": 7,
      "legendary": 10,
    }

    const itemData = [
    ];
    //Skills
    //Weak, Skilled, Exceptional, Legendary 
    var actorData = this._getBaseNPCStatBlock();

    await this.getbaseCharacterData(actorData, itemData);

    if (this.object.character.traits.commander.value) {
      actorData.system.pools.command.value = this._getCharacterPool(this.object.character.skills.combat.value);
    }
    actorData.system.pools.grapple.value = this._getCharacterPool(this.object.character.skills.strength.value);
    actorData.system.pools.joinbattle.value = this._getCharacterPool(this.object.character.skills.perception.value);
    actorData.system.pools.movement.value = this._getCharacterPool(this.object.character.skills.agility.value);
    actorData.system.pools.readintentions.value = this._getCharacterPool(this.object.character.skills.perception.value);
    actorData.system.pools.resistance.value = this._getCharacterPool(this.object.character.skills.body.value);
    actorData.system.pools.social.value = this._getCharacterPool(this.object.character.skills.social.value);
    if (this.object.character.sorcerer !== 'none') {
      actorData.system.pools.sorcery.value = this._getCharacterPool(this.object.character.skills.mind.value);
    }
    actorData.system.pools.social.value = this._getCharacterPool(this.object.character.skills.social.value);

    actorData.system.parry.value = this._getStaticValue(this.object.character.skills.combat.value);
    actorData.system.evasion.value = this._getStaticValue(this.object.character.skills.agility.value);
    actorData.system.resolve.value = this._getStaticValue(this.object.character.skills.mind.value);
    actorData.system.guile.value = this._getStaticValue(this.object.character.skills.social.value);

    actorData.system.willpower.max = willpowerMap[this.object.character.skills.willpower.value];
    actorData.system.willpower.value = willpowerMap[this.object.character.skills.willpower.value];
    actorData.system.sizecategory = this.object.character.sizeCategory;

    actorData.system.appearance.value = 2;
    if (this.object.character.traits.strikingAppearance.value) {
      actorData.system.appearance.value = 4;
    }
    if (this.object.character.traits.poisoner.value) {
      actorData.system.qualities = `Poison: ${poisons[Math.floor(Math.random() * poisons.length)]}`;
    }

    if (this.object.character.skills.body.value === 'weak') {
      actorData.system.health.levels.one.value = 1;
    }
    if (this.object.character.skills.body.value === 'exceptional' || this.object.character.skills.body.value === 'legendary') {
      actorData.system.health.levels.one.value = 3;
    }
    if (this.object.character.skills.body.value === 'legendary') {
      actorData.system.health.levels.zero.value = 2;
    }
    actorData.system.battlegroup = this.object.character.battlegroup;
    if (this.object.character.battlegroup) {
      actorData.system.health.levels.zero.value = actorData.system.health.levels.zero.value + actorData.system.health.levels.one.value + actorData.system.health.levels.two.value + actorData.system.health.levels.four.value + this.object.character.battlegroupStats.size;
    }
    actorData.system.might.value = this.object.character.battlegroupStats.might;
    actorData.system.drill.value = this.object.character.battlegroupStats.drill;
    actorData.system.size.value = this.object.character.battlegroupStats.size;

    if (this.object.character.traits.martialArtist.value) {
      const randomMartialArts = martialArts[Math.floor(Math.random() * martialArts.length)]
      itemData.push(
        {
          type: 'action',
          name: randomMartialArts,
          system: {
            value: this._getCharacterPool(this.object.character.skills.combat.value)
          }
        }
      )
    }

    itemData.push(
      {
        type: 'action',
        name: 'Senses',
        system: {
          value: this._getCharacterPool(this.object.character.skills.perception.value)
        }
      }
    )
    itemData.push(
      {
        type: 'action',
        name: 'Mental Resistance',
        system: {
          value: this._getCharacterPool(this.object.character.skills.mind.value)
        }
      }
    )
    if (this.object.character.traits.stealthy.value) {
      itemData.push(
        {
          type: 'action',
          name: 'Stealth',
          system: {
            value: this._getCharacterPool(this.object.character.skills.agility.value)
          }
        }
      )
    }
    if (this.object.character.traits.martialArtist.value) {
      const randomMartialArts = martialArts[Math.floor(Math.random() * martialArts.length)]
      itemData.push(
        {
          type: 'action',
          name: randomMartialArts,
          system: {
            value: this._getCharacterPool(this.object.character.skills.combat.value)
          }
        }
      )
    }
    const mutationsList = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/mutations.json', {}, { int: 30000 });

    for (var i = 0; i < this.object.character.numberTraits.randomMutations.value; i++) {
      var mutation = mutationsList[Math.floor(Math.random() * mutationsList.length)];
      var meritRating = mutation.dotValues[Math.floor(Math.random() * mutation.dotValues.length)]
      itemData.push(
        {
          type: 'merit',
          img: "icons/svg/aura.svg",
          name: mutation.name,
          system: {
            description: mutation.pageref,
            points: meritRating,
          }
        }
      );
    }
    if (this.object.character.traits.wealthy.value) {
      itemData.push(
        {
          type: 'merit',
          img: "icons/svg/coins.svg",
          name: 'Resources',
          system: {
            points: 3,
          }
        }
      );
    }

    actorData.system.soak.value += attributeAbilityMap[this.object.character.skills.body.value];
    actorData.system.naturalsoak.value = attributeAbilityMap[this.object.character.skills.body.value];

    var charms = game.items.filter((charm) => charm.type === 'charm'
      && charm.system.ability !== 'evocation'
      && charm.system.charmtype !== 'martialarts'
      && this.object.character.skills[charmToPoolMap[charm.system.ability]]?.value !== 'weak'
      && charm.system.essence <= this.object.character.essence && charm.system.requirement <= (attributeAbilityMap[this.object.character.skills[charmToPoolMap[charm.system.ability]]?.value] || 0));

    charms = charms.filter(charm => (charm.system.ability !== 'thrown' || itemData.find(item => item.system.weapontype === 'thrown')));
    charms = charms.filter(charm => (charm.system.ability !== 'melee' || itemData.find(item => item.system.weapontype === 'melee')));
    charms = charms.filter(charm => (charm.system.ability !== 'archery' || itemData.find(item => item.system.weapontype === 'ranged')));
    if (this.object.character.exalt !== 'other') {
      charms = charms.filter((charm) => charm.system.charmtype === this.object.character.exalt);
    }
    const charmIds = [];
    if (charms) {
      for (var i = 0; i < this.object.character.numberTraits.randomCharms.value; i++) {
        const availableCharms = charms.filter(charm => {
          return charm.system.charmprerequisites.length === 0 || charmIds.includes(charm._id) || charm.system.charmprerequisites.some(prerequisite => charmIds.includes(prerequisite.id));
        });
        if (availableCharms.length === 0) {
          break;
        }
        var charm = foundry.utils.duplicate(availableCharms[Math.floor(Math.random() * availableCharms.length)]);
        charmIds.push(charm._id);
        itemData.push(charm);
      }
    }
    if (this.object.character.traits.godOrDemon.value) {
      itemData.push({
        type: 'charm',
        img: "icons/svg/explosion.svg",
        name: "Hurry Home",
        system: {
          description: "The Spirit dissapear on their next turn, returns to a specific location such as their sactum or their summoners side.",
          type: 'Simple',
          duration: "Instant",
          ability: "other",
          essence: 1,
          cost: {
            motes: 10,
            willpower: 1,
          }
        },
      });
      itemData.push({
        type: 'charm',
        img: "icons/svg/explosion.svg",
        name: "Materialize",
        system: {
          description: "The spirit materializes.",
          type: 'Simple',
          duration: "Instant",
          ability: "other",
          essence: 1,
          cost: {
            motes: Math.floor(actorData.system.motes.personal.value / 2),
            willpower: 1,
          }
        },
      });
      itemData.push({
        type: 'charm',
        img: "icons/svg/explosion.svg",
        name: "Measure the Wind",
        system: {
          description: "The spirit discerns the nature of being based on a prequisite or when they take a certain action in the spririt's precense.",
          type: 'Simple',
          duration: "Instant",
          ability: "other",
          essence: 1,
          cost: {
            motes: 5,
          }
        },
      });
    }

    actorData.items = itemData;
    await Actor.create(actorData);
  }

  async getbaseCharacterData(actorData, itemData) {
    const attributeAbilityMap = {
      "weak": 1,
      "skilled": 3,
      "exceptional": 4,
      "legendary": 5,
    }
    actorData.name = this.object.character.name || this.object.character.defaultName;
    actorData.prototypeToken.name = this.object.character.name || this.object.character.defaultName;
    actorData.system.essence.value = this.object.character.essence;
    actorData.system.creaturetype = this.object.character.npcType;
    actorData.system.details.exalt = this.object.character.exalt;
    actorData.system.details.caste = this.object.character.caste;

    const animaList = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/animaEffectsList.json', {}, { int: 30000 });
    if (animaList[this.object.character.caste]) {
      actorData.system.anima.passive = animaList[this.object.character.caste][0];
      actorData.system.anima.active = animaList[this.object.character.caste][1];
      actorData.system.anima.iconic = animaList[this.object.character.caste][2];
    }
    else {
      actorData.system.settings.showanima = false;
    }

    if (this.object.character.traits.motePool.value) {
      actorData.system.motes.personal.max = actorData.system.essence.value * 10;
      actorData.system.motes.personal.value = actorData.system.essence.value * 10;
      if (this.object.character.traits.spirit.value) {
        actorData.system.motes.personal.value += 50;
        actorData.system.motes.personal.max += 50;
      }
    }
    if (this.object.character.npcType === 'exalt') {
      actorData.system.motes.personal.value = this.calculateMaxExaltedMotes('personal', actorData.system.details.exalt, actorData.system.essence.value) - actorData.system.motes.peripheral.committed;
      actorData.system.motes.personal.max = this.calculateMaxExaltedMotes('personal', actorData.system.details.exalt, actorData.system.essence.value);
      actorData.system.motes.peripheral.value = this.calculateMaxExaltedMotes('peripheral', actorData.system.details.exalt, actorData.system.essence.value - actorData.system.motes.peripheral.committed);
      actorData.system.motes.peripheral.max = this.calculateMaxExaltedMotes('peripheral', actorData.system.details.exalt, actorData.system.essence.value);
      if (actorData.system.details.exalt === 'dragonblooded') {
        actorData.system.settings.hasaura = true;
      }
      itemData.push({
        type: 'charm',
        img: 'icons/magic/light/explosion-star-large-orange.webp',
        name: 'Dice Excellency',
        system: {
          description: 'Add 1 die to a roll for 1 mote.',
          ability: 'universal',
          listingname: 'Excellency',
          essence: 1,
          requirement: 1,
          cost: {
            motes: 1
          },
          diceroller: {
            bonusdice: 1
          }
        }
      });
      itemData.push({
        type: 'charm',
        img: 'icons/magic/light/explosion-star-large-orange.webp',
        name: 'Success Excellency',
        system: {
          description: 'Add 1 success to a roll for 2 motes.',
          ability: 'universal',
          listingname: 'Excellency',
          requirement: 1,
          essence: 1,
          cost: {
            motes: 2
          },
          diceroller: {
            bonussuccesses: 1
          }
        }
      });
      itemData.push({
        type: 'charm',
        img: 'icons/magic/light/explosion-star-large-orange.webp',
        name: 'Static Excellency',
        system: {
          description: 'Add 1 to a static value for 2 motes.',
          ability: 'universal',
          listingname: 'Excellency',
          requirement: 1,
          essence: 1,
          cost: {
            motes: 2
          },
          diceroller: {
            opposedbonuses: {
              enabled: true,
              defense: 1,
              resolve: 1,
              guile: 1,
            }
          }
        }
      });
      if (this.object.character.exalt === 'lunar') {
        itemData.push({
          type: 'charm',
          img: 'icons/magic/light/explosion-star-large-orange.webp',
          name: 'Soak Excellency',
          system: {
            description: 'Add 1 to a soak for 1 mote.',
            ability: 'universal',
            listingname: 'Excellency',
            requirement: 1,
            essence: 1,
            cost: {
              motes: 1
            },
            diceroller: {
              opposedbonuses: {
                enabled: true,
                soak: 1,
              }
            }
          }
        });
        itemData.push({
          type: 'charm',
          img: 'icons/magic/light/explosion-star-large-orange.webp',
          name: 'Damage Excellency',
          system: {
            description: 'Add 1 damage to an attack for 1 mote.',
            ability: 'universal',
            listingname: 'Excellency',
            requirement: 1,
            essence: 1,
            cost: {
              motes: 1
            },
            diceroller: {
              damage: {
                bonusdice: 1,
              }
            }
          }
        });
      }
    }
    const sorcerousRituals = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/sorcerousRituals.json', {}, { int: 30000 });

    let bigString = '';

    for (const ritual of sorcerousRituals) {
      bigString += ritual.name;
      bigString += '\n';
      bigString += ritual.pageref;
      bigString += '\n\n';
    }
    if (this.object.character.sorcerer !== 'none' && this.object.characterType === 'npc') {
      const itemRituals = game.items.filter((item) => item.type === 'ritual');

      if (itemRituals) {
        var ritual = foundry.utils.duplicate(itemRituals[Math.floor(Math.random() * itemRituals.length)]);
        itemData.push(ritual);
      }
      else {
        const randomRitual = sorcerousRituals[Math.floor(Math.random() * sorcerousRituals.length)];
        itemData.push(
          {
            type: 'ritual',
            name: randomRitual.name,
            system: {
              description: `Page Reference ${randomRitual.pageref}`,
            }
          }
        )
      }
    }
    var spells = game.items.filter((spell) => spell.type === 'spell');
    if (this.object.character.sorcerer === 'terrestrial') {
      spells = spells.filter((spell) => spell.system.circle === 'terrestrial');
    }
    if (this.object.character.sorcerer === 'celestial') {
      spells = spells.filter((spell) => spell.system.circle === 'terrestrial' || spell.system.circle === 'celestial');
    }
    if (this.object.character.sorcerer === 'solar') {
      spells = spells.filter((spell) => spell.system.circle === 'terrestrial' || spell.system.circle === 'celestial' || spell.system.circle === 'solar');
    }
    if (this.object.character.sorcerer === 'ivory') {
      spells = spells.filter((spell) => spell.system.circle === 'ivory');
    }
    if (this.object.character.sorcerer === 'shadow') {
      spells = spells.filter((spell) => spell.system.circle === 'ivory' || spell.system.circle === 'shadow');
    }
    if (this.object.character.sorcerer === 'void') {
      spells = spells.filter((spell) => spell.system.circle === 'ivory' || spell.system.circle === 'shadow' || spell.system.circle === 'void');
    }
    if (spells) {
      var loopBreaker = 0;
      for (var i = 0; i < this.object.character.numberTraits.randomSpells.value; i++) {
        loopBreaker = 0;
        if (i === spells.length) {
          break;
        }
        var spell = foundry.utils.duplicate(spells[Math.floor(Math.random() * spells.length)]);
        while (itemData.find(e => e.name === spell.name) && loopBreaker < 50) {
          spell = foundry.utils.duplicate(spells[Math.floor(Math.random() * spells.length)]);
          loopBreaker++;
        }
        itemData.push(spell);
      }
    }
    const weaponsList = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/weaponsList.json', {}, { int: 30000 });
    const armorList = await foundry.utils.fetchJsonWithTimeout('systems/exaltedthird/module/data/armorList.json', {}, { int: 30000 });

    if (this.object.character.equipment.primaryWeapon.weight === 'medium') {
      actorData.system.parry.value++;
    }
    if (this.object.character.equipment.primaryWeapon.weight === 'heavy' && !this.object.character.equipment.primaryWeapon.artifact) {
      actorData.system.parry.value--;
    }

    if (this.object.character.equipment.primaryWeapon.type === 'random') {
      var primaryWeaponList = weaponsList;
      if (this.object.character.equipment.primaryWeapon.artifact) {
        primaryWeaponList = primaryWeaponList.filter(weapon => weapon.attunement > 0);
      }
      else {
        primaryWeaponList = primaryWeaponList.filter(weapon => weapon.attunement === 0);
      }
      if (this.object.character.equipment.primaryWeapon.weight !== 'any') {
        primaryWeaponList = primaryWeaponList.filter(weapon => weapon.weighttype === this.object.character.equipment.primaryWeapon.weight);
      }
      if (this.object.character.equipment.primaryWeapon.weaponType !== 'any') {
        primaryWeaponList = primaryWeaponList.filter(weapon => weapon.weapontype === this.object.character.equipment.primaryWeapon.weaponType);
      }
      var weapon = this._getRandomWeapon(primaryWeaponList);
      actorData.system.parry.value += weapon.system.defense;
      itemData.push(
        weapon
      );
    }
    if (this.object.character.equipment.primaryWeapon.type === 'set') {
      itemData.push(
        this._getSetWeapon(this.object.character.equipment.primaryWeapon.weaponType, this.object.character.equipment.primaryWeapon.weight, this.object.character.equipment.primaryWeapon.artifact)
      );
    }
    if (this.object.character.equipment.secondaryWeapon.type === 'random') {
      var secondaryWeaponList = weaponsList;
      if (this.object.character.equipment.secondaryWeapon.artifact) {
        secondaryWeaponList = secondaryWeaponList.filter(weapon => weapon.attunement > 0);
      }
      else {
        secondaryWeaponList = secondaryWeaponList.filter(weapon => weapon.attunement === 0);
      }
      if (this.object.character.equipment.secondaryWeapon.weight !== 'any') {
        secondaryWeaponList = secondaryWeaponList.filter(weapon => weapon.weighttype === this.object.character.equipment.secondaryWeapon.weight);
      }
      if (this.object.character.equipment.secondaryWeapon.weaponType !== 'any') {
        secondaryWeaponList = secondaryWeaponList.filter(weapon => weapon.weapontype === this.object.character.equipment.secondaryWeapon.weaponType);
      }
      itemData.push(
        this._getRandomWeapon(secondaryWeaponList)
      );
    }
    if (this.object.character.equipment.secondaryWeapon.type === 'set') {
      itemData.push(
        this._getSetWeapon(this.object.character.equipment.secondaryWeapon.weaponType, this.object.character.equipment.secondaryWeapon.weight, this.object.character.equipment.secondaryWeapon.artifact)
      );
    }
    var armor;
    if (this.object.character.equipment.armor.type === 'random') {
      var filteredArmorList = armorList;
      if (this.object.character.equipment.armor.artifact) {
        filteredArmorList = filteredArmorList.filter(armor => armor.attunement > 0);
      }
      else {
        filteredArmorList = filteredArmorList.filter(armor => armor.attunement === 0);
      }
      if (this.object.character.equipment.armor.weight !== 'any') {
        filteredArmorList = filteredArmorList.filter(armor => armor.weighttype === this.object.character.equipment.armor.weight);
      }
      armor = this._getRandomArmor(filteredArmorList)
      itemData.push(
        armor
      );
      actorData.system.soak.value = armor.system.soak;
      actorData.system.armoredsoak.value = armor.system.soak;
      actorData.system.evasion.value -= armor.system.penalty;
      actorData.system.hardness.value = armor.system.hardness;
    }
    else if (this.object.character.equipment.armor.type === 'set') {
      armor = this._getSetArmor(this.object.character.equipment.armor.weight, this.object.character.equipment.armor.artifact)
      itemData.push(
        armor
      );
      actorData.system.soak.value = armor.system.soak;
      actorData.system.armoredsoak.value = armor.system.soak;
      actorData.system.evasion.value -= armor.system.penalty;
      actorData.system.hardness.value = armor.system.hardness;
    }
    itemData.push(
      {
        type: 'weapon',
        img: "icons/svg/sword.svg",
        name: 'Unarmed',
        system: {
          witheringaccuracy: 4 + (this.object.characterType === 'npc' ? this._getCharacterPool(this.object.character.skills.combat.value) : 0),
          witheringdamage: 7 + (this.object.characterType === 'npc' ? attributeAbilityMap[this.object.character.skills.strength.value] : 0),
          overwhelming: 1,
          defense: 0,
          weapontype: 'melee',
          weighttype: 'light',
          ability: (this.object.characterType === 'npc' ? "none" : "melee"),
          attribute: (this.object.characterType === 'npc' ? "none" : "dexterity"),
        }
      }
    );
    if (this.object.characterType === 'npc') {
      itemData.push(
        {
          type: 'weapon',
          img: "icons/svg/sword.svg",
          name: 'Grapple',
          system: {
            witheringaccuracy: 4 + this._getCharacterPool(this.object.character.skills.combat.value),
            witheringdamage: 0,
            overwhelming: 0,
            defense: 0,
            weapontype: 'melee',
            weighttype: 'light',
            ability: "none",
            attribute: "none",
          }
        }
      );
    }

  }

  _getRandomWeapon(weaponList) {
    const attributeAbilityMap = {
      "weak": 1,
      "skilled": 3,
      "exceptional": 4,
      "legendary": 5,
    }
    var weapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    return {
      type: 'weapon',
      img: "icons/svg/sword.svg",
      name: weapon.name,
      system: {
        witheringaccuracy: weapon.witheringaccuracy + (this.object.characterType === 'npc' ? this._getCharacterPool(this.object.character.skills.combat.value) : 0),
        witheringdamage: weapon.witheringdamage + ((weapon.traits.weapontags.value.includes('flame') || weapon.traits.weapontags.value.includes('crossbow')) ? 4 : (this.object.characterType === 'npc' ? attributeAbilityMap[this.object.character.skills.strength.value] : 0)),
        overwhelming: weapon.overwhelming,
        defense: weapon.defense,
        traits: weapon.traits,
        weighttype: weapon.weighttype,
        weapontype: weapon.weapontype,
        attunement: weapon.attunement,
        ability: "none",
        attribute: "none",
      }
    }
  }

  _getRandomArmor(munadneArmorList, isArtifact) {
    var armor = munadneArmorList[Math.floor(Math.random() * munadneArmorList.length)];
    return {
      type: 'armor',
      img: "systems/exaltedthird/assets/icons/breastplate.svg",
      name: armor.name,
      system: {
        attunement: armor.attunement,
        weighttype: armor.weighttype,
        soak: armor.soak,
        penalty: armor.penalty,
        hardness: armor.hardness,
        traits: armor.traits
      }
    }
  }

  _getSetWeapon(weaponType, weight, isArtifact) {
    const weaponData = {
      name: 'Weapon Attack',
      type: 'weapon',
      img: "icons/svg/sword.svg",
      system: {}
    }
    weaponData.system.weighttype = weight;
    weaponData.system.weapontype = weaponType;
    const equipmentChart = CONFIG.exaltedthird.weaponStats;
    const artifactEquipmentChart = CONFIG.exaltedthird.artifactWeaponStats;
    if (isArtifact) {
      weaponData.system.witheringaccuracy = artifactEquipmentChart[weaponData.system.weighttype].accuracy;
      weaponData.system.witheringdamage = artifactEquipmentChart[weaponData.system.weighttype].damage;
      weaponData.system.overwhelming = artifactEquipmentChart[weaponData.system.weighttype].overwhelming;
      weaponData.system.attunement = artifactEquipmentChart[weaponData.system.weighttype].attunement;
    }
    else {
      weaponData.system.witheringaccuracy = equipmentChart[weaponData.system.weighttype].accuracy;
      weaponData.system.witheringdamage = equipmentChart[weaponData.system.weighttype].damage;
      weaponData.system.overwhelming = equipmentChart[weaponData.system.weighttype].overwhelming;
      weaponData.system.attunement = 0;
    }
    if (weaponType === 'ranged') {
      weaponData.system.defense = 0;
    }
    else if (weaponType === 'thrown') {
      weaponData.system.defense = 0;
    }
    else {
      if (isArtifact) {
        weaponData.system.defense = artifactEquipmentChart[weaponData.system?.weighttype].defense;
      }
      else {
        weaponData.system.defense = equipmentChart[weaponData.system?.weighttype].defense;
      }
    }
    weaponData.system.witheringaccuracy += this._getCharacterPool(this.object.character.skills.combat.value);
    return weaponData;
  }

  _getSetArmor(weight, isArtifact) {
    const armorData = {
      name: 'Armor',
      type: 'armor',
      img: "systems/exaltedthird/assets/icons/breastplate.svg",
      system: {}
    }
    armorData.system.weighttype = weight;

    const equipmentChart = CONFIG.exaltedthird.armorStats;
    const artifactEquipmentChart = CONFIG.exaltedthird.artifactArmorStats;
    if (isArtifact) {
      armorData.system.attunement = artifactEquipmentChart[armorData.system.weighttype].attunement;
      armorData.system.soak = artifactEquipmentChart[armorData.system.weighttype].soak;
      armorData.system.hardness = artifactEquipmentChart[armorData.system.weighttype].hardness;
      armorData.system.penalty = artifactEquipmentChart[armorData.system.weighttype].penalty;
    }
    else {
      armorData.system.soak = equipmentChart[armorData.system.weighttype].soak;
      armorData.system.hardness = equipmentChart[armorData.system.weighttype].hardness;
      armorData.system.penalty = equipmentChart[armorData.system.weighttype].penalty;
      armorData.system.attunement = 0;
    }

    return armorData;
  }

  _getStaticValue(level) {
    const pools = {
      low: {
        weak: 0,
        skilled: 1,
        exceptional: 3,
        legendary: 5,
      },
      mid: {
        weak: 1,
        skilled: 2,
        exceptional: 4,
        legendary: 6,
      },
      high: {
        weak: 1,
        skilled: 3,
        exceptional: 5,
        legendary: 7,
      }
    }
    return pools[this.object.poolNumbers][level];
  }

  _getCharacterPool(level) {
    const pools = {
      low: {
        weak: 1,
        skilled: 4,
        exceptional: 8,
        legendary: 12,
      },
      mid: {
        weak: 2,
        skilled: 5,
        exceptional: 9,
        legendary: 13,
      },
      high: {
        weak: 2,
        skilled: 6,
        exceptional: 10,
        legendary: 14,
      }
    }
    return pools[this.object.poolNumbers][level];
  }

  calculateMaxExaltedMotes(moteType, exaltType, essenceLevel) {
    var maxMotes = 0;
    if (moteType === 'personal') {
      if (exaltType === 'solar' || exaltType === 'abyssal' || exaltType === 'infernal') {
        maxMotes = 10 + (essenceLevel * 3);
      }
      if (exaltType === 'dragonblooded') {
        maxMotes = 11 + essenceLevel;
      }
      if (exaltType === 'lunar' || exaltType === 'alchemical') {
        maxMotes = 15 + essenceLevel;
      }
      if (exaltType === 'exigent') {
        maxMotes = 11 + essenceLevel;
      }
      if (exaltType === 'sidereal') {
        maxMotes = 9 + (essenceLevel * 2);
      }
      if (exaltType === 'liminal') {
        maxMotes = 10 + (essenceLevel * 3);
      }
      if (exaltType === 'other') {
        maxMotes = 10 * essenceLevel;
      }
      if (exaltType === 'dreamsouled') {
        maxMotes = 11 + essenceLevel;
      }
      if (exaltType === 'hearteater' || exaltType === 'umbral') {
        maxMotes = 11 + (essenceLevel * 2);
      }
    }
    else {
      if (exaltType === 'solar' || exaltType === 'abyssal' || exaltType === 'infernal') {
        maxMotes = 26 + (essenceLevel * 7);
      }
      if (exaltType === 'dragonblooded') {
        maxMotes = 23 + (essenceLevel * 4);
      }
      if (exaltType === 'lunar') {
        maxMotes = 34 + (essenceLevel * 4);
      }
      if (exaltType === 'exigent') {
        maxMotes = 23 + (essenceLevel * 4);
      }
      if (exaltType === 'sidereal' || exaltType === 'alchemical') {
        maxMotes = 25 + (essenceLevel * 6);
      }
      if (exaltType === 'liminal') {
        maxMotes = 23 + (essenceLevel * 4);
      }
      if (exaltType === 'dreamsouled') {
        maxMotes = 23 + (essenceLevel * 4);
      }
      if (exaltType === 'hearteater' || exaltType === 'umbral') {
        maxMotes = 27 + (essenceLevel * 6);
      }
    }
    return maxMotes
  }

  _getBaseNPCStatBlock() {
    return new Actor.implementation({
      name: 'New Character',
      type: 'npc'
    }).toObject();
  }
}