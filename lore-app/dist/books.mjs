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
  {
    id: 'the-giver', title: 'The Giver', author: 'Lois Lowry', pages: 240, year: 1993,
    genres: ['Young adult', 'Dystopian fiction'], moods: ['thoughtful', 'exciting', 'emotional'], complexity: 2,
    avoidances: ['sad'],
    description: 'In a community that has traded pain and choice for sameness, twelve-year-old Jonas is chosen to inherit memories that change how he sees his world.',
    caveat: 'This short dystopian novel explores control, loss, and difficult moral choices. Its ending leaves room for interpretation.',
    palette: { background: '#64758a', accent: '#d9c17d', ink: '#f5efdf' }, motif: 'moon',
  },
  {
    id: 'the-martian', title: 'The Martian', author: 'Andy Weir', pages: 369, year: 2011,
    genres: ['Science fiction', 'Survival'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: [],
    description: 'Stranded on Mars after his crew evacuates, botanist Mark Watney uses ingenuity, humor, and careful problem-solving to stay alive and get home.',
    caveat: 'The narration includes frequent technical explanations and strong language. The plot centers on a long survival emergency.',
    palette: { background: '#a94f36', accent: '#e5bd77', ink: '#fff0dc' }, motif: 'mountains',
  },
  {
    id: 'remarkably-bright-creatures', title: 'Remarkably Bright Creatures', author: 'Shelby Van Pelt', pages: 368, year: 2022,
    genres: ['Contemporary fiction', 'Mystery'], moods: ['comfort', 'thoughtful', 'emotional'], complexity: 1,
    avoidances: ['sad'],
    description: 'A widowed cleaner at an aquarium forms an unexpected bond with a clever giant Pacific octopus, whose observations help uncover a decades-old mystery.',
    caveat: 'Grief and family secrets shape the story. The alternating viewpoints include an observant octopus, which gives the book a fable-like quality.',
    palette: { background: '#3d6f76', accent: '#e1bd76', ink: '#f6f0df' }, motif: 'waves',
  },
  {
    id: 'irregular-witches', title: 'The Very Secret Society of Irregular Witches', author: 'Sangu Mandanna', pages: 336, year: 2022,
    genres: ['Cozy fantasy', 'Romance'], moods: ['comfort', 'escape', 'emotional'], complexity: 1,
    avoidances: ['romance'],
    description: 'A solitary witch takes a position teaching three young witches at a remote house, where an unconventional family begins to take shape.',
    caveat: 'A gentle romance is part of the central story, alongside themes of belonging, loneliness, and found family.',
    palette: { background: '#65704d', accent: '#e0bd77', ink: '#fff2dd' }, motif: 'botanical',
  },
  {
    id: 'midnight-library', title: 'The Midnight Library', author: 'Matt Haig', pages: 304, year: 2020,
    genres: ['Contemporary fiction', 'Fantasy'], moods: ['thoughtful', 'emotional', 'comfort'], complexity: 1,
    avoidances: ['sad'],
    description: 'Between life and death, Nora finds a library of alternate lives and gets to explore the paths she might have taken.',
    caveat: 'The book opens with suicidal thoughts and explores regret and depression, though it ultimately aims for hope.',
    palette: { background: '#31566b', accent: '#d8b864', ink: '#fff2dc' }, motif: 'stars',
  },
  {
    id: 'convenience-store-woman', title: 'Convenience Store Woman', author: 'Sayaka Murata', pages: 176, year: 2016,
    genres: ['Japanese fiction', 'Literary fiction'], moods: ['thoughtful', 'comfort'], complexity: 2,
    avoidances: [],
    description: 'Keiko has found routine and purpose in her convenience-store job. Pressure to live a more conventional life unsettles the system she has built.',
    caveat: 'Its dry, observant humor touches on social conformity and belonging. The protagonist’s perspective can feel deliberately unconventional.',
    palette: { background: '#66806d', accent: '#e4ca83', ink: '#f9f0dc' }, motif: 'sun',
  },
  {
    id: 'long-way-small-angry-planet', title: 'The Long Way to a Small, Angry Planet', author: 'Becky Chambers', pages: 432, year: 2014,
    genres: ['Science fiction', 'Found family'], moods: ['comfort', 'escape', 'thoughtful'], complexity: 2,
    avoidances: ['slow', 'worldbuilding'],
    description: 'The crew of a small tunneling ship travels across the galaxy, making a living through their work and finding a family among very different people.',
    caveat: 'This is a character-focused journey with an expansive setting and a relaxed pace, rather than a fast, conflict-driven space adventure.',
    palette: { background: '#416b73', accent: '#e4b96c', ink: '#f5edda' }, motif: 'stars',
  },
  {
    id: 'song-of-achilles', title: 'The Song of Achilles', author: 'Madeline Miller', pages: 416, year: 2011,
    genres: ['Mythology', 'Literary fiction'], moods: ['emotional', 'escape', 'thoughtful'], complexity: 2,
    avoidances: ['romance', 'sad'],
    description: 'Patroclus tells the story of his bond with Achilles, from their youth together to the Trojan War and the fate awaiting them both.',
    caveat: 'The central relationship is romantic, and the story builds toward the tragedy of the Trojan War.',
    palette: { background: '#76504e', accent: '#d5af71', ink: '#f5ead7' }, motif: 'sun',
  },
  {
    id: 'book-thief', title: 'The Book Thief', author: 'Markus Zusak', pages: 552, year: 2005,
    genres: ['Historical fiction', 'Literary fiction'], moods: ['emotional', 'thoughtful', 'exciting'], complexity: 2,
    avoidances: ['sad'],
    description: 'In Nazi Germany, a young girl finds refuge in books and words while her foster family shelters a Jewish man in their basement.',
    caveat: 'Set during the Holocaust, this is a story of war, persecution, and loss. Its narrator signals the tragic stakes early.',
    palette: { background: '#566277', accent: '#d8ba78', ink: '#f5ecdc' }, motif: 'moon',
  },
  {
    id: 'seven-husbands', title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', pages: 400, year: 2017,
    genres: ['Historical fiction', 'Romance'], moods: ['emotional', 'exciting', 'thoughtful'], complexity: 1,
    avoidances: ['sad'],
    description: 'An aging Hollywood star finally tells the story of her glamorous career, her seven marriages, and the private love that shaped her life.',
    caveat: 'The novel includes a central queer romance, complicated relationships, and themes of discrimination and loss.',
    palette: { background: '#87604d', accent: '#e4c67b', ink: '#fff2dc' }, motif: 'sun',
  },
  {
    id: 'blue-castle', title: 'The Blue Castle', author: 'L. M. Montgomery', pages: 256, year: 1926,
    genres: ['Classic', 'Romance'], moods: ['comfort', 'emotional', 'escape'], complexity: 2,
    avoidances: [],
    description: 'After a health scare, quiet Valancy Stirling decides to stop living by her family’s rules and pursue the life she has only imagined.',
    caveat: 'The book reflects its 1920s setting and includes dated language and social attitudes. Its romantic ending is a major part of the appeal.',
    palette: { background: '#687b68', accent: '#dfc27c', ink: '#fff1dc' }, motif: 'botanical',
  },
  {
    id: 'housekeeper-professor', title: 'The Housekeeper and the Professor', author: 'Yoko Ogawa', pages: 192, year: 2003,
    genres: ['Japanese fiction', 'Literary fiction'], moods: ['comfort', 'thoughtful', 'emotional'], complexity: 2,
    avoidances: ['sad'],
    description: 'A housekeeper and her son care for a mathematics professor whose memory lasts only eighty minutes. Numbers become a language of connection.',
    caveat: 'The story is quiet and reflective, with illness and memory loss at its center.',
    palette: { background: '#657981', accent: '#e1c17a', ink: '#f7f0df' }, motif: 'window',
  },
  {
    id: 'project-hail-mary', title: 'Project Hail Mary', author: 'Andy Weir', pages: 496, year: 2021,
    genres: ['Science fiction', 'Adventure'], moods: ['exciting', 'thoughtful', 'escape'], complexity: 2,
    avoidances: [],
    description: 'An astronaut wakes alone on a spacecraft with no memory of how he got there. Rebuilding the mission one clue at a time becomes a race to save Earth.',
    caveat: 'The science is explained in detail, and the story includes peril and isolation. Its humor keeps the high stakes approachable for many readers.',
    palette: { background: '#36536c', accent: '#e3bd69', ink: '#f5efdf' }, motif: 'stars',
  },
  {
    id: 'kindred', title: 'Kindred', author: 'Octavia E. Butler', pages: 288, year: 1979,
    genres: ['Science fiction', 'Historical fiction'], moods: ['thoughtful', 'emotional', 'exciting'], complexity: 3,
    avoidances: ['sad'],
    description: 'Dana, a Black writer in 1970s California, is repeatedly pulled back in time to a Maryland plantation, where her survival becomes tied to a white ancestor.',
    caveat: 'The novel contains enslavement, racist violence, and other traumatic scenes. It is powerful but emotionally intense.',
    palette: { background: '#754f44', accent: '#d8b779', ink: '#f7ecd9' }, motif: 'sun',
  },
  {
    id: 'left-hand-darkness', title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', pages: 304, year: 1969,
    genres: ['Science fiction', 'Literary fiction'], moods: ['thoughtful', 'escape'], complexity: 3,
    avoidances: ['slow', 'worldbuilding'],
    description: 'An envoy travels to the winter planet Gethen to invite its people into an interplanetary alliance, but trust and cultural assumptions complicate the mission.',
    caveat: 'This classic is reflective, with extensive world-building and dated language around gender in places.',
    palette: { background: '#536879', accent: '#c8d0c4', ink: '#f4eee1' }, motif: 'moon',
  },
  {
    id: 'anxious-people', title: 'Anxious People', author: 'Fredrik Backman', pages: 352, year: 2019,
    genres: ['Contemporary fiction', 'Mystery'], moods: ['comfort', 'emotional', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'A failed bank robber takes a group of strangers hostage during an apartment viewing. As the police question them, the strangers’ lives begin to connect.',
    caveat: 'The story moves between comic misunderstandings and serious topics, including anxiety, grief, and suicide.',
    palette: { background: '#697b70', accent: '#e1c57e', ink: '#f8f0de' }, motif: 'window',
  },
  {
    id: 'yellowface', title: 'Yellowface', author: 'R. F. Kuang', pages: 336, year: 2023,
    genres: ['Literary fiction', 'Satire'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: [],
    description: 'After a fellow writer dies, June Hayward takes credit for an unfinished manuscript and watches her new literary success become harder to control.',
    caveat: 'This sharp publishing satire explores racism, appropriation, and online harassment. Its narrator is intentionally unreliable.',
    palette: { background: '#9a5343', accent: '#dbbe78', ink: '#fff1de' }, motif: 'sun',
  },
  {
    id: 'babel', title: 'Babel', author: 'R. F. Kuang', pages: 560, year: 2022,
    genres: ['Historical fantasy', 'Dark academia'], moods: ['thoughtful', 'exciting', 'escape'], complexity: 4,
    avoidances: ['slow', 'dense', 'worldbuilding'],
    description: 'In an alternate 1830s Oxford, a student from Canton studies translation and silver-working magic at the Royal Institute, where scholarship serves empire.',
    caveat: 'This is a long, research-rich novel about colonialism and language, with racism, violence, and detailed footnotes.',
    palette: { background: '#555047', accent: '#cba85f', ink: '#f4ead6' }, motif: 'window',
  },
  {
    id: 'the-maid', title: 'The Maid', author: 'Nita Prose', pages: 304, year: 2022,
    genres: ['Mystery', 'Crime'], moods: ['exciting', 'comfort'], complexity: 1,
    avoidances: [],
    description: 'Hotel maid Molly Gray is unusually good at her job. When she discovers a guest dead in his suite, her attention to detail makes her central to the investigation.',
    caveat: 'Molly’s distinct social perspective drives the book. The mystery also includes grief and a death at its center.',
    palette: { background: '#71816e', accent: '#ddc483', ink: '#fff2dc' }, motif: 'window',
  },
  {
    id: 'guest-list', title: 'The Guest List', author: 'Lucy Foley', pages: 320, year: 2020,
    genres: ['Mystery', 'Thriller'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'A glamorous wedding on a remote Irish island brings old friends and family together. By morning, one guest is dead and everyone has a reason to lie.',
    caveat: 'The story alternates among several narrators and includes violence, strained relationships, and a bleak atmosphere.',
    palette: { background: '#42555a', accent: '#c6b37a', ink: '#f5efde' }, motif: 'waves',
  },
  {
    id: 'silent-patient', title: 'The Silent Patient', author: 'Alex Michaelides', pages: 336, year: 2019,
    genres: ['Psychological thriller', 'Mystery'], moods: ['exciting', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'After a celebrated painter shoots her husband and stops speaking, a psychotherapist becomes determined to understand her silence.',
    caveat: 'This twist-driven thriller involves violence, trauma, and mental health treatment. Some readers may find its portrayal of mental illness reductive.',
    palette: { background: '#66616a', accent: '#d9b982', ink: '#f7efdf' }, motif: 'moon',
  },
  {
    id: 'beach-read', title: 'Beach Read', author: 'Emily Henry', pages: 384, year: 2020,
    genres: ['Romance', 'Contemporary fiction'], moods: ['comfort', 'emotional', 'exciting'], complexity: 1,
    avoidances: ['romance'],
    description: 'A romance writer and a literary novelist spend the summer as neighbors and challenge each other to write outside their usual genres.',
    caveat: 'The romance is central. Both characters are working through grief and difficult family histories.',
    palette: { background: '#66818a', accent: '#e6c478', ink: '#fff2df' }, motif: 'sun',
  },
  {
    id: 'book-lovers', title: 'Book Lovers', author: 'Emily Henry', pages: 400, year: 2022,
    genres: ['Romance', 'Contemporary fiction'], moods: ['comfort', 'emotional', 'thoughtful'], complexity: 1,
    avoidances: ['romance'],
    description: 'A sharp-edged literary agent keeps running into the same book editor during a small-town trip with her sister, despite every expectation of a meet-cute.',
    caveat: 'A contemporary romance sits alongside a complicated sister relationship and themes of family responsibility.',
    palette: { background: '#a75e48', accent: '#e3c47a', ink: '#fff1dc' }, motif: 'botanical',
  },
  {
    id: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', pages: 432, year: 1813,
    genres: ['Classic', 'Romance'], moods: ['comfort', 'thoughtful', 'emotional'], complexity: 2,
    avoidances: ['slow'],
    description: 'Elizabeth Bennet navigates family expectations, social standing, and her own first impressions after meeting the proud Mr. Darcy.',
    caveat: 'The humor depends on manners and social conventions of the Regency period, and the language may take a little adjustment.',
    palette: { background: '#78705d', accent: '#d8c28a', ink: '#f9f0df' }, motif: 'botanical',
  },
  {
    id: 'jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë', pages: 532, year: 1847,
    genres: ['Classic', 'Gothic fiction'], moods: ['emotional', 'thoughtful', 'escape'], complexity: 3,
    avoidances: ['slow'],
    description: 'An orphaned governess builds an independent life at Thornfield Hall, where her feelings for Mr. Rochester grow alongside a troubling mystery.',
    caveat: 'The novel includes Victorian-era language, class prejudice, and a colonial subplot that reflects its period.',
    palette: { background: '#66544d', accent: '#d7b773', ink: '#f4ead5' }, motif: 'window',
  },
  {
    id: 'coraline', title: 'Coraline', author: 'Neil Gaiman', pages: 208, year: 2002,
    genres: ['Fantasy', 'Horror'], moods: ['exciting', 'escape'], complexity: 1,
    avoidances: [],
    description: 'Exploring her new home, Coraline discovers a door to a parallel version of her life that seems better until its dangers become clear.',
    caveat: 'A short, eerie story for younger readers and adults, with unsettling imagery and peril involving a child.',
    palette: { background: '#3f5264', accent: '#d6bd7d', ink: '#f5eddd' }, motif: 'moon',
  },
  {
    id: 'mexican-gothic', title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', pages: 320, year: 2020,
    genres: ['Horror', 'Historical fiction'], moods: ['exciting', 'escape', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'In 1950s Mexico, socialite Noemí Taboada visits her cousin in a decaying English-style mansion and uncovers the family’s sinister secrets.',
    caveat: 'Gothic body horror, racism, and disturbing family dynamics build through the novel.',
    palette: { background: '#536450', accent: '#d0ae69', ink: '#f6eedc' }, motif: 'botanical',
  },
  {
    id: 'good-girls-guide', title: 'A Good Girl’s Guide to Murder', author: 'Holly Jackson', pages: 400, year: 2019,
    genres: ['Young adult', 'Mystery'], moods: ['exciting', 'thoughtful'], complexity: 1,
    avoidances: ['sad'],
    description: 'For a school project, Pip reopens the case of a local teenager’s murder and finds that the accepted story leaves important questions unanswered.',
    caveat: 'The case includes murder, stalking, and threats. The format mixes conventional chapters with notes and interview transcripts.',
    palette: { background: '#65715f', accent: '#d9bd7b', ink: '#f7f0df' }, motif: 'moon',
  },
  {
    id: 'name-of-the-wind', title: 'The Name of the Wind', author: 'Patrick Rothfuss', pages: 662, year: 2007,
    genres: ['Fantasy', 'Adventure'], moods: ['escape', 'thoughtful', 'exciting'], complexity: 3,
    avoidances: ['slow', 'worldbuilding'],
    description: 'A legendary musician and magician recounts his childhood, education, and the events that turned him into a figure of rumor.',
    caveat: 'This is a long, detailed first-person fantasy, and the larger story remains unfinished across the series.',
    palette: { background: '#5a4c46', accent: '#cbb579', ink: '#f4ead6' }, motif: 'stars',
  },
  {
    id: 'vanishing-half', title: 'The Vanishing Half', author: 'Brit Bennett', pages: 352, year: 2020,
    genres: ['Literary fiction', 'Historical fiction'], moods: ['emotional', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'Twin sisters from a small Southern Black community take sharply different paths, and the choices they make shape the next generation of their families.',
    caveat: 'The novel deals with racism, identity, family separation, and painful personal histories.',
    palette: { background: '#87604e', accent: '#ddc27d', ink: '#fff0db' }, motif: 'window',
  },
  {
    id: 'educated', title: 'Educated', author: 'Tara Westover', pages: 352, year: 2018,
    genres: ['Memoir', 'Biography'], moods: ['thoughtful', 'emotional', 'exciting'], complexity: 2,
    avoidances: ['sad'],
    description: 'Raised in a strict, isolated family, Tara Westover pursues an education that takes her from rural Idaho to universities and changes her sense of home.',
    caveat: 'This memoir includes family estrangement, physical violence, and traumatic experiences.',
    palette: { background: '#536c61', accent: '#dfc47e', ink: '#f7f0df' }, motif: 'mountains',
  },
  {
    id: 'color-purple', title: 'The Color Purple', author: 'Alice Walker', pages: 304, year: 1982,
    genres: ['Literary fiction', 'Historical fiction'], moods: ['emotional', 'thoughtful'], complexity: 2,
    avoidances: ['sad'],
    description: 'Through letters across decades, Celie describes the hardships and relationships that shape her life in the American South.',
    caveat: 'The book depicts sexual and domestic violence, racism, and abuse, alongside resilience and community.',
    palette: { background: '#65526f', accent: '#d9bd7c', ink: '#f7efdf' }, motif: 'botanical',
  },
  {
    id: 'anthropocene-reviewed', title: 'The Anthropocene Reviewed', author: 'John Green', pages: 304, year: 2021,
    genres: ['Essays', 'Nonfiction'], moods: ['thoughtful', 'comfort', 'emotional'], complexity: 2,
    avoidances: [],
    description: 'A collection of personal essays reviews parts of the human-centered age, from diet Dr Pepper to sunsets, with curiosity and feeling.',
    caveat: 'The essays move between humor and reflections on illness, grief, and the climate crisis.',
    palette: { background: '#668178', accent: '#e1c27a', ink: '#f8f0df' }, motif: 'sun',
  },
];

export const BOOK_GENRES = [...new Set(BOOKS.flatMap(book => book.genres))].sort((a, b) => a.localeCompare(b));
export const BOOK_AUTHORS = [...new Set(BOOKS.map(book => book.author))].sort((a, b) => a.localeCompare(b));

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
 * A single avoidance penalty outweighs mood, context, length, and favorite bonuses.
 */
export function rankBooks(answers = {}) {
  const mood = Object.hasOwn(MOOD_REASONS, answers.mood) ? answers.mood : 'surprise';
  const school = Object.hasOwn(SCHOOL_DEFAULTS, answers.school) ? answers.school : null;
  const moment = Object.hasOwn(MOMENT_DEFAULTS, answers.moment) ? answers.moment : null;
  const { energy, length } = studentPreferences(answers, school, moment);
  const avoid = [...new Set(Array.isArray(answers.avoid) ? answers.avoid : [])]
    .filter(value => Object.hasOwn(AVOID_LABELS, value));
  const favoriteGenres = [...new Set(Array.isArray(answers.favoriteGenres) ? answers.favoriteGenres : [])]
    .filter(value => BOOK_GENRES.includes(value));
  const favoriteAuthors = [...new Set(Array.isArray(answers.favoriteAuthors) ? answers.favoriteAuthors : [])]
    .filter(value => BOOK_AUTHORS.includes(value));

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

    const genreMatch = favoriteGenres.find(genre => book.genres.includes(genre));
    if (genreMatch) {
      score += 20;
      reasons.push(`You picked ${genreMatch} as a favorite genre, which is one of this book’s categories.`);
    }
    if (favoriteAuthors.includes(book.author)) {
      score += 32;
      reasons.push(`You picked ${book.author} as a favorite author.`);
    }

    const conflicts = avoid.filter(value => book.avoidances.includes(value));
    // Mood, length, context, and favorites are bounded by -28..140. A 180-point
    // penalty keeps a conflicting book below every clean match.
    score -= conflicts.length * 180;
    if (conflicts.length) {
      reasons.push(`A possible mismatch: expect ${joinItems(conflicts.map(value => AVOID_LABELS[value]))}, which you asked to avoid.`);
    }
    return { book, score, reasons, index };
  }).sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ book, score, reasons }) => ({ book, score, reasons }));
}
