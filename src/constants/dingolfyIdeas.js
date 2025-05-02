const LOVE_REMINDERS = [
    "Leave them a handwritten note somewhere unexpected. ✍️",
    "Send a random “I love you” text right now. 💬",
    "Give them a genuine compliment today. 😊",
    "Plan a surprise snack or treat for them. 🍪",
    "Watch their favorite movie together tonight. 🎥",
    "Offer a massage without being asked. 💆",
    "Tell them one thing you admire about them. 🌟",
    "Hold their hand longer than usual today. 🤝",
    "Make a playlist of songs that remind you of them. 🎶",
    "Bring up a beautiful memory you both share. 🖼️",
    "Let them sleep in — take care of something for them. 😴",
    "Plan a simple candle-lit dinner at home. 🕯️",
    "Stick a love note in their bag or wallet. 💌",
    "Text them three reasons you’re grateful for them. 🙏",
    "Do a chore they usually do — just because. 🧺",
    "Share a silly photo or inside joke. 😂",
    "Kiss them on the forehead and tell them “thank you.” 💋",
    "Make them a cup of tea or coffee — unprompted. ☕",
    "Write a short “5 reasons I love you” list. ✨",
    "Ask them about their day and really listen. 👂",
    "Give them a 10-second hug — no distractions. 🤗",
    "Let them pick what to eat or do today. 🍽️",
    "Surprise them with a short voice message. 🎙️",
    "Recreate your first date in a fun way. 💑",
    "Celebrate a tiny win in their life. 🎉",
    "Leave a compliment in their phone notes. 📱",
    "Make them a simple DIY card. 🖍️",
    "Say “I’m proud of you” for something they’ve done. 🏆",
    "Share a favorite photo of the two of you. 📸",
    "Give them your full attention for 15 minutes. 🔕",
    "Ask, “How can I make your day better?” 🌞",
    "Leave a sticky note with “I love you because…” 📝",
    "Play a song that reminds you of them and dance. 💃",
    "Pick one small thing to appreciate out loud. 🎈",
    "Remind them what makes your relationship special. ❤️",
    "Surprise them with flowers or a small token. 🌸",
    "Tell them how they’ve made your life better. 🌈",
    "Make them laugh — on purpose. 🤭",
    "Say “thank you” for something they do every day. 🙌",
    "Whisper “I love you” when they least expect it. 😘"
]


export default function getRandomReminder() {
    const index = Math.floor(Math.random() * LOVE_REMINDERS.length);
    return LOVE_REMINDERS[index];
}
