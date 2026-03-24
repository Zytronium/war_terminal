export type Building = {
    id: string;
    name: string;
    description: string;
    cost: number;
    hp: number;
}

export type Unit = {
    id: string;          // Unique no caps no spaces identifier
    name: string;        // More human-friendly display name
    description: string; // Description of the unit
    cost: number;        // Cost to train the unit (correlates to build time)
    attack: number;      // Unit's offensive stat
    defense: number;     // Unit's defensive stat
    speed: number;       // How far the unit can move per turn
    class: string;       // What type of unit this is
    ability: string;     // Always active ability of this unit.
    special: string;     // Special ability of this unit. It takes 3 units together to trigger an ability. Ability cooldowns (for all 3 units) last 5 turns.
    special_description: string;
}