// import {
//   DiceRollerDialogue
// } from "./dialogue-diceRoller.js";
import RollForm2 from "../apps/dice-roller-2.js";
import { RollForm } from "../apps/dice-roller.js";
import TraitSelector from "../apps/trait-selector.js";
import { onManageActiveEffect, prepareActiveEffectCategories } from "../effects.js";
import { prepareItemTraits } from "../item/item.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class StorypathActorSheet extends ActorSheet {

  constructor(...args) {
    super(...args);

    if (this.object.type === "npc") {
      this.options.width = this.position.width = 614;
      this.options.height = this.position.height = 867;
    };

    this.options.classes = [...this.options.classes, this.getTypeSpecificCSSClasses()];

    this._filters = {
      effects: new Set()
    }
  }

  // TODO: Replace hardcoded 'storypath' with {game.system.id} in UI render classes once styles and CSS rules are verified.
  /**
 * Get the correct HTML template path to use for rendering this particular sheet
 * @type {String}
 */
  get template() {
    if (this.actor.type === "npc") return "systems/storypath-fvtt/templates/actor/npc-sheet.html";
    if (this.actor.type === "scion") return "systems/storypath-fvtt/templates/actor/scion-sheet.html";
    return "systems/storypath-fvtt/templates/actor/scion-sheet.html";
  }

  /**
 * Extend and override the sheet header buttons
 * @override
 */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    // Token Configuration
    const canConfigure = game.user.isGM || this.actor.isOwner;
    if (this.options.editable && canConfigure) {
      const helpButton = {
        label: game.i18n.localize('STORYPATH.Help'),
        class: 'help-dialogue',
        icon: 'fas fa-question',
        onclick: () => this.helpDialogue(),
      };
      buttons = [helpButton, ...buttons];
      if (this.actor.type != 'npc') {
        const colorButton = {
          label: game.i18n.localize('STORYPATH.DotColors'),
          class: 'set-color',
          icon: 'fas fa-palette',
          onclick: (ev) => this.pickColor(ev),
        };
        buttons = [colorButton, ...buttons];
      }
      // TODO: Replace hardcoded 'storypath' with {game.system.id} in UI render classes once styles and CSS rules are verified.
      const rollButton = {
        label: game.i18n.localize('STORYPATH.Roll'),
        class: 'roll-dice',
        icon: 'fas fa-dice-d10',
        onclick: (ev) => new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { rollType: 'base' }).render(true),
      };
      buttons = [rollButton, ...buttons];
    }

    

    return buttons;
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["storypath", "sheet", "actor"],
      // TODO: Use {game.system.id} for template path if standardizing across Storypath games
      template: "systems/storypath-fvtt/templates/actor/scion-sheet.html",
      width: 875,
      height: 1110,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

  getTypeSpecificCSSClasses() {
    return `${game.settings.get("storypath-fvtt", "sheetStyle")}-background`;
  }
  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();
    context.dtypes = ["String", "Number", "Boolean"];

    const actorData = this.document.toPlainObject();

    context.system = actorData.system;
    context.flags = actorData.flags;
    context.selects = CONFIG.storypath.selects;
    context.biographyHTML = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );
    // Update traits
    this._prepareTraits(context.system.traits);

    this.actor.headerImg = `systems/storypath-fvtt/assets/${game.settings.get("storypath-fvtt", "sheetStyle")}-header.png`;
    this.actor.headerImgSmall = `systems/storypath-fvtt/assets/${game.settings.get("storypath-fvtt", "sheetStyle")}-small-header.png`;

    this._prepareCharacterItems(context);

    context.itemDescriptions = {};
    for (let item of this.actor.items) {
      context.itemDescriptions[item.id] = await TextEditor.enrichHTML(item.system.description, { async: true, secrets: this.actor.isOwner, relativeTo: item });
    }

    context.effects = prepareActiveEffectCategories(this.document.effects);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const gear = [];
    const paths = [];
    const callings = [];
    const knacks = [];
    const birthrights = [];
    const boons = [];
    const purviews = [];
    const contacts = [];
    const conditions = [];
    const fatebindings = [];
    const specialties = [];
    const qualities = [];
    const flairs = [];
    const health = [];
    const spells = [];
    const activeKnacks = {};

    // Iterate through items, allocating to containers
    for (let i of sheetData.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'item') {
        prepareItemTraits('item', i);
        gear.push(i);
      }
      else if (i.type === 'path') {
        paths.push(i);
      }
      else if (i.type === 'calling') {
        callings.push(i);
        if(!activeKnacks[i.name.toLowerCase()]) {
          activeKnacks[i.name.toLowerCase()] = {
            label: i.name,
            total: i.system.points,
            active: 0
          }
        }
        else {
          activeKnacks[i.name.toLowerCase()].total += i.system.points;
        }
      }
      else if (i.type === 'birthright') {
        birthrights.push(i);
      }
      else if (i.type === 'boon') {
        boons.push(i);
      }
      else if (i.type === 'purview') {
        purviews.push(i);
      }
      else if (i.type === 'knack') {
        knacks.push(i);
        if(i.system.active && i.system.category !== 'dragon') {
          if(!activeKnacks[i.system.calling.toLowerCase()]) {
            activeKnacks[i.system.calling.toLowerCase()] = {
              label: i.system.calling,
              total: 0,
              active: (i.system.category === 'immortal' ? 2 : 1)
            }
          }
          else {
            activeKnacks[i.system.calling.toLowerCase()].active += (i.system.category === 'immortal' ? 2 : 1)
          }
        }
      }
      else if (i.type === 'contact') {
        contacts.push(i);
      }
      else if (i.type === 'specialty') {
        specialties.push(i);
      }
      else if (i.type === 'condition') {
        conditions.push(i);
      }
      else if (i.type === 'fatebinding') {
        fatebindings.push(i);
      }
      else if (i.type === 'quality') {
        qualities.push(i);
      }
      else if (i.type === 'flair') {
        flairs.push(i);
      }
      else if (i.type === 'health') {
        health.push(i);
      }
      else if (i.type === 'spell') {
        spells.push(i);
      }
    }

    // Assign and return
    actorData.gear = gear;
    actorData.paths = paths;
    actorData.callings = callings;
    actorData.knacks = knacks;
    actorData.birthrights = birthrights;
    actorData.boons = boons;
    actorData.purviews = purviews;
    actorData.contacts = contacts;
    actorData.specialties = specialties;
    actorData.conditions = conditions;
    actorData.fatebindings = fatebindings;
    actorData.qualities = qualities;
    actorData.flairs = flairs;
    actorData.health = health;
    actorData.spells = spells;
    actorData.activeKnacks = activeKnacks;
  }

  /**
 * Prepare the data structure for traits data like languages
 * @param {object} traits   The raw traits data object from the actor data
 * @private
 */
  _prepareTraits(traits) {
    const map = {
      "languages": CONFIG.storypath.languages,
    };
    for (let [t, choices] of Object.entries(map)) {
      const trait = traits[t];
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

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    this._setupDotCounters(html)
    this._setupSquareCounters(html)



    // $('.storypath .window-content').css({ "background": `url(/systems/storypath-fvtt/assets/background-${game.settings.get("storypath-fvtt", "sheetStyle")}.png)`, "background-size": "cover" });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // if (this.actor.type === 'scion') {
    //   $('.storypath .window-content').css({ "background": `url(/systems/storypath-fvtt/assets/background-${this.actor.system.info.tier}.png)` });
    // }

    // if (this.actor.type === 'npc') {
    //   $('.storypath .window-content').css({ "background": `url(/systems/storypath-fvtt/assets/background-npc.png)` });
    // }

    html.find('.trait-selector').click(this._onTraitSelector.bind(this));

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    html.find('.resource-value > .single-resource-value-step').click(this._onSingleDotCounterChange.bind(this))
    html.find('.resource-value > .resource-value-step').click(this._onDotCounterChange.bind(this))
    html.find('.resource-value > .resource-value-empty').click(this._onDotCounterEmpty.bind(this))
    html.find('.resource-counter > .resource-counter-step').click(this._onSquareCounterChange.bind(this))

    html.find('.augment-attribute').click(this._toggleAugment.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      ev.stopPropagation();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(async ev => {
      const applyChanges = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize("STORYPATH.Delete") },
        content: "<p>Are you sure you want to delete this item?</p>",
        modal: true
      });
      if (applyChanges) {
        const li = $(ev.currentTarget).parents(".item");
        this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
        li.slideUp(200, () => this.render(false));
      }
    });

    html.find('#calculate-health').mousedown(ev => {
      this.calculateHealth();
    });

    html.find('#rollSkill').mousedown(ev => {
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, {}).render(true);
    });

    html.find('#rollInitiative').mousedown(ev => {
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { skill: 'close', rollType: 'initiative' }).render(true);
    });

    html.find('.roll-skill').mousedown(ev => {
      var skill = $(ev.target).attr("data-skill");
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { skill: skill }).render(true);
    });

    html.find('.roll-pool').mousedown(ev => {
      var pool = $(ev.target).attr("data-pool");
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { pool: pool }).render(true);
    });

    html.find('.item-roll').mousedown(ev => {
      let li = $(event.currentTarget).parents(".item");
      let item = this.actor.items.get(li.data("item-id"));
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { attribute: 'none', skill: 'none', rollType: 'itemRoll', itemDice: item.system.points }).render(true);
    });

    html.find('.item-activate').click(ev => {
      ev.preventDefault();
      ev.stopPropagation();
      let li = $(ev.currentTarget).parents(".item");
      let item = this.actor.items.get(li.data("item-id"));
      item.update({
        [`system.active`]: !item.system.active,
      });
    });

    html.find('.item-chat').click(ev => {
      this._displayCard(ev);
    });

    html.find('.item-row').click(ev => {
      const li = $(ev.currentTarget).next();
      li.toggle("fast");
    });

    html.find('.quick-roll').click(ev => {
      let li = $(event.currentTarget).parents(".item");
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { rollId: li.data("item-id"), skipDialog: true }).roll();
    });

    html.find('.saved-roll').click(ev => {
      let li = $(event.currentTarget).parents(".item");
      new RollForm2(this.actor, {classes: ["storypath storypath-dialog dice-roller", this.actor.getSheetBackground()]}, {}, { rollId: li.data("item-id") }).render(true);
    });

    html.find('.delete-saved-roll').click(async ev => {
      let li = $(event.currentTarget).parents(".item");
      var key = li.data("item-id");
      const rollDeleteString = "system.savedRolls.-=" + key;

      const deleteConfirm = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize('STORYPATH.Delete') },
        content: `<p>Delete Saved Roll?</p>`,
        modal: true
      });
      if (deleteConfirm) {
        this.actor.update({ [rollDeleteString]: null });
        ui.notifications.notify(`Saved Roll Deleted`);
      }
    });

    $(document.getElementById('chat-log')).on('click', '.chat-card', (ev) => {
      const li = $(ev.currentTarget).next();
      li.toggle("fast");
    });

    html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    html.find('.rollable').click(this._onRoll.bind(this));

    html.find('.item-wounded').on('click', async (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const itemID = li.data('itemId');
      const item = this.actor.items.get(itemID);
      await this.actor.updateEmbeddedDocuments('Item', [
        {
          _id: itemID,
          system: {
            wounded: !item.system.wounded,
          },
        }
      ]);
    });

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      let savedRollhandler = ev => this._onDragSavedRoll(ev);

      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        if (li.classList.contains("saved-roll-row")) {
          li.addEventListener("dragstart", savedRollhandler, false);
        }
        else {
          li.addEventListener("dragstart", handler, false);
        }
      });
    }
  }

  async _onDragSavedRoll(ev) {
    const li = ev.currentTarget;
    if (ev.target.classList.contains("content-link")) return;
    const savedRoll = this.actor.system.savedRolls[li.dataset.itemId];
    ev.dataTransfer.setData("text/plain", JSON.stringify({ actorId: this.actor.uuid, type: 'savedRoll', id: li.dataset.itemId, name: savedRoll.name }));
  }


  async helpDialogue() {
    const template = "systems/storypath-fvtt/templates/dialogues/help-dialogue.html"
    const html = await renderTemplate(template);

    new foundry.applications.api.DialogV2({
      window: { title: game.i18n.localize("STORYPATH.Help"), resizable: true },
      content: html,
      buttons: [{ action: 'close', label: game.i18n.localize("STORYPATH.Close") }],
    }).render(true);
  }

  async pickColor(event) {
    event.preventDefault();
    const actorData = foundry.utils.duplicate(this.actor);
    const data = actorData.system;
    const template = "systems/storypath-fvtt/templates/dialogues/color-picker.html"
    const html = await renderTemplate(template, { 'color': data.details.color });

    new foundry.applications.api.DialogV2({
      window: { title: game.i18n.localize("STORYPATH.PickColor") },
      content: html,
      buttons: [{
        action: "choice",
        label: game.i18n.localize("STORYPATH.Save"),
        default: true,
        callback: (event, button, dialog) => button.form.elements
      }, {
        action: "cancel",
        label: game.i18n.localize("STORYPATH.Cancel"),
        callback: (event, button, dialog) => false
      }],
      submit: result => {
        if (result) {
          let color = result.color.value;
          if (isColor(color)) {
            this.actor.update({ [`system.details.color`]: color });
          }
        }
      }
    }).render({ force: true });
  }

  async calculateHealth() {
    const actorData = foundry.utils.duplicate(this.actor);
    const data = actorData.system;
    let  template = "systems/storypath-fvtt/templates/dialogues/calculate-npc-health.html";
    let  html = await renderTemplate(template, { 'health': data.health.max });

    new foundry.applications.api.DialogV2({
      window: { title: game.i18n.localize("STORYPATH.CalculateHealth") },
      content: html,
      buttons: [{
        action: "choice",
        label: game.i18n.localize("STORYPATH.Save"),
        default: true,
        callback: (event, button, dialog) => button.form.elements
      }, {
        action: "cancel",
        label: game.i18n.localize("STORYPATH.Cancel"),
        callback: (event, button, dialog) => false
      }],
      submit: result => {
        if (result) {
          let health = result.health.value;
          data.health.bashing = 0;
          data.health.lethal = 0;
          data.health.aggravated = 0;
          data.health.max = health;
          this.actor.update(actorData);
        }
      }
    }).render({ force: true });
  }

  _onSquareCounterChange(event) {
    event.preventDefault()
    const element = event.currentTarget
    const index = Number(element.dataset.index)
    const oldState = element.dataset.state || ''
    const parent = $(element.parentNode)
    const data = parent[0].dataset
    const states = parseCounterStates(data.states)
    const fields = data.name.split('.')
    const steps = parent.find('.resource-counter-step')
    const fulls = Number(data[states['-']]) || 0
    const halfs = Number(data[states['/']]) || 0
    const crosses = Number(data[states['x']]) || 0

    if (index < 0 || index > steps.length) {
      return
    }

    const allStates = ['', ...Object.keys(states)]
    const currentState = allStates.indexOf(oldState)
    if (currentState < 0) {
      return
    }

    const newState = allStates[(currentState + 1) % allStates.length]
    steps[index].dataset.state = newState

    if ((oldState !== '' && oldState !== '-') || (oldState !== '')) {
      data[states[oldState]] = Number(data[states[oldState]]) - 1
    }

    // If the step was removed we also need to subtract from the maximum.
    if (oldState !== '' && newState === '') {
      data[states['-']] = Number(data[states['-']]) - 1
    }

    if (newState !== '') {
      data[states[newState]] = Number(data[states[newState]]) + Math.max(index + 1 - fulls - halfs - crosses, 1)
    }

    const newValue = Object.values(states).reduce(function (obj, k) {
      obj[k] = Number(data[k]) || 0
      return obj
    }, {})

    this._assignToActorField(fields, newValue)
  }

  _onDotCounterChange(event) {
    event.preventDefault()
    const actorData = foundry.utils.duplicate(this.actor)
    const element = event.currentTarget
    const dataset = element.dataset
    const index = Number(dataset.index)
    const parent = $(element.parentNode)
    const fieldStrings = parent[0].dataset.name
    const fields = fieldStrings.split('.')
    const steps = parent.find('.resource-value-step')
    if (index < 0 || index > steps.length) {
      return
    }

    steps.removeClass('active')
    steps.each(function (i) {
      if (i <= index) {
        // $(this).addClass('active')
        $(this).css("background-color", actorData.system.details.color);
      }
    })
    this._assignToActorField(fields, index + 1)
  }

  _onSingleDotCounterChange() {
    event.preventDefault()
    const actorData = foundry.utils.duplicate(this.actor)
    const element = event.currentTarget
    const dataset = element.dataset
    const index = Number(dataset.index)
    const parent = $(element.parentNode)
    const fieldStrings = parent[0].dataset.name
    const fields = fieldStrings.split('.')
    const steps = parent.find('.single-resource-value-step')
    if (index < 0 || index > steps.length) {
      return
    }

    steps.removeClass('active')
    steps.each(function (i) {
      if (i == index) {
        // $(this).addClass('active')
        $(this).css("background-color", actorData.system.details.color);
      }
    })
    this._assignToActorField(fields, index + 1)
  }

  _assignToActorField(fields, value) {
    const actorData = foundry.utils.duplicate(this.actor)
    // update actor owned items
    if (fields.length === 2 && fields[0] === 'items') {
      for (const i of actorData.items) {
        if (fields[1] === i._id) {
          i.system.points = value
          break
        }
      }
    } else {
      const lastField = fields.pop()
      if (fields.reduce((data, field) => data[field], actorData)[lastField] === 1 && value === 1) {
        fields.reduce((data, field) => data[field], actorData)[lastField] = 0;
      }
      else {
        fields.reduce((data, field) => data[field], actorData)[lastField] = value
      }
    }
    this.actor.update(actorData)
  }

  _onDotCounterEmpty(event) {
    event.preventDefault()
    const actorData = foundry.utils.duplicate(this.actor)
    const element = event.currentTarget
    const parent = $(element.parentNode)
    const fieldStrings = parent[0].dataset.name
    const fields = fieldStrings.split('.')
    const steps = parent.find('.resource-value-empty')

    steps.removeClass('active')
    this._assignToActorField(fields, 0)
  }

  _setupDotCounters(html) {
    const actorData = foundry.utils.duplicate(this.actor)
    html.find('.resource-value').each(function () {
      const value = Number(this.dataset.value);
      $(this).find('.resource-value-step').each(function (i) {
        if (i + 1 <= value) {
          $(this).addClass('active')
          $(this).css("background-color", actorData.system.details.color);
        }
      })
      $(this).find('.single-resource-value-step').each(function (i) {
        if (i + 1 == value) {
          $(this).addClass('active')
          $(this).css("background-color", actorData.system.details.color);
        }
      })
    })
    html.find('.resource-value-static').each(function () {
      const value = Number(this.dataset.value)
      $(this).find('.resource-value-static-step').each(function (i) {
        if (i + 1 <= value) {
          $(this).addClass('active')
          $(this).css("background-color", actorData.system.details.color);
        }
      })
    })
  }

  _setupSquareCounters(html) {
    html.find('.resource-counter').each(function () {
      const data = this.dataset;
      const states = parseCounterStates(data.states);

      const halfs = Number(data[states['/']]) || 0;
      const crossed = Number(data[states.x]) || 0;
      const stars = Number(data[states['*']]) || 0;

      const values = new Array(halfs + crossed + stars);

      values.fill('/', 0, halfs);
      values.fill('x', halfs, halfs + crossed);
      values.fill('*', halfs + crossed, halfs + crossed + stars);

      $(this).find('.resource-counter-step').each(function () {
        this.dataset.state = ''
        if (this.dataset.index < values.length) {
          this.dataset.state = values[this.dataset.index];
        }
      })
    })
  }

  _toggleAugment(event) {
    event.preventDefault()
    const element = event.currentTarget
    const attribute = element.dataset.name
    const actorData = foundry.utils.duplicate(this.actor)
    var augStatus = actorData.system.attributes[attribute].aug;
    actorData.system.attributes[attribute].aug = !augStatus;
    this.actor.update(actorData);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    event.stopPropagation();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = foundry.utils.duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return this.actor.createEmbeddedDocuments("Item", [itemData])
  }

  /**
 * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options
 * @param {Event} event   The click event which originated the selection
 * @private
 */
  _onTraitSelector(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const label = a.parentElement.querySelector("label");
    const choices = CONFIG.storypath[a.dataset.options];
    const options = { name: a.dataset.target, title: label.innerText, choices };
    return new TraitSelector(this.actor, options).render(true)
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.system);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
  }

  /**
* Display the chat card for an Item as a Chat Message
* @param {object} options          Options which configure the display of the item chat card
* @param {string} rollMode         The message visibility mode to apply to the created card
* @param {boolean} createMessage   Whether to automatically create a ChatMessage entity (if true), or only return
*                                  the prepared message data (if false)
*/
  async _displayCard(event) {
    event.preventDefault();
    event.stopPropagation();
    // Render the chat card template
    let li = $(event.currentTarget).parents(".item");
    let item = this.actor.items.get(li.data("item-id"));
    const token = this.actor.token;
    const templateData = {
      actor: this.actor,
      tokenId: token?.uuid || null,
      item: item,
      labels: this.labels,
    };
    const html = await renderTemplate("systems/storypath-fvtt/templates/chat/item-card.html", templateData);

    // Create the ChatMessage data object
    const chatData = {
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_STYLES.OTHER,
      content: html,
      speaker: ChatMessage.getSpeaker({ actor: this.actor, token }),
    };


    // Create the Chat Message or return its data
    return ChatMessage.create(chatData);
  }
}


function parseCounterStates(states) {
  return states.split(',').reduce((obj, state) => {
    const [k, v] = state.split(':')
    obj[k] = v
    return obj
  }, {})
}

function isColor(strColor) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}
