import femaleArcher from '../images/avatars/female-archer.jpg';
import femaleAssassin from '../images/avatars/female-assassin.jpg';
import femaleRogue from '../images/avatars/female-rogue.jpg';
import femaleSorcerer from '../images/avatars/female-sorcerer.jpg';
import femaleWarrior from '../images/avatars/female-warrior.jpg';
import femaleWizard from '../images/avatars/female-wizard.jpg';
import maleArcher from '../images/avatars/male-archer.jpg';
import maleAssassin from '../images/avatars/male-assassin.jpg';
import maleRogue from '../images/avatars/male-rogue.jpg';
import maleWarrior from '../images/avatars/male-warrior.jpg';
import maleWizard from '../images/avatars/male-wizard.jpg';
import masterAvatar from '../images/avatars/hellorah.png';

import femaleArcherSprite from '../images/sprites/female-archer.png';
import femaleAssassinSprite from '../images/sprites/female-assassin.png';
import femaleRogueSprite from '../images/sprites/female-rogue.png';
import femaleSorcererSprite from '../images/sprites/female-sorcerer.png';
import femaleWarriorSprite from '../images/sprites/female-warrior.png';
import femaleWizardSprite from '../images/sprites/female-wizard.png';
import maleArcherSprite from '../images/sprites/male-archer.png';
import maleAssassinSprite from '../images/sprites/male-assassin.png';
import maleRogueSprite from '../images/sprites/male-rogue.png';
import maleWarriorSprite from '../images/sprites/male-warrior.png';
import maleWizardSprite from '../images/sprites/male-wizard.png';

import hellorahSprite from '../images/sprites/hellorah.png';

export const characters = {
  'female-archer': {
    image: femaleArcher,
    title: 'Archer',
    description: [
      'They are usually associated with the wisdom of nature and tend to be wise, hardy, cunning, and perceptive in addition to being skilled woodsmen. Many are skilled in woodcraft, stealth, wilderness survival, beast-mastery, herbalism, tracking, and sometimes "nature magic" or have a resistance to magic.',
      'Archers spend a great deal of time hunting, fishing, and camping—whether on a short- or long-term basis, and are masters of ranged combat. They prefer to take down their enemies from afar and generally avoid close combat. Although some races, such as elves, certainly favor this class and are well suited to it, any race can excel at being an archer, given enough training.',
    ],
    avatar: femaleArcherSprite,
    gender: 'female',
  },
  'female-assassin': {
    image: femaleAssassin,
    title: 'Assassin',
    description: [
      'The assassin\'s specialty is the use of stealth to ambush and kill targets. Assassins often fill roles as killers-for-hire, spies, bounty hunters, and zealots. They typically work together in secretive specialist guilds.',
      'Trained in the use of poison, assassins are remorseless killers who work for nobles, guildmasters, Sovereigns, and anyone else who can afford them.'
    ],
    avatar: femaleAssassinSprite,
    gender: 'female',
  },
  'female-rogue': {
    image: femaleRogue,
    title: 'Rogue',
    description: [
      'The rogue or thief is one of the standard playable character classes in most editions of the Dungeons & Dragons fantasy role-playing game. A rogue is a versatile character, capable of sneaky combat and nimble tricks.',
      'The rogue is stealthy and dexterous, and in early editions was the only official base class from the Player\'s Handbook capable of finding and disarming traps and picking locks. The rogue also has the ability to "sneak attack" ("backstab" in previous editions) enemies who are caught off-guard or taken by surprise, inflicting extra damage.'
    ],
    avatar: femaleRogueSprite,
    gender: 'female',
  },
  'female-sorcerer': {
    image: femaleSorcerer,
    title: 'Sorcerer',
    description: [
      'Unlike warlocks and clerics, sorcerers don’t rely on another being for their powers. They also don’t need to keep their spells in tomes like wizards. Instead, sorcerers acquire their abilities through more esoteric means and discover new spells by gaining experience. Think of sorcerers as being a bit like the ‘chosen one’ archetype you find in a lot of fantasy literature - whether it’s through birth or a chance encounter, they’re special because they were made that way.',
      'Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. One can’t study sorcery as one learns a language, any more than one can learn to live a legendary life. No one chooses sorcery; the power chooses the sorcerer.'
    ],
    avatar: femaleSorcererSprite,
    gender: 'female',
  },
  'female-warrior': {
    image: femaleWarrior,
    title: 'Warrior',
    description: [
      'Also know as fighters, they share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.',
      'Questing knights, conquering overlords, royal champions, elite foot soldiers, hardened mercenaries, and bandit kings—as fighters, they all share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. And they are well acquainted with death, both meting it out and staring it defiantly in the face.'
    ],
    avatar: femaleWarriorSprite,
    gender: 'female',
  },
  'female-wizard': {
    image: femaleWizard,
    title: 'Wizardess',
    description: [
      'Wizards are supreme magic-users, defined and united as a class by the spells they cast. Their magic conjures elementals from other planes of existence, glimpses the future, or turns slain foes into shambling zombies. Their mightiest spells change one substance into another or alter a creature’s form, open pathways to other planes of existence, or even kill with a single word.',
      'Wild and enigmatic, varied in form and function, the power of magic draws students who seek to master its mysteries. Some aspire to become like the gods, shaping reality itself. Though the casting of a typical spell requires merely the utterance of a few strange words, fleeting gestures, and sometimes a pinch or clump of exotic materials, these surface components barely hint at the expertise attained after years of apprenticeship and countless hours of study.',
    ],
    avatar: femaleWizardSprite,
    gender: 'female',
  },
  'male-archer': {
    image: maleArcher,
    title: 'Archer',
    description: [
      'They are usually associated with the wisdom of nature and tend to be wise, hardy, cunning, and perceptive in addition to being skilled woodsmen. Many are skilled in woodcraft, stealth, wilderness survival, beast-mastery, herbalism, tracking, and sometimes "nature magic" or have a resistance to magic.',
      'Archers spend a great deal of time hunting, fishing, and camping—whether on a short- or long-term basis, and are masters of ranged combat. They prefer to take down their enemies from afar and generally avoid close combat. Although some races, such as elves, certainly favor this class and are well suited to it, any race can excel at being an archer, given enough training.',
    ],
    avatar: maleArcherSprite,
    gender: 'male',
  },
  'male-assassin': {
    image: maleAssassin,
    title: 'Assassin',
    description: [
      'The assassin\'s specialty is the use of stealth to ambush and kill targets. Assassins often fill roles as killers-for-hire, spies, bounty hunters, and zealots. They typically work together in secretive specialist guilds.',
      'Trained in the use of poison, assassins are remorseless killers who work for nobles, guildmasters, Sovereigns, and anyone else who can afford them.'
    ],
    avatar: maleAssassinSprite,
    gender: 'male',
  },
  'male-rogue': {
    image: maleRogue,
    title: 'Rogue',
    description: [
      'The rogue or thief is one of the standard playable character classes in most editions of the Dungeons & Dragons fantasy role-playing game. A rogue is a versatile character, capable of sneaky combat and nimble tricks.',
      'The rogue is stealthy and dexterous, and in early editions was the only official base class from the Player\'s Handbook capable of finding and disarming traps and picking locks. The rogue also has the ability to "sneak attack" ("backstab" in previous editions) enemies who are caught off-guard or taken by surprise, inflicting extra damage.'
    ],
    avatar: maleRogueSprite,
    gender: 'male',
  },
  'male-warrior': {
    image: maleWarrior,
    title: 'Warrior',
    description: [
      'Also know as fighters, they share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.',
      'Questing knights, conquering overlords, royal champions, elite foot soldiers, hardened mercenaries, and bandit kings—as fighters, they all share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. And they are well acquainted with death, both meting it out and staring it defiantly in the face.'
    ],
    avatar: maleWarriorSprite,
    gender: 'male',
  },
  'male-wizard': {
    image: maleWizard,
    title: 'Wizard',
    description: [
      'Wizards are supreme magic-users, defined and united as a class by the spells they cast. Their magic conjures elementals from other planes of existence, glimpses the future, or turns slain foes into shambling zombies. Their mightiest spells change one substance into another or alter a creature’s form, open pathways to other planes of existence, or even kill with a single word.',
      'Wild and enigmatic, varied in form and function, the power of magic draws students who seek to master its mysteries. Some aspire to become like the gods, shaping reality itself. Though the casting of a typical spell requires merely the utterance of a few strange words, fleeting gestures, and sometimes a pinch or clump of exotic materials, these surface components barely hint at the expertise attained after years of apprenticeship and countless hours of study.',
    ],
    avatar: maleWizardSprite,
    gender: 'male',
  },
}

export const npcs = [
  {
    id: 1,
    type: 'NPC',
    name: "Hellorah",
    pronouns: '',
    image_url: masterAvatar,
    main_color: "#4d302a",
    avatar: hellorahSprite,
  }
]
