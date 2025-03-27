const fields = foundry.data.fields;
// These reusable field templates are shared across Storypath actor types
// TODO: Confirm all label lookups in CONFIG.storypath are flexible enough for multi-game support
// TODO: If system-specific terms emerge, consider passing CONFIG context into functions

export function resourceField(initialValue, initialMax) {
    return new fields.SchemaField({
        min: new fields.NumberField({ initial: 0 }),
        value: new fields.NumberField({ initial: initialValue }),
        max: new fields.NumberField({ initial: initialMax }),
    });
}

export function statField(initialValue) {
    return new fields.SchemaField({
        min: new fields.NumberField({ initial: 0 }),
        value: new fields.NumberField({ initial: initialValue }),
    });
}

export function traitField() {
    return new fields.SchemaField({
        value: new fields.ArrayField(new fields.StringField({ initial: ""})),
        custom: new fields.StringField({ initial: "" }),
    });
}
// TODO: Verify if approach and attribute labels vary by Storypath game
// If so, make CONFIG source dynamic or allow override at field call
export function approachField(name) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
        label: new fields.StringField({ initial: CONFIG.storypath.selects.approaches[name] || "" }),
        favored: new fields.BooleanField({ initial: false }),
    });
}
// TODO: Verify if approach and attribute labels vary by Storypath game
// If so, make CONFIG source dynamic or allow override at field call
export function attributeField(name, approach, arena) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
        name: new fields.StringField({ initial: CONFIG.storypath.selects.attributes[name] || "" }),
        approach: new fields.StringField({ initial: approach }),
        arena: new fields.StringField({ initial: arena }),
    });
}
// TODO: Skill labels may differ between Storypath games — confirm shared structure or allow injection
export function skillField(name) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        name: new fields.StringField({ initial: CONFIG.storypath.selects.skills[name] || "" }),
        favored: new fields.BooleanField({ initial: false }),
    });
}
