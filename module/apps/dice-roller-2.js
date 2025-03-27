const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export default class RollForm2 extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(actor, options, object, data) {
        super(options);
        this.object = {};
        this.actor = actor;
        if (data.rollId) {
            this.object = foundry.utils.duplicate(this.actor.system.savedRolls[data.rollId]);
            this.object.skipDialog = data.skipDialog || false;
            this.object.isSavedRoll = true;
        }
        else {
            var attirubteFilter = "none";
            this.object.itemDice = data.itemDice || 0;
            this.object.rollType = data.rollType;
            this.object.targetNumber = 8;
            this.object.diceModifier = 0;
            this.object.enhancement = 0;
            this.object.enhancementOnZero = false;
            this.object.difficulty = 0;
            this.object.defenseRoll = false;
            this.object.scale = 0;

            this.object.doubleSuccess = 11;
            this.object.doubleSuccesses = false;
            this.object.numberAgain = 10;
            if (data.rollType !== 'base') {
                if (this.actor.type === 'npc') {
                    if (data.pool) {
                        this.object.pool = data.pool;
                    }
                    else {
                        this.object.pool = "primary";
                    }
                }
                else {
                    if (data.skill === "defense") {
                        attirubteFilter = "resistance";
                    }
                    if (data.rollType === 'initiative' && this.actor.type !== "npc") {
                        this.object.attribute = 'cunning';
                    }
                    else {
                        if (data.attribute) {
                            this.object.attribute = data.attribute;
                        }
                        else {
                            this.object.attribute = this._getHighestAttribute(this.actor.system, attirubteFilter);
                        }
                    }
                    if (data.skill) {
                        if (data.skill === "defense") {
                            this.object.skill = "none";
                            this.object.defenseRoll = true;
                        }
                        else if (data.skill === "movement") {
                            this.object.skill = "athletics";
                            this.object.attribute = "might";
                        }
                        else {
                            this.object.skill = data.skill;
                        }
                    }
                    else {
                        this.object.skill = "none";
                    }
                }
                this.object.characterType = this.actor.type;
                if (this.object.characterType === 'scion') {
                    this.object.scionType = this.actor.system.info.tier;
                    if (this.object.scionType === 'demigod' || this.object.scionType === 'god') {
                        this.object.targetNumber = 7;
                        this.object.showDivinityDice = true;
                    }
                }
                else {
                    if (this.actor.system.tier > 2) {
                        this.object.targetNumber = 7;
                    }
                    if (this.actor.system.tier > 4) {
                        this.object.targetNumber = 6;
                    }
                }
            }
            else {
                this.object.dice = 0;
            }
            if (data.rollType) {
                this.object.rollType = data.rollType;
            }
            else {
                this.object.rollType = "skill";
            }
        }
        if (data.rollType !== 'base' && this.object.characterType === 'scion') {
            this.object.specialtyList = this.actor.specialties.reduce((acc, specialty) => {
                acc[specialty._id] = specialty.name;
                return acc;
            }, {});
        }
        this.object.divinityDice = this.actor?.system?.divinitydice?.value || 0;
        if (this.object.divinityDice > 0 && this.object.defenseRoll && this.object.numberAgain >= 9) {
            this.object.numberAgain = 9;
        }
        this.object.divinityFailure = true;
    }

    static DEFAULT_OPTIONS = {
        window: {
            title: "Dice Roller",
            resizable: true,
            controls: [
                {
                    icon: 'fa-solid fa-dice-d6',
                    label: "Save Roll",
                    action: "saveRoll",
                }
            ]
        },
        position: { width: 388 },
        tag: "form",
        form: {
            handler: RollForm2.myFormHandler,
            submitOnClose: false,
            submitOnChange: true,
            closeOnSubmit: false
        },
        classes: [`hero-background`],
        actions: {
            saveRoll: RollForm2.saveRoll,
        },
    };

    static PARTS = {
// Replace hardcoded system path with dynamic system ID
        dice: {
            template: `systems/${game.system.id}/templates/dialogues/dice-roll/skill-roll-2.html`
        },
        footer: {
            template: `systems/${game.system.id}/templates/dialogues/dice-roll/dice-roll-footer.html`
        },
    };

    getData() {
        return {
            actor: this.actor,
            data: this.object,
            selects: CONFIG.storypath.selects,
        };
    }

    static async myFormHandler(event, form, formData) {
        // const formObject = foundry.utils.expandObject(formData.object);
        foundry.utils.mergeObject(this, formData.object);

        if (event.type === 'submit') {
            this._roll();
            this.close();
        }
        this.render();
    }

    async _prepareContext(_options) {
        this.selects = CONFIG.storypath.selects;

        return {
            actor: this.actor,
            selects: this.selects,
            data: this.object,
        };
    }

    _onRender(context, options) {
        this.element.querySelectorAll('.collapsable').forEach(element => {
            element.addEventListener('click', (ev) => {
                const li = $(ev.currentTarget).next();
                li.toggle("fast");
            });
        });
    }

    async roll() {
        if (this.object.skipDialog) {
            await this._roll();
            return true;
        } else {
            var _promiseResolve;
            this.promise = new Promise(function (promiseResolve) {
                _promiseResolve = promiseResolve
            });
            this.resolve = _promiseResolve;
            this.render(true);
            return this.promise;
        }
    }

    async _baseSkillDieRoll() {
        let dice = 0;
        if (this.object.rollType === 'base') {
            dice = this.object.dice;
        }
        else {
            if (this.actor.type === 'scion') {
                let attributeDice = 0;
                if (this.object.attribute !== "none") {
                    attributeDice = this.actor.system.attributes[this.object.attribute].value;
                }
                let skillDice = 0;
                if (this.object.rollType == 'itemRoll') {
                    skillDice += this.object.itemDice;
                }

                if (this.object.skill !== "none") {
                    if (this.object.skill === "legend") {
                        skillDice += this.actor.system.legend.max;
                    }
                    else if (this.object.skill === "inheritance") {
                        skillDice += this.actor.system.inheritance.max;
                    }
                    else {
                        skillDice += this.actor.system.skills[this.object.skill].value;
                    }
                }

                dice = attributeDice + skillDice;
            }
            else if (this.actor.type === 'npc') {
                let poolDice = 0;
                if (this.object.pool === 'initiative' || this.object.pool === 'threat') {
                    poolDice = this.actor.system[this.object.pool].value;
                }
                else {
                    poolDice = this.actor.system.pools[this.object.pool].value;
                }
                dice = poolDice;
            }
            if (this.actor.type === 'scion' && this.object.specialty) {
                this.object.enhancement++;
            }
            this.object.enhancement += this._addScale();
        }

        if (this.object.diceModifier) {
            dice += this.object.diceModifier;
        }

        let roll = await new Roll(`${dice}d10x>=${this.object.numberAgain}cs>=${this.object.targetNumber}`).evaluate();
        let diceRoll = roll.dice[0].results;
        let getDice = "";

        for (let i = 0; i < this.object.divinityDice; i++) {
            if (diceRoll[i]) {
                diceRoll[i].divinityDice = true;
            }
        }

        for (let dice of diceRoll.sort((a, b) => b.result - a.result)) {
            if (dice.divinityDice) {
                if (dice.result >= this.object.targetNumber) {
                    getDice += `<li class="roll die d10 success divinity-success">${dice.result}</li>`;
                    this.object.divinityFailure = false;
                }
                else { getDice += `<li class="roll die d10 divinity-failure">${dice.result}</li>`; }
            }
            else if (dice.result >= this.object.targetNumber) { getDice += `<li class="roll die d10 success">${dice.result}</li>`; }
            else if (dice.result == 1) { getDice += `<li class="roll die d10 failure">${dice.result}</li>`; }
            else { getDice += `<li class="roll die d10">${dice.result}</li>`; }
        }

        let total = roll.total;
        if (this.object.doubleSuccesses) total = total * 2;
        if (this.object.enhancement && (total > 0 || this.object.enhancementOnZero)) total += this.object.enhancement;

        this.object.dice = dice;
        this.object.roll = roll;
        this.object.getDice = getDice;
        this.object.total = total;
    }

    async _roll() {
        await this._baseSkillDieRoll();
        let resultString = ``;
        if (this.object.difficulty) {
            if (this.object.total < this.object.difficulty) {
                if (this.object.divinityDice > 0 && this.object.divinityFailure && !this.object.defenseRoll) {
                    resultString = `<h4 class="dice-total">${game.i18n.localize('STORYPATH.Difficulty')}: ${this.object.difficulty}</h4><h4 class="dice-total">${game.i18n.localize('STORYPATH.MortalFailure')}</h4>`;
                }
                else {
                    resultString = `<h4 class="dice-total">${game.i18n.localize('STORYPATH.Difficulty')}: ${this.object.difficulty}</h4><h4 class="dice-total">${game.i18n.localize('STORYPATH.CheckFailed')}</h4>`;
                    for (let dice of this.object.roll.dice[0].results) {
                        if (dice.result === 1 && this.object.total === 0) {
                            resultString = `<h4 class="dice-total">${game.i18n.localize('STORYPATH.Difficulty')}: ${this.object.difficulty}</h4><h4 class="dice-total">${game.i18n.localize('STORYPATH.Botch')}</h4>`;
                        }
                    }
                }
            }
            else {
                const threshholdSuccesses = this.object.total - this.object.difficulty;
                let successString = 'Normal';
                if (this.object.divinityDice > 0 && !this.object.divinityFailure) {
                    successString = 'Catastrophic';
                }
                else if (threshholdSuccesses === 1) {
                    successString = 'Competent';
                }
                else if (threshholdSuccesses === 2) {
                    successString = 'Excellent';
                }
                else if (threshholdSuccesses === 3) {
                    successString = 'Amazing';
                }
                else if (threshholdSuccesses >= 4) {
                    successString = 'Divine';
                }
                resultString = `<h4 class="dice-total">${game.i18n.localize('STORYPATH.Difficulty')}: ${this.object.difficulty}</h4><h4 class="dice-total">${threshholdSuccesses} ${game.i18n.localize('STORYPATH.Threshhold')} ${threshholdSuccesses === 1 ? `${game.i18n.localize('STORYPATH.Success')}` : `${game.i18n.localize('STORYPATH.Successes')}`}</h4><h4 class="dice-total">${successString} ${game.i18n.localize('STORYPATH.Success')}</h4>`;
            }
        }
        let theContent = `
                    <div class="${game.settings.get("storypath-fvtt", "sheetStyle")}-dice-background"><div class="dice-roll">
                            <div class="dice-result">
                                <h4 class="dice-formula">${this.object.dice} ${game.i18n.localize('STORYPATH.Dice')} + ${this.object.enhancement} ${game.i18n.localize('STORYPATH.Enhancement')}</h4>
                                <div class="dice-tooltip">
                                    <div class="dice">
                                        <ol class="dice-rolls">${this.object.getDice}</ol>
                                    </div>
                                </div>
                                <h4 class="dice-total">${this.object.total} ${game.i18n.localize('STORYPATH.Successes')}</h4>
                                ${resultString}
                            </div>
                        </div>
                    </div>
        `
        console.log(this.object.rollType)

        let messageContent = await this._createChatMessageContent(theContent, 'Dice Roll');
        ChatMessage.create({ user: game.user.id, speaker: ChatMessage.getSpeaker({ actor: this.actor }), content: messageContent, type: CONST.CHAT_MESSAGE_STYLES.OTHER, rolls: [this.object.roll] });
        if (this.object.rollType === "initiative" || this.object.skill === 'initiative') {
            let combat = game.combat;
            if (combat) {
                let combatant = combat.combatants.find(c => c.actorId == this.actor.id);
                if (combatant) {
                    combat.setInitiative(combatant.id, this.object.total);
                }
            }
        }
    }

    async _createChatMessageContent(content, cardName = 'Roll') {
        const messageData = {
            name: cardName,
            sheetBackground: game.settings.get("storypath-fvtt", "sheetStyle"),
            rollTypeImgUrl: CONFIG.storypath.rollTypeTargetImages[this.object.skill] || "systems/storypath-fvtt/assets/icons/d10.svg",
            rollTypeLabel: CONFIG.storypath.rollTypeTargetLabels[this.object.skill] || "STORYPATH.Roll",
            messageContent: content,
            rollData: this.object,
            rollingActor: this.actor,
        }
// Use dynamic path to support different system directories
        return await renderTemplate(`systems/${game.system.id}/templates/chat/roll-card.html`, messageData);
    }

    static async saveRoll() {
        const rollData = { ...this.object };

// Dynamic system path to support multiple Storypath systems
        let html = await renderTemplate(`systems/${game.system.id}/templates/dialogues/save-roll.html`, { 'name': this.object.name || 'New Roll' });


        new foundry.applications.api.DialogV2({
            window: { title: game.i18n.localize("STORYPATH.SaveRoll"), },
            content: html,
            buttons: [{
                action: "save",
                label: game.i18n.localize("STORYPATH.Save"),
                default: true,
                callback: (event, button, dialog) => button.form.elements
            }, {
                action: "cancel",
                label: game.i18n.localize("STORYPATH.Cancel"),
                callback: (event, button, dialog) => false
            }],
            submit: result => {
                if (result && result.name?.value) {
                    let results = result.name.value;
                    let uniqueId = this.object.id || foundry.utils.randomID(16);
                    rollData.name = results;
                    rollData.id = uniqueId;
                    rollData.target = null;

                    let updates = {
                        "system.savedRolls": {
                            [uniqueId]: rollData
                        }
                    };
                    this.actor.update(updates);
                    this.saved = true;
                    ui.notifications.notify(`Saved Roll`);
                    return;
                }
            }
        }).render({ force: true });
    }

    _getHighestAttribute(data, approachFilter) {
        var highestAttributeNumber = 0;
        var highestAttribute;
        for (let [name, attribute] of Object.entries(data.attributes)) {
            if (approachFilter === attribute.approach || approachFilter === "none") {
                if (attribute.value > highestAttributeNumber || highestAttributeNumber === 0) {
                    highestAttributeNumber = attribute.value;
                    highestAttribute = name;
                }
            }
        }
        return highestAttribute;
    }

    _addScale() {
        var numberScale = parseInt(this.object.scale);
        if (numberScale === 6) {
            return 16;
        }
        else if (numberScale === 5) {
            return 12;
        }
        else {
            return numberScale * 2;
        }
    }
}
