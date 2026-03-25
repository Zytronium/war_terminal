import {Building, Owner, Unit} from "@/types";

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
            class: "melee",
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
            class: "melee",
            ability: "+25% defense against soldier units but cannot fire at aerial units.",
            special: "Pin Down",
            special_description: "Can force adjacent enemy units into a defensive posture for 2 turns, halving their attack, preventing them from using abilities, and preventing them from moving."
        },
        {
            id: "mobile_sam",
            name: "Mobile SAM",
            description: "A mobile surface-to-air unit for combatting aerial units.",
            cost: 80,
            attack: 100,
            defense: 90,
            speed: 3,
            class: "anti-air",
            ability: "+80% attack against aerial units but -80% attack against buildings and ground units",
            special: "Iron Dome",
            special_description: "All missiles and Air Strike specials launching or targeting anywhere in a 4-tile radius from here for the next 2 turns will be intercepted and not reach their target."
        },
        {
            id: "attack_helicopter",
            name: "Attack Helicopter",
            description: "A fast and agile combat helicopter.",
            cost: 100,
            attack: 65,
            defense: 100,
            speed: 5,
            class: "aerial",
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
            class: "aerial",
            ability: "Immune to Pin Down special. Takes -75% damage from ground units.",
            special: "Air Strike",
            special_description: "Can perform a powerful ranged attack on a building, dealing extreme damage or entirely destroying it."
        },
        {
            id: "giant_death_robot",
            name: "Giant Death Robot",
            description: "The mother of all robots, capable of destroying entire cities with ease. Cannot be built without a fortress.",
            cost: 2_500,
            attack: 300,
            defense: 750,
            speed: 4,
            class: "melee",
            ability: "Immune to Pin Down special. Can attack twice in one turn.",
            special: "Doomsday",
            special_description: "Bring about a small-scale doomsday on the area, destroying all buildings and units of BOTH sides within a 5 tile radius EXCEPT Capital Bases. Cooldown is triple duration (15 turns)."
        }
    ];

    return units.find(unit => unit.id === id);
}

export function create_building(id: string): Building | undefined {
    const buildings: Building[] = [
        {
            id: "missile_silo",
            name: "Missile Silo",
            description: "A silo that can launch missiles at enemy units and buildings.",
            icon: "silo.png",
            cost: 50,
            hp: 50,
        },
        {
            id: "factory",
            name: "Factory",
            description: "A factory that speeds up production of units and buildings by 25 per turn.",
            icon: "factory.png",
            cost: 100,
            hp: 100
        },
        {
            id: "small_encampment",
            name: "Small Encampment",
            description: "A small encampment of troops. Allows training new units but can only train one at a time.",
            icon: "encampment_sm.png",
            cost: 150,
            hp: 200,
        },
        {
            id: "large_encampment",
            name: "Large Encampment",
            description: "A large encampment of troops. Allows training new units and comes with some units when built. Can train two units at a time.",
            icon: "encampment_lg.png",
            cost: 250,
            hp: 300,
        },
        {
            id: "fortress",
            name: "Fortress",
            description: "A very large, heavily fortified military base for training units that comes with some units when built. Can train up to four units at a time and is capable of launching short-range missiles.",
            icon: "fortress.png",
            cost: 500,
            hp: 750,
        },
        {
            id: "capital_base",
            name: "Capital Base",
            description: "The home base of this player. If destroyed, the owner looses the game.",
            icon: "capital.png",
            cost: 0,
            hp: 10_000
        }
    ];

    return buildings.find(building => building.id === id);
}

export function ownerFilter(owner: Owner): string {
    const matrix = owner === "player"
        ? "0 0 0 0 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0"  // Cyan  #00FFFF
        : "0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"; // Red   #FF0000

    return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='c'><feColorMatrix type='matrix' values='${matrix}'/></filter></svg>#c")`;
}
