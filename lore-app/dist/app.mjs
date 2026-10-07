import { BOOKS, rankBooks } from './books.mjs';
import { cover, sprig, icon, escapeHTML as esc } from './art.mjs';
import { goodreadsURL, GOODREADS } from './goodreads.mjs';

const $ = selector => document.querySelector(selector);
const main = $('#main');
const storageKey = 'lore.saved-books.v1';
let saved = [];
let storageAvailable = true;
try {const stored=JSON.parse(localStorage.getItem(storageKey)||'[]');saved=Array.isArray(stored)?stored.filter(id=>BOOKS.some(b=>b.id===id)):[];} catch {storageAvailable=false;}
let answers = {school:'',moment:'',mood:'',avoid:[]};
let step=0, results=[], resultIndex=0, filter='all';
let toastTimer;

const questions = [
  {key:'school',eyebrow:'READING AROUND REAL LIFE',title:'What chapter of school are you in?',subtitle:'Your next read should fit your week, not add to your workload.',options:[
    ['start','A fresh semester','New classes, new routines, new stories.','sun'],['regular','The usual class week','A little reading around lectures and assignments.','book'],['midterms','Midterm season','A breather between study sessions.','coffee'],['finals','Finals mode','Something manageable when my brain is full.','moon'],['break','On a school break','Finally, some room to get lost in a story.','leaf'],['other','Outside the school calendar','Find a story for my everyday life.','spark']]},
  {key:'moment',eyebrow:'A BOOK THAT FITS YOUR DAY',title:'When will you sneak in a chapter?',subtitle:'Tell us about your reading time. We’ll keep the commitment in mind.',options:[
    ['between','Between classes','A little pocket of time before the next thing.','coffee'],['short-commute','A short commute','A few stops on the bus or train.','book'],['long-commute','A longer commute','A regular stretch of time to settle into a story.','mountain'],['bedtime','Before bed','A softer landing at the end of the day.','moon'],['weekend','A free afternoon','Time to get comfortable and keep reading.','sun']]},
  {key:'mood',eyebrow:'FIRST, A FEELING',title:'What are you in the mood for?',subtitle:'Go with your gut. There’s no wrong chapter to be in.',options:[
    ['escape','An escape','Take me somewhere far from here.','moon'],['comfort','A little comfort','Something warm to settle into.','coffee'],['emotional','All the feelings','A story that stays with me.','heart'],['exciting','A bit of a thrill','Keep me turning the pages.','spark'],['thoughtful','Food for thought','Give me a new way of seeing.','leaf'],['surprise','Surprise me','I’m open to a little serendipity.','sun']]},
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
function setPage(html,name){main.innerHTML=html;nav(name);updateCount();}
function startQuiz(preset={}) {answers={school:'',moment:'',mood:'',avoid:[],...preset};step=preset.school?1:0;results=[];resultIndex=0;if(location.hash!=='#discover')location.hash='discover';else{renderQuiz();focusPage();}}
function goodreadsLink(book) {return `<a class="goodreads-link" href="${esc(goodreadsURL(book))}" target="_blank" rel="noopener noreferrer" aria-label="${GOODREADS[book.id]?'Ratings and reviews':'Find ratings and reviews'} for ${esc(book.title)} on Goodreads (opens a new tab)"><span aria-hidden="true">g</span> ${GOODREADS[book.id]?'Ratings & reviews on Goodreads':'Find this book on Goodreads'} ↗</a>`;}
function card(book){return `<article class="shelf-book"><button class="cover-button" data-book="${book.id}" aria-label="Read about ${esc(book.title)}">${cover(book)}</button><div class="book-card-meta"><span>${esc(book.genres[0])}</span><span>${book.pages} pp.</span></div><button class="book-title-button" data-book="${book.id}"><h3>${esc(book.title)}</h3></button><p>${esc(book.author)}</p></article>`;}

function renderHome(){
  const featured=[BOOKS.find(b=>b.motif==='botanical')||BOOKS[0],BOOKS.find(b=>b.motif==='moon')||BOOKS[1],BOOKS.find(b=>b.motif==='window')||BOOKS[2]];
  setPage(`<section class="hero page-width"><div class="hero-copy"><p class="eyebrow"><span class="small-line"></span> A LITTLE READING, AROUND REAL LIFE</p><h1>Find the right story<br>for <em>right now.</em></h1><p class="hero-description">Midterms, morning commutes, or a well-earned break.<br>Find a few good books that fit your kind of week.</p><div class="hero-actions"><button class="button primary hero-cta" data-action="start">Find my next reads ${icon('arrow')}</button><a class="text-button cover-choice-link" href="#covers">Or pick by the cover ${icon('spark')}</a></div><p class="under-button">Four little questions. A whole new chapter.</p><div class="hero-footnote"><span class="hand-star">✳</span><span>Something just for you.<br><strong>A story beyond the required reading.</strong></span></div></div><div class="hero-collage" aria-label="A collection of illustrated books"><div class="blue-paper"></div><div class="paper-writing" aria-hidden="true">Some stories find us<br>exactly when we need them.</div><div class="collage-cover cover-back">${cover(featured[0])}</div><div class="collage-cover cover-middle">${cover(featured[1])}</div><div class="collage-cover cover-front">${cover(featured[2])}</div>${sprig('hero-sprig')}<div class="round-stamp" aria-hidden="true"><span>A STORY FOR</span>${icon('spark')}<span>EVERY YOU</span></div><div class="little-note"><span>your next favorite<br>is out there.</span><svg viewBox="0 0 75 40" aria-hidden="true"><path d="M3 6q15 43 61 15m-14-6 16 5-8 13" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div></div></section>
  <section class="mood-section page-width"><div class="section-top"><div><p class="eyebrow">READING BETWEEN THE LECTURES</p><h2>What kind of week are you in?</h2></div><span class="section-aside">There’s a story for that.</span></div><div class="mood-grid"><button class="mood-card mood-blue" data-school="midterms"><span class="mood-art">${icon('coffee')}</span><span><strong>Midterm breather</strong><small>A little space between study sessions.</small></span>${icon('arrow')}</button><button class="mood-card mood-gold" data-school="finals"><span class="mood-art">${icon('moon')}</span><span><strong>Finals survival</strong><small>A manageable escape from the syllabus.</small></span>${icon('arrow')}</button><button class="mood-card mood-rose" data-moment="short-commute"><span class="mood-art">${icon('book')}</span><span><strong>One more stop</strong><small>A story for your bus or train ride.</small></span>${icon('arrow')}</button></div></section>
  <section class="browse-section page-width"><div class="section-top"><div><p class="eyebrow">A LITTLE SHELF INSPIRATION</p><h2>Stories worth getting lost in.</h2></div><button class="text-button" data-action="start">Find your fit ${icon('arrow')}</button></div><div class="filter-row" role="group" aria-label="Filter books by mood">${[['all','A little of everything'],['escape','An escape'],['comfort','Something cozy'],['thoughtful','A new perspective']].map(([v,label])=>`<button class="filter-chip ${filter===v?'selected':''}" data-filter="${v}" aria-pressed="${filter===v}">${label}</button>`).join('')}</div><div class="book-grid" id="browse-books">${filteredBooks().map(card).join('')}</div></section><section class="closing-note page-width">${icon('book')}<p>“One more chapter” is always a good idea.</p><span>MAKE A LITTLE ROOM FOR A STORY.</span></section>`, 'home');
}
function filteredBooks(){return (filter==='all'?BOOKS:BOOKS.filter(b=>b.moods.includes(filter))).slice(0,4);}

function renderQuiz(){
  const q=questions[step],current=answers[q.key];
  setPage(`<section class="quiz-page page-width"><div class="quiz-topline"><button class="text-button" data-action="back">← ${step?'Previous question':'Back to home'}</button><span class="eyebrow">A STORY FOR YOUR STUDENT LIFE</span><span class="step-counter">${String(step+1).padStart(2,'0')} <span>/ ${String(questions.length).padStart(2,'0')}</span></span></div><div class="progress-track" aria-label="Question ${step+1} of ${questions.length}"><span style="width:${(step+1)/questions.length*100}%"></span></div><div class="quiz-heading"><p class="eyebrow">${q.eyebrow}</p><h1>${q.title}</h1><p>${q.subtitle}</p></div><div class="answer-grid ${q.options.length===4?'four-options':''}" role="group" aria-label="${q.title}">${q.options.map(([v,label,desc,i])=>{const chosen=q.multiple?current.includes(v):current===v;return `<button class="answer-card ${chosen?'chosen':''}" data-answer="${v}" aria-pressed="${chosen}"><span class="answer-icon">${icon(i)}</span><strong>${label}</strong><span class="answer-description">${desc}</span><span class="answer-check" aria-hidden="true">${chosen?icon('check'):''}</span></button>`;}).join('')}</div><div class="quiz-bottom"><a class="text-button" href="#covers">Rather choose with your eyes? Pick by the cover ↗</a><button class="button primary" data-action="next" ${canContinue()?'':'disabled'}>${step===questions.length-1?'Find my books':'Next chapter'} ${icon('arrow')}</button></div></section>`, 'discover');
}
function canContinue(){const q=questions[step];return q.multiple?answers.avoid.length>0:!!answers[q.key];}
function choose(value){const q=questions[step];if(q.multiple){if(value==='none')answers.avoid=answers.avoid.includes('none')?[]:['none'];else{answers.avoid=answers.avoid.filter(v=>v!=='none');if(answers.avoid.includes(value))answers.avoid=answers.avoid.filter(v=>v!==value);else answers.avoid.push(value);}}else answers[q.key]=value;renderQuiz();document.querySelector(`[data-answer="${value}"]`)?.focus({preventScroll:true});}

function renderResult(){
  if(!results.length){renderQuiz();return;}
  const picks=results.slice(resultIndex,resultIndex+3);
  const labels=questions.filter(q=>!q.multiple).map(q=>q.options.find(o=>o[0]===answers[q.key])?.[1]).filter(Boolean);
  setPage(`<section class="result-page page-width"><div class="result-topline"><button class="text-button" data-action="restart">← Change my answers</button><a class="text-button" href="#covers">Pick by the cover ${icon('spark')}</a></div><div class="result-heading"><p class="eyebrow">A LITTLE SHELF, PICKED FOR YOUR WEEK</p><h1>A few stories for your right now.</h1><div class="preference-tags">${labels.map(label=>`<span>${esc(label)}</span>`).join('')}</div><p class="results-description">Three books to choose from. Open “Why it fits” to see the matches and trade-offs.</p></div><div class="recommendation-grid">${picks.map(({book,reasons},i)=>`<article class="recommendation-card"><span class="pick-number">PICK ${String(resultIndex+i+1).padStart(2,'0')}</span><button class="recommendation-cover" data-book="${book.id}" aria-label="Read about ${esc(book.title)}">${cover(book)}</button><p class="eyebrow result-genre">${esc(book.genres[0])} · ABOUT ${book.pages} PAGES</p><h2>${esc(book.title)}</h2><p class="recommendation-author">${esc(book.author)}</p><p class="book-description">${esc(book.description)}</p><details class="fit-details"><summary>${icon('spark')} Why it fits your week</summary><ul>${reasons.map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul></details><p class="recommendation-caveat"><strong>One thing to know</strong>${esc(book.caveat)}</p>${goodreadsLink(book)}<button class="button primary" data-save="${book.id}" ${saved.includes(book.id)?'disabled':''}>${icon(saved.includes(book.id)?'check':'bookmark')}${saved.includes(book.id)?'On your bookshelf':'I’ll read this'}</button></article>`).join('')}</div><div class="results-bottom"><p>Showing ${resultIndex+1}–${resultIndex+picks.length} of ${results.length} suggestions.</p><button class="button secondary" data-action="another">${icon('refresh')} ${resultIndex+3>=results.length?'Back to first picks':'Show three more'}</button></div><p class="edition-note">Page counts vary by edition. Covers are Lore illustrations. Follow the Goodreads links for current ratings, reviews, and editions.</p></section>`, 'discover');
}

function renderCovers(){
  setPage(`<section class="cover-gallery page-width"><div class="gallery-heading"><p class="eyebrow">A LITTLE LOVE AT FIRST SIGHT</p><h1>Pick by the cover.</h1><p>Which one catches your eye? Tap a cover to meet the story inside.</p><p class="edition-note">These are Lore’s illustrated covers. Publisher editions may look different; each book links to Goodreads.</p></div><div class="cover-gallery-grid">${BOOKS.map(book=>`<button class="cover-pick" data-book="${book.id}" aria-label="Choose ${esc(book.title)} by its cover">${cover(book)}<span>Meet this book ${icon('arrow')}</span></button>`).join('')}</div><div class="gallery-footer"><p>Want a story that fits your schedule, too?</p><button class="button primary" data-action="start">Find my next reads ${icon('arrow')}</button></div></section>`, 'covers');
}

function renderShelf(){
  const books=saved.map(id=>BOOKS.find(b=>b.id===id)).filter(Boolean);
  setPage(`<section class="my-shelf page-width"><div class="shelf-heading"><div><p class="eyebrow">STORIES YOU’VE MADE ROOM FOR</p><h1>Your next chapters.</h1><p>A little collection of books you can’t wait to meet.</p></div><button class="button primary" data-action="start">Find another story ${icon('arrow')}</button></div>${books.length?`<div class="shelf-message">${icon('bookmark')} ${books.length} ${books.length===1?'story':'stories'} waiting for you. <span>${storageAvailable?'Saved in this browser.':'Kept for this visit.'}</span></div><div class="book-grid saved-grid">${books.map(b=>`<div>${card(b)}<button class="remove-button" data-remove="${b.id}" aria-label="Remove ${esc(b.title)} from My books">Remove from shelf</button></div>`).join('')}</div>`:`<div class="empty-shelf">${icon('book')}<h2>A good story belongs here.</h2><p>Find a book that speaks to you, then choose<br>“I’ll read this” to keep it on your shelf.</p><button class="button primary" data-action="start">Let’s find your first ${icon('arrow')}</button></div>`}</section>`, 'shelf');
}

function openBook(id){const book=BOOKS.find(b=>b.id===id);if(!book)return;const isSaved=saved.includes(id);$('#dialog-content').innerHTML=`<div class="dialog-book">${cover(book)}<div><p class="eyebrow">${esc(book.genres.join(' · '))}</p><h2 id="dialog-title">${esc(book.title)}</h2><p class="dialog-author">by ${esc(book.author)}</p><p class="book-description">${esc(book.description)}</p><p class="dialog-caveat"><strong>One thing to know</strong>${esc(book.caveat)}</p><p class="edition-note">${book.pages} pages, approximately · ${book.year}<br>Cover illustrated for Lore.</p>${goodreadsLink(book)}<button class="button primary" data-save="${id}" ${isSaved?'disabled':''}>${icon(isSaved?'check':'bookmark')}${isSaved?'On your bookshelf':'I’ll read this'}</button></div></div>`;$('#book-dialog').showModal();}
function route(){const route=location.hash.slice(1);if(route==='discover'){results.length?renderResult():renderQuiz();}else if(route==='shelf')renderShelf();else if(route==='covers')renderCovers();else renderHome();focusPage();}

document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  const {action,school,moment,answer,save,book,remove,filter:chosenFilter}=button.dataset;
  if(button.classList.contains('dialog-close')){$('#book-dialog').close();return;}
  if(save){saveBook(save);return;}if(book){openBook(book);return;}
  if(remove){saved=saved.filter(id=>id!==remove);try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false;}renderShelf();main.focus({preventScroll:true});toast('Book removed from your shelf.');return;}
  if(school){startQuiz({school});return;}if(moment){startQuiz({moment});return;}if(answer){choose(answer);return;}
  if(chosenFilter){filter=chosenFilter;document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===filter;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});$('#browse-books').innerHTML=filteredBooks().map(card).join('');return;}
  if(action==='start'||action==='restart'){startQuiz();return;}
  if(action==='back'){if(step){step--;renderQuiz();focusPage();}else location.hash='home';}
  if(action==='next'&&canContinue()){if(step<questions.length-1){step++;renderQuiz();}else{results=rankBooks({...answers,avoid:answers.avoid.filter(v=>v!=='none')});resultIndex=0;renderResult();}focusPage();}
  if(action==='another'&&results.length){resultIndex=resultIndex+3>=results.length?0:resultIndex+3;renderResult();focusPage();if(resultIndex===0)toast('Back to your first picks. Change your answers to explore another kind of week.');}
});
$('#book-dialog').addEventListener('click',event=>{if(event.target===$('#book-dialog')){$('#book-dialog').close();}});
$('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
window.addEventListener('hashchange',route);
route();
