// Direct title/author matches verified against Goodreads listings on 2026-10-07.
// Goodreads maintains the ratings at these links; no numeric ratings are cached.
export const GOODREADS = Object.freeze({
  piranesi: 'https://www.goodreads.com/book/show/48496334-piranesi',
  'house-cerulean-sea': 'https://www.goodreads.com/book/show/52483192-the-house-in-the-cerulean-sea',
  'legends-lattes': 'https://www.goodreads.com/book/show/61457585-legends-lattes',
  'howls-moving-castle': 'https://www.goodreads.com/book/show/818808.Howl_s_Moving_Castle',
  'the-hobbit': 'https://www.goodreads.com/book/show/17261.The_Hobbit',
  'ocean-end-lane': 'https://www.goodreads.com/book/show/18176367-the-ocean-at-the-end-of-the-lane',
  'psalm-wild-built': 'https://www.goodreads.com/book/show/55167243-a-psalm-for-the-wild-built',
  'before-coffee-cold': 'https://www.goodreads.com/book/show/44421460',
  'thursday-murder-club': 'https://www.goodreads.com/en/book/show/46000520-the-thursday-murder-club',
  'roger-ackroyd': 'https://www.goodreads.com/book/show/7112785-the-murder-of-roger-ackroyd',
  'and-then-none': 'https://www.goodreads.com/book/show/28116072-and-then-there-were-none',
  'the-night-circus': 'https://www.goodreads.com/book/show/13279499-the-night-circus',
  'the-secret-history': 'https://www.goodreads.com/book/show/29044.The_Secret_History',
  circe: 'https://www.goodreads.com/book/show/35959740.Circe',
  'jonathan-strange': 'https://www.goodreads.com/book/show/14202.Jonathan_Strange_Mr_Norrell',
});

export function goodreadsURL(book) {
  if (Object.hasOwn(GOODREADS, book.id)) return GOODREADS[book.id];
  return `https://www.goodreads.com/search?q=${encodeURIComponent(`${book.title} ${book.author}`)}`;
}

export function goodreadsLabel(book) {
  return Object.hasOwn(GOODREADS, book.id) ? 'Ratings on Goodreads' : 'Find on Goodreads';
}
