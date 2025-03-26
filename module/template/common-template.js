const fields = foundry.data.fields;

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

export function approachField(name) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
        label: new fields.StringField({ initial: CONFIG.storypath.selects.approaches[name] || "" }),
        favored: new fields.BooleanField({ initial: false }),
    });
}

export function attributeField(name, approach, arena) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
        name: new fields.StringField({ initial: CONFIG.storypath.selects.attributes[name] || "" }),
        approach: new fields.StringField({ initial: approach }),
        arena: new fields.StringField({ initial: arena }),
    });
}

export function skillField(name) {
    return new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        name: new fields.StringField({ initial: CONFIG.storypath.selects.skills[name] || "" }),
        favored: new fields.BooleanField({ initial: false }),
    });
}