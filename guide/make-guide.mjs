// Builds a personalized, illustrated install guide from guide/template.html.
//
//   node guide/make-guide.mjs --server https://whatsapp-inbox.<you>.workers.dev \
//        [--owner "Dana"] [--for owner|friend] [--retention 30] [--out guide/out] [--inline]
//
//   --for owner   (default) guide for the person who deployed the server: includes an admin section.
//   --for friend  guide for someone the owner invites: "ask <owner> for your link".
//   --inline      one self-contained index.html with images embedded (easy to share as a single file).
//                 Without it, index.html + img/ are written side by side (best for publishing as an Artifact).
//
// The guide never contains tokens, setup links, MCP URLs or the admin password. Only the public server URL.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateGuideToHebrew } from './hebrew.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, [])
);

const server = String(args.server || '').replace(/\/+$/, '');
if (!/^https:\/\/[^/]+$/.test(server)) {
  console.error('usage: node guide/make-guide.mjs --server https://whatsapp-inbox.<you>.workers.dev [--owner Name] [--for owner|friend] [--retention 30] [--inline]');
  process.exit(1);
}
if (/\/(mcp|setup)\b|[#?]|\bin_|\bmcp_/.test(server)) {
  console.error('Refusing: --server must be the bare server origin, never a setup link or connector URL.');
  process.exit(1);
}
const owner = String(args.owner || '').trim();
const mode = args.for === 'friend' ? 'friend' : 'owner';
const days = Number(args.retention) > 0 ? Math.round(Number(args.retention)) : 30;
const out = args.out ? String(args.out) : join(HERE, 'out');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const host = server.replace(/^https:\/\//, '');
const who = owner ? esc(owner) : 'האדם שהזמין אותך';

const V =
  mode === 'owner'
    ? {
        TITLE: 'מדריך התקנה – WhatsApp Inbox',
        EYEBROW: owner ? `מדריך ההתקנה של ${esc(owner)} · כ-10 דקות` : 'מדריך התקנה · כ-10 דקות',
        OWNER_POSSESSIVE: 'your',
        SETUP_LINK_SOURCE: 'צור אותו בדף הניהול שלך (ראה "השרת שלך" בהמשך), כקישור או כקוד QR.',
        STEP1_TEXT:
          'ההגדרה מתבצעת באמצעות קישור אישי (או קוד QR). כבעל השרת, צור לעצמך קישור בדף הניהול: פתח <code>' +
          esc(host) +
          '/admin</code>, התחבר באמצעות סיסמת הניהול, הוסף משתמש עם שמך ולחץ על <b>יצירת משתמש</b>. הקישור מוצג פעם אחת בלבד, לכן פתח אותו מיד בטלפון או שמור אותו במקום פרטי.',
        LEAK_ACTION: 'פתח את דף הניהול ולחץ על <b>קישור חדש</b> ליד המשתמש.',
        LOST_LINK_ACTION: 'פתח את דף הניהול ולחץ על <b>קישור חדש</b> ליד המשתמש.',
        DELETE_ACTION: 'מחק את המשתמש בדף הניהול שלך.',
        WHO_CAN_SEE:
          'השרת פועל בחשבון Cloudflare <b>שלך</b>, והמידע מוצפן בזמן האחסון. כל מי שיש לו גישה לחשבון Cloudflare הזה יכול מבחינה טכנית לקרוא את ההודעות, כולל הודעות של חברים שתזמין. חשוב ליידע אותם לפני ההתקנה.',
        ADMIN_SECTION: `<section id="server"><div class="wrap">
  <div class="sec-h"><h2>השרת שלך</h2></div>
  <p class="sec-sub">פרסת שרת WhatsApp Inbox משלך. אלה הכתובות שתצטרך. אף אחת מהן אינה סודית בפני עצמה.</p>
  <div class="need" style="grid-template-columns:repeat(3,1fr)">
    <div><div class="ic">🌐</div><h3>שרת</h3><p><code>${esc(host)}</code></p></div>
    <div><div class="ic">🛠️</div><h3>דף ניהול</h3><p><code>${esc(host)}/admin</code><br>יצירת משתמשים וקישורי הגדרה. הסיסמה נמצאת בקובץ הסודות המקומי שלך, ולעולם אינה מופיעה במדריך הזה.</p></div>
    <div><div class="ic">📦</div><h3>הורדת האפליקציה</h3><p><code>${esc(host)}/wa-forwarder.apk</code></p></div>
  </div>
  <div class="note info" style="margin-top:14px"><b>הזמנת חברים</b>צור משתמש לכל אדם בדף הניהול ושלח לו את קישור ההגדרה האישי שלו (הוא מוצג פעם אחת בלבד). לאחר מכן שלח לו את גרסת החברים של המדריך, שאפשר ליצור עם <code>--for friend</code>.</div>
</div></section>`,
      }
    : {
        TITLE: 'מדריך התקנה – WhatsApp Inbox',
        EYEBROW: 'מדריך התקנה · כ-10 דקות',
        OWNER_POSSESSIVE: 'your',
        SETUP_LINK_SOURCE: `את הקישור או קוד ה-QR מקבלים מ${who}.`,
        STEP1_TEXT: `ההגדרה מתבצעת באמצעות קישור אישי (או קוד QR) ש${who} יוצר עבורך. עדיין אין לך קישור? בקש אותו לפני שמתחילים. בלי הקישור אפשר להתקין את האפליקציה, אך אי אפשר לחבר אותה לשרת.`, 
        LEAK_ACTION: `בקש מ${who} קישור חדש.`, 
        LOST_LINK_ACTION: `בקש מ${who} קישור חדש.`, 
        DELETE_ACTION: `בקש מ${who} למחוק את המשתמש שלך.`, 
        WHO_CAN_SEE: `השרת פועל בחשבון Cloudflare של ${who}, והמידע מוצפן בזמן האחסון. למרות זאת, <b>${who} יכול מבחינה טכנית לגשת להודעות</b>. חשוב שתהיה מודע לכך.`, 
        ADMIN_SECTION: '',
      };
Object.assign(V, { RETENTION_DAYS: String(days), SERVER_URL: esc(server), SERVER_HOST: esc(host) });

let html = readFileSync(join(HERE, 'template.html'), 'utf8').replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => {
  if (!(k in V)) throw new Error('unknown placeholder ' + m);
  return V[k];
});
html = translateGuideToHebrew(html);

mkdirSync(out, { recursive: true });
const imgDir = join(ROOT, 'docs', 'img');
const images = readdirSync(imgDir).filter((f) => f.endsWith('.webp'));
const files = [...images.map((f) => [f, join(imgDir, f)]), ['icon.png', join(ROOT, 'public', 'icon.png')]];
if (args.inline) {
  const mime = { '.webp': 'image/webp', '.png': 'image/png' };
  for (const [name, path] of files) {
    const data = `data:${mime[extname(name)]};base64,${readFileSync(path).toString('base64')}`;
    html = html.split(`img/${name}`).join(data);
  }
} else {
  mkdirSync(join(out, 'img'), { recursive: true });
  for (const [name, path] of files) copyFileSync(path, join(out, 'img', name));
}
writeFileSync(join(out, 'index.html'), html);
console.log(`guide written: ${join(out, 'index.html')}${args.inline ? ' (self-contained)' : ' + img/'}`);
