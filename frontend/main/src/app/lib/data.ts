const coachNames = [
  "Moon Knight", "Lunar Guardian", "Stellar Warrior", 
  "Cosmic Rider", "Orion Sentinel", "Nova Explorer",
  "Galaxy Hunter", "Solar Defender", "Asteroid Miner",
  "Comet Chaser", "Planet Shifter", "Space Pioneer",
  "Star Navigator", "Celestial Watcher", "Meteor Guardian",
  "Nebula Traveler", "Black Hole Keeper"
];

export const coachCardItems = coachNames.map(name => ({
  imgSrc: "/leonkennedy.jpg",
  imgAlt: name,
  title: name,
  variant: "neutral" as const,
  tone: "secondary" as const,
  size: "sm" as const,
  className: "rounded-4xl",
}));

export const extersiceCardItems = coachNames.map(name => ({
  imgSrc: "/leonkennedy.jpg",
  imgAlt: name,
  title: name,
  variant: "outlined" as const,
  tone: "secondary" as const,
  size: "md" as const,
}));

export const gymPicItems = coachNames.map(name => ({
  imgSrc: "/leonkennedy.jpg",
  imgAlt: name,
  variant: "outlined" as const,
  tone: "primary" as const,
  size: "lg" as const,
}));