/* =========================================================
   ARE YOU WORTHY OF MJÖLNIR? — script.js
   Beginner-friendly, plain JavaScript, no libraries.

   HOW THE FILE IS ORGANIZED (read top to bottom):
   1. QUESTION BANK        - all 80 questions live in one array
   2. STATE                - variables that track the current quiz
   3. HELPER FUNCTIONS      - pick questions, shuffle, calculate score
   4. SCREEN FUNCTIONS      - show/hide the landing/quiz/result screens
   5. EVENT LISTENERS       - what happens when buttons are clicked
   6. BACKGROUND PARTICLES  - the little floating dots behind everything
========================================================= */


/* =========================================================
   1. QUESTION BANK
   ---------------------------------------------------------
   Every question object looks like this:

   {
     text: "the question shown to the player",
     category: "character" | "mjolnir" | "marvel" | "chaos" | "final",
     type: "character" | "knowledge" | "aura" | "final",
     options: [
       { text: "answer A", points: 1 },
       { text: "answer B", points: 1 },
       { text: "answer C", points: 3 },
       { text: "answer D", points: 1 }
     ]
   }

   HOW POINTS WORK (see also the big comment above calculateResults):
   - "character" questions: the best answer is worth 3 points,
     the other three answers are worth 1 point each.
   - "knowledge" questions (Marvel/Thor trivia): the correct
     answer is worth 2 points, wrong answers are worth 0.
   - "aura" questions (funny / vibes-only, no correct answer):
     every answer is worth 2 points, because Mjölnir just enjoys
     the chaos and any confident answer counts.
   - "final" question (the very last one): every answer is
     positive, but some are more enthusiastic than others.
========================================================= */

const questionBank = [

  // ---------------- CATEGORY: CHARACTER (Q1-Q20) ----------------
  { text: "You accidentally break your friend's expensive headphones. They haven't noticed yet. What do you do?",
    category: "character", type: "character",
    options: [
      { text: "Put them back and say nothing", points: 1 },
      { text: "Blame someone else", points: 1 },
      { text: "Admit it and offer to fix or replace them", points: 3 },
      { text: "Wait and see if they notice", points: 1 }
    ]},
  { text: "Your team succeeds because of your teammate's idea, but everyone thinks it was yours.",
    category: "character", type: "character",
    options: [
      { text: "Accept the praise", points: 1 },
      { text: "Mention it privately", points: 1 },
      { text: "Give your teammate public credit", points: 3 },
      { text: "Say nothing unless they complain", points: 1 }
    ]},
  { text: "You make a mistake that could cause problems for your team.",
    category: "character", type: "character",
    options: [
      { text: "Hide it", points: 1 },
      { text: "Fix it quietly", points: 1 },
      { text: "Admit it and help solve it", points: 3 },
      { text: "Wait for someone else", points: 1 }
    ]},
  { text: "Everyone supports a decision that you believe is wrong.",
    category: "character", type: "character",
    options: [
      { text: "Go along with them", points: 1 },
      { text: "Stay silent", points: 1 },
      { text: "Explain your concerns respectfully", points: 3 },
      { text: "Try to force everyone to agree", points: 1 }
    ]},
  { text: "A friend asks you to lie for them after they did something wrong.",
    category: "character", type: "character",
    options: [
      { text: "Lie for them", points: 1 },
      { text: "Refuse", points: 1 },
      { text: "Explain why you cannot lie but help them fix the situation", points: 3 },
      { text: "Avoid answering", points: 1 }
    ]},
  { text: "You suddenly receive extraordinary power and nobody can stop you.",
    category: "character", type: "character",
    options: [
      { text: "Use it for personal benefit", points: 1 },
      { text: "Show everyone your power", points: 1 },
      { text: "Use it responsibly when genuinely needed", points: 3 },
      { text: "Keep it secret but use it whenever convenient", points: 1 }
    ]},
  { text: "You worked hard but failed.",
    category: "character", type: "character",
    options: [
      { text: "Blame others", points: 1 },
      { text: "Give up", points: 1 },
      { text: "Learn from it and try again", points: 3 },
      { text: "Pretend it never mattered", points: 1 }
    ]},
  { text: "Someone less experienced than you makes a mistake.",
    category: "character", type: "character",
    options: [
      { text: "Make fun of them", points: 1 },
      { text: "Ignore them", points: 1 },
      { text: "Help them understand the mistake", points: 3 },
      { text: "Correct them publicly", points: 1 }
    ]},
  { text: "You discover an unfair shortcut that guarantees success.",
    category: "character", type: "character",
    options: [
      { text: "Use it", points: 1 },
      { text: "Tell your friends", points: 1 },
      { text: "Avoid it", points: 3 },
      { text: "Use it secretly", points: 1 }
    ]},
  { text: "Someone trusts you with important private information.",
    category: "character", type: "character",
    options: [
      { text: "Tell your closest friend", points: 1 },
      { text: "Keep it private", points: 3 },
      { text: "Share it if it benefits you", points: 1 },
      { text: "Post a vague story about it", points: 1 }
    ]},
  { text: "Someone wrongs you and you could punish them without consequences.",
    category: "character", type: "character",
    options: [
      { text: "Punish them", points: 1 },
      { text: "Get revenge later", points: 1 },
      { text: "Forgive immediately", points: 1 },
      { text: "Choose a fair response instead of revenge", points: 3 }
    ]},
  { text: "Your team is confused and nobody takes responsibility.",
    category: "character", type: "character",
    options: [
      { text: "Wait", points: 1 },
      { text: "Take control immediately", points: 1 },
      { text: "Help the team decide together", points: 3 },
      { text: "Blame the team", points: 1 }
    ]},
  { text: "A stranger is struggling while you are already late.",
    category: "character", type: "character",
    options: [
      { text: "Ignore them", points: 1 },
      { text: "Help if you reasonably can", points: 3 },
      { text: "Stop everything", points: 1 },
      { text: "Ask someone else", points: 1 }
    ]},
  { text: "Your friend asks if you genuinely liked their terrible presentation.",
    category: "character", type: "character",
    options: [
      { text: "Say it was amazing", points: 1 },
      { text: "Say it was terrible", points: 1 },
      { text: "Give honest but constructive feedback", points: 3 },
      { text: "Change the subject", points: 1 }
    ]},
  { text: "You lose something important because of someone else's mistake.",
    category: "character", type: "character",
    options: [
      { text: "Blame them immediately", points: 1 },
      { text: "Understand what happened first", points: 3 },
      { text: "Get revenge", points: 1 },
      { text: "Pretend you are not angry", points: 1 }
    ]},
  { text: "You can either win individually or help your struggling team succeed together.",
    category: "character", type: "character",
    options: [
      { text: "Choose yourself", points: 1 },
      { text: "Help the team", points: 3 },
      { text: "Do whatever gives you recognition", points: 1 },
      { text: "Let someone else decide", points: 1 }
    ]},
  { text: "You see someone being treated unfairly. Speaking up may make you unpopular.",
    category: "character", type: "character",
    options: [
      { text: "Stay silent", points: 1 },
      { text: "Join the majority", points: 1 },
      { text: "Speak up respectfully", points: 3 },
      { text: "Record it and post it online", points: 1 }
    ]},
  { text: "You made a promise, but keeping it is now inconvenient.",
    category: "character", type: "character",
    options: [
      { text: "Break it", points: 1 },
      { text: "Keep it if nobody notices", points: 1 },
      { text: "Try your best to keep it", points: 1 },
      { text: "Explain honestly if you genuinely cannot", points: 3 }
    ]},
  { text: "You can become extremely successful, but it would seriously hurt an innocent person.",
    category: "character", type: "character",
    options: [
      { text: "Do it", points: 1 },
      { text: "Find another way", points: 3 },
      { text: "Accept it as the cost", points: 1 },
      { text: "Hide the consequences", points: 1 }
    ]},
  { text: "Which is the strongest quality?",
    category: "character", type: "character",
    options: [
      { text: "Power", points: 1 },
      { text: "Intelligence", points: 1 },
      { text: "Courage", points: 1 },
      { text: "Using power responsibly", points: 3 }
    ]},

  // ---------------- CATEGORY: MJÖLNIR & THOR (Q21-Q40) ----------------
  { text: "You see Mjölnir sitting on a table and nobody is around.",
    category: "mjolnir", type: "aura",
    options: [
      { text: "Try to lift it", points: 2 },
      { text: "Take a selfie", points: 2 },
      { text: "Whisper \"I am worthy\"", points: 2 },
      { text: "Walk away respectfully", points: 2 }
    ]},
  { text: "Who placed the worthiness enchantment on Mjölnir in the MCU?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Thor", points: 0 },
      { text: "Odin", points: 2 },
      { text: "Loki", points: 0 },
      { text: "Heimdall", points: 0 }
    ]},
  { text: "What happens when someone unworthy tries to lift Mjölnir?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "It becomes invisible", points: 0 },
      { text: "It disappears", points: 0 },
      { text: "They cannot lift it", points: 2 },
      { text: "It attacks them", points: 0 }
    ]},
  { text: "What does the enchantment mainly determine?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Physical strength", points: 0 },
      { text: "Worthiness to wield the hammer", points: 2 },
      { text: "Who is king of Asgard", points: 0 },
      { text: "Magical ability", points: 0 }
    ]},
  { text: "What is Mjölnir made from?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Vibranium", points: 0 },
      { text: "Uru", points: 2 },
      { text: "Adamantium", points: 0 },
      { text: "Asgardium", points: 0 }
    ]},
  { text: "What is Thor's other famous weapon introduced in Avengers: Infinity War?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Gungnir", points: 0 },
      { text: "Stormbreaker", points: 2 },
      { text: "Hofund", points: 0 },
      { text: "Destroyer", points: 0 }
    ]},
  { text: "Who helps Thor forge Stormbreaker?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Odin", points: 0 },
      { text: "Loki", points: 0 },
      { text: "Eitri and the dwarves of Nidavellir", points: 2 },
      { text: "Heimdall", points: 0 }
    ]},
  { text: "Who successfully wields Mjölnir in Avengers: Endgame?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Hulk", points: 0 },
      { text: "Iron Man", points: 0 },
      { text: "Captain America", points: 2 },
      { text: "Hawkeye", points: 0 }
    ]},
  { text: "Why is Thor initially unable to lift Mjölnir after Odin's enchantment?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "The hammer is damaged", points: 0 },
      { text: "Odin removed Thor's powers", points: 0 },
      { text: "Thor was judged unworthy", points: 2 },
      { text: "Loki enchanted it", points: 0 }
    ]},
  { text: "What happens to Thor after Odin banishes him?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "His powers disappear forever", points: 0 },
      { text: "He loses access to his powers until he becomes worthy", points: 2 },
      { text: "Loki receives his powers", points: 0 },
      { text: "Mjölnir loses its powers", points: 0 }
    ]},
  { text: "What is Thor's home realm?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Midgard", points: 0 },
      { text: "Jotunheim", points: 0 },
      { text: "Asgard", points: 2 },
      { text: "Sakaar", points: 0 }
    ]},
  { text: "Who is Thor's adopted brother?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Heimdall", points: 0 },
      { text: "Loki", points: 2 },
      { text: "Valkyrie", points: 0 },
      { text: "Sif", points: 0 }
    ]},
  { text: "Loki offers you a \"totally safe\" plan to make you worthy.",
    category: "mjolnir", type: "aura",
    options: [
      { text: "Trust him", points: 2 },
      { text: "Ask Thor", points: 2 },
      { text: "Ask for instructions", points: 2 },
      { text: "Run", points: 2 }
    ]},
  { text: "What is Odin's relationship to Thor?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Uncle", points: 0 },
      { text: "Brother", points: 0 },
      { text: "Father", points: 2 },
      { text: "Grandfather", points: 0 }
    ]},
  { text: "What is Thor's hammer called?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Stormbreaker", points: 0 },
      { text: "Mjölnir", points: 2 },
      { text: "Gungnir", points: 0 },
      { text: "Hela", points: 0 }
    ]},
  { text: "Which realm is home to the Frost Giants?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Asgard", points: 0 },
      { text: "Midgard", points: 0 },
      { text: "Jotunheim", points: 2 },
      { text: "Vanaheim", points: 0 }
    ]},
  { text: "What is Mjölnir commonly associated with?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Only combat", points: 0 },
      { text: "Combat and controlling lightning", points: 2 },
      { text: "Opening portals only", points: 0 },
      { text: "Healing", points: 0 }
    ]},
  { text: "Where does Thor initially end up fighting as a gladiator in Thor: Ragnarok?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Earth", points: 0 },
      { text: "Sakaar", points: 2 },
      { text: "Jotunheim", points: 0 },
      { text: "Nidavellir", points: 0 }
    ]},
  { text: "Who destroys Mjölnir in Thor: Ragnarok?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "Loki", points: 0 },
      { text: "Odin", points: 0 },
      { text: "Hela", points: 2 },
      { text: "Thanos", points: 0 }
    ]},
  { text: "Which best describes the worthiness enchantment?",
    category: "mjolnir", type: "knowledge",
    options: [
      { text: "The strongest person gets the hammer", points: 0 },
      { text: "Only Thor can use it", points: 0 },
      { text: "Worthiness matters more than physical strength", points: 2 },
      { text: "Anyone from Asgard can use it", points: 0 }
    ]},

  // ---------------- CATEGORY: MARVEL / ASGARD (Q41-Q60) ----------------
  { text: "Thor invites you to Asgard. What is the first thing you ask?",
    category: "marvel", type: "aura",
    options: [
      { text: "Where is the training ground?", points: 2 },
      { text: "Where is the food?", points: 2 },
      { text: "Is there Wi-Fi?", points: 2 },
      { text: "Can I meet Odin?", points: 2 }
    ]},
  { text: "Loki is best known as the:",
    category: "marvel", type: "knowledge",
    options: [
      { text: "God of War", points: 0 },
      { text: "God of Thunder", points: 0 },
      { text: "God of Mischief", points: 2 },
      { text: "God of Fire", points: 0 }
    ]},
  { text: "Who is Thor's sister in the MCU?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Valkyrie", points: 0 },
      { text: "Hela", points: 2 },
      { text: "Sif", points: 0 },
      { text: "Frigga", points: 0 }
    ]},
  { text: "Hela is:",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Thor's mother", points: 0 },
      { text: "Thor's sister", points: 2 },
      { text: "Loki's wife", points: 0 },
      { text: "Odin's sister", points: 0 }
    ]},
  { text: "What is the Bifrost?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "A weapon", points: 0 },
      { text: "A magical bridge connecting realms", points: 2 },
      { text: "Odin's sword", points: 0 },
      { text: "A type of magic", points: 0 }
    ]},
  { text: "Who is the main guardian of the Bifrost?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Loki", points: 0 },
      { text: "Heimdall", points: 2 },
      { text: "Sif", points: 0 },
      { text: "Valkyrie", points: 0 }
    ]},
  { text: "What is Earth called in the Nine Realms?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Midgard", points: 2 },
      { text: "Jotunheim", points: 0 },
      { text: "Vanaheim", points: 0 },
      { text: "Muspelheim", points: 0 }
    ]},
  { text: "Who is the God of Mischief?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Thor", points: 0 },
      { text: "Odin", points: 0 },
      { text: "Loki", points: 2 },
      { text: "Heimdall", points: 0 }
    ]},
  { text: "Loki offers to teach you magic. What do you ask first?",
    category: "marvel", type: "aura",
    options: [
      { text: "How powerful can I become?", points: 2 },
      { text: "How long will it take?", points: 2 },
      { text: "Are there exams?", points: 2 },
      { text: "What's the catch?", points: 2 }
    ]},
  { text: "Who is Thor's mother?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Hela", points: 0 },
      { text: "Frigga", points: 2 },
      { text: "Sif", points: 0 },
      { text: "Valkyrie", points: 0 }
    ]},
  { text: "What is Thor's home realm?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Asgard", points: 2 },
      { text: "Midgard", points: 0 },
      { text: "Wakanda", points: 0 },
      { text: "Knowhere", points: 0 }
    ]},
  { text: "What is a Valkyrie?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "An Asgardian warrior", points: 2 },
      { text: "A Frost Giant", points: 0 },
      { text: "A sorcerer", points: 0 },
      { text: "An Earth-based Avenger", points: 0 }
    ]},
  { text: "Who becomes ruler of New Asgard in Thor: Love and Thunder?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Loki", points: 0 },
      { text: "Valkyrie", points: 2 },
      { text: "Heimdall", points: 0 },
      { text: "Hulk", points: 0 }
    ]},
  { text: "What is Ragnarok?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "A weapon", points: 0 },
      { text: "The destruction/reset of Asgard", points: 2 },
      { text: "A type of Mjölnir", points: 0 },
      { text: "A king", points: 0 }
    ]},
  { text: "Who is the ruler of Asgard and Thor's father?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Heimdall", points: 0 },
      { text: "Odin", points: 2 },
      { text: "Loki", points: 0 },
      { text: "Bor", points: 0 }
    ]},
  { text: "You are introduced to Odin as Thor's friend.",
    category: "marvel", type: "aura",
    options: [
      { text: "\"Honour, Your Majesty.\"", points: 2 },
      { text: "\"Nice to meet you.\"", points: 2 },
      { text: "\"I'm here for the free food.\"", points: 2 },
      { text: "Bow and hope he doesn't notice you.", points: 2 }
    ]},
  { text: "Which Avenger becomes one of Thor's closest friends?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Steve Rogers", points: 0 },
      { text: "Bruce Banner", points: 2 },
      { text: "Natasha Romanoff", points: 0 },
      { text: "Sam Wilson", points: 0 }
    ]},
  { text: "Which realm is famous for dwarves who forge powerful weapons?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Nidavellir", points: 2 },
      { text: "Jotunheim", points: 0 },
      { text: "Sakaar", points: 0 },
      { text: "Vanaheim", points: 0 }
    ]},
  { text: "Who causes the destruction of Asgard in Thor: Ragnarok?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "Thanos", points: 0 },
      { text: "Surtur", points: 2 },
      { text: "Hela", points: 0 },
      { text: "Loki", points: 0 }
    ]},
  { text: "Which best describes Thor's character development?",
    category: "marvel", type: "knowledge",
    options: [
      { text: "He simply becomes more powerful", points: 0 },
      { text: "He learns that strength alone does not make a good leader", points: 2 },
      { text: "He stops caring about Asgard", points: 0 },
      { text: "He becomes a completely different person", points: 0 }
    ]},

  // ---------------- CATEGORY: CHAOS / FUNNY (Q61-Q79) ----------------
  { text: "Thor takes the last piece of biriyani from your plate.",
    category: "chaos", type: "aura",
    options: [
      { text: "Accept your fate", points: 2 },
      { text: "Ask him to share it", points: 2 },
      { text: "Challenge him to a duel", points: 2 },
      { text: "Tell Loki to handle it", points: 2 }
    ]},
  { text: "Loki says, \"Trust me.\"",
    category: "chaos", type: "aura",
    options: [
      { text: "Trust him immediately", points: 2 },
      { text: "Ask what the plan is", points: 2 },
      { text: "Find Thor", points: 2 },
      { text: "Start running", points: 2 }
    ]},
  { text: "You finally get Mjölnir to move 2 centimetres.",
    category: "chaos", type: "aura",
    options: [
      { text: "Stay calm", points: 2 },
      { text: "Try again", points: 2 },
      { text: "Start celebrating", points: 2 },
      { text: "Change your Instagram bio to \"Worthy.\"", points: 2 }
    ]},
  { text: "Thor asks you to hide Mjölnir for five minutes.",
    category: "chaos", type: "aura",
    options: [
      { text: "Hide it", points: 2 },
      { text: "Ask why", points: 2 },
      { text: "Try lifting it first", points: 2 },
      { text: "Put it on OLX", points: 2 }
    ]},
  { text: "You're eating lunch when Thor suddenly appears and asks what you're eating.",
    category: "chaos", type: "aura",
    options: [
      { text: "Explain the food", points: 2 },
      { text: "Offer him some", points: 2 },
      { text: "Tell him there isn't enough for him", points: 2 },
      { text: "Protect your plate", points: 2 }
    ]},
  { text: "You accidentally call Odin \"bro.\"",
    category: "chaos", type: "aura",
    options: [
      { text: "Apologize immediately", points: 2 },
      { text: "Pretend you didn't say it", points: 2 },
      { text: "Run", points: 2 },
      { text: "Commit to it", points: 2 }
    ]},
  { text: "Loki gives you a mysterious box and says, \"Don't open it.\"",
    category: "chaos", type: "aura",
    options: [
      { text: "Don't open it", points: 2 },
      { text: "Ask what's inside", points: 2 },
      { text: "Open it immediately", points: 2 },
      { text: "Give it to Thor", points: 2 }
    ]},
  { text: "You are offered a place in the Avengers. What's your first question?",
    category: "chaos", type: "aura",
    options: [
      { text: "\"What's the mission?\"", points: 2 },
      { text: "\"Who else is joining?\"", points: 2 },
      { text: "\"Is there a salary?\"", points: 2 },
      { text: "\"Do I get an Avengers ID card?\"", points: 2 }
    ]},
  { text: "You enter a room and see Thor and Loki arguing.",
    category: "chaos", type: "aura",
    options: [
      { text: "Leave quietly", points: 2 },
      { text: "Try to stop them", points: 2 },
      { text: "Take Thor's side", points: 2 },
      { text: "Grab snacks and watch", points: 2 }
    ]},
  { text: "You have Mjölnir for exactly 10 seconds. What do you do?",
    category: "chaos", type: "aura",
    options: [
      { text: "Help someone", points: 2 },
      { text: "Practice controlling it", points: 2 },
      { text: "Take a picture", points: 2 },
      { text: "Fly around celebrating", points: 2 }
    ]},
  { text: "Thor challenges you to a strength competition.",
    category: "chaos", type: "aura",
    options: [
      { text: "Accept", points: 2 },
      { text: "Politely decline", points: 2 },
      { text: "Challenge him to something you're actually good at", points: 2 },
      { text: "Ask if the competition involves eating", points: 2 }
    ]},
  { text: "You discover your friend is secretly Loki.",
    category: "chaos", type: "aura",
    options: [
      { text: "Ask for an explanation", points: 2 },
      { text: "Tell everyone", points: 2 },
      { text: "Become Loki's partner in crime", points: 2 },
      { text: "Say, \"I knew it.\"", points: 2 }
    ]},
  { text: "Your friend says, \"I think I'm worthy of Mjölnir.\"",
    category: "chaos", type: "aura",
    options: [
      { text: "Encourage them", points: 2 },
      { text: "Laugh", points: 2 },
      { text: "Tell them to prove it", points: 2 },
      { text: "Hand them a random heavy object first", points: 2 }
    ]},
  { text: "Mjölnir suddenly starts following you everywhere.",
    category: "chaos", type: "aura",
    options: [
      { text: "Accept it", points: 2 },
      { text: "Ask why", points: 2 },
      { text: "Take it home", points: 2 },
      { text: "Pretend this is completely normal", points: 2 }
    ]},
  { text: "You're late for class because Thor needed your help. Your teacher asks why.",
    category: "chaos", type: "aura",
    options: [
      { text: "Tell the truth", points: 2 },
      { text: "Say you had an emergency", points: 2 },
      { text: "Say \"Asgard needed me.\"", points: 2 },
      { text: "Show them Mjölnir as proof", points: 2 }
    ]},
  { text: "Choose one:",
    category: "chaos", type: "aura",
    options: [
      { text: "Mjölnir", points: 2 },
      { text: "Stormbreaker", points: 2 },
      { text: "Loki's magic", points: 2 },
      { text: "Unlimited biriyani", points: 2 }
    ]},
  { text: "Thor asks you to choose his new superhero name.",
    category: "chaos", type: "aura",
    options: [
      { text: "Thor 2.0", points: 2 },
      { text: "Thunder Boy", points: 2 },
      { text: "The Hammer Guy", points: 2 },
      { text: "Something respectable", points: 2 }
    ]},
  { text: "You get one wish from Odin.",
    category: "chaos", type: "aura",
    options: [
      { text: "Unlimited power", points: 2 },
      { text: "Unlimited money", points: 2 },
      { text: "Ability to wield Mjölnir", points: 2 },
      { text: "Unlimited biriyani", points: 2 }
    ]},
  { text: "You're standing in front of Mjölnir and your friend says, \"Just fake being worthy.\"",
    category: "chaos", type: "aura",
    options: [
      { text: "Try it", points: 2 },
      { text: "Laugh", points: 2 },
      { text: "Explain that worthiness cannot be faked", points: 2 },
      { text: "Ask how they plan to fake it", points: 2 }
    ]},

  // ---------------- FINAL JUDGMENT (Q80) ----------------
  { text: "You finally lift Mjölnir. Thor looks at you and says: \"You are worthy.\" What is your first response?",
    category: "final", type: "final",
    options: [
      { text: "\"Thank you.\"", points: 2 },
      { text: "\"I knew it.\"", points: 2 },
      { text: "\"Can I keep it?\"", points: 2 },
      { text: "\"BRO, GET THE CAMERA!\"", points: 3 }
    ]}
];


/* =========================================================
   2. STATE
   These variables hold everything about the quiz in progress.
========================================================= */

let selectedQuestions = [];   // the 15 questions chosen for this attempt
let currentIndex = 0;         // which question (0-14) the player is on
let isAnswering = false;      // blocks double-clicks while we move on

// running totals per score category
let scores = {
  character: { earned: 0, max: 0 },
  knowledge: { earned: 0, max: 0 },
  aura: { earned: 0, max: 0 },
  final: { earned: 0, max: 0 }
};

// dramatic messages shown briefly after each answer
const hammerMessages = [
  "MJÖLNIR HAS RECORDED YOUR ANSWER.",
  "THE HAMMER REMEMBERS.",
  "ODIN IS WATCHING.",
  "THE STORM STIRS...",
  "YOUR WORTH IS BEING WEIGHED."
];


/* =========================================================
   3. HELPER FUNCTIONS
========================================================= */

// Shuffle an array in place (Fisher-Yates shuffle) and return it
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Pick `count` random questions from `pool` without repeating
function pickRandom(pool, count) {
  return shuffleArray([...pool]).slice(0, count);
}

// Build the 15-question set for one attempt:
// 4 character + 4 mjolnir + 4 marvel + 2 chaos + 1 final
function buildQuizSet() {
  const character = questionBank.filter(q => q.category === "character");
  const mjolnir = questionBank.filter(q => q.category === "mjolnir");
  const marvel = questionBank.filter(q => q.category === "marvel");
  const chaos = questionBank.filter(q => q.category === "chaos");
  const final = questionBank.filter(q => q.category === "final");

  const chosen = [
    ...pickRandom(character, 4),
    ...pickRandom(mjolnir, 4),
    ...pickRandom(marvel, 4),
    ...pickRandom(chaos, 2),
    ...pickRandom(final, 1)
  ];

  return shuffleArray(chosen);
}

// Reset all score totals back to zero before a new attempt
function resetScores() {
  scores = {
    character: { earned: 0, max: 0 },
    knowledge: { earned: 0, max: 0 },
    aura: { earned: 0, max: 0 },
    final: { earned: 0, max: 0 }
  };
}

// Record the points for one answered question into the right bucket
function recordAnswer(question, chosenOption) {
  const bucket = scores[question.type]; // type is character/knowledge/aura/final
  const bestPossible = Math.max(...question.options.map(o => o.points));
  bucket.earned += chosenOption.points;
  bucket.max += bestPossible;
}

// Turn a { earned, max } pair into a 0-100 percentage
function toPercent(bucket) {
  if (bucket.max === 0) return 50; // neutral fallback if a bucket never got used
  return Math.round((bucket.earned / bucket.max) * 100);
}

/* Combine the four category percentages into one final worthiness score.
   Character counts for the most, per the project brief. */
function calculateResults() {
  const characterPct = toPercent(scores.character);
  const knowledgePct = toPercent(scores.knowledge);
  const auraPct = toPercent(scores.aura);
  const finalPct = toPercent(scores.final);

  const weighted =
    characterPct * 0.50 +
    knowledgePct * 0.15 +
    auraPct * 0.20 +
    finalPct * 0.15;

  return {
    overall: Math.round(weighted),
    character: characterPct,
    knowledge: knowledgePct,
    aura: auraPct,
    final: finalPct
  };
}

// Look up the worthiness tier (title/emoji/message) for a score 0-100
function getResultTier(score) {
  if (score >= 90) {
    return {
      emoji: "⚡",
      title: "WORTHY",
      line: "\"Mjölnir accepts you.\"",
      message: "Congratulations. You may now carry the hammer. Please use your new powers responsibly."
    };
  } else if (score >= 75) {
    return {
      emoji: "🔨",
      title: "NEARLY WORTHY",
      line: "\"The hammer moved... but not enough.\"",
      message: "You were close. Mjölnir definitely noticed you."
    };
  } else if (score >= 50) {
    return {
      emoji: "⚠️",
      title: "UNDECIDED",
      line: "\"Mjölnir is not convinced.\"",
      message: "The hammer is still thinking."
    };
  } else {
    return {
      emoji: "❌",
      title: "UNWORTHY",
      line: "\"The hammer has spoken. Perhaps try a normal hammer.\"",
      message: "Good news: you saved yourself from accidentally destroying Asgard."
    };
  }
}


/* =========================================================
   4. SCREEN FUNCTIONS
========================================================= */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startQuiz() {
  selectedQuestions = buildQuizSet();
  currentIndex = 0;
  resetScores();
  showScreen("screen-quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = selectedQuestions[currentIndex];
  const total = selectedQuestions.length;

  // update the "QUESTION X OF 15" counter and progress bar
  document.getElementById("question-counter").textContent =
    `QUESTION ${currentIndex + 1} OF ${total}`;
  document.getElementById("progress-fill").style.width =
    `${(currentIndex / total) * 100}%`;

  // update the little category label at the top of the card
  const categoryLabels = {
    character: "CHARACTER",
    mjolnir: "MJÖLNIR & THOR",
    marvel: "MARVEL / ASGARD",
    chaos: "CHAOS",
    final: "FINAL JUDGMENT"
  };
  document.getElementById("question-category").textContent = categoryLabels[question.category];
  document.getElementById("question-text").textContent = question.text;

  // build the 4 answer buttons fresh for this question
  const container = document.getElementById("options-container");
  container.innerHTML = "";
  question.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option.text;
    btn.addEventListener("click", () => selectAnswer(index));
    container.appendChild(btn);
  });

  document.getElementById("hammer-message").classList.remove("show");
  isAnswering = false;
}

function selectAnswer(optionIndex) {
  if (isAnswering) return; // ignore extra clicks while we transition
  isAnswering = true;

  const question = selectedQuestions[currentIndex];
  const chosenOption = question.options[optionIndex];
  recordAnswer(question, chosenOption);

  // highlight the chosen button and lock all of them
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === optionIndex) btn.classList.add("selected");
  });

  // show a mysterious "Mjölnir noticed" message
  const messageEl = document.getElementById("hammer-message");
  messageEl.textContent = hammerMessages[Math.floor(Math.random() * hammerMessages.length)];
  messageEl.classList.add("show");

  // wait a short beat, then move to the next question (or finish)
  setTimeout(() => {
    const card = document.querySelector(".quiz-card");
    card.classList.add("fade-out");

    setTimeout(() => {
      currentIndex++;
      card.classList.remove("fade-out");

      if (currentIndex >= selectedQuestions.length) {
        runJudgmentSequence();
      } else {
        renderQuestion();
      }
    }, 250);
  }, 900);
}

function runJudgmentSequence() {
  document.getElementById("progress-fill").style.width = "100%";
  showScreen("screen-judgment");

  // trigger the lightning flash partway through the transition
  setTimeout(() => {
    document.getElementById("lightning-flash").classList.add("flash");
  }, 900);

  // after the dramatic pause, reveal the result screen
  setTimeout(() => {
    document.getElementById("lightning-flash").classList.remove("flash");
    renderResult();
    showScreen("screen-result");
  }, 2400);
}

function renderResult() {
  const results = calculateResults();
  const tier = getResultTier(results.overall);

  document.getElementById("result-emoji").textContent = tier.emoji;
  document.getElementById("result-title").textContent = tier.title;
  document.getElementById("result-line").textContent = tier.line;
  document.getElementById("result-funny-message").textContent = tier.message;

  document.getElementById("score-hero-value").textContent = `${results.overall}%`;
  document.getElementById("score-character").textContent = `${results.character}%`;
  document.getElementById("score-knowledge").textContent = `${results.knowledge}%`;
  document.getElementById("score-aura").textContent = `${results.aura}%`;
  document.getElementById("score-final").textContent = `${results.final}%`;

  // stash the latest result so the share button can use it
  window.__latestResult = { results, tier };
}

async function shareResult() {
  const data = window.__latestResult;
  if (!data) return;

  const shareText =
    `I scored ${data.results.overall}% on "Are You Worthy of Mjölnir?" — ${data.tier.title} ${data.tier.emoji}`;

  if (navigator.share) {
    try {
      await navigator.share({ text: shareText, title: "Are You Worthy of Mjölnir?" });
    } catch (err) {
      // user cancelled the share sheet — nothing to do
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareText);
      const btn = document.getElementById("btn-share");
      const original = btn.textContent;
      btn.textContent = "COPIED TO CLIPBOARD ✅";
      setTimeout(() => { btn.textContent = original; }, 1800);
    } catch (err) {
      alert(shareText);
    }
  }
}


/* =========================================================
   5. EVENT LISTENERS
========================================================= */

document.getElementById("btn-start").addEventListener("click", startQuiz);
document.getElementById("btn-retry").addEventListener("click", startQuiz);
document.getElementById("btn-share").addEventListener("click", shareResult);


/* =========================================================
   6. BACKGROUND PARTICLES
   A very small canvas animation: soft drifting dots, like dust
   or distant stars, so the page never feels flat. Kept simple
   on purpose so it stays fast even on low-end laptops/phones.
========================================================= */

(function backgroundParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(111, 216, 255, 1)";
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) p.y = canvas.height;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  tick();
})();
