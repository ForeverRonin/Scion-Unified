/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class StorypathItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.system;
    const actorData = this.actor ? this.actor.system : {};
  }

  async _preCreate(createData, options, userId) {
    this.updateSource({ img: getDefaultImage(createData.type) });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    // Basic template rendering data
    const token = this.actor.token;
    const actorData = this.actor ? this.actor.system : {};
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

    // Add effects.
    result.effects = this.effects?.size > 0 ? this.effects.contents : [];

    return result;
  }
}

function getDefaultImage(type) {
  const defaultImages = {
    'knack': "icons/svg/light.svg",
    'contact': "icons/svg/mystery-man.svg",
    'path': "systems/storypath-fvtt/assets/icons/mountain-road.svg",
    'specialty': "icons/svg/upgrade.svg",
    'quality': "icons/svg/aura.svg",
    'flair': "systems/storypath-fvtt/assets/icons/eclipse-flare.svg",
    'birthright': "icons/svg/chest.svg",
    'boon': "systems/storypath-fvtt/assets/icons/gift-trap.svg",
    'purview': "systems/storypath-fvtt/assets/icons/world.svg",
    'condition': "icons/svg/daze.svg",
    'calling': "systems/storypath-fvtt/assets/icons/book-aura.svg",
    'health': "icons/svg/regen.svg",
    'fatebinding': "systems/storypath-fvtt/assets/icons/crossed-chains.svg",
    'spell': "systems/storypath-fvtt/assets/icons/magic-swirl.svg",
    'item': "icons/svg/item-bag.svg"
  };
  return defaultImages[type] || CONST.DEFAULT_TOKEN;
}

export function prepareItemTraits(type, i) {
  const map = {
  };
  if (type === 'item') {
    map['equipmenttags'] = CONFIG.storypath.equipmenttags
  }
  for (let [t, choices] of Object.entries(map)) {
    const trait = i.system.traits[t];
    if (!trait) continue;
    let values = [];
    if (trait.value) {
      values = trait.value instanceof Array ? trait.value : [trait.value];
    }
    trait.selected = values.reduce((obj, t) => {
      obj[t] = choices[t];
      return obj;
    }, {});

    // Add custom entry
    if (trait.custom) {
      trait.custom.split(";").forEach((c, i) => trait.selected[`custom${i + 1}`] = c.trim());
    }
    trait.cssClass = !foundry.utils.isEmpty(trait.selected) ? "" : "inactive";
  }
}
