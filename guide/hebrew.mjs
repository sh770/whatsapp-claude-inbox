// מתרגם את מדריך ההתקנה שנוצר אוטומטית לעברית ושומר על מבנה ה-HTML והקישורים.
export function translateGuideToHebrew(source) {
  let html = source;

  // החלפת כותרות, הוראות וטקסטים גלויים בלי לשנות כתובות, פקודות או שמות מוצרים.
  const translations = [
    ["<div lang=\"en\">", "<div lang=\"he\" dir=\"rtl\">"],
    ["WhatsApp messages, <em>straight to Claude</em>", "הודעות WhatsApp, <em>ישירות ל-Claude</em>"],
    ["A small Android app reads WhatsApp notifications and sends them to {{OWNER_POSSESSIVE}} private server. From then on you can ask Claude \"what did people write to me today?\", and the messages on your phone stay unread.", "אפליקציית Android קטנה קוראת את ההתראות של WhatsApp ושולחת אותן לשרת הפרטי שלך. לאחר מכן אפשר לשאול את Claude: \"מה כתבו לי היום ב-WhatsApp?\" — וההודעות בטלפון נשארות לא נקראות."],
    ["No blue ticks", "בלי סימון קריאה כחול"],
    ["Auto-deleted after {{RETENTION_DAYS}} days", "נמחק אוטומטית לאחר {{RETENTION_DAYS}} ימים"],
    ["Use at your own discretion and risk.", "השימוש באחריותך ועל פי שיקול דעתך."],
    ["WhatsApp Inbox is an experimental open-source project, provided as is, with no warranty of any kind. Installing and using it is entirely your own responsibility, including bypassing Android protections and storing messages written by other people on a server. Make sure your use complies with your local laws and with WhatsApp's and Google's terms.", "WhatsApp Inbox הוא פרויקט קוד פתוח ניסיוני, המסופק כמות שהוא וללא אחריות מכל סוג. ההתקנה והשימוש בו הם באחריותך בלבד, לרבות שינוי הגדרות ההגנה של Android ושמירת הודעות שכתבו אנשים אחרים בשרת. יש לוודא שהשימוש תואם את החוק המקומי ואת תנאי השימוש של WhatsApp ושל Google."],
    ["Start the guide →", "מתחילים במדריך ←"],
    ["Download the app", "הורדת האפליקציה"],
    ["Before you start", "לפני שמתחילים"],
    ["Four things to have at hand.", "ארבעה דברים שכדאי להכין מראש."],
    ["Your personal setup link", "קישור ההגדרה האישי שלך"],
    ["It is yours alone: never forward it.", "הקישור אישי שלך בלבד — אין להעביר אותו לאחרים."],
    ["An Android phone", "טלפון Android"],
    ["The phone with WhatsApp on it. iPhone is not supported: iOS does not let apps read notifications.", "הטלפון שבו מותקן WhatsApp. iPhone אינו נתמך, מכיוון ש-iOS אינו מאפשר לאפליקציות לקרוא התראות."],
    ["A Claude account", "חשבון Claude"],
    ["On claude.ai, ideally on a computer. You add the connection there once.", "באתר claude.ai, רצוי ממחשב. את החיבור מגדירים שם פעם אחת."],
    ["Ten minutes", "עשר דקות"],
    ["Most of it goes on three Android permissions. This guide shows each one.", "רוב הזמן מוקדש למתן שלוש הרשאות ב-Android. המדריך מסביר כל אחת מהן."],
    ["How it works", "איך זה עובד"],
    ["The app never opens WhatsApp and never logs in to your account. It only sees what appears in the notification, exactly like your lock screen.", "האפליקציה אינה פותחת את WhatsApp ואינה מתחברת לחשבון שלך. היא קוראת רק את התוכן שמופיע בהתראה, בדיוק כפי שהוא מופיע במסך הנעילה."],
    ["Your phone", "הטלפון שלך"],
    ["WA Forwarder reads the notification the moment it arrives. The message itself is never opened.", "WA Forwarder קוראת את ההתראה ברגע שהיא מתקבלת. ההודעה עצמה אינה נפתחת."],
    ["Private server", "שרת פרטי"],
    ["Stored under your personal key on", "ההודעות נשמרות באמצעות המפתח האישי שלך בשרת"],
    ["and deleted automatically after {{RETENTION_DAYS}} days.", "ונמחקות אוטומטית לאחר {{RETENTION_DAYS}} ימים."],
    ["Through a personal connector, Claude can search, summarize and show messages when you ask.", "באמצעות חיבור אישי, Claude יכול לחפש הודעות, לסכם אותן ולהציג אותן לפי בקשתך."],
    ["Install, step by step", "התקנה — שלב אחר שלב"],
    ["Step 1 first, steps 2 to 10 on the phone, steps 11 and 12 on a computer. In every screenshot, the orange frame marks what to tap.", "מתחילים בשלב 1. את שלבים 2–10 מבצעים בטלפון, ואת שלבים 11–12 במחשב. בכל צילום מסך, המסגרת הכתומה מסמנת על מה ללחוץ."],
    ["Steps", "שלבים"],
    ["Personal setup link 🔑", "קישור הגדרה אישי 🔑"],
    ["Open the link", "פתיחת הקישור"],
    ["Allow installs", "אישור התקנת אפליקציות"],
    ["Get past Play Protect", "מעבר להגנת Play Protect"],
    ["Install", "התקנה"],
    ["One-tap setup", "הגדרה בלחיצה אחת"],
    ["Notification access", "גישה להתראות"],
    ["Battery", "סוללה"],
    ["Test message", "הודעת בדיקה"],
    ["Connect Claude", "חיבור Claude"],
    ["Ask Claude", "שואלים את Claude"],
    ["Part A · on the phone", "חלק א׳ · בטלפון"],
    ["Get your personal setup link", "קבלת קישור ההגדרה האישי"],
    ["🔑 Required first", "🔑 חובה להתחיל כאן"],
    ["The link is personal", "הקישור אישי"],
    ["It ties your phone and your Claude to your private inbox on the server. Don't share it with anyone.", "הקישור מחבר את הטלפון ואת Claude שלך לתיבת ההודעות הפרטית שלך בשרת. אין לשתף אותו עם אף אחד."],
    ["Open the setup link on the phone", "פתיחת קישור ההגדרה בטלפון"],
    ["Open your setup link <b>on the phone itself</b>, in Chrome. If you have it as a QR code, scan it with the camera.", "פתח את קישור ההגדרה <b>בטלפון עצמו</b>, באמצעות Chrome. אם קיבלת קוד QR, סרוק אותו במצלמה."],
    ["The page greets you by name and has two parts: the app and Claude. Tap <b>Download the app</b>.", "הדף יקבל את פניך ויציג שני חלקים: האפליקציה ו-Claude. לחץ על <b>הורדת האפליקציה</b>."],
    ["Keep this page open", "השאר את הדף פתוח"],
    ["You'll come back to it in step 7. The link contains your personal key, so don't share it.", "נחזור לדף הזה בשלב 7. הקישור מכיל את המפתח האישי שלך, ולכן אין להעביר אותו לאחרים."],
    ["Confirm the download", "אישור ההורדה"],
    ["Chrome warns about every install file that doesn't come from Google Play. It's a generic warning, not something specific to this app.", "Chrome מציג אזהרה לגבי כל קובץ התקנה שאינו מגיע מ-Google Play. זו אזהרה כללית, ולא אזהרה ייחודית לאפליקציה הזאת."],
    ["Download anyway", "הורדה בכל זאת"],
    ["Open", "פתיחה"],
    ["Let Chrome install apps", "מתן הרשאה ל-Chrome להתקין אפליקציות"],
    ["The first time, Android asks whether Chrome may install apps. Tap <b>Settings</b>, turn on <b>Allow from this source</b>, and go back.", "בפעם הראשונה Android שואל אם Chrome רשאי להתקין אפליקציות. לחץ על <b>הגדרות</b>, הפעל את <b>אפשר ממקור זה</b> וחזור למסך הקודם."],
    ["Didn't see this screen?", "לא הופיע המסך הזה?"],
    ["You already allowed it before. Go on to the next step.", "כנראה שכבר אישרת זאת בעבר. אפשר להמשיך לשלב הבא."],
    ["Get past Google Play Protect", "מעבר לחסימת Google Play Protect"],
    ["Play Protect blocks apps that don't come from the store and ask to read notifications. That's exactly what this app does, so the block is expected. Two ways through:", "Play Protect עשוי לחסום אפליקציות שאינן מגיעות מהחנות ומבקשות לקרוא התראות. זה בדיוק מה שהאפליקציה עושה, ולכן החסימה צפויה. יש שתי דרכים להמשיך:"],
    ["The short way:", "הדרך הקצרה:"],
    ["in the block dialog, tap <b>More details</b>. If you see <b>Install anyway</b>, tap it and go to step 6.", "בחלון החסימה לחץ על <b>פרטים נוספים</b>. אם מופיעה האפשרות <b>התקן בכל זאת</b>, לחץ עליה ועבור לשלב 6."],
    ["No \"Install anyway\"?", "לא מופיעה האפשרות \"התקן בכל זאת\"?"],
    ["Turn scanning off for a moment. Open Google Play, then", "כבה את הסריקה באופן זמני. פתח את Google Play, ואז עבור אל"],
    ["profile picture", "תמונת פרופיל"],
    ["Settings", "הגדרות"],
    ["turn off <b>Scan apps with Play Protect</b> and confirm <b>Turn off</b>. Go back to Downloads and open the file again.", "כבה את האפשרות <b>סריקת אפליקציות באמצעות Play Protect</b> ואשר <b>כיבוי</b>. חזור לתיקיית ההורדות ופתח שוב את הקובץ."],
    ["Important: turn scanning back on", "חשוב: להפעיל את הסריקה מחדש"],
    ["Once the app is installed, go back to the same Play Protect screen and turn scanning on again. The app keeps working with scanning on.", "לאחר התקנת האפליקציה, חזור לאותו מסך של Play Protect והפעל מחדש את הסריקה. האפליקציה תמשיך לפעול גם כשהסריקה מופעלת."],
    ["Install WA Forwarder", "התקנת WA Forwarder"],
    ["Tap <b>Install</b>. After a few seconds tap <b>Open</b>, or just go on to the next step.", "לחץ על <b>התקנה</b>. לאחר כמה שניות לחץ על <b>פתיחה</b>, או המשך לשלב הבא."],
    ["\"App not installed\"?", "מופיעה ההודעה \"האפליקציה לא הותקנה\"?"],
    ["There is probably an older copy on the phone that was signed with a different key. Uninstall it and try again.", "כנראה מותקנת בטלפון גרסה ישנה שנחתמה במפתח אחר. הסר אותה ונסה שוב."],
    ["Set up the app in one tap", "הגדרת האפליקציה בלחיצה אחת"],
    ["Go back to the setup page in Chrome (from step 2) and tap <b>Set up the app automatically</b>. The app opens with your server URL and key already filled in, and <b>Connect to server</b> shows a green ✓.", "חזור לדף ההגדרה ב-Chrome (משלב 2) ולחץ על <b>הגדרה אוטומטית של האפליקציה</b>. האפליקציה תיפתח כשכתובת השרת והמפתח כבר מוזנים, וליד <b>התחברות לשרת</b> יופיע סימן ✓ ירוק."],
    ["The button didn't open the app?", "הלחצן לא פתח את האפליקציה?"],
    ["In the app, tap <b>Set up</b> next to \"Connect to server\" (or <b>Edit</b> under \"Connection details\") and copy the <b>Server URL</b> and <b>Personal key</b> from the setup page by hand.", "באפליקציה, לחץ על <b>הגדרה</b> ליד \"התחברות לשרת\" (או על <b>עריכה</b> תחת \"פרטי חיבור\") והעתק ידנית מדף ההגדרה את <b>כתובת השרת</b> ואת <b>המפתח האישי</b>."],
    ["Now tap <b>Allow</b> next to step 2, <b>Notification access</b>.", "כעת לחץ על <b>אישור</b> ליד שלב 2 — <b>גישה להתראות</b>."],
    ["Allow notification access (including \"Restricted setting\")", "מתן גישה להתראות (כולל \"הגדרה מוגבלת\")"],
    ["This is the permission that matters most: without it the app sees nothing. The <b>Notification access</b> screen opens. Turn on the switch for WA Forwarder.", "זו ההרשאה החשובה ביותר: בלעדיה האפליקציה לא תראה דבר. ייפתח מסך <b>גישה להתראות</b>. הפעל את המתג של WA Forwarder."],
    ["On Android 13 and later, an app that didn't come from the store doesn't get this permission right away. The switch is greyed out and a <b>Restricted setting</b> dialog appears. That's expected. To unlock it:", "ב-Android 13 ומעלה, אפליקציה שלא הותקנה מהחנות אינה מקבלת את ההרשאה מיד. המתג יהיה אפור ותופיע הודעת <b>הגדרה מוגבלת</b>. זה צפוי. כדי לאפשר את ההרשאה:"],
    ["Tap <b>OK</b> on the \"Restricted setting\" dialog.", "לחץ על <b>אישור</b> בחלון \"הגדרה מוגבלת\"."],
    ["Open <span class=\"path\">Settings<i>→</i>Apps<i>→</i>WA Forwarder</span> (or long-press the app icon, then ⓘ).", "פתח <span class=\"path\">הגדרות<i>←</i>יישומים<i>←</i>WA Forwarder</span> (או לחץ לחיצה ארוכה על סמל האפליקציה ואז על ⓘ)."],
    ["Tap <span class=\"kbd\">⋮</span> in the top corner and choose <b>Allow restricted settings</b>. You may be asked for your fingerprint.", "לחץ על <span class=\"kbd\">⋮</span> בפינה העליונה ובחר <b>אפשר הגדרות מוגבלות</b>. ייתכן שתתבקש לאמת באמצעות טביעת אצבע."],
    ["Back in the app, tap <b>Allow</b> next to \"Notification access\" again, turn on the switch and confirm. The app shows this path as a reminder under the step.", "חזור לאפליקציה, לחץ שוב על <b>אישור</b> ליד \"גישה להתראות\", הפעל את המתג ואשר. האפליקציה מציגה תזכורת למסלול הזה מתחת לשלב."],
    ["No ⋮ on the screen?", "לא מופיע ⋮ במסך?"],
    ["That happens when it's already unlocked, or on older Android versions. Just turn on the switch. Samsung and Xiaomi use slightly different names, but the path is the same.", "זה קורה כאשר ההרשאה כבר נפתחה או בגרסאות Android ישנות. פשוט הפעל את המתג. במכשירי Samsung ו-Xiaomi השמות עשויים להיות מעט שונים, אך המסלול דומה."],
    ["Turn off battery optimization", "ביטול מיטוב הסוללה"],
    ["Android likes to put background apps to sleep, and then messages stop flowing. In the app, tap <b>Allow</b> next to step 3, <b>Run in background</b>, and tap <b>Allow</b> in the dialog.", "Android עשוי להעביר אפליקציות שפועלות ברקע למצב שינה, ואז ההודעות מפסיקות להגיע. באפליקציה לחץ על <b>אישור</b> ליד שלב 3 — <b>פעילות ברקע</b> — ואשר בחלון שיופיע."],
    ["The app does nothing when no new messages arrive, so the battery impact is negligible.", "האפליקציה אינה עושה דבר כשלא מגיעות הודעות חדשות, ולכן צריכת הסוללה זניחה."],
    ["Xiaomi, Samsung, Huawei", "Xiaomi, Samsung ו-Huawei"],
    ["These add an extra layer. See", "במכשירים האלה יש הגדרה נוספת. ראה"],
    ["\"Messages stop after a while\"", "\"ההודעות מפסיקות להגיע לאחר זמן\""],
    ["under Troubleshooting.", "בחלק פתרון התקלות."],
    ["Send a test message", "שליחת הודעת בדיקה"],
    ["Scroll to <b>Test &amp; maintenance</b> and tap <b>Send test message</b>. A second later the screen should show:", "גלול אל <b>בדיקה ותחזוקה</b> ולחץ על <b>שליחת הודעת בדיקה</b>. כעבור רגע אמורים להופיע:"],
    ["At the top: <b>Active · forwarding</b>", "בחלק העליון: <b>פעיל · העברת הודעות</b>"],
    ["All three setup steps with a green ✓", "שלושת שלבי ההגדרה עם סימן ✓ ירוק"],
    ["Last status: <b>Sent OK</b>", "הסטטוס האחרון: <b>נשלח בהצלחה</b>"],
    ["Under <b>Preferences</b> you can choose whether to forward <b>Group messages</b>, and list <b>Chats to skip</b>, one name per line. Tap <b>Save</b>.", "תחת <b>העדפות</b> אפשר לבחור אם להעביר <b>הודעות מקבוצות</b>, ולהגדיר <b>צ׳אטים לדילוג</b> — שם אחד בכל שורה. לחץ על <b>שמירה</b>."],
    ["The phone is ready ✓", "הטלפון מוכן ✓"],
    ["Don't forget to turn Play Protect scanning back on if you turned it off in step 5.", "אם כיבית את הסריקה בשלב 5, אל תשכח להפעיל אותה מחדש."],
    ["Part B · on a computer", "חלק ב׳ · במחשב"],
    ["Add WhatsApp as a connector in Claude", "הוספת WhatsApp כחיבור ב-Claude"],
    ["💻 Computer", "💻 מחשב"],
    ["Open your setup page on the computer too (send the link to yourself), and tap <b>Copy URL</b> in the \"connect Claude\" part.", "פתח גם במחשב את דף ההגדרה (שלח את הקישור לעצמך), ולחץ על <b>העתקת כתובת</b> בחלק \"חיבור Claude\"."],
    ["On claude.ai, go to", "באתר claude.ai עבור אל"],
    ["and click <b>Add custom connector</b>.", "ולחץ על <b>הוספת חיבור מותאם אישית</b>."],
    ["For <b>Name</b> type", "בשדה <b>Name</b> כתוב"],
    ["For <b>Remote MCP server URL</b> paste the URL you copied. Leave Advanced settings empty.", "בשדה <b>Remote MCP server URL</b> הדבק את הכתובת שהעתקת. השאר את ההגדרות המתקדמות ריקות."],
    ["Click <b>Add</b>. No sign-in is needed: the URL itself is the key.", "לחץ על <b>Add</b>. אין צורך בהתחברות נוספת — כתובת ה-URL עצמה משמשת כמפתח."],
    ["This URL is a key to your messages", "כתובת זו היא מפתח להודעות שלך"],
    ["Whoever has it can read them. Don't send it to anyone or paste it into chats. If it leaks,", "כל מי שמחזיק בה יכול לקרוא אותן. אין לשלוח אותה לאחרים או להדביק אותה בצ׳אטים. אם היא נחשפה,"],
    ["The old one stops working immediately.", "הכתובת הישנה תפסיק לפעול מיד."],
    ["Ask Claude", "שואלים את Claude"],
    ["💻 / 📱", "💻 / 📱"],
    ["Start a new chat. The connector works in the Claude mobile app too. A few ideas:", "פתח שיחה חדשה. החיבור פועל גם באפליקציית Claude בטלפון. הנה כמה רעיונות לשאלות:"],
    ["What came in on WhatsApp today? Anything urgent?", "אילו הודעות קיבלתי היום ב-WhatsApp? יש משהו דחוף?"],
    ["Find the address Sam sent this week", "מצא את הכתובת ששלחו לי השבוע"],
    ["Summarize the family group from last night", "סכם את ההודעות בקבוצה המשפחתית מאתמול בערב"],
    ["Who haven't I answered since this morning?", "למי עדיין לא עניתי מאז הבוקר?"],
    ["Claude isn't using WhatsApp?", "Claude לא משתמש ב-WhatsApp?"],
    ["In the message box, open the tools menu and check that WhatsApp is enabled. You can also just say \"check WhatsApp\".", "בתיבת ההודעה פתח את תפריט הכלים ובדוק ש-WhatsApp מופעל. אפשר גם פשוט לכתוב: \"בדוק את WhatsApp\"."],
    ["Claude only sees messages that arrived <b>after</b> the install. There is no access to older history.", "Claude רואה רק הודעות שהתקבלו <b>לאחר</b> ההתקנה. אין גישה להיסטוריית הודעות קודמת."],
    ["Your server", "השרת שלך"],
    ["You deployed your own WhatsApp Inbox. These are the addresses you'll need. None of them is secret on its own.", "פרסת שרת WhatsApp Inbox משלך. אלה הכתובות שתצטרך. אף אחת מהן אינה סודית בפני עצמה."],
    ["Server", "שרת"],
    ["Admin page", "דף ניהול"],
    ["Create users and their setup links. The password is in your local secrets file, never in this guide.", "יצירת משתמשים וקישורי הגדרה. הסיסמה נמצאת בקובץ הסודות המקומי שלך, ולעולם אינה מופיעה במדריך הזה."],
    ["Inviting friends", "הזמנת חברים"],
    ["Create a user for each person on the admin page and send them their own setup link (it's shown once). Then send them the friend version of this guide, which Claude Code can make with", "צור משתמש לכל אדם בדף הניהול ושלח לו את קישור ההגדרה האישי שלו (הוא מוצג פעם אחת בלבד). לאחר מכן שלח לו את גרסת החברים של המדריך, שאפשר ליצור באמצעות"],
    ["Something not working?", "משהו לא עובד?"],
    ["The common problems and what to do about each.", "הבעיות הנפוצות והפתרונות האפשריים."],
    ["The \"Notification access\" switch is greyed out", "המתג של \"גישה להתראות\" אפור"],
    ["That's Android 13+ \"Restricted setting\". Follow", "זו הגדרת \"הגדרה מוגבלת\" ב-Android 13 ומעלה. פעל לפי"],
    ["No ⋮? Tap the greyed-out switch once first (that's what \"arms\" the menu option), then go back to App info.", "לא מופיע ⋮? לחץ פעם אחת על המתג האפור (פעולה זו עשויה להציג את אפשרות התפריט), ואז חזור לפרטי האפליקציה."],
    ["Play Protect keeps blocking even with scanning off", "Play Protect ממשיך לחסום גם לאחר כיבוי הסריקה"],
    ["Close Google Play completely, wait half a minute and open the install file again from <b>Files → Downloads</b>. Still blocked? Download the file again from the setup page.", "סגור לחלוטין את Google Play, המתן כחצי דקה ופתח שוב את קובץ ההתקנה דרך <b>קבצים ← הורדות</b>. עדיין חסום? הורד את הקובץ מחדש מדף ההגדרה."],
    ["Messages arrive, but stop after a few hours", "ההודעות מגיעות, אך מפסיקות לאחר כמה שעות"],
    ["The manufacturer's battery saver put the app to sleep. Check that \"Run in background\" shows ✓ in the app, and also:", "חיסכון הסוללה של יצרן המכשיר העביר את האפליקציה למצב שינה. בדוק שבאפליקציה מופיע ✓ ליד \"פעילות ברקע\", וגם:"],
    ["Samsung:", "Samsung:"],
    ["Make sure WA Forwarder is not under \"Sleeping apps\" and add it to \"Never sleeping apps\".", "ודא ש-WA Forwarder אינה נמצאת ברשימת \"אפליקציות במצב שינה\" והוסף אותה לרשימת \"אפליקציות שאינן נכנסות למצב שינה\"."],
    ["Xiaomi / Redmi:", "Xiaomi / Redmi:"],
    ["App info → <b>Autostart</b> → on, and under Battery saver choose <b>No restrictions</b>.", "פרטי אפליקציה ← <b>הפעלה אוטומטית</b> ← מופעל; תחת חיסכון בסוללה בחר <b>ללא הגבלות</b>."],
    ["Huawei / Honor:", "Huawei / Honor:"],
    ["Settings → Battery → App launch → WA Forwarder → Manage manually, and turn on all three switches.", "הגדרות ← סוללה ← הפעלת אפליקציות ← WA Forwarder ← ניהול ידני, והפעל את שלושת המתגים."],
    ["The last status shows an error", "הסטטוס האחרון מציג שגיאה"],
    ["the key in the app is wrong, or a new link was issued. Open the latest setup link and tap \"Set up the app automatically\" again.", "המפתח באפליקציה שגוי או שנוצר קישור חדש. פתח את קישור ההגדרה העדכני ולחץ שוב על \"הגדרה אוטומטית של האפליקציה\"."],
    ["no harm done. Messages wait in a queue on the phone and are sent when the connection is back. You can tap \"Retry stuck messages\".", "אין בכך נזק. ההודעות ממתינות בתור בטלפון ונשלחות כשהחיבור חוזר. אפשר ללחוץ על \"ניסיון חוזר לשליחת הודעות\"."],
    ["Some messages are missing or cut off", "חלק מההודעות חסרות או נקטעות"],
    ["The app only sees what's in the notification. So nothing arrives from", "האפליקציה רואה רק את מה שמופיע בהתראה. לכן לא מתקבלות הודעות מ"],
    ["muted", "מושתקות"],
    ["chats, from chats you had open on screen at the time, and no photos themselves (just \"📷 Photo\" and the caption). Very long messages may be truncated.", "צ׳אטים, מצ׳אטים שהיו פתוחים על המסך באותו רגע, וגם לא את התמונות עצמן (רק הכיתוב \"📷 תמונה\" והכיתוב הנלווה). הודעות ארוכות במיוחד עשויות להיחתך."],
    ["Claude can't find the tool, or the connector shows an error", "Claude לא מוצא את הכלי או שהחיבור מציג שגיאה"],
    ["In Settings › Connectors, check that the URL was pasted in full, with no trailing space. If you got a new setup link, replace the URL here too: delete the connector and add it again.", "בהגדרות › חיבורים, בדוק שהכתובת הודבקה במלואה וללא רווח בסופה. אם קיבלת קישור הגדרה חדש, צריך להחליף גם כאן את הכתובת: מחק את החיבור והוסף אותו מחדש."],
    ["I lost the setup link / changed phones", "איבדתי את קישור ההגדרה / החלפתי טלפון"],
    ["The old link stops working, so repeat step 7 (on the phone) and step 11 (in Claude).", "הקישור הישן מפסיק לפעול, לכן יש לחזור על שלב 7 (בטלפון) ועל שלב 11 (ב-Claude)."],
    ["How do I pause or remove it?", "איך משהים או מסירים את השירות?"],
    ["To pause: turn off \"Forwarding on\" in the app. To remove: uninstall the app, delete the connector in Claude, and", "כדי להשהות: כבה באפליקציה את האפשרות \"העברת הודעות פעילה\". כדי להסיר: הסר את האפליקציה, מחק את החיבור ב-Claude, ובקש"],
    ["Deleting the user also deletes all stored messages.", "מחיקת המשתמש מוחקת גם את כל ההודעות שנשמרו."],
    ["Privacy, no fine print", "פרטיות — בלי אותיות קטנות"],
    ["Worth reading before you install.", "חשוב לקרוא לפני ההתקנה."],
    ["No blue ticks", "בלי סימון קריאה כחול"],
    ["The app never opens WhatsApp, never taps the notification and never replies. As far as the sender knows, the message is still unread.", "האפליקציה אינה פותחת את WhatsApp, אינה לוחצת על ההתראה ואינה משיבה להודעות. מבחינת השולח, ההודעה נשארת לא נקראה."],
    ["A key per person", "מפתח נפרד לכל משתמש"],
    ["Every user has separate keys for the app and for Claude. No user can see another user's messages, and the server stores only hashes of the keys.", "לכל משתמש מפתחות נפרדים לאפליקציה ול-Claude. משתמש אינו יכול לראות הודעות של משתמש אחר, והשרת שומר רק גיבובים של המפתחות."],
    ["Deleted automatically", "מחיקה אוטומטית"],
    ["Messages are deleted from the server after {{RETENTION_DAYS}} days. You can also skip specific chats, or all groups, right in the app.", "ההודעות נמחקות מהשרת לאחר {{RETENTION_DAYS}} ימים. אפשר גם להחריג צ׳אטים מסוימים או את כל הקבוצות ישירות באפליקציה."],
    ["Who else can see them", "מי עוד יכול לראות את ההודעות"],
    ["Created by", "נוצר על ידי"],
    ["WhatsApp Inbox is an independent project and is not affiliated with WhatsApp, Meta or Anthropic. Screenshots in this guide are illustrations: the names, addresses and keys in them are made up.", "WhatsApp Inbox הוא פרויקט עצמאי שאינו קשור ל-WhatsApp, ל-Meta או ל-Anthropic. צילומי המסך במדריך הם להמחשה בלבד: השמות, הכתובות והמפתחות המופיעים בהם בדויים."],
    ["Enlarged image", "תמונה מוגדלת"],
    ["How to install", "הוראות התקנה"],
    ["Troubleshooting", "פתרון תקלות"],
    ["Install", "התקנה"],
    ["Privacy", "פרטיות"],
  ];

  for (const [from, to] of translations) html = html.replaceAll(from, to);

  // טיפול במשפטים שמכילים ערכים דינמיים, כגון שם בעל השרת ומספר ימי השמירה.
  html = html
    .replace(/A small Android app reads WhatsApp notifications and sends them to .*? private server\. From then on you can ask Claude "what did people write to me today\?", and the messages on your phone stay unread\./,
      "אפליקציית Android קטנה קוראת את ההתראות של WhatsApp ושולחת אותן לשרת הפרטי שהוגדר עבורך. לאחר מכן אפשר לשאול את Claude: \"מה כתבו לי היום ב-WhatsApp?\" — וההודעות בטלפון נשארות לא נקראות.")
    .replace(/Auto-deleted after (\d+) days/g, "נמחק אוטומטית לאחר $1 ימים")
    .replace(/and deleted automatically after (\d+) days\./g, "ונמחקות אוטומטית לאחר $1 ימים.")
    .replace(/Messages are deleted from the server after (\d+) days\. You can also skip specific chats, or all groups, right in the app\./g,
      "ההודעות נמחקות מהשרת לאחר $1 ימים. אפשר גם להחריג צ׳אטים מסוימים או את כל הקבוצות ישירות באפליקציה.")
    .replace('a. The dialog. Tap "More details"', 'א. החלון. לחץ על "פרטים נוספים"')
    .replace('b. If needed: scanning off for a moment', 'ב. אם צריך: כיבוי זמני של הסריקה')
    .replace('a. "Restricted setting": tap OK', 'א. "הגדרה מוגבלת": לחץ על אישור')
    .replace('b. App info → ⋮', 'ב. פרטי האפליקציה ← ⋮')
    .replace('c. Turn on the switch and allow', 'ג. הפעל את המתג ואשר')
    .replace('No internet / timeout:', 'אין אינטרנט / פקיעת זמן:')
    .replace('Background usage limits', 'הגבלות שימוש ברקע')
    .replace('Make sure WA Forwarder is not under "Sleeping apps" and add it to "Never sleeping apps".', 'ודא ש-WA Forwarder אינה נמצאת ברשימת "אפליקציות במצב שינה" והוסף אותה לרשימת "אפליקציות שאינן נכנסות למצב שינה".')
    .replace('Settings → Battery → Background usage limits.', 'הגדרות ← סוללה ← הגבלות שימוש ברקע.')
    .replace('To pause: turn off "Forwarding on" in the app. To remove: uninstall the app, delete the connector in Claude, and', 'כדי להשהות: כבה באפליקציה את האפשרות "העברת הודעות פעילה". כדי להסיר: הסר את האפליקציה, מחק את החיבור ב-Claude, ובקש');

  // תרגום תוויות נגישות ותיאורי תמונות.
  html = html
    .replace('aria-label="Steps"', 'aria-label="שלבי ההתקנה"')
    .replace('aria-label="Enlarged image"', 'aria-label="תמונה מוגדלת"')
    .replace('alt="Claude summarizing today\'s WhatsApp messages"', 'alt="Claude מסכם את הודעות WhatsApp שהתקבלו היום"')
    .replace('alt="The personal setup page in Chrome"', 'alt="דף ההגדרה האישי ב-Chrome"')
    .replace('alt="Chrome download warning"', 'alt="אזהרת הורדה של Chrome"')
    .replace('alt="Install unknown apps: Chrome"', 'alt="אישור התקנת אפליקציות ממקור לא מוכר ב-Chrome"')
    .replace('alt="Play Protect block dialog"', 'alt="חלון חסימה של Play Protect"')
    .replace('alt="Turning off scanning in Play Protect settings"', 'alt="כיבוי הסריקה בהגדרות Play Protect"')
    .replace('alt="Android install dialog"', 'alt="חלון התקנה של Android"')
    .replace('alt="The app after automatic setup"', 'alt="האפליקציה לאחר הגדרה אוטומטית"')
    .replace('alt="Restricted setting dialog"', 'alt="חלון הגדרה מוגבלת"')
    .replace('alt="App info, three-dot menu"', 'alt="פרטי האפליקציה ותפריט שלוש הנקודות"')
    .replace('alt="Allow notification access"', 'alt="מתן גישה להתראות"')
    .replace('alt="Run in background dialog"', 'alt="חלון אישור פעילות ברקע"')
    .replace('alt="The app is ready, everything green"', 'alt="האפליקציה מוכנה וכל הסימונים ירוקים"')
    .replace('alt="Adding a custom connector in claude.ai settings"', 'alt="הוספת חיבור מותאם אישית בהגדרות claude.ai"')
    .replace('alt="Claude summarizing today\'s messages"', 'alt="Claude מסכם את ההודעות שהתקבלו היום"');

  // כיווניות עברית; קטעי קוד וכתובות נשארים משמאל לימין באמצעות כללי ה-CSS הקיימים.
  html = html.replace('<html', '<html lang="he" dir="rtl"');
  return html;
}
