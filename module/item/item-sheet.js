import TraitSelector from "../apps/trait-selector.js";
import { onManageActiveEffect, prepareActiveEffectCategories } from "../effects.js";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class StorypathItemSheet extends ItemSheet {

  constructor(...args) {
    super(...args);
    this.options.classes = [...this.options.classes, this.getTypeSpecificCSSClasses()];
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["storypath", "sheet", "item"],
      width: 645,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  // TODO: If item type structure diverges across Storypath systems, consider extracting this into a config-driven template map
  get template() {
   const path = `systems/${game.system.id}/templates/item`; 
  // TODO: Using dynamic system ID for multi-Storypath support
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    if(this.item.type === 'specialty') {
      return `${path}/item-specialty-sheet.html`;
    }
    else if(this.item.type === 'knack') {
      return `${path}/item-knack-sheet.html`;
    }
    else if(this.item.type === 'birthright') {
      return `${path}/item-birthright-sheet.html`;
    }
    else if(this.item.type === 'health') {
      return `${path}/item-health-sheet.html`;
    }
    else if(this.item.type === 'boon') {
      return `${path}/item-boon-sheet.html`;
    }
    else if(this.item.system.points !== undefined) {
      return `${path}/item-points-sheet.html`;
    }
    else {
      return `${path}/item-sheet.html`;
    }
  }

  getTypeSpecificCSSClasses() {
    return `${game.settings.get("storypath-fvtt", "sheetStyle")}-background`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();
    const itemData = this.document.toPlainObject();

    context.system = itemData.system;
    context.selects = CONFIG.storypath.selects;
    context.descriptionHTML = await TextEditor.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );
    if (itemData.type === 'item') {
// TODO: This trait preparation logic mirrors prepareItemTraits() — unify or reuse if structure remains consistent
      this._prepareTraits(itemData.type, context.system.traits);
    }

    // Prepare Active Effects
    context.effects = prepareActiveEffectCategories(this.item.effects);
    
    return context;
  }

    /**
* Prepare the data structure for traits data like tags
* @param {object} traits   The raw traits data object from the item data
* @private
*/
_prepareTraits(type, traits) {
  const map = {
  };
  if (type === 'item') {
    map['equipmenttags'] = CONFIG.storypath.equipmenttags
  }
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

  /**
* Handle spawning the TraitSelector application which allows a checkbox of multiple trait options
* @param {Event} event   The click event which originated the selection
* @private
*/
// TODO: Allow alternate trait config injection per item type for Storypath variants
_onTraitSelector(event) {
  event.preventDefault();
  const a = event.currentTarget;
  const choices = CONFIG.storypath[a.dataset.options];
  const options = { name: a.dataset.target, choices };
  return new TraitSelector(this.item, options).render(true)
}


  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // $('.storypath .window-content').css({ "background": `url(/systems/storypath-fvtt/assets/background-${game.settings.get("storypath-fvtt", "sheetStyle")}.png)`, "background-size": "cover" });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html.find('.trait-selector').click(this._onTraitSelector.bind(this));

    html.find(".effect-control").click(ev => {
      if ( this.item.isOwned ) return ui.notifications.warn("Managing Active Effects within an Owned Item is not currently supported and will be added in a subsequent update.");
      onManageActiveEffect(ev, this.item);
    });

    // Roll handlers, click handlers, etc. would go here.
  }
}
