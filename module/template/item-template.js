// Shared item data structures for Storypath systems
// TODO: Split into core/shared vs. system-specific classes if game logic diverges
import { traitField } from "./common-template.js";
// These item data models are partially system-agnostic, but many fields are Scion-specific.
// TODO: If supporting multiple Storypath games, consider extracting shared logic to a base class
// and using system-specific extensions (e.g., ScionItemKnackData) where needed.
const fields = foundry.data.fields;

class CommonItemData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        // Note that the return is just a simple object
        return {
            description: new fields.HTMLField({ initial: "" }),
            pagenum: new fields.StringField({ initial: "" }),
        }
    }

    toPlainObject() {
        return { ...this };
    }
}
// TODO: Confirm equipment tag format is consistent across Storypath games
// TODO: This item type may gain system-specific fields in the future
export class ItemData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            quantity: new fields.NumberField({ initial: 1 }),
            traits: new fields.SchemaField({
                equipmenttags: traitField(),
            }),
        }
    }
}

export class ItemPathData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemPurviewData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemConditionData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}


export class ItemFatebindingData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemQualityData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemFlairData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemHealthData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            level: new fields.NumberField({ initial: 0 }),
            wounded: new fields.BooleanField({ initial: false }),
        }
    }
}

export class ItemSpellData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}

export class ItemCallingData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            points: new fields.NumberField({ initial: 0 }),
        }
    }
}

export class ItemBirthrightData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            points: new fields.NumberField({ initial: 0 }),
            type: new fields.StringField({ initial: "relic" }),
        }
    }
}

export class ItemKnackData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            points: new fields.NumberField({ initial: 0 }),
            type: new fields.StringField({ initial: "relic" }),
            active: new fields.BooleanField({ initial: false }),
            calling: new fields.StringField({ initial: "" }),
            costtype: new fields.StringField({ initial: "legend" }),
            category: new fields.StringField({ initial: "mortal" }),
            cost: new fields.NumberField({ initial: 0 }),
        }
    }
}

export class ItemBoonData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            cost: new fields.StringField({ initial: "" }),
            costtype: new fields.StringField({ initial: "imbue" }),
        }
    }
}

export class ItemSpecialtyData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
            skill: new fields.StringField({ initial: "" }),
        }
    }
}

export class ItemContactData extends CommonItemData {
    static defineSchema() {
        const commonData = super.defineSchema();

        return {
            ...commonData,
        }
    }
}
