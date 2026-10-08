const key = 'lore.community-preview.v1';

const emptyState = () => ({
  profile: { name: 'Bookish Reader', city: '', annualGoal: 24, visibility: 'community' },
  completedBooks: [],
  pagesRead: 0,
  joinedClubs: [],
  joinedChallenges: [],
  posts: [],
});

export function loadCommunityState() {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || 'null');
    if (!stored || typeof stored !== 'object') return emptyState();
    const defaults = emptyState();
    return {
      ...defaults,
      ...stored,
      profile: { ...defaults.profile, ...(stored.profile || {}) },
      completedBooks: Array.isArray(stored.completedBooks) ? stored.completedBooks : [],
      pagesRead: Math.max(0, Number(stored.pagesRead) || 0),
      joinedClubs: Array.isArray(stored.joinedClubs) ? stored.joinedClubs : [],
      joinedChallenges: Array.isArray(stored.joinedChallenges) ? stored.joinedChallenges : [],
      posts: Array.isArray(stored.posts) ? stored.posts : [],
    };
  } catch {
    return emptyState();
  }
}

export function saveCommunityState(state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
