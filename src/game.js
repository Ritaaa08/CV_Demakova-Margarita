/* ============================================================
   MYSERDON — terminal port of the Java text-adventure RPG
   (original by team-rocket). Played like a styled console:
   type commands (talk, move north, take <item>, give <item>,
   map, look, inventory, help). Faithful to the original world.
   ============================================================ */

/* ---------- World data (transcribed from Game.java) ---------- */
const ITEMS = {
  laptop:   { id: 'The_Precious_Laptop', desc: 'An entire life put into one machine.' },
  math:     { id: 'Math_Book', desc: "Oh boy... believe me, don't lose it." },
  geih:     { id: 'GEIH_Card', desc: 'A burden, but also an opportunity for student deals.', key: 'La GEIH' },
  houseKey: { id: 'Key_Of_The_House', desc: "A key that opens Heaven's gates, or Hell depending on the day.", key: 'La Maison De Nulle Part' },
  pass:     { id: 'Travel_Pass', desc: 'Lets you leave (and eventually come back to) Myserdon.', key: 'La Gare De Myserdon' },
  pen:      { id: 'BIC_Red_Pen', desc: 'A red BIC pen that still works. Probability in the wild: 0.03%.' },
  sticker:  { id: 'Skatepark_Sticker', desc: 'Collector sticker. Unremovable after 2 years.' },
};
const clone = (it) => ({ ...it });

function npc(name, lines, expect, reaction, gift) {
  return { name, lines, idx: 0, expect: expect || null, reaction: reaction || null, gift: gift || null };
}

function freshWorld() {
  const z = (name, short, desc, locked, character, items) =>
    ({ name, short, desc, locked, npc: character, items: (items || []).map(clone) });

  const eva = npc('Eva', [
    'Oh hey, Kemava! You finally made it out of the tunnel?',
    'Look what I found under a dead tree: The_Precious_Laptop! The UVs here create weird magnetic fields... grab it before it disintegrates.',
    'By the way, do you have my Math_Book? I have an exam tomorrow and I lost it.',
    "Type 'give Math_Book' and I'll hand you my precious BIC_Red_Pen.",
    'After that, go west to La GEIH. The door is locked but your GEIH_Card should open it.',
  ], 'Math_Book', "AAAH my math book! You're saving me on a statistical level. Here, take my pen, it still works.", ITEMS.pen);

  const kevin = npc('Kevin', [
    'Yo Kemava! Welcome to the Skatepark De La Honte — record holder: 47 falls per minute and counting.',
    'See that GEIH_Card on the rail? Someone dropped it mid-fall. Grab it before you fall too!',
    'My laptop vanished during a kickflip-deploy. If you find it, bring it back — I can’t push my code without it.',
    "Give it to me and I'll hand you a vintage Myserdon collector sticker. (Sentimental value: infinite.)",
    'To get home? Try the Chateau de Myserdon up north. A travel pass lies there.',
  ], 'The_Precious_Laptop', 'GREAT, my laptop! Now I can push without crying in a ditch. Here, this sticker is sacred.', ITEMS.sticker);

  const marie = npc('Marie', [
    'You got into the Grande Ecole de l’Ingenuite Humaine? Not bad, only a few manage it.',
    'Here it’s silence or death. Teachers detect the smallest noise via the acoustic network (classified tech).',
    'The janitor lost his Key_Of_The_House. It opens the Residence Gagratte, south of here.',
    "Find it, give it to me, and you'll be in his good graces (and mine).",
    'To get home: see Rita at La Gare De Myserdon (south-east) with your Travel_Pass.',
  ], 'Key_Of_The_House', 'Ahhh thanks, the janitor will finally stop crashing out.');

  const matteo = npc('Matteo', [
    'Wow, La Maison De Nulle Part? No one knows where it is, not even God herself.',
    "I can't get out. You could jump the wall, but you'll dissolve.",
    'If you have a GEIH_Card, give it to me — I need it for my mysticism class.',
    'I think I saw one at the Skatepark de la Honte if you missed it.',
    'After that, go East. The Gare De Myserdon is near — unlike me, you might get out.',
  ], 'GEIH_Card', 'Ah finally, I can pass this year. Good luck with Rita.');

  const rita = npc('Rita', [
    'Welcome to La Gare De Myserdon, last platform before dimensional freedom.',
    'The train is 47 minutes late, like most GEIH projects.',
    'To board, you need your Travel_Pass. The inspector has no pity for illegal travellers.',
    "Type 'give Travel_Pass' and you'll finally go home!",
    'No pass yet? Run to the Chateau de Myserdon before the train leaves!',
  ], 'Travel_Pass', 'Great, your pass is valid. GO HOME!\nVICTORY! You’ve escaped Myserdon.');

  const gelinas = npc('Gelinas', [
    "Hmf. Another lost student. You're the 67th this week — new highs.",
    'See this Travel_Pass on the stone table? Forgotten in 1987. Take it, it might serve you.',
    "Without it you won't board the train at the Gare, and you'll wander forever, like me...",
    'The Foret des UV Perdus, west of here, hides a laptop. Eva is there.',
  ]);
  const diogo = npc('Diogo', [
    "Wake up Kemava! You're in the singularity of the 7h30 — the tunnel where every student jolts awake.",
    "Type 'map' to see Myserdon. Type 'help' for survival instructions.",
    'Your stuff was scattered by la Faille. Recover it before the last train.',
    'Start by going East: the Centre Tremal is right next door. Amit is there.',
    'Watch the map: grayed zones are locked — you’ll need keys.',
  ]);
  const amit = npc('Amit', [
    'Shalom Kemava! Welcome to the Centre Tremal, a post-2023 bankruptcy hell.',
    'Everything is closed except the paper mill. There’s a Math_Book in front of it — take it.',
    'Eva, in the Foret des UV Perdus (north), needs it for her exam.',
    'After that, hit the Skatepark: Kevin saw your GEIH_Card.',
  ]);
  const loris = npc('Loris', [
    'Welcome to the Marais des Deadlines Oubliees, where late submissions float for eternity.',
    'Nothing useful here, just regrets and refused extensions.',
    'Go East to the Cailloux de Clendy, then South to the Residence Gagratte for the Key_Of_The_House.',
    'Don’t linger: the swamp grows daily, hungry for procrastinators.',
  ]);
  const alizee = npc('Alizee', [
    "Don't touch the rocks! They're petrified student neurons, guardians of our mythology.",
    'Every rock is a sacrifice to a tough class.',
    'Nothing to pick up here. Go South: the Residence Gagratte hides the Key_Of_The_House.',
  ]);
  const danny = npc('Danny', [
    'Welcome to the Y-fait-moche Plage. Officially the ugliest beach in the multiverse.',
    'Gray sand, gray water, gray soul. You see the pattern.',
    'You lost time coming here.',
  ]);
  const rui = npc('Rui', [
    'Welcome to the Residence Gagratte. Cheap rent, unstable power, non-existent WIFI.',
    'There’s a Key_Of_The_House on the table. Its owner is looking for it.',
    'Something is calling you West. What could it be?',
  ]);

  return [
    [ z('La GEIH', 'GEIH', 'The engineering school. The halls smell like sweat and anxiety.', true, marie, []),
      z('La Foret Des UV Perdus', 'Foret-UV', 'A dark forest where non-valid UVs come to die.', false, eva, [ITEMS.laptop]),
      z('Le Chateau de Myserdon', 'Chateau', "An old building that thinks it's a castle.", false, gelinas, [ITEMS.pass]) ],
    [ z('Le Tunnel Sans Fin du 7h30', 'Tunnel', 'Everyone walking through this tunnel magically awakes.', false, diogo, []),
      z('Centre Tremal', 'C.Tremal', 'Used to be a mall, before it went bankrupt.', false, amit, [ITEMS.math]),
      z('Le Skatepark De La Honte', 'Skate', 'Boards, concrete, and too many falls per minute.', false, kevin, [ITEMS.geih]) ],
    [ z('Le Marais Des Deadlines Oubliees', 'Marais', 'A swamp that grows after every missed deadline. You are not alone.', false, loris, []),
      z('Les Cailloux De Clendy', 'Cailloux', 'Mysterious rocks. DO NOT MOVE THEM, some say...', false, alizee, []),
      z('La Y-Fait-Moche Plage', 'Plage', 'The ugliest beach in the world. It rains here every day.', false, danny, []) ],
    [ z('La Maison De Nulle Part', 'Maison', 'No one knows where it is, yet here you are.', true, matteo, []),
      z('Residence Gagratte', 'Residence', 'Rents too high, broke students, the usual.', false, rui, [ITEMS.houseKey]),
      z('La Gare De Myserdon', 'Gare', 'The train station — maybe your way out of here?', true, rita, []) ],
  ];
}

/* ---------- State ---------- */
const ROWS = 4, COLS = 3;
const DIRS = { north: [-1, 0], south: [1, 0], west: [0, -1], east: [0, 1] };
let grid, player, won;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const zoneAt = (r, c) => (r >= 0 && r < ROWS && c >= 0 && c < COLS ? grid[r][c] : null);
const here = () => grid[player.row][player.col];
const hasKeyFor = (zone) => player.inv.find((i) => i.key === zone.name);

/* ---------- Terminal output (typewriter queue) ---------- */
let outEl, inEl, formEl, queue = [], typing = false;

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function highlight(safe) {
  return safe
    .replace(/([A-Z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+)/g, '<span class="t-item">$1</span>')
    .replace(/(VICTORY)/g, '<span class="t-good">$1</span>');
}
const scrollEnd = () => { outEl.scrollTop = outEl.scrollHeight; };

function print(text, cls, instant) {
  queue.push({ text, cls: cls || '', instant: !!instant });
  pump();
}
function pump() {
  if (typing) return;
  const item = queue.shift();
  if (!item) return;
  typing = true;
  const line = document.createElement('div');
  line.className = 'term__line' + (item.cls ? ' ' + item.cls : '');
  outEl.appendChild(line);
  if (reduce || item.instant) {
    line.innerHTML = highlight(escapeHtml(item.text));
    scrollEnd(); typing = false; pump();
    return;
  }
  let i = 0;
  const caret = document.createElement('span');
  caret.className = 'term__caret';
  line.appendChild(caret);
  const speed = item.text.length > 110 ? 5 : 14;
  const tick = () => {
    if (i < item.text.length) {
      caret.insertAdjacentText('beforebegin', item.text[i]);
      i++; scrollEnd();
      setTimeout(tick, speed);
    } else {
      caret.remove();
      line.innerHTML = highlight(escapeHtml(item.text));
      scrollEnd(); typing = false; pump();
    }
  };
  tick();
}

/* ---------- Commands ---------- */
function cmdHelp() {
  print('Commands:', 't-title', true);
  [
    ['look', 'describe where you are'],
    ['move <dir>', 'go north / south / east / west  (or just: n s e w)'],
    ['map', 'show the map of Myserdon'],
    ['talk', 'talk to the character here'],
    ['take <item>', 'pick up an item on the ground'],
    ['give <item>', 'give an item to the character here'],
    ['inspect <item>', 'read an item in your inventory'],
    ['inventory', 'list what you carry  (or: inv, i)'],
    ['clear', 'clear the screen   ·   restart : new game'],
  ].forEach(([c, d]) => print('  ' + c.padEnd(15) + d, 't-sys', true));
}

function cmdLook() {
  const z = here();
  print(z.name, 't-title', true);
  print(z.desc, 't-sys', true);
  let exits = [];
  for (const [d, [dr, dc]] of Object.entries(DIRS)) {
    const n = zoneAt(player.row + dr, player.col + dc);
    if (n) exits.push(`${d} -> ${n.short}${n.locked ? ' [locked]' : ''}`);
  }
  print('exits: ' + exits.join('  |  '), 't-cmd', true);
  print('here: ' + (z.npc ? z.npc.name : 'nobody around'), '', true);
  print('on the ground: ' + (z.items.length ? z.items.map((i) => i.id).join(', ') : 'nothing'), '', true);
}

function cmdMove(dir) {
  const full = { n: 'north', s: 'south', e: 'east', w: 'west', north: 'north', south: 'south', east: 'east', west: 'west' }[dir];
  if (!full) { print('Move where? Try: move north / south / east / west.', 't-warn', true); return; }
  const [dr, dc] = DIRS[full];
  const z = zoneAt(player.row + dr, player.col + dc);
  if (!z) { print("You can't go that way.", 't-warn', true); return; }
  if (z.locked) {
    const key = hasKeyFor(z);
    if (!key) { print(`${z.name} is locked. You need the right key (talk to people for the trail).`, 't-warn', true); return; }
    z.locked = false;
    print(`You used ${key.id} to unlock ${z.name}.`, 't-good');
  }
  player.row += dr; player.col += dc;
  print(`You move ${full} to ${z.name}.`, '');
  print(z.desc, 't-sys');
  if (z.npc) print(`${z.npc.name} is here. (type 'talk')`, 't-sys', true);
  if (z.items.length) print(`On the ground: ${z.items.map((i) => i.id).join(', ')}`, 't-sys', true);
}

function cmdTalk() {
  const z = here();
  if (!z.npc) { print('There is no one to talk to here.', 't-warn', true); return; }
  const n = z.npc;
  print(`${n.name}: ${n.lines[n.idx]}`, 't-npc');
  n.idx = (n.idx + 1) % n.lines.length;
}

function findItem(list, name) {
  const q = name.toLowerCase();
  return list.find((i) => i.id.toLowerCase() === q)
    || list.find((i) => i.id.toLowerCase().startsWith(q))
    || list.find((i) => i.id.toLowerCase().includes(q));
}

function cmdTake(name) {
  if (!name) { print('Take what? Usage: take <item>', 't-warn', true); return; }
  const z = here();
  const it = findItem(z.items, name);
  if (!it) { print(`There is no "${name}" here.`, 't-warn', true); return; }
  z.items.splice(z.items.indexOf(it), 1);
  player.inv.push(it);
  print(`You took ${it.id}. (${player.inv.length} object(s) in inventory.)`, 't-good');
}

function cmdGive(name) {
  if (!name) { print('Give what? Usage: give <item>', 't-warn', true); return; }
  const z = here();
  if (!z.npc) { print('There is no one to give to here.', 't-warn', true); return; }
  const it = findItem(player.inv, name);
  if (!it) { print(`You don't have "${name}" in your inventory.`, 't-warn', true); return; }
  const n = z.npc;
  if (n.expect && it.id.toLowerCase() === n.expect.toLowerCase()) {
    player.inv.splice(player.inv.indexOf(it), 1);
    n.reaction.split('\n').forEach((l) => print(`${n.name}: ${l}`, 't-npc'));
    if (n.gift) { player.inv.push(clone(n.gift)); print(`${n.name} gave you ${n.gift.id}.`, 't-good'); }
    if (n.reaction.includes('VICTORY')) { won = true; setTimeout(victory, 700); }
  } else {
    print(`${n.name} doesn't know what to do with ${it.id}.`, 't-warn');
  }
}

function cmdInspect(name) {
  if (!name) { print('Inspect what? Usage: inspect <item>', 't-warn', true); return; }
  const it = findItem(player.inv, name);
  if (!it) { print(`You don't carry "${name}".`, 't-warn', true); return; }
  print(`${it.id} — ${it.desc}${it.key ? ' (a key for ' + it.key + ')' : ''}`, '', true);
}

function cmdInventory() {
  if (!player.inv.length) { print('Inventory is empty. Explore and pick things up!', 't-sys', true); return; }
  print(`Inventory (${player.inv.length}):`, 't-title', true);
  player.inv.forEach((i) => print('  - ' + i.id, '', true));
}

function cmdMap() {
  const W = 10;
  const line = '+' + Array(COLS).fill('-'.repeat(W)).join('+') + '+';
  const out = [line];
  for (let r = 0; r < ROWS; r++) {
    let row = '|';
    for (let c = 0; c < COLS; c++) {
      const z = grid[r][c];
      const mark = (r === player.row && c === player.col) ? '*' : (z.locked ? '#' : ' ');
      let label = (mark + z.short).slice(0, W);
      row += ' ' + label.padEnd(W - 1) + '|';
    }
    out.push(row);
    out.push(line);
  }
  print(out.join('\n'), 't-cmd t-map', true);
  print('* = you    # = locked', 't-sys', true);
}

/* ---------- REPL ---------- */
function runCommand(raw) {
  if (won && !/^(restart|reset|clear|help)\b/i.test(raw)) {
    print('You already escaped Myserdon! Type "restart" to play again.', 't-sys', true);
    return;
  }
  const tokens = raw.trim().split(/\s+/);
  let verb = tokens[0].toLowerCase();
  const item = tokens.slice(1).join('_'); // forgiving: "math book" -> "math_book"
  const dir = { n: 1, s: 1, e: 1, w: 1, north: 1, south: 1, east: 1, west: 1 };
  if (dir[verb]) { cmdMove(verb); return; }
  switch (verb) {
    case 'help': case 'h': case 'commands': case '?': cmdHelp(); break;
    case 'look': case 'l': case 'where': cmdLook(); break;
    case 'move': case 'go': cmdMove((tokens[1] || '').toLowerCase()); break;
    case 'map': case 'm': cmdMap(); break;
    case 'talk': case 't': case 'speak': cmdTalk(); break;
    case 'take': case 'get': case 'grab': cmdTake(item); break;
    case 'give': case 'offer': cmdGive(item); break;
    case 'inspect': case 'examine': case 'read': cmdInspect(item); break;
    case 'inventory': case 'inv': case 'i': case 'bag': cmdInventory(); break;
    case 'use': cmdGive(item) /* simplest: use ~ give to character */; break;
    case 'clear': case 'cls': outEl.innerHTML = ''; break;
    case 'restart': case 'reset': start(); break;
    case 'quit': case 'exit': print('There is no escape but the train. Type "help".', 't-sys', true); break;
    default: print(`Unknown command: "${verb}". Type "help".`, 't-warn', true);
  }
}

/* ---------- Boot / start ---------- */
function start() {
  grid = freshWorld();
  player = { row: 1, col: 0, inv: [] };
  won = false;
  queue = []; typing = false;
  outEl.innerHTML = '';
  const boot = [
    ['$ java -jar myserdon.jar', 't-cmd'],
    ['[ok] booting Myserdon engine…', 't-sys'],
    ['[ok] loaded 12 zones · 12 characters', 't-sys'],
    ['', ''],
    ['MYSERDON — a text adventure', 't-title'],
    ['You wake up in Le Tunnel Sans Fin du 7h30, Kemava.', ''],
    ['Goal: gather your things and give your Travel_Pass to Rita at the station.', ''],
    ["Tip: type 'talk' to talk to Diogo, or 'help' for commands.", 't-sys'],
    ['', ''],
  ];
  boot.forEach(([t, c]) => print(t, c, reduce));
}

/* ---------- Victory overlay ---------- */
function victory() {
  const ov = document.createElement('div');
  ov.className = 'game-overlay';
  ov.innerHTML = `
    <div class="game-overlay__card">
      <p class="kicker" style="justify-content:center">Myserdon</p>
      <h2 class="game-overlay__title">victory!</h2>
      <p>You gave your Travel_Pass to Rita and caught the train. You’ve escaped Myserdon. 🚂</p>
      <button class="btn btn-primary" id="game-replay" style="justify-content:center;margin-top:10px">Play again</button>
    </div>`;
  document.body.appendChild(ov);
  ov.querySelector('#game-replay').addEventListener('click', () => { ov.remove(); start(); inEl.focus(); });
}

/* ---------- Build shell ---------- */
const history = [];
let hIdx = 0;

function build() {
  const root = document.getElementById('game-root');
  if (!root) return;
  root.innerHTML = `
    <div class="term">
      <div class="term__bar">
        <span class="term__dot term__dot--r"></span>
        <span class="term__dot term__dot--y"></span>
        <span class="term__dot term__dot--g"></span>
        <span class="term__title">kemava@myserdon: ~/Myserdon.java</span>
        <button class="term__btn" id="term-restart" title="Restart">↻ restart</button>
      </div>
      <div class="term__body" id="term-out" aria-live="polite"></div>
      <form class="term__form" id="term-form" autocomplete="off">
        <span class="term__prompt">›</span>
        <input class="term__in" id="term-in" type="text" spellcheck="false" autocomplete="off"
               aria-label="Game command" placeholder="type a command… (try: help)" />
      </form>
      <div class="term__hint">
        <button data-cmd="look">look</button>
        <button data-cmd="talk">talk</button>
        <button data-cmd="move ">move…</button>
        <button data-cmd="take ">take…</button>
        <button data-cmd="give ">give…</button>
        <button data-cmd="map">map</button>
        <button data-cmd="inventory">inventory</button>
        <button data-cmd="help">help</button>
      </div>
    </div>`;

  outEl = document.getElementById('term-out');
  inEl = document.getElementById('term-in');
  formEl = document.getElementById('term-form');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = inEl.value.trim();
    if (!raw) return;
    history.push(raw); hIdx = history.length;
    inEl.value = '';
    print('› ' + raw, 't-cmd', true);
    runCommand(raw);
    inEl.focus();
  });

  inEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { if (hIdx > 0) { hIdx--; inEl.value = history[hIdx] || ''; e.preventDefault(); } }
    else if (e.key === 'ArrowDown') { if (hIdx < history.length) { hIdx++; inEl.value = history[hIdx] || ''; } }
  });

  root.querySelectorAll('.term__hint button').forEach((b) => {
    b.addEventListener('click', () => {
      const c = b.dataset.cmd;
      if (c.endsWith(' ')) { inEl.value = c; inEl.focus(); }       // needs an argument → let user type it
      else { inEl.value = c; formEl.requestSubmit(); }              // standalone → run it
    });
  });

  document.getElementById('term-restart').addEventListener('click', () => { start(); inEl.focus(); });

  // focus input when clicking anywhere in the terminal body
  outEl.addEventListener('click', () => inEl.focus());

  start();
}

build();
