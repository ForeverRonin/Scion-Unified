// Import Modules
import { storypath } from "./module/config.js";

import { StorypathActor } from "./module/actor/actor.js";
import { StorypathActorSheet } from "./module/actor/actor-sheet.js";
import { StorypathItem } from "./module/item/item.js";
import { StorypathItemSheet } from "./module/item/item-sheet.js";

import { RollForm } from "./module/apps/dice-roller.js";
import TraitSelector from "./module/apps/trait-selector.js";
import { registerSettings } from "./module/settings.js";
import GroupResourceTracker from "./module/group-resource-tracker.js";
import { StorypathCombatTracker } from "./module/combat/combat-tracker.js";
import { StorypathCombat, StorypathCombatant } from "./module/combat/combat.js";
import { NpcData, ScionData } from "./module/template/actor-template.js";
import { ItemBirthrightData, ItemBoonData, ItemCallingData, ItemConditionData, ItemContactData, ItemData, ItemFatebindingData, ItemFlairData, ItemHealthData, ItemKnackData, ItemPathData, ItemPurviewData, ItemQualityData, ItemSpecialtyData, ItemSpellData } from "./module/template/item-template.js";
import RollForm2 from "./module/apps/dice-roller-2.js";

Hooks.once('init', async function () {

  registerSettings();

  game.storypath = {
    applications: {
      TraitSelector,
    },
    entities: {
      StorypathActor,
      StorypathItem,
    },
    config: storypath,
    RollForm,
    RollForm2,
  };

  CONFIG.Actor.dataModels = {
    scion: ScionData,
    npc: NpcData
  }

  CONFIG.Item.dataModels = {
    item: ItemData,
    path: ItemPathData,
    calling: ItemCallingData,
    knack: ItemKnackData,
    boon: ItemBoonData,
    purview: ItemPurviewData,
    birthright: ItemBirthrightData,
    contact: ItemContactData,
    specialty: ItemSpecialtyData,
    condition: ItemConditionData,
    fatebinding: ItemFatebindingData,
    quality: ItemQualityData,
    flair: ItemFlairData,
    health: ItemHealthData,
    spell: ItemSpellData,
  }

  // /**
  //  * Set an initiative formula for the system
  //  * @type {String}
  //  */
  // CONFIG.Combat.initiative = {
  //   formula: "1d10cs>=7",
  // };

  Combatant.prototype._getInitiativeFormula = function () {
    const actor = this.actor;
    var initDice = 0;
    if (this.actor.type != 'npc') {
      initDice = actor.system.attributes.cunning.value + Math.max(actor.system.skills.close.value, actor.system.skills.firearms.value);
    }
    else {
      initDice = actor.system.initiative.value;
    }
    // let roll = new Roll(``).evaluate({ async: false });
    // let diceRoll = roll.total;
    // let bonus = 0;
    return `${initDice}d10cs>=8`;
  }

  // Define custom Entity classes
  CONFIG.storypath = storypath;
  CONFIG.Actor.documentClass = StorypathActor;
  CONFIG.Item.documentClass = StorypathItem;

  CONFIG.Combat.documentClass = StorypathCombat;
  CONFIG.Combatant.documentClass = StorypathCombatant;
  CONFIG.ui.combat = StorypathCombatTracker;

  // Unregister the core sheets
Actors.unregisterSheet("core", ActorSheet);
Items.unregisterSheet("core", ItemSheet);

// Register the custom Storypath sheets
console.log("Registering StorypathActorSheet for types: ['scion', 'npc']");

Actors.registerSheet("scion-unified", StorypathActorSheet, {
  types: ["scion", "npc"],  // Add all custom actor types here
  makeDefault: true
});

Items.registerSheet("scion-unified", StorypathItemSheet, {
  types: ["item", "path", "boon", "knack", "condition", "specialty", "birthright", "purview", "spell", "fatebinding", "quality", "contact", "health", "flair", "calling"],
  makeDefault: true
});


  // Pre-load templates
  loadTemplates([
  `systems/${game.system.id}/templates/dialogues/skill-base.html`,
  `systems/${game.system.id}/templates/actor/active-effects.html`,
  `systems/${game.system.id}/templates/actor/section-header.html`,
  `systems/${game.system.id}/templates/actor/item-section-header.html`,
  `systems/${game.system.id}/templates/actor/item-points-section-header.html`,
]);


  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function () {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('numLoop', function (num, options) {
    let ret = ''

    for (let i = 0, j = num; i < j; i++) {
      ret = ret + options.fn(i)
    }

    return ret
  })
});

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("enrichedHTMLItems", function (sheetData, type, itemID) {
  return sheetData.itemDescriptions[itemID];
});

$(document).ready(() => {
  const diceIconSelector = '#chat-controls .chat-control-icon .fa-dice-d20';

  // TODO [UI-REFRACTOR]: This dialog still uses "storypath storypath-dialog dice-roller" class stack.
// Consider updating to match new reusable modal styles during the UI cleanup sprint.
// Related: SimpleChatPromptDialog refactor & Storypath modal styling.
  $(document).on('click', diceIconSelector, ev => {
    ev.preventDefault();
    new RollForm2(null, {classes: ["storypath storypath-dialog dice-roller"]}, {}, { rollType: 'base' }).render(true);
  });
});

Hooks.once("ready", async function () {
  const showBox = game.settings.get("storypath-fvtt", "showResources");
  if ((game.user.isGM && showBox !== "none") || showBox === 'all') {
    const resourceTracker = new GroupResourceTracker();
    resourceTracker.render(true);
  }

  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if (["Item", "savedRoll"].includes(data.type)) {
      createItemMacro(data, slot);
      return false;
    }
  });

  $("#chat-log").on("click", " .item-row", ev => {
    const li = $(ev.currentTarget).next();
    li.toggle("fast");
  });
});

async function createItemMacro(data, slot) {
  if (data.type !== "Item" && data.type !== "savedRoll") return;
  if (data.type === "savedRoll") {
    const command = `const formActor = await fromUuid("${data.actorId}");
    game.rollForm = new game.storypath.RollForm2(${data.actorId.includes('Token') ? 'formActor.actor' : 'formActor'}, {classes: ["storypath storypath-dialog dice-roller"]}, {}, { rollId: "${data.id}" }).render(true); `;

    const macro = await Macro.create({
      name: data.name,
      img: 'systems/storypath-fvtt/assets/icons/d10.svg',
      type: "script",
      command: command,
    });
    game.user.assignHotbarMacro(macro, slot);
  }
  return false;
}
