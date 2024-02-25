addLayer("a", {
    name: "alpha", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "α", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#F9ED69",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "alphas", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('a', 31)) mult = mult.mul(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        11: {
            title: "Double it.",
            description() {return "Multiply point gain by 2."},
            cost: new Decimal(1)
        },
        12: {
            title: "Get more.",
            description() {return "Multiply point gain by 3."},
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(2),
        },
        13: {
            title: "Even more.",
            description() {return "Multiply point gain based on your alphas"},
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(4),
            effect() {return player.a.points.max(0).add(1).root(2)},
            effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))},
            tooltip: "to be clear, its root(α+1)"
        },
        21: {
            title: "The more...",
            description() {return "Multiply point gain by 1.5"},
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(10),
            tooltip: "i forget about something."
        },
        22: {
            title: "...the better",
            description() {return "Multiply point gain based on your points."},
            unlocked() { return (hasUpgrade(this.layer, 21))},
            cost: new Decimal(20),
            effect() {return player.a.points.max(0).add(1).root(100)},
            effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))},
            tooltip: "root100(points+1). not a lot, but better then nothing."
        },    
        23: {
            title: "oh. by the way...",
            description() {return "Another Multiply point gain by 1.5."},
            unlocked() { return (hasUpgrade(this.layer, 22))},
            cost: new Decimal(30),       
        },
        31: {
            title: "what the alpha?",
            description() {return "Multiply Alpha gain by 3."},
            unlocked() { return (hasUpgrade(this.layer, 23))},
            cost: new Decimal(40),
            tooltip: "thats something new."            
        },
        32: {
            title: "can i eat it?",
            description() {return "Unlock a option."},
            unlocked() { return (hasUpgrade(this.layer, 31))},
            cost: new Decimal(125),
            tooltip: "or... it should. for now its unlocking the Beta layer."            
        },
    },
    hotkeys: [
        { key: "a", description: "A : Reset for Alpha", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
})
addLayer("b", {
    name: "beta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "β", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#FF2346",
    requires: new Decimal(120), // Can be a function that takes requirement increases into account
    resource: "betas", // Name of prestige currency
    baseResource: "alpha", // Name of resource prestige is based on
    baseAmount() { return player.a.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    upgrades: {
        //11: {
            //title: "Restore",
            //description() {return "Unlock more upgrades... some way later."},
            //cost: new Decimal(1)
        //},
    },
    hotkeys: [
        { key: "b", description: "B: Reset for Beta", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown(){return hasUpgrade('a', 32) || player[this.layer].unlocked},
})

addLayer("Ach", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    resource: "achievements", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "ITS A ME!",
            done() {return (hasUpgrade('a', 21))}, 
            goaltooltip: "Upgrades, guys, upgrades.",
            doneTooltip: "Get 4nd Alpha upgrade! \n\nReward: Nothing. :skull:",// Showed when the achievement is completed
        },
        12: {
            name: "Learning Alphabet",
            done() {return player.b.points.gte(1)},
            goalTooltip: "Maybe you need... something new.", 
            doneTooltip: "Get 5 Betas at same time. \n\nReward: Nothing. :skull:", // Showed when the achievement is completed
        },
    },
},
)