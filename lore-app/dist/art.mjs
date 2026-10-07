export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function sprig(className = '') {
  return `<svg class="${className}" viewBox="0 0 150 240" fill="none" aria-hidden="true"><path d="M30 229C72 174 59 84 118 11" stroke="currentColor" stroke-width="2"/>${Array.from({length:8},(_,i)=>{const y=39+i*23,x=103-i*7;return `<path d="M${x} ${y+21}Q${x-45} ${y+6} ${x-36} ${y-13}Q${x-7} ${y-11} ${x} ${y+21}Z" fill="currentColor"/><path d="M${x-3} ${y+30}Q${x+37} ${y+20} ${x+36} ${y-1}Q${x+10} ${y+2} ${x-3} ${y+30}Z" fill="currentColor"/>`;}).join('')}</svg>`;
}

export function icon(name, cls = '') {
  const paths = {
    arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',
    book:'<path d="M12 6v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2z"/>',
    leaf:'<path d="M5 20 18 7M6 17C1 5 11 3 21 3c0 11-3 18-15 14z"/>',
    spark:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7z"/>',
    moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12z"/>',
    heart:'<path d="M20.5 5.5a5 5 0 0 0-8.5 2 5 5 0 0 0-8.5-2C-1 10 7 17 12 21c5-4 13-11 8.5-15.5z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    refresh:'<path d="M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 13-3l2 3M4 16l2 3a8 8 0 0 0 13-3"/>',
    coffee:'<path d="M4 8h12v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 9h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3"/>',
    mountain:'<path d="m2 20 7-14 5 9 3-6 5 11zM6 12l3 2 3-2"/>',
  };
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
}

export function cover(book, className = '') {
  const p=book.palette;
  const motif={
    botanical:`<g fill="none" stroke="${p.accent}" stroke-width="2"><path d="M55 286q62-100 121-125M78 269q-15-44-33-48 0 31 33 48m20-26q-10-41-24-43 0 28 24 43m25-26q-8-36-22-40 0 25 22 40m-37 42q39 7 49-13-28-7-49 13m28-32q40 5 51-16-26-3-51 16m27-26q40 5 53-18-31-1-53 18"/><path d="M137 298q9-43 40-62m-24 33q-24-16-26-31 22 1 26 31m7-14q30 0 32-16-18-1-32 16"/></g><circle cx="174" cy="177" r="18" fill="${p.accent}" opacity=".6"/>`,
    moon:`<circle cx="140" cy="205" r="55" fill="${p.accent}"/><circle cx="166" cy="187" r="49" fill="${p.background}"/><g fill="${p.ink}"><circle cx="58" cy="173" r="2"/><circle cx="199" cy="227" r="2"/><circle cx="76" cy="252" r="2"/><path d="m194 153 3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g><path d="M20 288q35-45 77-12t126-8v32H20z" fill="${p.accent}" opacity=".5"/>`,
    mountains:`<circle cx="166" cy="169" r="29" fill="${p.accent}"/><path d="m15 290 70-130 60 115 33-77 62 100z" fill="${p.ink}" opacity=".7"/><path d="m54 218 31-58 30 58-31-16z" fill="${p.accent}"/><path d="m15 297 59-50 59 50 35-43 60 43" fill="none" stroke="${p.accent}" stroke-width="3"/>`,
    window:`<path d="M63 294V205a62 62 0 0 1 124 0v89z" fill="${p.accent}"/><path d="M73 286V207a52 52 0 0 1 104 0v79z" fill="${p.background}"/><path d="M125 155v138m-56-71h113" stroke="${p.accent}" stroke-width="7"/><circle cx="148" cy="187" r="15" fill="${p.ink}" opacity=".7"/><path d="M76 272q50-48 99 2v11H76z" fill="${p.ink}" opacity=".6"/>`,
    waves:`<circle cx="126" cy="188" r="37" fill="${p.accent}"/>${[0,1,2,3].map(i=>`<path d="M16 ${230+i*21}q26-22 52 0t52 0t52 0t52 0" fill="none" stroke="${i%2?p.ink:p.accent}" stroke-width="6" opacity=".85"/>`).join('')}`,
    sun:`<g stroke="${p.accent}" stroke-width="3">${Array.from({length:16},(_,i)=>`<path transform="rotate(${i*22.5} 125 227)" d="M125 148v27"/>`).join('')}</g><circle cx="125" cy="227" r="39" fill="${p.accent}"/><circle cx="125" cy="227" r="27" fill="none" stroke="${p.background}"/>`,
    stars:`<g fill="${p.accent}">${[[120,210,45],[58,265,20],[190,168,14],[174,284,25],[56,170,13]].map(([x,y,r])=>`<path d="M${x} ${y-r}q3 ${r-3} ${r} ${r}q-${r-3} 3-${r} ${r}q-3-${r-3}-${r}-${r}q${r-3}-3 ${r}-${r}Z"/>`).join('')}</g>`,
  }[book.motif] || '';
  const words=book.title.split(' '), lines=[]; let line='';
  for(const word of words){if((line+' '+word).trim().length>17&&line){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);
  const size=lines.length>3?21:25;
  return `<div class="book-cover ${className}" style="--cover-color:${p.background}"><svg viewBox="0 0 240 350" role="img" aria-label="Illustrated cover for ${escapeHTML(book.title)}"><defs><pattern id="grain-${book.id}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".55" fill="${p.ink}" opacity=".1"/><circle cx="5" cy="6" r=".45" fill="${p.ink}" opacity=".15"/></pattern></defs><rect width="240" height="350" fill="${p.background}"/><rect x="14" y="12" width="213" height="324" rx="2" fill="none" stroke="${p.accent}" stroke-opacity=".55"/><path d="M8 0v350" stroke="#000" stroke-opacity=".17" stroke-width="8"/><path d="M15 0v350" stroke="#fff" stroke-opacity=".12"/><text x="123" y="32" fill="${p.ink}" text-anchor="middle" font-family="Georgia,serif" font-size="8" letter-spacing="3">THE LORE COLLECTION</text>${lines.map((l,i)=>`<text x="124" y="${66+i*(size+2)}" fill="${p.ink}" text-anchor="middle" font-family="Georgia,serif" font-size="${size}" font-weight="500">${escapeHTML(l)}</text>`).join('')}${motif}<text x="124" y="325" fill="${p.ink}" text-anchor="middle" font-family="Georgia,serif" font-size="11" letter-spacing="1.1">${escapeHTML(book.author.toUpperCase())}</text><rect width="240" height="350" fill="url(#grain-${book.id})"/></svg></div>`;
}
