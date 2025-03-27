/**
 * Storypath Combat Extensions
 *
 * This file customizes Foundry's core Combat and Combatant classes for use with Storypath games.
 *
 * ⚠️ Future Considerations:
 * - Turn order and initiative behavior may differ between Storypath games (e.g., TCF vs. Scion).
 * - Consider modularizing turn logic into system-specific strategies if divergence increases.
 * - `flags.acted` is currently used to track combatant state; confirm if this generalizes across systems.
 * - Combatant permission handling assumes a consistent actor-based model — verify against future system variants.
 *
 * Currently compatible across systems, but may need adaptation if mechanics or UX patterns diverge.
 */

export class StorypathCombat extends Combat {
    async resetTurnsTaken() {
      const updates = this.combatants.map(c => {
        return {
          _id: c.id,
          [`flags.acted`]: c.isDefeated
            ? true
            : false,
        };
      });
      return this.updateEmbeddedDocuments("Combatant", updates);
    }
  
    async _preCreate(...[data, options, user]) {
      this.turn = null;
      return super._preCreate(data, options, user);
    }
  
    async startCombat() {
      await this.resetTurnsTaken();
      return this.update({ round: 1, turn: null });
    }
  
  
    async nextRound() {
      await this.resetTurnsTaken();
      let advanceTime = Math.max(this.turns.length - (this.turn || 0), 0) * CONFIG.time.turnTime;
      advanceTime += CONFIG.time.roundTime;
      return this.update({ round: this.round + 1, turn: null }, { advanceTime });
    }
  
    async previousRound() {
      await this.resetTurnsTaken();
      const round = Math.max(this.round - 1, 0);
      let advanceTime = 0;
      if (round > 0)
        advanceTime -= CONFIG.time.roundTime;
      return this.update({ round, turn: null }, { advanceTime });
    }
  
    async resetAll() {
      await this.resetTurnsTaken();
      this.combatants.forEach(c => c.updateSource({ initiative: null }));
      return this.update({ turn: null, combatants: this.combatants.toObject() }, { diff: false });
    }
  
    async toggleTurnOver(id) {
      const combatant = this.getEmbeddedDocument("Combatant", id);
      await combatant?.toggleCombatantTurnOver();
      const turn = this.turns.findIndex(t => t.id === id);
      return this.update({ turn });
    }
  
    async rollAll(options) {
      const ids = this.combatants.reduce((ids, c) => {
        if (c.isOwner && (c.initiative === null)) ids.push(c.id);
        return ids;
      }, []);
      await super.rollInitiative(ids, options);
      return this.update({ turn: null });
    }
  
    async rollNPC(options = {}) {
      const ids = this.combatants.reduce((ids, c) => {
        if (c.isOwner && c.isNPC && (c.initiative === null)) ids.push(c.id);
        return ids;
      }, []);
      await super.rollInitiative(ids, options);
      return this.update({ turn: null });
    }
  }

export class StorypathCombatant extends Combatant {
    prepareBaseData() {
        super.prepareBaseData();
        if (
            this.flags?.acted === undefined &&
            canvas?.ready) {
            this.flags.acted = false;
        }
    }
    testUserPermission(...[user, permission, options]) {
        return (this.actor?.testUserPermission(user, permission, options) ?? user.isGM);
    }

    async toggleCombatantTurnOver() {
        return this.update({
            [`flags.acted`]: !this.flags.acted,
        });
    }
}
