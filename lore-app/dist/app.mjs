import { BOOKS, BOOK_AUTHORS, BOOK_GENRES, rankBooks } from './books.mjs';
import { cover, sprig, icon, escapeHTML as esc } from './art.mjs';
import { goodreadsURL, GOODREADS } from './goodreads.mjs';
import { loadCommunityState, saveCommunityState } from './community-state.mjs';

const $ = selector => document.querySelector(selector);
const main = $('#main');
const storageKey = 'lore.saved-books.v1';
let saved = [];
let storageAvailable = true;
try {const stored=JSON.parse(localStorage.getItem(storageKey)||'[]');saved=Array.isArray(stored)?stored.filter(id=>BOOKS.some(b=>b.id===id)):[];} catch {storageAvailable=false;}
let answers = {school:'',moment:'',mood:'',avoid:[],favoriteGenres:[],favoriteAuthors:[]};
let step=0, results=[], resultIndex=0, filter='all', browseGenre='all', coverGenre='all', authorQuery='';
let toastTimer;
let community=loadCommunityState();
const demoClubs=[
  {id:'after-class',name:'After Class Book Club',kind:'Book club',genre:'Contemporary fiction',cadence:'Weekly · welcoming all readers',about:'A relaxed chapter-by-chapter read with room for busy weeks.'},
  {id:'cozy-chapters',name:'Cozy Chapters',kind:'Book club',genre:'Cozy fantasy',cadence:'Twice a month · low pressure',about:'Comfort reads, tea, and gentle discussion prompts.'},
  {id:'library-circle',name:'Community Library Circle',kind:'Library group',genre:'Mystery',cadence:'Monthly · library meetup example',about:'A sample library-led group for swapping mysteries and sharing local picks.'},
  {id:'pages-and-pencils',name:'Pages & Pencils',kind:'Book club',genre:'Science fiction',cadence:'Every other week · online example',about:'A curious group for big ideas, new worlds, and thoughtful questions.'},
];
const demoChallenges=[
  {id:'spring-pages',title:'A Fresh Chapter',length:'30-day reading challenge',goal:'Read 300 pages this month',prize:'Sample $25 independent-bookstore gift card',type:'pages'},
  {id:'genre-hop',title:'Genre Hopper',length:'Four-week community challenge',goal:'Try books from three different genres',prize:'Sample bookstore gift card; sponsor needed',type:'genres'},
];
const coverQueue = [];
let activeCoverLookups = 0;
const maxCoverLookups = 4;

function normalizeBookText(value){return String(value||'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
function queueCoverLookup(img){if(img.dataset.coverQueued||img.dataset.coverLoaded)return;img.dataset.coverQueued='true';coverQueue.push(img);runCoverQueue();}
async function lookupCover(img){
  if(!img.isConnected)return;
  const title=img.dataset.coverTitle,author=img.dataset.coverAuthor;
  try{
    const query=new URLSearchParams({title,author,fields:'title,author_name,cover_i,key',limit:'5'});
    const response=await fetch(`https://openlibrary.org/search.json?${query}`);
    if(!response.ok)return;
    const data=await response.json();
    const wantedTitle=normalizeBookText(title),wantedAuthor=normalizeBookText(author);
    const editions=(data.docs||[]).filter(item=>item.cover_i&&normalizeBookText((item.author_name||[]).join(' ')).includes(wantedAuthor));
    const match=editions.find(item=>normalizeBookText(item.title)===wantedTitle)||editions[0];
    if(match?.cover_i&&img.isConnected){
      img.onload=()=>{img.classList.add('loaded');img.dataset.coverLoaded='true';};
      img.onerror=()=>{img.removeAttribute('src');};
      img.src=`https://covers.openlibrary.org/b/id/${encodeURIComponent(match.cover_i)}-L.jpg?default=false`;
    }
  }catch{/* Keep the illustrated cover visible when the cover service is unavailable. */}
}
function runCoverQueue(){
  while(activeCoverLookups<maxCoverLookups&&coverQueue.length){
    const img=coverQueue.shift();
    if(!img.isConnected)continue;
    activeCoverLookups++;
    lookupCover(img).finally(()=>{activeCoverLookups--;runCoverQueue();});
  }
}
const coverObserver=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){queueCoverLookup(entry.target);coverObserver.unobserve(entry.target);}
},{rootMargin:'180px'});
function hydrateCovers(root=document){root.querySelectorAll('.real-cover').forEach(img=>{if(coverObserver)coverObserver.observe(img);else queueCoverLookup(img);});}

const questions = [
  {key:'school',eyebrow:'READING AROUND REAL LIFE',title:'What chapter of school are you in?',subtitle:'Your next read should fit your week, not add to your workload.',options:[
    ['start','A fresh semester','New classes, new routines, new stories.','sun'],['regular','The usual class week','A little reading around lectures and assignments.','book'],['midterms','Midterm season','A breather between study sessions.','coffee'],['finals','Finals mode','Something manageable when my brain is full.','moon'],['break','On a school break','Finally, some room to get lost in a story.','leaf'],['other','Outside the school calendar','Find a story for my everyday life.','spark']]},
  {key:'moment',eyebrow:'A BOOK THAT FITS YOUR DAY',title:'When will you sneak in a chapter?',subtitle:'Tell us about your reading time. We’ll keep the commitment in mind.',options:[
    ['between','Between classes','A little pocket of time before the next thing.','coffee'],['short-commute','A short commute','A few stops on the bus or train.','book'],['long-commute','A longer commute','A regular stretch of time to settle into a story.','mountain'],['bedtime','Before bed','A softer landing at the end of the day.','moon'],['weekend','A free afternoon','Time to get comfortable and keep reading.','sun']]},
  {key:'mood',eyebrow:'FIRST, A FEELING',title:'What are you in the mood for?',subtitle:'Go with your gut. There’s no wrong chapter to be in.',options:[
    ['escape','An escape','Take me somewhere far from here.','moon'],['comfort','A little comfort','Something warm to settle into.','coffee'],['emotional','All the feelings','A story that stays with me.','heart'],['exciting','A bit of a thrill','Keep me turning the pages.','spark'],['thoughtful','Food for thought','Give me a new way of seeing.','leaf'],['surprise','Surprise me','I’m open to a little serendipity.','sun']]},
  {key:'favoriteGenres',eyebrow:'YOUR BOOKSHELF, YOUR TASTE',title:'Which genres do you reach for?',subtitle:'Optional. Pick any favorites and we’ll give them extra weight.',multiple:true,optional:true,options:BOOK_GENRES.map(genre=>[genre,genre,'A favorite genre','book'])},
  {key:'favoriteAuthors',eyebrow:'A FAMILIAR VOICE',title:'Any favorite authors?',subtitle:'Optional. Pick authors you already love, or search the list.',multiple:true,optional:true,options:BOOK_AUTHORS.map(author=>[author,author,'Books by this author','book'])},
  {key:'avoid',eyebrow:'ONE LAST THING',title:'Anything you’d rather skip?',subtitle:'Pick as many as you like. We’ll keep these in mind.',multiple:true,options:[
    ['romance','Heavy romance','A love story as the main event.','heart'],['slow','Slow pacing','A story that takes its time.','moon'],['sad','Sad endings','Bittersweet or emotionally heavy finales.','leaf'],['dense','Dense writing','Prose that asks for extra concentration.','book'],['worldbuilding','Lots of world-building','New worlds with plenty of rules.','mountain'],['none','I’m open to anything','Let the story surprise me.','spark']]}
];

function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function updateCount(){ $('#shelf-count').textContent=saved.length; }
function saveBook(id){
  if(!saved.includes(id)) saved.push(id);
  try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false;}
  updateCount();
  document.querySelectorAll(`[data-save="${id}"]`).forEach(button=>{button.innerHTML=`${icon('check')} On your bookshelf`;button.disabled=true;});
  toast(storageAvailable?'A new chapter awaits. Saved to My books.':'Added for this visit. Your browser couldn’t save it for later.');
}
function nav(name){document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===name;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
function focusPage(){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
function setPage(html,name){main.innerHTML=html;nav(name);updateCount();hydrateCovers(main);}
function startQuiz(preset={}) {answers={school:'',moment:'',mood:'',avoid:[],favoriteGenres:[],favoriteAuthors:[],...preset};step=preset.school?1:0;authorQuery='';results=[];resultIndex=0;if(location.hash!=='#discover')location.hash='discover';else{renderQuiz();focusPage();}}
function goodreadsLink(book) {return `<a class="goodreads-link" href="${esc(goodreadsURL(book))}" target="_blank" rel="noopener noreferrer" aria-label="${GOODREADS[book.id]?'Ratings and reviews':'Find ratings and reviews'} for ${esc(book.title)} on Goodreads (opens a new tab)"><span aria-hidden="true">g</span> ${GOODREADS[book.id]?'Ratings & reviews on Goodreads':'Find this book on Goodreads'} ↗</a>`;}
function card(book){return `<article class="shelf-book"><button class="cover-button" data-book="${book.id}" aria-label="Read about ${esc(book.title)}">${cover(book)}</button><div class="book-card-meta"><span>${esc(book.genres[0])}</span><span>${book.pages} pp.</span></div><button class="book-title-button" data-book="${book.id}"><h3>${esc(book.title)}</h3></button><p>${esc(book.author)}</p></article>`;}

function renderHome(){
  const featured=[BOOKS.find(b=>b.motif==='botanical')||BOOKS[0],BOOKS.find(b=>b.motif==='moon')||BOOKS[1],BOOKS.find(b=>b.motif==='window')||BOOKS[2]];
  setPage(`<section class="hero page-width"><div class="hero-copy"><p class="eyebrow"><span class="small-line"></span> A LITTLE READING, AROUND REAL LIFE</p><h1>Find the right story<br>for <em>right now.</em></h1><p class="hero-description">Midterms, morning commutes, or a well-earned break.<br>Find a few good books that fit your kind of week.</p><div class="hero-actions"><button class="button primary hero-cta" data-action="start">Find my next reads ${icon('arrow')}</button><a class="text-button cover-choice-link" href="#covers">Or pick by the cover ${icon('spark')}</a></div><p class="under-button">A few quick questions. A whole new chapter.</p><div class="hero-footnote"><span class="hand-star">✳</span><span>Something just for you.<br><strong>A story beyond the required reading.</strong></span></div></div><div class="hero-collage" aria-label="A collection of illustrated books"><div class="blue-paper"></div><div class="paper-writing" aria-hidden="true">Some stories find us<br>exactly when we need them.</div><div class="collage-cover cover-back">${cover(featured[0])}</div><div class="collage-cover cover-middle">${cover(featured[1])}</div><div class="collage-cover cover-front">${cover(featured[2])}</div>${sprig('hero-sprig')}<div class="round-stamp" aria-hidden="true"><span>A STORY FOR</span>${icon('spark')}<span>EVERY YOU</span></div><div class="little-note"><span>your next favorite<br>is out there.</span><svg viewBox="0 0 75 40" aria-hidden="true"><path d="M3 6q15 43 61 15m-14-6 16 5-8 13" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div></div></section>
  <section class="mood-section page-width"><div class="section-top"><div><p class="eyebrow">READING BETWEEN THE LECTURES</p><h2>What kind of week are you in?</h2></div><span class="section-aside">There’s a story for that.</span></div><div class="mood-grid"><button class="mood-card mood-blue" data-school="midterms"><span class="mood-art">${icon('coffee')}</span><span><strong>Midterm breather</strong><small>A little space between study sessions.</small></span>${icon('arrow')}</button><button class="mood-card mood-gold" data-school="finals"><span class="mood-art">${icon('moon')}</span><span><strong>Finals survival</strong><small>A manageable escape from the syllabus.</small></span>${icon('arrow')}</button><button class="mood-card mood-rose" data-moment="short-commute"><span class="mood-art">${icon('book')}</span><span><strong>One more stop</strong><small>A story for your bus or train ride.</small></span>${icon('arrow')}</button></div></section>
  <section class="browse-section page-width"><div class="section-top"><div><p class="eyebrow">A LITTLE SHELF INSPIRATION</p><h2>Stories worth getting lost in.</h2></div><button class="text-button" data-action="start">Find your fit ${icon('arrow')}</button></div><div class="filter-row" role="group" aria-label="Filter books by mood">${[['all','A little of everything'],['escape','An escape'],['comfort','Something cozy'],['thoughtful','A new perspective']].map(([v,label])=>`<button class="filter-chip ${filter===v?'selected':''}" data-filter="${v}" aria-pressed="${filter===v}">${label}</button>`).join('')}</div><label class="genre-select">Browse by genre<select data-browse-genre><option value="all">All genres</option>${BOOK_GENRES.map(genre=>`<option value="${esc(genre)}" ${browseGenre===genre?'selected':''}>${esc(genre)}</option>`).join('')}</select></label><div class="book-grid" id="browse-books">${filteredBooks().map(card).join('')}</div></section><section class="closing-note page-width">${icon('book')}<p>“One more chapter” is always a good idea.</p><span>MAKE A LITTLE ROOM FOR A STORY.</span></section>`, 'home');
}
function filteredBooks(){const matches=BOOKS.filter(book=>(filter==='all'||book.moods.includes(filter))&&(browseGenre==='all'||book.genres.includes(browseGenre)));return matches.slice(0,browseGenre==='all'?8:24);}

function renderQuiz(){
  const q=questions[step],current=answers[q.key];
  const multiple=q.multiple, selected=Array.isArray(current)?current:[];
  const authorSearch=q.key==='favoriteAuthors'?`<label class="author-search">Find an author<input type="search" data-author-search placeholder="Search authors" value="${esc(authorQuery)}" autocomplete="off"></label>`:'';
  setPage(`<section class="quiz-page page-width"><div class="quiz-topline"><button class="text-button" data-action="back">← ${step?'Previous question':'Back to home'}</button><span class="eyebrow">A STORY FOR YOUR STUDENT LIFE</span><span class="step-counter">${String(step+1).padStart(2,'0')} <span>/ ${String(questions.length).padStart(2,'0')}</span></span></div><div class="progress-track" aria-label="Question ${step+1} of ${questions.length}"><span style="width:${(step+1)/questions.length*100}%"></span></div><div class="quiz-heading"><p class="eyebrow">${q.eyebrow}</p><h1>${q.title}</h1><p>${q.subtitle}</p></div>${authorSearch}<div class="answer-grid ${q.options.length===4?'four-options':''} ${q.optional?'preference-grid':''} ${q.key==='favoriteAuthors'?'author-grid':''}" role="group" aria-label="${q.title}">${q.options.map(([v,label,desc,i])=>{const chosen=multiple?selected.includes(v):current===v;return `<button class="answer-card ${chosen?'chosen':''}" data-answer="${esc(v)}" aria-pressed="${chosen}" data-author-option="${q.key==='favoriteAuthors'?'true':'false'}"><span class="answer-icon">${icon(i)}</span><strong>${esc(label)}</strong><span class="answer-description">${esc(desc)}</span><span class="answer-check" aria-hidden="true">${chosen?icon('check'):''}</span></button>`;}).join('')}</div><div class="quiz-bottom"><a class="text-button" href="#covers">Rather choose with your eyes? Pick by the cover ↗</a><button class="button primary" data-action="next" ${canContinue()?'':'disabled'}>${step===questions.length-1?'Find my books':'Next chapter'} ${icon('arrow')}</button></div></section>`, 'discover');
}
function canContinue(){const q=questions[step];return q.optional|| (q.multiple?answers[q.key].length>0:!!answers[q.key]);}
function choose(value){const q=questions[step];if(q.multiple){if(q.key==='avoid'){if(value==='none')answers.avoid=answers.avoid.includes('none')?[]:['none'];else{answers.avoid=answers.avoid.filter(v=>v!=='none');if(answers.avoid.includes(value))answers.avoid=answers.avoid.filter(v=>v!==value);else answers.avoid.push(value);}}else{answers[q.key]=answers[q.key].includes(value)?answers[q.key].filter(v=>v!==value):[...answers[q.key],value];}}else answers[q.key]=value;renderQuiz();document.querySelector(`[data-answer="${CSS.escape(value)}"]`)?.focus({preventScroll:true});}

function renderResult(){
  if(!results.length){renderQuiz();return;}
  const picks=results.slice(resultIndex,resultIndex+3);
  const labels=questions.filter(q=>!q.multiple).map(q=>q.options.find(o=>o[0]===answers[q.key])?.[1]).filter(Boolean);
  const preferenceLabels=[...answers.favoriteGenres,...answers.favoriteAuthors];
  setPage(`<section class="result-page page-width"><div class="result-topline"><button class="text-button" data-action="restart">← Change my answers</button><a class="text-button" href="#covers">Pick by the cover ${icon('spark')}</a></div><div class="result-heading"><p class="eyebrow">A LITTLE SHELF, PICKED FOR YOUR WEEK</p><h1>A few stories for your right now.</h1><div class="preference-tags">${[...labels,...preferenceLabels].map(label=>`<span>${esc(label)}</span>`).join('')}</div><p class="results-description">Three books to choose from. Open “Why it fits” to see the matches and trade-offs.</p></div><div class="recommendation-grid">${picks.map(({book,reasons},i)=>`<article class="recommendation-card"><span class="pick-number">PICK ${String(resultIndex+i+1).padStart(2,'0')}</span><button class="recommendation-cover" data-book="${book.id}" aria-label="Read about ${esc(book.title)}">${cover(book)}</button><p class="eyebrow result-genre">${esc(book.genres[0])} · ABOUT ${book.pages} PAGES</p><h2>${esc(book.title)}</h2><p class="recommendation-author">${esc(book.author)}</p><p class="book-description">${esc(book.description)}</p><details class="fit-details"><summary>${icon('spark')} Why it fits your week</summary><ul>${reasons.map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul></details><p class="recommendation-caveat"><strong>One thing to know</strong>${esc(book.caveat)}</p>${goodreadsLink(book)}<button class="button primary" data-save="${book.id}" ${saved.includes(book.id)?'disabled':''}>${icon(saved.includes(book.id)?'check':'bookmark')}${saved.includes(book.id)?'On your bookshelf':'I’ll read this'}</button></article>`).join('')}</div><div class="results-bottom"><p>Showing ${resultIndex+1}–${resultIndex+picks.length} of ${results.length} suggestions.</p><button class="button secondary" data-action="another">${icon('refresh')} ${resultIndex+3>=results.length?'Back to first picks':'Show three more'}</button></div><p class="edition-note">Page counts vary by edition. Cover images from Open Library when available. Follow the Goodreads links for current ratings, reviews, and editions.</p></section>`, 'discover');
}

function renderCovers(){
  const genreBooks=coverGenre==='all'?BOOKS:BOOKS.filter(book=>book.genres.includes(coverGenre));
  setPage(`<section class="cover-gallery page-width"><div class="gallery-heading"><p class="eyebrow">A LITTLE LOVE AT FIRST SIGHT</p><h1>Pick by the cover.</h1><p>Which one catches your eye? Tap a cover to meet the story inside.</p><p class="edition-note">Choose a genre to browse just those books, or explore the whole shelf.</p><label class="genre-select gallery-genre-select">Show me<select data-cover-genre><option value="all">All genres</option>${BOOK_GENRES.map(genre=>`<option value="${esc(genre)}" ${coverGenre===genre?'selected':''}>${esc(genre)}</option>`).join('')}</select></label></div><div class="cover-gallery-grid">${genreBooks.map(book=>`<button class="cover-pick" data-book="${book.id}" aria-label="Choose ${esc(book.title)} by its cover">${cover(book)}<span>Meet this book ${icon('arrow')}</span></button>`).join('')}</div><div class="gallery-footer"><p>Want a story that fits your schedule, too?</p><button class="button primary" data-action="start">Find my next reads ${icon('arrow')}</button></div></section>`, 'covers');
}

function renderShelf(){
  const books=saved.map(id=>BOOKS.find(b=>b.id===id)).filter(Boolean);
  setPage(`<section class="my-shelf page-width"><div class="shelf-heading"><div><p class="eyebrow">STORIES YOU’VE MADE ROOM FOR</p><h1>Your next chapters.</h1><p>A little collection of books you can’t wait to meet.</p></div><button class="button primary" data-action="start">Find another story ${icon('arrow')}</button></div>${books.length?`<div class="shelf-message">${icon('bookmark')} ${books.length} ${books.length===1?'story':'stories'} waiting for you. <span>${storageAvailable?'Saved in this browser.':'Kept for this visit.'}</span></div><div class="book-grid saved-grid">${books.map(b=>`<div>${card(b)}<button class="remove-button" data-remove="${b.id}" aria-label="Remove ${esc(b.title)} from My books">Remove from shelf</button></div>`).join('')}</div>`:`<div class="empty-shelf">${icon('book')}<h2>A good story belongs here.</h2><p>Find a book that speaks to you, then choose<br>“I’ll read this” to keep it on your shelf.</p><button class="button primary" data-action="start">Let’s find your first ${icon('arrow')}</button></div>`}</section>`, 'shelf');
}

function renderCommunity(){
  const profile=community.profile;
  const goal=Math.max(1,Number(profile.annualGoal)||24);
  const completed=community.completedBooks.length;
  const progress=Math.min(100,Math.round(completed/goal*100));
  const posts=[...community.posts].reverse();
  const samplePosts=[
    {name:'Mina R.',text:'Aiming for one quiet chapter before bed this week. Small goals count, too.',meta:'Preview reader · reading goal'},
    {name:'Jordan L.',text:'Just finished a book that made my bus commute feel too short. What are you reading?',meta:'Preview reader · finished a book'},
    {name:'Sam T.',text:'Our sample club is reading a mystery this month. Bring your favorite theories.',meta:'Preview reader · club note'},
  ];
  const shownPosts=[...posts.map(post=>({name:profile.name,text:post.text,meta:post.meta||'Your community post',mine:true})),...samplePosts];
  const localLabel=profile.city?`Example listings for ${esc(profile.city)}`:'Add a city in your profile to preview local discovery';
  setPage(`<section class="community-page page-width">
    <header class="community-heading"><div><p class="eyebrow">READING IS BETTER TOGETHER</p><h1>Your reading community.</h1><p>Find a circle, share your progress, and make a little room for a reading goal.</p></div><span class="preview-stamp">COMMUNITY PREVIEW</span></header>
    <aside class="community-preview-note"><strong>Prototype mode</strong><span>Profiles, clubs, posts, and challenge joins are saved in this browser only. Sample members and nearby listings are examples; gift-card prizes need a sponsor before they can be awarded.</span></aside>
    <div class="community-layout">
      <div class="community-main-column">
        <section class="community-panel goal-panel" aria-labelledby="goal-title"><div class="panel-heading"><div><p class="eyebrow">YOUR READING YEAR</p><h2 id="goal-title">A goal that fits your life.</h2></div><span class="goal-mark">${progress}%</span></div><p class="goal-count"><strong>${completed}</strong> of ${goal} books completed</p><div class="goal-progress" role="progressbar" aria-label="Annual reading goal" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${progress}%"></span></div><p class="goal-caption">${Math.max(0,goal-completed)} ${goal-completed===1?'book':'books'} to go · ${community.pagesRead.toLocaleString()} pages logged</p>
        <form class="reading-log-form" data-reading-log><label>Mark a book finished<select name="bookId"><option value="">Choose a book</option>${BOOKS.map(book=>`<option value="${book.id}">${esc(book.title)}</option>`).join('')}</select></label><label>Pages read<input type="number" name="pages" min="0" max="10000" inputmode="numeric" placeholder="Optional"></label><button class="button primary" type="submit">Log reading ${icon('arrow')}</button></form></section>
        <section class="community-panel clubs-panel" aria-labelledby="clubs-title"><div class="panel-heading"><div><p class="eyebrow">FIND YOUR PEOPLE</p><h2 id="clubs-title">Book clubs & library circles</h2></div><span class="preview-count">${demoClubs.length} examples</span></div><p class="local-preview-label">${localLabel}</p><div class="community-card-grid">${demoClubs.map((club,index)=>{const joined=community.joinedClubs.includes(club.id);return `<article class="club-card"><div class="club-card-top"><span class="club-kind">${club.kind}</span><span class="club-illustration" aria-hidden="true">${['✿','☕','⌂','✦'][index]}</span></div><h3>${club.name}</h3><p class="club-genre">${club.genre}</p><p class="club-about">${club.about}</p><p class="club-cadence">${profile.city?`Preview location · ${esc(profile.city)}`:club.cadence}</p><button class="button ${joined?'secondary':'primary'} club-join" data-join-club="${club.id}">${joined?'Joined · leave':'Join this group'}</button></article>`;}).join('')}</div></section>
        <section class="community-panel challenge-panel" aria-labelledby="challenge-title"><div class="panel-heading"><div><p class="eyebrow">A LITTLE FRIENDLY MOMENTUM</p><h2 id="challenge-title">Reading challenges</h2></div><span class="preview-count">Sample events</span></div><div class="challenge-grid">${demoChallenges.map(challenge=>{const joined=community.joinedChallenges.includes(challenge.id);return `<article class="challenge-card"><p class="eyebrow">${challenge.length}</p><h3>${challenge.title}</h3><p>${challenge.goal}</p><div class="challenge-prize"><span>Possible prize</span><strong>${challenge.prize}</strong></div><button class="button ${joined?'secondary':'primary'}" data-join-challenge="${challenge.id}">${joined?'You’re participating':'Join challenge'}</button></article>`;}).join('')}</div><p class="prize-note">These are demonstrations only. No contest is currently active and no gift cards are being offered.</p></section>
        <section class="community-panel feed-panel" aria-labelledby="feed-title"><div class="panel-heading"><div><p class="eyebrow">NOTES FROM THE READING ROOM</p><h2 id="feed-title">The community board</h2></div><span class="preview-count">Preview feed</span></div><form class="post-form" data-community-post><label for="community-post-text">Share a goal, reading update, or book thought</label><textarea id="community-post-text" name="post" maxlength="500" rows="3" placeholder="What are you reading toward?"></textarea><div class="post-form-bottom"><span>Up to 500 characters</span><button class="button primary" type="submit">Post update ${icon('arrow')}</button></div></form><div class="community-feed">${shownPosts.map(post=>`<article class="feed-post ${post.mine?'mine':''}"><span class="post-avatar" aria-hidden="true">${esc((post.name||'?').slice(0,1).toUpperCase())}</span><div><div class="post-byline"><strong>${esc(post.name)}</strong><span>${esc(post.meta)}</span></div><p>${esc(post.text)}</p></div></article>`).join('')}</div></section>
      </div>
      <aside class="community-side-column"><section class="community-panel profile-panel" aria-labelledby="profile-title"><p class="eyebrow">YOUR COMMUNITY PROFILE</p><div class="profile-avatar" aria-hidden="true">${esc((profile.name||'?').slice(0,1).toUpperCase())}</div><h2 id="profile-title">${esc(profile.name)}</h2><p class="profile-location">${profile.city?esc(profile.city):'Add your city to preview local groups'}</p><div class="profile-stats"><div><strong>${completed}</strong><span>books this year</span></div><div><strong>${community.pagesRead.toLocaleString()}</strong><span>pages read</span></div></div><form class="profile-edit-form" data-profile-form><label>Display name<input name="name" maxlength="40" required value="${esc(profile.name)}"></label><label>City or town<input name="city" maxlength="80" value="${esc(profile.city)}" placeholder="e.g. Portland, OR"><small>Typed by you; Lore does not request GPS location.</small></label><label>Annual book goal<input name="annualGoal" type="number" min="1" max="500" value="${goal}"></label><label>Profile visibility<select name="visibility"><option value="community" ${profile.visibility==='community'?'selected':''}>Community</option><option value="private" ${profile.visibility==='private'?'selected':''}>Private preview</option></select></label><button class="button secondary" type="submit">Save profile & goal</button></form></section><section class="community-panel joined-panel"><p class="eyebrow">YOUR CIRCLES</p><h2>${community.joinedClubs.length} groups joined</h2><p>Joined groups and challenge entries stay on this device in prototype mode.</p><a class="text-button" href="#shelf">Visit your bookshelf ${icon('arrow')}</a></section></aside>
    </div>
  </section>`, 'community');
}

function openBook(id){const book=BOOKS.find(b=>b.id===id);if(!book)return;const isSaved=saved.includes(id);$('#dialog-content').innerHTML=`<div class="dialog-book">${cover(book)}<div><p class="eyebrow">${esc(book.genres.join(' · '))}</p><h2 id="dialog-title">${esc(book.title)}</h2><p class="dialog-author">by ${esc(book.author)}</p><p class="book-description">${esc(book.description)}</p><p class="dialog-caveat"><strong>One thing to know</strong>${esc(book.caveat)}</p><p class="edition-note">${book.pages} pages, approximately · ${book.year}<br>Cover images via Open Library when available.</p>${goodreadsLink(book)}<button class="button primary" data-save="${id}" ${isSaved?'disabled':''}>${icon(isSaved?'check':'bookmark')}${isSaved?'On your bookshelf':'I’ll read this'}</button></div></div>`;$('#book-dialog').showModal();hydrateCovers($('#dialog-content'));}
function route(){const route=location.hash.slice(1);if(route==='discover'){results.length?renderResult():renderQuiz();}else if(route==='shelf')renderShelf();else if(route==='covers')renderCovers();else if(route==='community')renderCommunity();else renderHome();focusPage();}

document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  const {action,school,moment,answer,save,book,remove,filter:chosenFilter,joinClub,joinChallenge}=button.dataset;
  if(button.classList.contains('dialog-close')){$('#book-dialog').close();return;}
  if(save){saveBook(save);return;}if(book){openBook(book);return;}
  if(remove){saved=saved.filter(id=>id!==remove);try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false;}renderShelf();main.focus({preventScroll:true});toast('Book removed from your shelf.');return;}
  if(joinClub){community.joinedClubs=community.joinedClubs.includes(joinClub)?community.joinedClubs.filter(id=>id!==joinClub):[...community.joinedClubs,joinClub];saveCommunityState(community);renderCommunity();return;}
  if(joinChallenge){community.joinedChallenges=community.joinedChallenges.includes(joinChallenge)?community.joinedChallenges.filter(id=>id!==joinChallenge):[...community.joinedChallenges,joinChallenge];saveCommunityState(community);renderCommunity();return;}
  if(school){startQuiz({school});return;}if(moment){startQuiz({moment});return;}if(answer){choose(answer);return;}
  if(chosenFilter!==undefined){filter=chosenFilter;document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===filter;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});$('#browse-books').innerHTML=filteredBooks().map(card).join('');hydrateCovers($('#browse-books'));return;}
  if(action==='start'||action==='restart'){startQuiz();return;}
  if(action==='back'){if(step){step--;renderQuiz();focusPage();}else location.hash='home';}
  if(action==='next'&&canContinue()){if(step<questions.length-1){step++;renderQuiz();}else{results=rankBooks({...answers,avoid:answers.avoid.filter(v=>v!=='none')});resultIndex=0;renderResult();}focusPage();}
  if(action==='another'&&results.length){resultIndex=resultIndex+3>=results.length?0:resultIndex+3;renderResult();focusPage();if(resultIndex===0)toast('Back to your first picks. Change your answers to explore another kind of week.');}
});
document.addEventListener('input',event=>{
  if(!event.target.matches('[data-author-search]'))return;
  authorQuery=event.target.value;
  const query=normalizeBookText(authorQuery);
  document.querySelectorAll('[data-author-option="true"]').forEach(option=>{option.hidden=!normalizeBookText(option.textContent).includes(query);});
});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-browse-genre]')){
    browseGenre=event.target.value;
    $('#browse-books').innerHTML=filteredBooks().map(card).join('');
    hydrateCovers($('#browse-books'));
  }else if(event.target.matches('[data-cover-genre]')){
    coverGenre=event.target.value;
    renderCovers();
  }
});
document.addEventListener('submit',event=>{
  const form=event.target;
  if(form.matches('[data-profile-form]')){
    event.preventDefault();
    const values=new FormData(form);
    community.profile={...community.profile,name:String(values.get('name')||'').trim()||'Bookish Reader',city:String(values.get('city')||'').trim(),annualGoal:Math.max(1,Math.min(500,Number(values.get('annualGoal'))||24)),visibility:values.get('visibility')==='private'?'private':'community'};
    const stored=saveCommunityState(community);renderCommunity();toast(stored?'Your profile and reading goal are saved on this device.':'Could not save your profile in this browser.');
  }else if(form.matches('[data-reading-log]')){
    event.preventDefault();
    const values=new FormData(form),bookId=String(values.get('bookId')||''),pages=Math.max(0,Math.min(10000,Number(values.get('pages'))||0));
    if(!bookId&&!pages){toast('Choose a finished book or enter pages read.');return;}
    if(bookId&&!community.completedBooks.includes(bookId))community.completedBooks.push(bookId);
    community.pagesRead+=pages;
    const stored=saveCommunityState(community);renderCommunity();toast(stored?'Reading progress logged.':'Could not save your reading progress in this browser.');
  }else if(form.matches('[data-community-post]')){
    event.preventDefault();
    const text=String(new FormData(form).get('post')||'').trim();
    if(!text)return;
    community.posts.push({text,meta:'Your reading update',createdAt:Date.now()});
    const stored=saveCommunityState(community);renderCommunity();toast(stored?'Your update is on the community preview board.':'Could not save your update in this browser.');
  }
});
$('#book-dialog').addEventListener('click',event=>{if(event.target===$('#book-dialog')){$('#book-dialog').close();}});
$('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
window.addEventListener('hashchange',route);
route();
