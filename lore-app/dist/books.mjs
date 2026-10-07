// A small, editorially tagged demo catalogue. Page counts vary by edition;
// descriptions, mood tags, and caveats are our own reading guidance.
export const BOOKS = [
  {
    id: 'piranesi', title: 'Piranesi', author: 'Susanna Clarke', pages: 272, year: 2020,
    genres: ['Literary fantasy', 'Mystery'], moods: ['escape', 'thoughtful', 'emotional'], complexity: 3,
    avoidances: ['slow'],
    description: 'An endless house. An ocean in its halls. A gentle keeper who begins to suspect that his beautiful, impossible world is hiding a secret.',
    caveat: 'The opening is deliberately disorienting and unhurried. Let the mystery unfold before trying to solve the house.',
    palette: { background: '#264c47', accent: '#d4bd77', ink: '#f6ebcb' }, motif: 'window',
  },
  {
    id: 'house-cerulean-sea', title: 'The House in the Cerulean Sea', author: 'TJ Klune', pages: 400, year: 2020,
    genres: ['Fantasy', 'Found family'], moods: ['comfort', 'escape', 'emotional'], complexity: 1,
    avoidances: [],
    description: 'A by-the-book caseworker arrives at a very unusual island orphanage, where six magical children quietly change everything he thought he knew.',
    caveat: 'The warmth is earnest and there is a gentle romantic subplot. Some readers may find the message a little neatly wrapped.',
    palette: { background: '#457786', accent: '#e5b677', ink: '#fff0d4' }, motif: 'waves',
  },
  {
    id: 'legends-lattes', title: 'Legends & Lattes', author: 'Travis Baldree', pages: 304, year: 2022,
    genres: ['Cozy fantasy', 'Romance'], moods: ['comfort', 'escape'], complexity: 1,
    avoidances: ['romance', 'slow'],
    description: 'A retired orc trades her sword for an espresso machine, hoping to build a quieter life and the city’s first coffee shop.',
    caveat: 'The stakes stay small and the pace stays gentle. A sweet romance shares the spotlight with the coffee-shop story.',
    palette: { background: '#9c6445', accent: '#d9b976', ink: '#fff0d9' }, motif: 'botanical',
  },
  {
    id: 'howls-moving-castle', title: 'Howl’s Moving Castle', author: 'Diana Wynne Jones', pages: 336, year: 1986,
    genres: ['Fantasy', 'Adventure'], moods: ['escape', 'comfort', 'exciting'], complexity: 2,
    avoidances: [],
    description: 'Cursed into an old woman’s body, Sophie moves into a wandering castle and finds a fire demon, an exasperating wizard, and a chance to rewrite her story.',
    caveat: 'The magic is playful and sometimes tangled. Expect a different story from the animated film, with a light romantic thread.',
    palette: { background: '#526b89', accent: '#e4bf71', ink: '#fff1d6' }, motif: 'stars',
  },
  {
    id: 'the-hobbit', title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: 310, year: 1937,
    genres: ['Fantasy', 'Adventure'], moods: ['escape', 'exciting', 'comfort'], complexity: 2,
    avoidances: ['worldbuilding'],
    description: 'A reluctant hobbit leaves his comfortable home with a company of dwarves, setting out toward riddles, mountains, and one very possessive dragon.',
    caveat: 'Songs, invented place names, and an old-fashioned narrator are part of the charm. There are also some darker turns late in the adventure.',
    palette: { background: '#687548', accent: '#dcc88a', ink: '#fff3d9' }, motif: 'mountains',
  },
  {
    id: 'ocean-end-lane', title: 'The Ocean at the End of the Lane', author: 'Neil Gaiman', pages: 181, year: 2013,
    genres: ['Fantasy', 'Literary fiction'], moods: ['escape', 'emotional', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'A return to a childhood home awakens memories of an extraordinary girl, a duck pond that was an ocean, and an ancient danger hiding in ordinary life.',
    caveat: 'This short fairy tale has a dark edge, frightening childhood experiences, and a bittersweet ending.',
    palette: { background: '#304b6a', accent: '#b7ceca', ink: '#f5ecd7' }, motif: 'moon',
  },
  {
    id: 'psalm-wild-built', title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', pages: 160, year: 2021,
    genres: ['Science fiction', 'Cozy fiction'], moods: ['comfort', 'thoughtful', 'escape'], complexity: 1,
    avoidances: ['slow'],
    description: 'A tea monk searching for purpose meets a curious robot in the wilderness. Together, they ask what a person actually needs to feel enough.',
    caveat: 'There is little conventional action. The pleasure is in the conversations, the landscape, and the permission to slow down.',
    palette: { background: '#899577', accent: '#edcd81', ink: '#263e32' }, motif: 'botanical',
  },
  {
    id: 'before-coffee-cold', title: 'Before the Coffee Gets Cold', author: 'Toshikazu Kawaguchi', pages: 213, year: 2015,
    genres: ['Japanese fiction', 'Magical realism'], moods: ['emotional', 'thoughtful', 'comfort'], complexity: 1,
    avoidances: ['slow', 'sad'],
    description: 'In a small Tokyo café, visitors can travel into the past for exactly as long as their coffee stays warm. The rules are strict; the reasons for going are deeply human.',
    caveat: 'These linked stories dwell on grief and regret. The writing is accessible, but the emotional farewells may make you cry.',
    palette: { background: '#a16850', accent: '#e6c897', ink: '#fff1d8' }, motif: 'window',
  },
  {
    id: 'thursday-murder-club', title: 'The Thursday Murder Club', author: 'Richard Osman', pages: 368, year: 2020,
    genres: ['Mystery', 'Crime'], moods: ['comfort', 'exciting'], complexity: 2,
    avoidances: [],
    description: 'Four friends in a retirement village turn their weekly cold-case hobby into a real investigation when a murder lands on their doorstep.',
    caveat: 'The wit comes with genuine reflections on aging and loss. A fairly large cast means keeping a few names straight.',
    palette: { background: '#9d573c', accent: '#e8c675', ink: '#fff1dd' }, motif: 'sun',
  },
  {
    id: 'roger-ackroyd', title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie', pages: 288, year: 1926,
    genres: ['Mystery', 'Classic'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: [],
    description: 'A village murder pulls Hercule Poirot out of retirement. Behind drawing-room manners and carefully chosen words, almost everyone is concealing something.',
    caveat: 'This is a puzzle of conversations and clues, rather than an action thriller. Going in without spoilers makes a real difference.',
    palette: { background: '#694844', accent: '#d9b66f', ink: '#ffefd5' }, motif: 'window',
  },
  {
    id: 'and-then-none', title: 'And Then There Were None', author: 'Agatha Christie', pages: 272, year: 1939,
    genres: ['Mystery', 'Thriller'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'Ten strangers are invited to an isolated island. A recorded accusation shatters the welcome, and the guests begin to disappear one by one.',
    caveat: 'The atmosphere is bleak and the deaths keep coming. Choose this for tension, rather than a reassuring ending.',
    palette: { background: '#414d62', accent: '#d4a865', ink: '#f5e8cf' }, motif: 'waves',
  },
  {
    id: 'the-night-circus', title: 'The Night Circus', author: 'Erin Morgenstern', pages: 387, year: 2011,
    genres: ['Fantasy', 'Romance'], moods: ['escape', 'emotional'], complexity: 3,
    avoidances: ['romance', 'slow', 'worldbuilding'],
    description: 'A mysterious circus opens only at night. Within its black-and-white tents, two young magicians are bound to a contest neither fully understands.',
    caveat: 'Atmosphere takes priority over momentum, and the timeline moves around. The love story is central to the magic.',
    palette: { background: '#403b48', accent: '#be6653', ink: '#f3e5d1' }, motif: 'stars',
  },
  {
    id: 'the-secret-history', title: 'The Secret History', author: 'Donna Tartt', pages: 559, year: 1992,
    genres: ['Literary fiction', 'Dark academia'], moods: ['thoughtful', 'exciting', 'emotional'], complexity: 3,
    avoidances: ['slow', 'sad', 'dense'],
    description: 'An outsider joins an exclusive circle of classics students at a New England college, where beauty, obsession, and moral compromise lead toward disaster.',
    caveat: 'You know a murder has happened from the beginning. This is a long, morally uneasy unraveling, with deliberately unlikeable characters.',
    palette: { background: '#66594a', accent: '#d1b377', ink: '#f3e5c9' }, motif: 'botanical',
  },
  {
    id: 'circe', title: 'Circe', author: 'Madeline Miller', pages: 393, year: 2018,
    genres: ['Mythology', 'Literary fantasy'], moods: ['emotional', 'escape', 'thoughtful'], complexity: 3,
    avoidances: ['slow'],
    description: 'Banished to an island, a daughter of the sun discovers the power of witchcraft and begins to make a life beyond the expectations of gods and men.',
    caveat: 'The story spans a long life and includes violence, sexual assault, and loss. Its pace is reflective rather than urgent.',
    palette: { background: '#aa713d', accent: '#ebc977', ink: '#2f382f' }, motif: 'sun',
  },
  {
    id: 'jonathan-strange', title: 'Jonathan Strange & Mr Norrell', author: 'Susanna Clarke', pages: 1006, year: 2004,
    genres: ['Historical fantasy', 'Literary fiction'], moods: ['escape', 'thoughtful'], complexity: 4,
    avoidances: ['slow', 'dense', 'worldbuilding'],
    description: 'Two very different magicians bring practical magic back to England, drawing an alternate nineteenth century into a dangerous bargain with the fairy world.',
    caveat: 'Settle in for a long opening, elaborate footnotes, and nineteenth-century-style prose. This is a world to inhabit at leisure.',
    palette: { background: '#4e5950', accent: '#ccb88e', ink: '#f3ead6' }, motif: 'moon',
  },
];

const ENERGY = { low: 1, easy: 2, think: 3, challenge: 4 };
const SCHOOL_DEFAULTS = {
  start: { energy: 'easy', length: 'medium' },
  regular: { energy: 'easy', length: 'any' },
  midterms: { energy: 'easy', length: 'medium' },
  finals: { energy: 'low', length: 'quick' },
  break: { energy: 'think', length: 'any' },
  other: { energy: 'easy', length: 'any' },
};
const MOMENT_DEFAULTS = {
  between: { energy: 'low', length: 'quick' },
  'short-commute': { energy: 'easy', length: 'quick' },
  'long-commute': { energy: 'easy', length: 'any' },
  bedtime: { energy: 'low', length: 'medium' },
  weekend: { energy: 'think', length: 'any' },
};
const MOOD_REASONS = {
  escape: 'You wanted an escape; this story offers a world to slip into for a while.',
  emotional: 'You wanted to feel something; the characters and their emotional stakes take center stage.',
  comfort: 'You asked for comfort; warmth and human connection are part of this story’s appeal.',
  exciting: 'You wanted some excitement; a strong mystery or adventure gives you a reason to turn the page.',
  thoughtful: 'You wanted something thought-provoking; this story leaves room for questions that linger.',
};
const ENERGY_REASONS = {
  low: 'The accessible storytelling suits a day when you have very little mental energy to spare.',
  easy: 'The story is approachable while still giving you an engaging plot to follow.',
  think: 'There is enough ambiguity and detail to reward the attention you want to give it.',
  challenge: 'Its layered writing and demanding world fit your appetite for a challenging read.',
};
const AVOID_LABELS = {
  romance: 'a central romance', slow: 'slow pacing', sad: 'a sad or bittersweet emotional turn',
  dense: 'dense writing', worldbuilding: 'extensive world-building',
};

function joinItems(items) {
  return items.length < 2 ? items[0] : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function lengthFit(book, length) {
  if (length === 'quick') return book.pages <= 250;
  if (length === 'medium') return book.pages <= 350;
  if (length === 'long') return book.pages >= 500;
  return true;
}

function studentPreferences(answers, school, moment) {
  const schoolDefaults = SCHOOL_DEFAULTS[school];
  const momentDefaults = MOMENT_DEFAULTS[moment];
  let energy = momentDefaults?.energy ?? schoolDefaults?.energy ?? 'easy';
  let length = momentDefaults?.length ?? schoolDefaults?.length ?? 'any';

  // Exam periods keep the starting commitment modest even for a free weekend.
  // These are editorial defaults; explicit legacy preferences still take priority.
  if (school === 'finals' || school === 'midterms') {
    if (ENERGY[energy] > ENERGY[schoolDefaults.energy]) energy = schoolDefaults.energy;
    if (school === 'finals' || length === 'any') length = schoolDefaults.length;
  }

  return {
    energy: Object.hasOwn(ENERGY, answers.energy) ? answers.energy : energy,
    length: ['quick', 'medium', 'any', 'long'].includes(answers.length) ? answers.length : length,
  };
}

function schoolFit(book, school) {
  if (!school) return { score: 0, reason: null };
  if (school === 'other') {
    return { score: 0, reason: 'Outside a school term, your reading moment and mood guide this pick.' };
  }
  if (school === 'break') {
    const score = (book.complexity >= 3 ? 8 : 0) + (book.pages >= 350 ? 4 : 0);
    return { score, reason: score === 12
      ? 'For school break, this offers a longer, more involved story to settle into.'
      : 'For school break, this is a lighter commitment than the longer, more involved books we give a little extra weight.' };
  }

  const label = { start: 'the start of term', regular: 'a regular school week', midterms: 'midterms', finals: 'finals' }[school];
  const complexityLimit = school === 'finals' ? 1 : 2;
  const pageLimit = school === 'finals' ? 250 : school === 'regular' ? Infinity : 350;
  const easyFit = book.complexity <= complexityLimit;
  const shortFit = book.pages <= pageLimit;
  const score = (easyFit ? 8 : 0) + (shortFit && pageLimit !== Infinity ? 4 : 0);
  const reason = easyFit && shortFit
    ? `For ${label}, its approachable writing${pageLimit !== Infinity ? ' and shorter overall length' : ''} suit a manageable reading commitment.`
    : `For ${label}, we give approachable${pageLimit !== Infinity ? ', shorter' : ''} books extra weight; this asks for ${!easyFit && !shortFit ? 'more attention and a longer commitment' : !easyFit ? 'more attention' : 'a longer commitment'}.`;
  return { score, reason };
}

function momentFit(book, moment) {
  if (!moment) return { score: 0, reason: null };
  if (moment === 'between' || moment === 'short-commute') {
    const shortFit = book.pages <= 250;
    return {
      score: (shortFit ? 8 : 0) + (book.complexity <= 2 ? 4 : 0),
      reason: `For ${moment === 'between' ? 'reading between classes' : 'a short commute'}, we favor a smaller total reading commitment. At about ${book.pages} pages, this is ${shortFit ? 'one of the shorter options to return to over several sessions' : 'a longer commitment spread across those sessions'}.`,
    };
  }
  if (moment === 'long-commute') {
    const mediumFit = book.pages >= 250 && book.pages <= 500;
    return {
      score: (mediumFit ? 8 : 0) + (book.complexity <= 2 ? 4 : 0),
      reason: `For a long commute, we give approachable books of moderate length extra weight. At about ${book.pages} pages, this is ${mediumFit ? 'a fit for that overall commitment' : book.pages < 250 ? 'a shorter alternative' : 'a much longer undertaking'}.`,
    };
  }
  if (moment === 'bedtime') {
    return {
      score: (book.complexity === 1 ? 8 : 0) + (book.pages <= 350 ? 4 : 0),
      reason: book.complexity === 1
        ? 'For bedtime reading, its accessible writing offers an easy-to-follow story.'
        : 'For bedtime reading, this asks for more attention than the easiest-to-follow picks.',
    };
  }
  return {
    score: (book.complexity >= 3 ? 8 : 0) + (book.pages >= 350 ? 4 : 0),
    reason: book.complexity >= 3
      ? 'For weekend reading, its layers and detail offer something to settle into.'
      : 'For weekend reading, this offers an approachable alternative to a more demanding story.',
  };
}

/**
 * Deterministic demo ranking, deliberately independent of the interface.
 * Scores rank the catalogue; they are not confidence or accuracy percentages.
 * Each avoidance penalty outweighs all positive preference bonuses combined.
 */
export function rankBooks(answers = {}) {
  const mood = Object.hasOwn(MOOD_REASONS, answers.mood) ? answers.mood : 'surprise';
  const school = Object.hasOwn(SCHOOL_DEFAULTS, answers.school) ? answers.school : null;
  const moment = Object.hasOwn(MOMENT_DEFAULTS, answers.moment) ? answers.moment : null;
  const { energy, length } = studentPreferences(answers, school, moment);
  const avoid = [...new Set(Array.isArray(answers.avoid) ? answers.avoid : [])]
    .filter(value => Object.hasOwn(AVOID_LABELS, value));

  return BOOKS.map((book, index) => {
    let score = 0;
    const reasons = [];
    if (mood !== 'surprise' && book.moods.includes(mood)) {
      score += 28;
      reasons.push(MOOD_REASONS[mood]);
    } else if (mood !== 'surprise') {
      reasons.push('A mood trade-off: this is outside your chosen mood, but may fit your other reading preferences.');
    }

    const complexityDistance = Math.abs(book.complexity - ENERGY[energy]);
    score += 18 - complexityDistance * 8;
    if (complexityDistance === 0) reasons.push(school || moment
      ? `The ${ENERGY[energy] <= 2 ? 'approachable storytelling' : 'more layered writing'} fits the starting reading load for your choices.`
      : ENERGY_REASONS[energy]);
    else if (book.complexity > ENERGY[energy]) {
      reasons.push('One trade-off: this asks for a little more attention than your energy preference suggests.');
    } else {
      reasons.push(ENERGY[energy] >= 3
        ? 'The writing is lighter than the challenge you asked for, leaving more room to simply enjoy the story.'
        : 'This is an especially approachable pick for the easy-to-follow story you wanted.');
    }

    if (length !== 'any') {
      if (lengthFit(book, length)) {
        score += 18;
        reasons.push(length === 'long'
          ? `At about ${book.pages} pages, it gives you the long reading commitment you wanted.`
          : `At about ${book.pages} pages, it fits your ${length === 'quick' ? 'quick-read' : 'under-350-page'} preference.`);
      } else {
        score -= 22;
        reasons.push(`At about ${book.pages} pages, it is ${length === 'long' ? 'shorter' : 'longer'} than your preferred commitment.`);
      }
    }

    const schoolMatch = schoolFit(book, school);
    const momentMatch = momentFit(book, moment);
    score += schoolMatch.score + momentMatch.score;
    if (schoolMatch.reason) reasons.push(schoolMatch.reason);
    if (momentMatch.reason) reasons.push(momentMatch.reason);

    const conflicts = avoid.filter(value => book.avoidances.includes(value));
    // Preference scores are bounded by -28..88, including both context bonuses.
    // A 120-point penalty therefore puts every conflict below every clean match.
    score -= conflicts.length * 120;
    if (conflicts.length) {
      reasons.push(`A possible mismatch: expect ${joinItems(conflicts.map(value => AVOID_LABELS[value]))}, which you asked to avoid.`);
    }
    return { book, score, reasons, index };
  }).sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ book, score, reasons }) => ({ book, score, reasons }));
}
