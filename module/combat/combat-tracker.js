/**
* Overrides the display of the combat and turn order tab to add activation
* buttons and either move or remove the initiative button
*/
/**
 * Storypath Combat Tracker
 *
 * Extends the Foundry CombatTracker UI to add "acted" status toggling,
 * color-coded turn rows, and a custom template override.
 *
 * ⚠️ Future Considerations:
 * - `acted` flag may need localization or styling adjustments per system.
 * - `color` field assumes consistent structure in `actor.system.details` — verify across Storypath variants.
 * - Sorting logic prioritizes unacted combatants; may differ in systems with simultaneous or non-linear turn mechanics.
 * - Consider modularizing the combat row renderer for more flexible UX per game.
 */

export class StorypathCombatTracker extends CombatTracker {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            // Use dynamic path to support UI divergence across Storypath systems
            // TODO: Create system-specific combat-tracker.html if visual or UX elements vary
            template: `systems/${game.system.id}/templates/sidebar/combat-tracker.html`,

        };
    }
    async getData(options) {
        const data = (await super.getData(options));
        data.turns = data.turns.map(t => {
            const combatant = (this.viewed.getEmbeddedDocument("Combatant", t.id));
            return {
                ...t,
                css: t.css,
                acted: combatant?.flags.acted,
                color: combatant.token.actor.system.details.color
            };
        });
        data.turns.sort(function (a, b) {
            const ad = a.acted ? 1 : 0;
            const bd = b.acted ? 1 : 0;
            return ad - bd;
        });
        
        return data;
    }
    activateListeners(html) {
        super.activateListeners(html);
        html
            .find(".toggle-turn-over")
            .on("click", this._toggleTurnOver.bind(this));
    
    }
    async _toggleTurnOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const btn = event.currentTarget;
        const id = btn.closest(".combatant")?.dataset.combatantId;
        if (!id)
            return;
        await this.viewed.toggleTurnOver(id);
    }
}
