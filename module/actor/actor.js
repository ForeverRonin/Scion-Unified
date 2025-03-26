/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class StorypathActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.bonfire || {};
    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareBaseActorData(this);
    this._prepareCharacterData(this);
    this._prepareNpcData(this);
  }

  async _preCreate(createData, options, userId) {
    if (!createData.img) {
      this.updateSource({ img: getDefaultImage(createData.type), token: { img: getDefaultImage(createData.type) } });
    }
    if (createData.items)
      return
    if (createData.type === 'scion') {
      const itemData = [{
        name: "Bruised",
        type: "health",
        img: "icons/svg/regen.svg",
        data: {
          level: 1
        }
      },
      {
        name: "Bruised",
        type: "health",
        img: "icons/svg/regen.svg",
        data: {
          level: 1
        }
      },
      {
        name: "Injured",
        type: "health",
        img: "icons/svg/regen.svg",
        data: {
          level: 2
        }
      },
      {
        name: "Injured",
        type: "health",
        img: "icons/svg/regen.svg",
        data: {
          level: 2
        }
      },
      {
        name: "Maimed",
        type: "health",
        img: "icons/svg/regen.svg",
        data: {
          level: 4
        }
      },
      ];

      this.updateSource({ items: itemData });
    }
  }

  async _preUpdate(updateData, options, user) {
    await super._preUpdate(updateData, options, user)
    if (updateData.img !== "icons/svg/skull.svg" && this.prototypeToken.texture.src === "icons/svg/skull.svg") {
      updateData.prototypeToken = { texture: { src: updateData.img } };
    }
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'scion') return;

    const actorSystem = actorData.system;
    if (actorSystem.info.tier === 'demigod' || actorSystem.info.tier === 'god') {
      actorSystem.showDivinityDice = true;
    }
    actorSystem.experience.remaining = actorSystem.experience.gained - actorSystem.experience.spent;
  }

  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    const actorSystem = actorData.system;
    let currentPenalty = 0;
    if ((actorSystem.health.lethal + actorSystem.health.aggravated) >= Math.floor(actorSystem.health.max / 2)) {
      currentPenalty = 2;
    }
    actorSystem.health.penalty = currentPenalty;
  }

  _prepareBaseActorData(actorData) {
  }

  getSheetBackground() {
    return `${game.settings.get("storypath-fvtt", "sheetStyle")}-background`;
  }

  /**
* Convert the actor document to a plain object.
* 
* The built in `toObject()` method will ignore derived data when using Data Models.
* This additional method will instead use the spread operator to return a simplified
* version of the data.
* 
* @returns {object} Plain object either via deepClone or the spread operator.
*/
  toPlainObject() {
    const result = { ...this };

    // Simplify system data.
    result.system = this.system.toPlainObject();

    // Add items.
    result.items = this.items?.size > 0 ? this.items.contents : [];

    // Add effects.
    result.effects = this.effects?.size > 0 ? this.effects.contents : [];

    return result;
  }
}

function getDefaultImage(type) {
  const defaultImages = {
    'npc': "icons/svg/skull.svg"
  };
  return defaultImages[type] || CONST.DEFAULT_TOKEN;
}
