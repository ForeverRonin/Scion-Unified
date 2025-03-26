import { skillField, attributeField, resourceField, statField, traitField, approachField } from "./common-template.js";

const fields = foundry.data.fields;

class CommonActorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    // Note that the return is just a simple object
    return {
      biography: new fields.HTMLField({ initial: "" }),
      details: new fields.SchemaField({
        color: new fields.StringField({ initial: "#000000" }),
        chronicle: new fields.StringField({ initial: "" }),
      }),
      traits: new fields.SchemaField({
        languages: traitField(),
      }),
      savedRolls: new fields.ObjectField({ initial: {} }),
    }
  }
  
  toPlainObject() {
    return { ...this };
  }
}

export class ScionData extends CommonActorData {
  static defineSchema() {
    // CharacterData inherits those resource fields
    const commonData = super.defineSchema();
    return {
      // Using destructuring to effectively append our additional data here
      ...commonData,

      approaches: new fields.SchemaField({
        power: approachField("power"),
        finesse: approachField("finesse"),
        resistance: approachField("resistance")
      }),
      attributes: new fields.SchemaField({
        intellect: attributeField("intellect", "power", "mental"),
        might: attributeField("might", "power", "physical"),
        presence: attributeField("presence", "power", "social"),
        cunning: attributeField("cunning", "finesse", "mental"),
        dexterity: attributeField("dexterity", "finesse", "physical"),
        manipulation: attributeField("manipulation", "finesse", "social"),
        resolve: attributeField("resolve", "resistance", "mental"),
        stamina: attributeField("stamina", "resistance", "physical"),
        composure: attributeField("composure", "resistance", "social")
      }),
      skills: new fields.SchemaField({
        academics: skillField("academics"),
        athletics: skillField("athletics"),
        close: skillField("close"),
        culture: skillField("culture"),
        empathy: skillField("empathy"),
        firearms: skillField("firearms"),
        integrity: skillField("integrity"),
        leadership: skillField("leadership"),
        medicine: skillField("medicine"),
        occult: skillField("occult"),
        persuasion: skillField("persuasion"),
        pilot: skillField("pilot"),
        science: skillField("science"),
        subterfuge: skillField("subterfuge"),
        survival: skillField("survival"),
        technology: skillField("technology")
      }),
      virtue: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        virtue: new fields.StringField({ initial: "" }),
        countervirtue: new fields.StringField({ initial: "" }),
      }),
      deeds: new fields.SchemaField({
        short: new fields.StringField({ initial: "" }),
        long: new fields.StringField({ initial: "" }),
        band: new fields.StringField({ initial: "" }),
        memory: new fields.StringField({ initial: "" }),
        draconic: new fields.StringField({ initial: "" }),
        worldly: new fields.StringField({ initial: "" }),
        notes: new fields.StringField({ initial: "" }),
      }),
      awareness: resourceField(0, 10),
      divinitydice: resourceField(0, 10),
      legend: new fields.SchemaField({
        min: new fields.NumberField({ initial: 0 }),
        value: new fields.NumberField({ initial: 0 }),
        max: new fields.NumberField({ initial: 0 }),
        imbued: new fields.NumberField({ initial: 0 }),
        title: new fields.StringField({ initial: "" }),
      }),
      info: new fields.SchemaField({
        tier: new fields.StringField({ initial: "origin" }),
        parent: new fields.StringField({ initial: "" }),
      }),
      inheritance: new fields.SchemaField({
        min: new fields.NumberField({ initial: 0 }),
        value: new fields.NumberField({ initial: 0 }),
        max: new fields.NumberField({ initial: 0 }),
        imbued: new fields.NumberField({ initial: 0 }),
      }),
      defense: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
      }),
      movement: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
      }),
      momentum: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
      }),
      experience: new fields.SchemaField({
        gained: new fields.NumberField({ initial: 0 }),
        spent: new fields.NumberField({ initial: 0 }),
        remaining: new fields.NumberField({ initial: 0 }),
      }),
      magics: new fields.StringField({ initial: "" }),
    }
  }

  static migrateData(source) {
    if (source.legend?.total && source.health?.max === 0) {
      source.health.max = source.health.total;
      source.health.total = 0;
    }
    return super.migrateData(source);
  }

  toPlainObject() {
    return { ...this };
  }
}

export class NpcData extends CommonActorData {
  static defineSchema() {
    const commonData = super.defineSchema();
    return {
      ...commonData,
      archetype: new fields.StringField({ initial: "" }),
      drive: new fields.StringField({ initial: "" }),
      extras: new fields.StringField({ initial: "" }),
      tier: new fields.NumberField({ initial: 0 }),
      health: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        min: new fields.NumberField({ initial: 0 }),
        max: new fields.NumberField({ initial: 1 }),
        levels: new fields.NumberField({ initial: 1 }),
        lethal: new fields.NumberField({ initial: 0 }),
        aggravated: new fields.NumberField({ initial: 0 }),
        penalty: new fields.NumberField({ initial: 0 }),
      }),
      pools: new fields.SchemaField({
        primary: new fields.SchemaField({
          value: new fields.NumberField({ initial: 0 }),
          actions: new fields.StringField({ initial: "" }),
        }),
        secondary: new fields.SchemaField({
          value: new fields.NumberField({ initial: 0 }),
          actions: new fields.StringField({ initial: "" }),
        }),
        desperation: new fields.SchemaField({
          value: new fields.NumberField({ initial: 0 }),
          actions: new fields.StringField({ initial: "" }),
        }),
      }),
      defense: statField(0),
      initiative: statField(0),
      threat: statField(0),
      legend: statField(0),
      size: statField(0),
      scale: statField(0),
    }
  }

  static migrateData(source) {
    if (source.health?.levels && source.health?.max === 0) {
      source.health.max = source.health.levels;
      source.health.levels = 0;
    }
    return super.migrateData(source);
  }
}