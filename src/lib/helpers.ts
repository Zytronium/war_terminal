import {Building, Unit} from "@/types";

export function create_unit(id: string): Unit | undefined {
    const units: Unit[] = [
        {
            id: "soldier_corps",
            name: "Soldier Corps",
            description: "A small unit of soldiers.",
            cost: 30,
            attack: 20,
            defense: 25,
            speed: 2,
            ability: "+15% attack against other ground units",
            special: "Raid",
            special_description: "Can invade and storm a building to deal significant damage to the building."
        },
        {
            id: "tank",
            name: "Tank",
            description: "A heavily armored combat vehicle.",
            cost: 75,
            attack: 60,
            defense: 150,
            speed: 3,
            ability: "+25% defense against soldier units but cannot fire at aerial units.",
            special: "Pin Down",
            special_description: "Can force adjacent enemy units into a defensive posture for 2 turns, halving their attack, preventing them from using abilities, and preventing them from moving."
        },
        {
            id: "attack_helicopter",
            name: "Attack Helicopter",
            description: "A fast and agile combat helicopter.",
            cost: 100,
            attack: 65,
            defense: 100,
            speed: 5,
            ability: "Immune to Pin Down special. Takes -20% damage from ground units. Can move 1 tile after attacking.",
            special: "Strafe Run",
            special_description: "Can move in and deal heavy damage to a group of enemy units while taking minimal damage."
        },
        {
            id: "fighter_jet_squad",
            name: "Fighter Jet Squad",
            description: "A squad of high-speed fighter jets.",
            cost: 125,
            attack: 145,
            defense: 125,
            speed: 8,
            ability: "Immune to Pin Down special. Takes -75% damage from ground units.",
            special: "Air Strike",
            special_description: "Can perform a powerful ranged attack on a building, dealing extreme damage or entirely destroying it."
        },
        {
            id: "mobile_sam",
            name: "Mobile SAM",
            description: "A mobile surface-to-air unit for combatting aerial units.",
            cost: 80,
            attack: 100,
            defense: 90,
            speed: 3,
            ability: "+80% attack against aerial units but -80% attack against buildings and ground units",
            special: "Iron Dome",
            special_description: "All missiles and Air Strike specials launching or targeting anywhere in a 4-tile radius from here for the next 2 turns will be intercepted and not reach their target."
        },
    ];

    return units.find(unit => unit.id === id);
}

export function create_building(id: string): Building | undefined {
    const buildings: Building[] = [
        {
            id: "missile_silo",
            name: "Missile Silo",
            description: "A silo that can launch missiles at enemy units and buildings.",
            cost: 100,
            hp: 50,
        },
        {
            id: "small_encampment",
            name: "Small Encampment",
            description: "A small encampment of troops. Allows training new units but can only train one at a time.",
            cost: 150,
            hp: 200,
        },
        {
            id: "large_encampment",
            name: "Large Encampment",
            description: "A large encampment of troops. Allows training new units and comes with some units when built. Can train two units at a time.",
            cost: 250,
            hp: 300,
        },
        {
            id: "fortress",
            name: "Fortress",
            description: "A very large, heavily fortified military base for training units that comes with some units when built. Can train up to four units at a time and is capable of launching short-range missiles.",
            cost: 500,
            hp: 750,
        },
    ];

    return buildings.find(building => building.id === id);
}