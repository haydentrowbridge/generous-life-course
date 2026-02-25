import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Design Tokens — Warm & Natural ───
const T = {
  // Backgrounds
  bg: "#F5F0E8",           // warm parchment
  bgCard: "#FFFFFF",        // clean white cards
  bgElevated: "#FBF8F2",   // slightly warm white
  bgSubtle: "#EDE8DC",     // muted tan
  border: "rgba(120,100,70,0.12)",
  borderLight: "rgba(120,100,70,0.06)",

  // Text
  text: "#2C2416",          // deep warm brown
  textBody: "#4A3F30",      // readable brown
  textMuted: "#8A7E6C",     // warm gray
  textDim: "#B5A994",       // light tan

  // Accent — sage green
  sage: "#6B8F71",
  sageSoft: "rgba(107,143,113,0.08)",
  sageMedium: "rgba(107,143,113,0.15)",
  sageText: "#4A7050",

  // Warm accent — golden
  gold: "#C4943A",
  goldSoft: "rgba(196,148,58,0.08)",
  goldMedium: "rgba(196,148,58,0.15)",

  // Earthy accent — terracotta
  terra: "#B87352",
  terraSoft: "rgba(184,115,82,0.08)",

  // Prayer/spiritual — soft purple-mauve
  spirit: "#8B7BA0",
  spiritSoft: "rgba(139,123,160,0.08)",

  // Success
  complete: "#6B8F71",
  completeSoft: "rgba(107,143,113,0.1)",
};

const serif = "'Cormorant Garamond', 'Georgia', serif";
const sans = "'DM Sans', -apple-system, sans-serif";

// ─── Emotional Arc Colors ───
const ARC_COLORS = {
  INSPIRED: T.sage,
  SOBERED: T.terra,
  CONVICTED: T.spirit,
  EQUIPPED: T.gold,
  JOYFUL: T.sage,
};

// ─── Module Data ───
const MODULES = [
  // ── MODULE 1: VISION ──
  {
    id: 1,
    subtitle: "Vision",
    title: "What Is Generosity?",
    speaker: "John Manning",
    scripture: "2 Corinthians 8:1\u20135, 9:6\u20138",
    formationGoal: "Inspiration \u2014 see generosity as a pathway to knowing God",
    arc: "INSPIRED",
    description: "Explore what biblical generosity looks like through the story of the Macedonian church and one man's journey from comfort to radical giving.",
    timeSermon: "~43 min",
    timeActivity: "~15 min",
    vimeoId: "1071145301",
    completionMessage: "You\u2019ve taken the first step. Manning said generosity is a pathway to intimacy with God. Let that settle in this week.",
    closingPrayer: "God, show me where my relationship with money stands. I\u2019m not asking you to fix it all today \u2014 I\u2019m asking you to help me see clearly. Where have I forgotten that everything I have comes from you? Where am I holding on too tightly? Open my eyes. Amen.",
    pauseTimestamps: [
      { time: 180, segmentIndex: 0 },
      { time: 540, segmentIndex: 1 },
      { time: 840, segmentIndex: 2 },
      { time: 1320, segmentIndex: 3 },
      { time: 1740, segmentIndex: 4 },
      { time: 2040, segmentIndex: 5 },
      { time: 2400, segmentIndex: 6 },
      { time: 2580, segmentIndex: 7 },
    ],
    segments: [
      {
        id: "intro", title: "Welcome & Introduction", duration: "3 min",
        summary: "Manning introduces the Holy Habits series and the invitation to explore biblical generosity \u2014 not as a financial strategy, but as a pathway to knowing God more deeply.",
        progress: 0,
      },
      {
        id: "definition", title: "Defining Generosity", duration: "6 min",
        summary: "Walking through the four-layer definition from the Holy Habits guidebook: willing, sacrificial, joyful, and without expecting anything in return. Each layer builds on the last.",
        progress: 10,
        pauseAfter: { type: "question", question: "Which of these four qualities of generosity feels most challenging to you right now?", options: ["Willing", "Sacrificial", "Joyful", "Selfless"] },
      },
      {
        id: "macedonians", title: "The Macedonian Church", duration: "5 min",
        summary: "A church in severe affliction and extreme poverty whose abundance of joy overflowed in a wealth of generosity. They begged Paul for the chance to give more.",
        scripture: "We want you to know, brothers, about the grace of God that has been given among the churches of Macedonia, for in a severe test of affliction, their abundance of joy and their extreme poverty have overflowed in a wealth of generosity on their part.",
        scriptureRef: "2 Corinthians 8:1\u20132",
        progress: 22,
        pauseAfter: { type: "question", question: "People in extreme poverty, begging for the chance to give. What\u2019s your honest first reaction?", options: ["Inspiring \u2014 I want that kind of heart", "Confusing \u2014 how is that even possible?", "Convicting \u2014 I have so much more and give so much less", "All of the above"] },
      },
      {
        id: "gospel", title: "God\u2019s Generosity Through the Gospel", duration: "8 min",
        summary: "Creation \u2192 Fall \u2192 Redemption \u2192 Restoration. God is the most generous being in the universe. We give because He first gave. Common grace \u2014 every breath, every meal, every sunrise \u2014 is a gift.",
        progress: 36,
        pauseAfter: { type: "prayer", prompt: "Take a moment. Thank God for three specific things He\u2019s given you today that you didn\u2019t earn.", duration: "30 seconds" },
      },
      {
        id: "shifts", title: "Three Shifts", duration: "7 min",
        summary: "Ownership \u2192 Stewardship. Scarcity \u2192 Abundance. Believing \u2192 Treasuring. \"What is your ultimate treasure? If you want to know what your heart treasures, follow the money.\"",
        progress: 52,
        pauseAfter: { type: "question", question: "Where does your money flow most effortlessly?", options: ["Lifestyle & comfort", "Savings & security", "Giving & kingdom", "I honestly don\u2019t know"] },
      },
      {
        id: "scarcity", title: "Scarcity vs. Abundance", duration: "5 min",
        summary: "The Macedonians had an abundance mindset in extreme poverty. Manning says changing your mindset is not about changing your circumstances \u2014 it\u2019s about changing where you look.",
        progress: 66,
        pauseAfter: { type: "question", question: "Do you tend toward a scarcity mindset or an abundance mindset with money?", options: ["Scarcity \u2014 I worry there won\u2019t be enough", "Abundance \u2014 I trust God will provide", "It depends on the season", "I\u2019ve never really thought about it"] },
      },
      {
        id: "story", title: "Manning\u2019s Personal Story", duration: "6 min",
        summary: "From a $100K home theater and BMW to giving away 50% of his income. His wife Julie\u2019s challenge: \"I need to know that you can walk away from all of this.\" Generosity as a pathway to intimacy with God.",
        progress: 80,
        pauseAfter: { type: "question", question: "Is there someone in your life with enough relational trust to challenge you about your money?", options: ["Yes \u2014 and they have", "Yes \u2014 but they haven\u2019t yet", "No \u2014 I don\u2019t have that person", "I\u2019m not sure I\u2019d want that"], followUp: "If not, why not? What would it take to invite someone into that level of honesty?" },
      },
      {
        id: "closing", title: "Closing & Commission", duration: "3 min",
        summary: "Manning points to the God & Money series for deeper study and commissions the church to pursue the generous life \u2014 not out of guilt, but out of joy.",
        progress: 94,
        pauseAfter: { type: "prayer", prompt: "God, show me where my relationship with money stands. I\u2019m not asking you to fix it all today \u2014 I\u2019m asking you to help me see clearly. Where have I forgotten that everything I have comes from you? Where am I holding on too tightly? Open my eyes. Amen.", duration: "60 seconds" },
      },
    ],
    holyHabits: [
      {
        id: "definition", title: "The Generosity Definition", type: "reading",
        content: [
          { layer: "Generosity is a willingness to give.", note: "It is not driven by guilt or compulsion. It does not give from obligation or pressure. Generosity springs from the heart of someone who holds their possessions loosely, knowing God has willingly given us life, breath, and everything." },
          { layer: "Generosity is a willingness to give sacrificially.", note: "If our giving isn\u2019t at least a little bit painful, it isn\u2019t generous. True generosity is costly, where the sacrifice is significant and our hearts declare that Jesus \u2014 not money \u2014 is our treasure." },
          { layer: "Generosity is a willingness to give sacrificially and joyfully.", note: "It is the joyful overflow of a heart so satisfied in Christ that it gladly sacrifices for the sake of others. The generous heart knows that the greatest treasure is not what is given up, but what is gained in Christ." },
          { layer: "Generosity is a willingness to give sacrificially and joyfully without expecting anything in return.", note: "Generosity gives freely. It does not seek repayment. It mirrors the selfless grace of God, who lavishly gives from His unconditional love, not for what He can gain." },
        ],
      },
      {
        id: "scripture-study", title: "Study: 2 Corinthians 8:1\u20135", type: "scripture",
        passage: "We want you to know, brothers, about the grace of God that has been given among the churches of Macedonia, for in a severe test of affliction, their abundance of joy and their extreme poverty have overflowed in a wealth of generosity on their part. For they gave according to their means, as I can testify, and beyond their means, of their own accord, begging us earnestly for the favor of taking part in the relief of the saints \u2014 and this, not as we expected, but they gave themselves first to the Lord and then by the will of God to us.",
        ref: "2 Corinthians 8:1\u20135",
        questions: [
          "Describe the surprising generosity of the Macedonian church. Why do you think Paul describes their actions as a \"wealth of generosity\"?",
          "What do you think was going on in the hearts of the people in that church?",
        ],
      },
      {
        id: "reflect", title: "Reflect & Respond", type: "reflect",
        questions: [
          "In what ways has God modeled sacrificial, joyful, selfless generosity in sending His own Son?",
          "Who has demonstrated generosity in your own life? How did their generosity affect you?",
        ],
      },
    ],
  },

  // ── MODULE 2: FOUNDATION ──
  {
    id: 2,
    subtitle: "Foundation",
    title: "Everything Belongs to God",
    speaker: "Ross Lester",
    scripture: "Luke 12:15\u201334",
    formationGoal: "Understanding \u2014 internalize that everything comes from God, belongs to God, and provides an opportunity to worship God",
    arc: "SOBERED",
    description: "Discover what the Bible actually says about money \u2014 and why it says so much. Ross Lester walks through the parable of the Rich Fool and three observations that change everything.",
    timeSermon: "~39 min",
    timeActivity: "~20 min",
    // Ross Lester — God & Money Part 1 (Jan 22, 2023)
    vimeoId: "791645780",
    completionMessage: "You\u2019ve looked at what the Bible says about money \u2014 and it said a lot. Ross\u2019s words may have sobered you. That\u2019s good. Clarity is the first step to freedom.",
    closingPrayer: "Father, I confess that I often forget that everything I have comes from you. Help me see my pay, my savings, my possessions not as mine but as yours. Show me where I\u2019ve made money a functional god in my life. I want to worship you, not Mammon. Give me the courage to be honest about where I really am. Amen.",
    pauseTimestamps: [
      { time: 300, segmentIndex: 0 },
      { time: 600, segmentIndex: 1 },
      { time: 960, segmentIndex: 2 },
      { time: 1380, segmentIndex: 3 },
      { time: 1800, segmentIndex: 4 },
      { time: 2160, segmentIndex: 5 },
      { time: 2340, segmentIndex: 6 },
    ],
    segments: [
      {
        id: "m2-intro", title: "Why Talk About Money?", duration: "5 min",
        summary: "The Bible contains 2,350 verses about money. 15-20% of Jesus\u2019 recorded teaching is about money \u2014 the single most popular topic outside of the Kingdom of Heaven.",
        progress: 0,
      },
      {
        id: "m2-stats", title: "The Biblical Weight of Money", duration: "5 min",
        summary: "Ross shares the staggering frequency of money in Scripture and confesses that money may be his biggest area of struggle against idolatry.",
        progress: 12,
        pauseAfter: { type: "question", question: "Ross says money may be his biggest area of struggle against idolatry. On a scale of 1-10, how much does money occupy your thinking on a daily basis?", options: ["1-3 \u2014 Rarely think about it", "4-6 \u2014 It\u2019s there but manageable", "7-8 \u2014 More than I\u2019d like to admit", "9-10 \u2014 It dominates my thoughts"] },
      },
      {
        id: "m2-warnings", title: "Biblical Warnings About Wealth", duration: "6 min",
        summary: "1 Timothy 6, Luke 6, James 5 \u2014 \u2018Woe to you who are rich.\u2019 Jesus flips the cultural assumption. The Bible offers consolation to the poor and warning to those who desire to be rich.",
        progress: 24,
        pauseAfter: { type: "question", question: "Ross says the Bible offers \u2018consolation to the poor and warning to those who desire to be rich.\u2019 Which side of that do you need to hear today?", options: ["The consolation \u2014 I\u2019m struggling financially", "The warning \u2014 I\u2019m comfortable and maybe too comfortable", "Both \u2014 I feel tension on both sides", "I\u2019m not sure yet"] },
      },
      {
        id: "m2-rich-fool", title: "The Rich Fool \u2014 Luke 12", duration: "7 min",
        summary: "Jesus tells the parable of the man who built bigger barns. \u2018One\u2019s life does not consist in the abundance of his possessions.\u2019 That night, his soul was required of him.",
        scripture: "And he told them a parable, saying, \u2018The land of a rich man produced plentifully, and he thought to himself, \"What shall I do, for I have nowhere to store my crops?\" And he said, \"I will tear down my barns and build larger ones.\" But God said to him, \"Fool! This night your soul is required of you.\"\u2019",
        scriptureRef: "Luke 12:16\u201320",
        progress: 40,
        pauseAfter: { type: "question", question: "\u2018One\u2019s life does not consist in the abundance of his possessions.\u2019 Do you believe that? Where in your life does your behavior contradict it?", options: ["I believe it \u2014 and I mostly live it", "I believe it \u2014 but my spending tells a different story", "I\u2019m honestly not sure I believe it", "I want to believe it but I\u2019m afraid"] },
      },
      {
        id: "m2-three-observations", title: "Three Observations from Luke 12", duration: "7 min",
        summary: "Everything comes from God. Everything still belongs to God. Everything provides an opportunity to worship. Martin Luther said the purse is one of the last things to be converted.",
        progress: 58,
        pauseAfter: { type: "question", question: "Luther said there are three conversions: the heart, the mind, and the purse \u2014 and the purse is last. Has your purse been converted? What would that even look like?", options: ["Yes \u2014 my giving reflects my faith", "Partly \u2014 my heart is ahead of my wallet", "No \u2014 money is the last thing I\u2019ve surrendered", "I\u2019ve never thought about it that way"], followUp: "What would a \u2018converted purse\u2019 look like practically in your life?" },
      },
      {
        id: "m2-applications", title: "Five Applications", duration: "6 min",
        summary: "Remember, acknowledge, audit, walk in community, ask God. \u2018Follow the money \u2014 that\u2019s the best indicator of where your heart is leaning.\u2019",
        progress: 76,
        pauseAfter: { type: "question", question: "If someone looked at your bank statement from last month, what would they say you worship?", options: ["Comfort and convenience", "Security and control", "Experiences and entertainment", "Generosity and kingdom"] },
      },
      {
        id: "m2-closing", title: "Closing", duration: "3 min",
        summary: "Ross invites the church to take a next step \u2014 to remember that everything belongs to God and to begin managing money as stewards, not owners.",
        progress: 92,
        pauseAfter: { type: "prayer", prompt: "Father, I confess that I often forget that everything I have comes from you. Help me see my pay, my savings, my possessions not as mine but as yours. Show me where I\u2019ve made money a functional god in my life. I want to worship you, not Mammon. Give me the courage to be honest about where I really am. Amen.", duration: "60 seconds" },
      },
    ],
    holyHabits: [
      {
        id: "m2-journal", title: "The Money Autobiography", type: "journal",
        intro: "Before you can change your relationship with money, you need to understand it. Take 15\u201320 minutes to honestly explore your personal money story.",
        prompts: [
          "What did your family teach you about money growing up \u2014 both spoken and unspoken?",
          "When did you first start earning money? How did that feel?",
          "What\u2019s the most generous thing anyone has ever done for you?",
          "What\u2019s the most generous thing you\u2019ve ever done?",
          "Right now, what\u2019s your honest emotional relationship with money \u2014 fear, comfort, control, guilt, or freedom?",
        ],
      },
      {
        id: "m2-reflect", title: "Reflect & Respond", type: "reflect",
        questions: [
          "Looking at what you wrote, what patterns do you see? Where did your current relationship with money come from?",
          "Ross says \u2018everything comes from God, belongs to God, and provides an opportunity to worship.\u2019 How does that statement land after writing your money autobiography?",
        ],
      },
    ],
  },

  // ── MODULE 3: HEART ──
  {
    id: 3,
    subtitle: "Heart",
    title: "The Worship Money Demands",
    speaker: "Halim Suh",
    scripture: "Mark 10:17\u201322",
    formationGoal: "Conviction \u2014 recognize money\u2019s grip on your heart; see generosity as a salvation issue, not just a stewardship issue",
    arc: "CONVICTED",
    description: "Halim Suh reveals how money quietly demands our worship. Through the story of the Rich Young Ruler, discover why Jesus treats money as a salvation issue.",
    timeSermon: "~35 min",
    timeActivity: "~15 min",
    // Halim Suh — God & Money Part 2 (Jan 29, 2023)
    vimeoId: "793864267",
    completionMessage: "Halim\u2019s sermon cuts deep. Money\u2019s grip is real, but so is the freedom Jesus offers. Let conviction lead you to the cross, not to guilt.",
    closingPrayer: "Jesus, you were the true Rich Young Ruler. You gave up everything \u2014 your glory, your comfort, your life \u2014 to be with me. Forgive me for the ways I\u2019ve let money become what the Father is to you. Show me where money has captured my heart. I don\u2019t want to walk away sorrowful. I want to follow you. Whatever it costs. Amen.",
    pauseTimestamps: [
      { time: 300, segmentIndex: 0 },
      { time: 660, segmentIndex: 1 },
      { time: 1020, segmentIndex: 2 },
      { time: 1440, segmentIndex: 3 },
      { time: 1800, segmentIndex: 4 },
      { time: 2100, segmentIndex: 5 },
    ],
    segments: [
      {
        id: "m3-intro", title: "Money as a Salvation Issue", duration: "5 min",
        summary: "The Rich Young Ruler wants to talk about salvation. Jesus says \u2018let\u2019s talk about your money.\u2019 In Jesus\u2019s mind, money IS a salvation issue \u2014 not just a stewardship issue.",
        progress: 0,
        pauseAfter: { type: "question", question: "Does it surprise you that Jesus treated money as a salvation issue, not just a stewardship issue? Why or why not?", options: ["Yes \u2014 I\u2019ve always seen money as a separate topic from salvation", "No \u2014 I\u2019ve felt the connection but couldn\u2019t articulate it", "It makes me uncomfortable", "I need to hear more before I decide"] },
      },
      {
        id: "m3-worship", title: "The Worship Money Demands", duration: "6 min",
        summary: "Money is a god that \u2018requires no loyalty\u2019 \u2014 it appears to make no demands upon your life but only seeks to serve your demands. Trusting, longing, hoping, wanting \u2014 these are worship words.",
        progress: 16,
        pauseAfter: { type: "question", question: "Halim says money \u2018appears to make no demands upon your life but only seeks to serve your demands.\u2019 Where have you experienced that deception?", options: ["I\u2019ve told myself money is just a tool \u2014 no strings attached", "I\u2019ve noticed money quietly reshaping my priorities", "I\u2019ve felt its demands but couldn\u2019t name them until now", "I\u2019m not sure I see it as deception"] },
      },
      {
        id: "m3-traps", title: "The Traps Money Sets", duration: "6 min",
        summary: "Money breeds arrogance and moral superiority. Tim Keller: when you succeed financially, you generalize that success into all areas of life. And the trap that money will always be there \u2014 but \u2018we brought nothing into the world and we cannot take anything out.\u2019",
        progress: 32,
        pauseAfter: { type: "question", question: "Have you ever caught yourself feeling morally superior to someone who has less than you? What was that moment like?", options: ["Yes \u2014 and it shames me to admit it", "Yes \u2014 but I didn\u2019t recognize it until now", "I don\u2019t think so \u2014 but maybe I\u2019m blind to it", "This question makes me defensive, which probably means something"] },
      },
      {
        id: "m3-grief", title: "The Rich Young Ruler\u2019s Grief", duration: "7 min",
        summary: "The same Greek word \u2014 perilypos, meaning \u2018deeply grieved\u2019 \u2014 is used for the Rich Young Ruler walking away AND for Jesus in the Garden of Gethsemane. Money had become for this young man what the Father was to Jesus.",
        scripture: "Jesus, looking at him, loved him, and said to him, \u2018You lack one thing: go, sell all that you have and give to the poor, and you will have treasure in heaven; and come, follow me.\u2019 Disheartened by the saying, he went away sorrowful, for he had great possessions.",
        scriptureRef: "Mark 10:21\u201322",
        progress: 50,
        pauseAfter: { type: "question", question: "If Jesus told you to sell everything you have and follow him, could you do it? What\u2019s your honest first reaction?", options: ["Yes \u2014 I\u2019d like to think so", "No \u2014 and that terrifies me", "I\u2019d want to negotiate", "I honestly don\u2019t know"], followUp: "Sit with your answer. What does it reveal about the grip money has on your heart?" },
      },
      {
        id: "m3-escape", title: "Two Escapes: Radical Giving & Radical Contentment", duration: "6 min",
        summary: "We escape money\u2019s trap through radical giving and radical contentment. Jesus was \u2018the true Rich Young Ruler that went and sold all that he had in order to be with us.\u2019",
        progress: 68,
        pauseAfter: { type: "question", question: "Halim says we escape money\u2019s trap through radical giving and radical contentment. Which one feels harder for you to practice?", options: ["Radical giving \u2014 letting go of money is terrifying", "Radical contentment \u2014 I always want more", "Both feel equally impossible", "Neither \u2014 I think I\u2019m already there (but am I?)"] },
      },
      {
        id: "m3-gospel", title: "Jesus: The True Rich Young Ruler", duration: "5 min",
        summary: "Jesus was the true Rich Young Ruler. He gave up everything \u2014 his glory, his comfort, his life \u2014 to be with us. Our generosity reflects, in some measure, his generosity.",
        progress: 84,
        pauseAfter: { type: "prayer", prompt: "Jesus, you were the true Rich Young Ruler. You gave up everything \u2014 your glory, your comfort, your life \u2014 to be with me. Forgive me for the ways I\u2019ve let money become what the Father is to you. Show me where money has captured my heart. I don\u2019t want to walk away sorrowful. I want to follow you. Whatever it costs. Amen.", duration: "60 seconds" },
      },
    ],
    holyHabits: [
      {
        id: "m3-scripture-study", title: "Study: 2 Corinthians 9:6\u20138", type: "scripture",
        passage: "The point is this: whoever sows sparingly will also reap sparingly, and whoever sows bountifully will also reap bountifully. Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver. And God is able to make all grace abound to you, so that having all sufficiency in all things at all times, you may abound in every good work.",
        ref: "2 Corinthians 9:6\u20138",
        questions: [
          "What does it mean for someone to give \u2018reluctantly or under compulsion\u2019? Where do you see this in yourself?",
          "Describe what you think it means to be a \u2018cheerful giver.\u2019 Is that you?",
        ],
      },
      {
        id: "m3-reflect", title: "The Heart Audit", type: "reflect",
        questions: [
          "Generosity is a willingness to give sacrificially and joyfully without expecting anything in return. In what ways has God modeled that for us in sending His own Son?",
          "How has generosity been modeled well for you? Who has demonstrated generosity in your own life, and how did that affect you?",
          "After hearing Halim\u2019s sermon, where do you sense money has the strongest grip on your heart right now?",
        ],
      },
    ],
  },

  // ── MODULE 4: PRACTICE ──
  {
    id: 4,
    subtitle: "Practice",
    title: "Managing Money God\u2019s Way",
    speaker: "Ross Lester",
    scripture: "Philippians 4:11\u201313; Ecclesiastes 5",
    formationGoal: "Action \u2014 learn the secret of contentment; build practical frameworks for God-honoring money management",
    arc: "EQUIPPED",
    description: "Ross Lester reframes Philippians 4:13 and walks through nine biblical principles for managing money. This is where conviction becomes action.",
    timeSermon: "~35 min",
    timeActivity: "~20 min",
    // Ross Lester — God & Money Part 3 (Feb 5, 2023)
    vimeoId: "796050707",
    completionMessage: "You now have practical tools for managing money God\u2019s way. Head knowledge becomes heart change through practice. Start this week.",
    closingPrayer: "Holy Spirit, I\u2019m asking you to rule my budget. Show me where I\u2019m spending on things that don\u2019t reflect your values. Give me the supernatural contentment that Paul learned \u2014 in plenty and in hunger. I don\u2019t want to manage my money the world\u2019s way. I want to manage it your way, even when that means giving up things I\u2019ve told myself I need. Make me free. Amen.",
    pauseTimestamps: [
      { time: 360, segmentIndex: 0 },
      { time: 720, segmentIndex: 1 },
      { time: 1020, segmentIndex: 2 },
      { time: 1440, segmentIndex: 3 },
      { time: 1860, segmentIndex: 4 },
      { time: 2100, segmentIndex: 5 },
    ],
    segments: [
      {
        id: "m4-reframe", title: "The Real Meaning of \u2018I Can Do All Things\u2019", duration: "6 min",
        summary: "Philippians 4:13 is not about athletic achievement \u2014 it\u2019s about contentment. Paul \u2018learned\u2019 it. It\u2019s a \u2018secret.\u2019 It requires supernatural power from Christ.",
        scripture: "I have learned in whatever situation I am to be content. I know how to be brought low, and I know how to abound. In any and every circumstance, I have learned the secret of facing plenty and hunger, abundance and need. I can do all things through him who strengthens me.",
        scriptureRef: "Philippians 4:11\u201313",
        progress: 0,
        pauseAfter: { type: "question", question: "Have you ever used \u2018I can do all things through Christ\u2019 as a motivational quote? How does its real context \u2014 contentment with money \u2014 change how you hear it?", options: ["Completely reframed \u2014 I had no idea", "I knew the context but it still hits differently", "It makes the verse harder, not easier", "I need to sit with this"] },
      },
      {
        id: "m4-diagnosis", title: "The Ecclesiastes 5 Diagnosis", duration: "6 min",
        summary: "\u2018He who loves money will not be satisfied with money.\u2019 Increased possessions means increased responsibility. \u2018The full stomach of the rich will not let him sleep.\u2019 Eating in darkness, vexation, sickness, anger.",
        progress: 16,
        pauseAfter: { type: "question", question: "Ross contrasts the sleep of a laborer with the sleeplessness of the rich. Where in your life has money brought you anxiety instead of peace?", options: ["Worrying about not having enough", "Worrying about protecting what I have", "Comparison with others\u2019 lifestyles", "The burden of financial decisions"] },
      },
      {
        id: "m4-alternative", title: "The Ecclesiastes Alternative", duration: "5 min",
        summary: "\u2018Accept his lot and rejoice in his toil \u2014 this is the gift of God.\u2019 Instead of striving for more, God offers a different kind of wealth: \u2018God keeps him occupied with joy in his heart.\u2019",
        progress: 30,
        pauseAfter: { type: "question", question: "What would it look like for you to \u2018accept your lot and rejoice in your toil\u2019 this week?", options: ["Stop comparing my lifestyle to others", "Thank God for what I have instead of fixating on what I don\u2019t", "Find joy in my actual work, not just my paycheck", "I honestly don\u2019t know \u2014 contentment feels foreign"] },
      },
      {
        id: "m4-principles-1", title: "Principles 1\u20135: Work, Submit, Save, Give, Use Debt Sparingly", duration: "7 min",
        summary: "Ross walks through nine biblical principles. The first five: work hard, submit your spending to the Spirit\u2019s rule, save wisely, give faithfully, and use debt sparingly.",
        progress: 44,
        pauseAfter: { type: "question", question: "Ross confessed that his family redefined wants as needs after moving to the US. Where have you done the same thing?", options: ["Housing \u2014 I \u2018need\u2019 more space than I really do", "Food & dining \u2014 convenience has become necessity", "Technology \u2014 I upgrade when I don\u2019t need to", "I\u2019m honestly not sure where the line is anymore"] },
      },
      {
        id: "m4-principles-2", title: "Principles 6\u20139: Multi-Generational, Redemptive, Orient to Poor, Remember", duration: "7 min",
        summary: "Think multi-generational, invest redemptively, orient toward the poor, and remember who is with you. Ross\u2019s friend told him his credit card debt was a \u2018fundamental lack of faith in God\u2019s provision.\u2019",
        progress: 62,
        pauseAfter: { type: "question", question: "Ross\u2019s friend told him his credit card debt was a \u2018fundamental lack of faith.\u2019 Is there an area of your finances where you\u2019re trusting the bank instead of God?", options: ["Yes \u2014 credit card debt is funding my lifestyle", "Yes \u2014 I use debt to maintain appearances", "Maybe \u2014 I haven\u2019t thought of debt as a faith issue before", "No \u2014 but this question is making me look harder"], followUp: "What would it look like to trust God in that specific area instead?" },
      },
      {
        id: "m4-closing", title: "Closing", duration: "4 min",
        summary: "Ross invites the church to take practical next steps \u2014 not out of guilt, but out of the supernatural contentment that Paul learned.",
        progress: 82,
        pauseAfter: { type: "prayer", prompt: "Holy Spirit, I\u2019m asking you to rule my budget. Show me where I\u2019m spending on things that don\u2019t reflect your values. Give me the supernatural contentment that Paul learned \u2014 in plenty and in hunger. I don\u2019t want to manage my money the world\u2019s way. I want to manage it your way, even when that means giving up things I\u2019ve told myself I need. Make me free. Amen.", duration: "60 seconds" },
      },
    ],
    holyHabits: [
      {
        id: "m4-tier-select", title: "Growing in Generosity", type: "tiered",
        intro: "Select the category that best describes where you are right now. Be honest \u2014 there\u2019s no wrong answer.",
        tiers: [
          {
            label: "Start Giving",
            description: "You\u2019re not currently giving regularly, or you want to begin with intentionality.",
            prompts: [
              "Assess your heart: what has kept you from giving consistently?",
              "Calculate your current monthly income (approximate is fine).",
              "Set a starting amount and percentage you want to give. What feels like a real sacrifice but not reckless?",
              "Where will your giving go \u2014 your local church, other causes, or a mix?",
            ],
          },
          {
            label: "Increase Your Giving",
            description: "You\u2019re already giving, but it\u2019s comfortable or your income has increased without your giving adjusting.",
            prompts: [
              "What percentage of your income do you currently give?",
              "Has your income increased since you set that amount? By how much?",
              "What new percentage would feel like a genuine stretch of faith?",
              "What specific thing would you need to cut or change to make this increase possible?",
            ],
          },
          {
            label: "Get Out of Debt",
            description: "Debt is preventing you from being as generous as you want to be.",
            prompts: [
              "List your creditors and approximate total debt (you don\u2019t have to be exact).",
              "Name one person you trust who could help you make a plan to get out of debt.",
              "Set a date this week to meet with that person. When will it be?",
              "While you\u2019re paying down debt, what small amount can you still give faithfully?",
            ],
          },
        ],
      },
      {
        id: "m4-lifestyle-audit", title: "The Lifestyle Audit", type: "reflect",
        questions: [
          "If somebody did an audit of your life and spending habits, what would they conclude about what you treasure?",
          "Identify one area of your spending that is excessive or unnecessary.",
          "What\u2019s one actionable change you can make this month?",
          "Who will you share this plan with to hold you accountable?",
        ],
      },
    ],
  },

  // ── MODULE 5: JOY ──
  {
    id: 5,
    subtitle: "Joy",
    title: "The Greater Blessing",
    speaker: "Kevin Peck",
    scripture: "2 Corinthians 8:1\u20135, 9; 9:6\u201312",
    formationGoal: "Ongoing formation \u2014 discover that generosity leads to indestructible, multiplying joy; make a commitment to live generously",
    arc: "JOYFUL",
    description: "Kevin Peck reveals the greater blessing \u2014 a joy that\u2019s indestructible and multiplying. This is the capstone: where the generous life begins.",
    timeSermon: "~38 min",
    timeActivity: "~20 min",
    // Kevin Peck — God & Money Part 4 (Feb 12, 2023)
    vimeoId: "798219923",
    completionMessage: "The generous life isn\u2019t about deprivation \u2014 it\u2019s about a joy the world can\u2019t give and can\u2019t take away. Enter into it.",
    closingPrayer: "Father, you are the most generous being in the universe. You gave your Son. You gave your Spirit. You give me breath every morning. I want to enter the joy of giving \u2014 the indestructible, multiplying joy. I\u2019m tired of making mud pies when you\u2019re offering me the ocean. Here is my commitment. Hold me to it. Surround me with people who will hold me to it. And let me taste the joy that is more blessed to give than to receive. In Jesus\u2019 name, amen.",
    pauseTimestamps: [
      { time: 300, segmentIndex: 0 },
      { time: 600, segmentIndex: 1 },
      { time: 1020, segmentIndex: 2 },
      { time: 1380, segmentIndex: 3 },
      { time: 1680, segmentIndex: 4 },
      { time: 2040, segmentIndex: 5 },
      { time: 2280, segmentIndex: 6 },
    ],
    segments: [
      {
        id: "m5-joy-connection", title: "Joy and Money \u2014 The Connection", duration: "5 min",
        summary: "Westminster Catechism: the chief end of man is to \u2018glorify God and enjoy Him forever.\u2019 Kevin says everything God gives or withholds is so we can glorify God and enjoy Him. There are two ways to enjoy God with money.",
        progress: 0,
        pauseAfter: { type: "question", question: "Kevin says everything God gives or withholds is so we can \u2018glorify God and enjoy Him forever.\u2019 Do you experience your money as a source of enjoying God, or mostly as a source of stress?", options: ["Mostly stress \u2014 money feels like a burden", "Some enjoyment, but more anxiety than I\u2019d like", "I enjoy what money provides but rarely connect it to God", "I genuinely see money as a way to enjoy God"] },
      },
      {
        id: "m5-receiving", title: "Enjoying God by Receiving", duration: "5 min",
        summary: "Receiving gifts from God should lead to enjoying the Giver, not just the gift. But money wants to replace your God \u2014 \u2018money wants to be your father.\u2019",
        progress: 14,
        pauseAfter: { type: "question", question: "When was the last time you received something that money bought and genuinely thanked God for it \u2014 not as a ritual, but from real gratitude?", options: ["Recently \u2014 I try to practice this regularly", "I can think of a time, but it\u2019s been a while", "I\u2019m not sure I\u2019ve ever consciously done that", "This is convicting \u2014 I enjoy the gift but forget the Giver"] },
      },
      {
        id: "m5-indestructible", title: "The Greater Joy \u2014 Indestructible Joy", duration: "7 min",
        summary: "The Macedonians: severe affliction + extreme poverty \u2192 overflowing joy + wealth of generosity. \u2018Were they joyful and therefore generous, or generous and therefore joyful? Yes.\u2019 There\u2019s a joy that even when the world takes everything away, it doesn\u2019t touch your joy.",
        progress: 30,
        pauseAfter: { type: "question", question: "Kevin describes a joy that\u2019s \u2018indestructible\u2019 \u2014 it can\u2019t be taken away because it came from giving, not receiving. Have you ever experienced that?", options: ["Yes \u2014 giving has brought me a joy nothing else can", "Maybe \u2014 I\u2019ve had glimpses but nothing sustained", "No \u2014 but I want to", "I\u2019m skeptical \u2014 that sounds too good to be true"] },
      },
      {
        id: "m5-multiplying", title: "The Multiplying Joy", duration: "6 min",
        summary: "Sowing sparingly vs. bountifully. Seed consumed vs. seed planted. C.S. Lewis: \u2018We are far too easily pleased\u2019 \u2014 making mud pies in a slum when we\u2019re offered a holiday at the sea.",
        progress: 48,
        pauseAfter: { type: "question", question: "Lewis says we settle for too little joy. Where are you making \u2018mud pies\u2019 when God is offering you a \u2018holiday at the sea\u2019?", options: ["I\u2019m accumulating stuff instead of giving it away", "I\u2019m hoarding security instead of trusting God", "I\u2019m chasing comfort instead of adventure with God", "I need to think about this one \u2014 it cuts deep"] },
      },
      {
        id: "m5-secret", title: "The Secret: Give Yourself First", duration: "5 min",
        summary: "\u2018They gave themselves first to the Lord, and then by the will of God to us.\u2019 The entry point to the joy cycle isn\u2019t a dollar amount \u2014 it\u2019s devotion. Devotion precedes donation.",
        progress: 64,
        pauseAfter: { type: "question", question: "Kevin says the Macedonians didn\u2019t start with generosity \u2014 they started by giving themselves to the Lord. What does \u2018giving yourself first to the Lord\u2019 look like for you practically this week?", options: ["Morning prayer before checking my phone or my portfolio", "Surrendering a specific financial decision to God", "Telling God \u2018I\u2019m yours \u2014 all of me, including my money\u2019", "I\u2019m not sure \u2014 but I want to figure it out"] },
      },
      {
        id: "m5-five-principles", title: "Five Principles of Giving", duration: "6 min",
        summary: "Give something. Give first. Give proportionally. Give quietly. Give freely and gladly. Kevin says some who give $100,000 are giving very little, while some who give $62/month cause God to smile.",
        progress: 78,
        pauseAfter: { type: "question", question: "Kevin says some who give $100,000 are giving very little, while some who give $62/month cause God to smile. What does proportional giving mean for you specifically?", options: ["I need to start \u2014 any amount is a step", "I need to increase \u2014 my giving hasn\u2019t kept up with my income", "I\u2019m giving proportionally but could stretch further", "I\u2019m giving sacrificially and I see the joy Kevin is describing"] },
      },
      {
        id: "m5-closing", title: "Closing \u2014 Enter the Joy", duration: "4 min",
        summary: "Kevin closes with an invitation: enter into the joy of your master. The generous life is not about deprivation \u2014 it\u2019s about a greater, indestructible, multiplying joy.",
        progress: 92,
        pauseAfter: { type: "prayer", prompt: "Father, you are the most generous being in the universe. You gave your Son. You gave your Spirit. You give me breath every morning. I want to enter the joy of giving \u2014 the indestructible, multiplying joy that Kevin described. I\u2019m tired of making mud pies when you\u2019re offering me the ocean. Lead me into the greater blessing. In Jesus\u2019 name, amen.", duration: "60 seconds" },
      },
    ],
    holyHabits: [
      {
        id: "m5-review", title: "Review Your Journey", type: "reflect",
        questions: [
          "Look back at your responses from Modules 1\u20134. What has shifted in your heart and mind about money and generosity?",
          "Review the \u2018Growing in Generosity\u2019 exercise from Module 4. Has anything changed since then?",
        ],
      },
      {
        id: "m5-commitment", title: "Write Your Generosity Commitment", type: "commitment",
        intro: "This is your moment to put a stake in the ground. Write a commitment that captures what God has been doing in your heart through this path.",
        prompts: [
          "What do you believe about God\u2019s generosity toward you?",
          "What specific action are you committing to? (Be concrete \u2014 an amount, a percentage, a habit, a change.)",
          "Who are you sharing this commitment with? (Name them.)",
        ],
        closingPrompt: "Now write your commitment as 3\u20135 sentences \u2014 a statement you can return to when you need to remember what you committed to.",
      },
      {
        id: "m5-beyond", title: "Beyond Financial Generosity", type: "reflect",
        questions: [
          "Generosity is about sharing everything God has given us. What else have you been given that you can share \u2014 your time, talents, home, vehicle, attention?",
          "Spend a moment in prayer asking God to reveal one area beyond money where you can grow in generosity. What comes to mind?",
        ],
      },
    ],
  },
];

// ─── Utility Components ───

function ProgressDots({ total, current, color = T.sage }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "16px 0" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 28 : 7,
            height: 7,
            borderRadius: 4,
            background: i === current ? color : i < current ? color + "50" : T.bgSubtle,
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Divider({ width = 48, color = T.bgSubtle, my = 28 }) {
  return <div style={{ width, height: 1, background: color, margin: `${my}px auto` }} />;
}

function BottomNav({ label, onBack, onNext }) {
  const btnStyle = {
    background: "none", border: "none", cursor: "pointer",
    fontFamily: sans, fontSize: 13, color: T.textMuted, padding: "8px 12px",
    borderRadius: 8, transition: "color 0.2s",
    display: "flex", alignItems: "center", gap: 4,
  };
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      height: 46, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", background: T.bg, borderTop: `1px solid ${T.border}`,
    }}>
      <button onClick={onBack} style={btnStyle}>
        <span style={{ fontSize: 15 }}>&lsaquo;</span> Back
      </button>
      <span style={{ fontSize: 11, color: T.textDim, fontFamily: sans, letterSpacing: 0.3 }}>
        {label}
      </span>
      <button onClick={onNext} style={btnStyle}>
        Next <span style={{ fontSize: 15 }}>&rsaquo;</span>
      </button>
    </div>
  );
}

function HomeButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      fontFamily: sans, fontSize: 11, color: T.textDim, padding: "4px 0",
      display: "flex", alignItems: "center", gap: 3, marginBottom: 12,
    }}>
      <span style={{ fontSize: 14 }}>&lsaquo;</span> Modules
    </button>
  );
}

function ScriptureBlock({ passage, reference }) {
  return (
    <FadeIn delay={200}>
      <div style={{
        background: T.bgCard,
        borderLeft: `3px solid ${T.gold}`,
        borderRadius: "0 12px 12px 0",
        padding: "24px 28px",
        margin: "20px 0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <p style={{ fontFamily: serif, fontSize: 18, lineHeight: 1.9, color: T.textBody, fontStyle: "italic", fontWeight: 300 }}>
          {passage}
        </p>
        <p style={{ fontSize: 12, color: T.textMuted, marginTop: 14, fontFamily: sans, letterSpacing: 0.3 }}>
          &mdash; {reference}
        </p>
      </div>
    </FadeIn>
  );
}

function PrayerCard({ prompt, duration, onComplete }) {
  const [timer, setTimer] = useState(parseInt(duration) || 30);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || done) return;
    if (timer <= 0) { setDone(true); return; }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timer, done]);

  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <div style={{ fontSize: 11, color: T.spirit, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20, fontFamily: sans, fontWeight: 500 }}>
        Pause & Pray
      </div>
      <p style={{ fontFamily: serif, fontSize: 19, lineHeight: 1.8, color: T.textBody, maxWidth: 440, margin: "0 auto 28px", fontStyle: "italic", fontWeight: 300 }}>
        {prompt}
      </p>
      {!started ? (
        <button onClick={() => setStarted(true)} style={{
          fontFamily: sans, fontSize: 13, fontWeight: 500, padding: "12px 32px", borderRadius: 28,
          border: `1.5px solid ${T.spirit}30`, background: T.spiritSoft, color: T.spirit, cursor: "pointer", transition: "all 0.2s",
        }}>
          Begin &middot; {duration}
        </button>
      ) : !done ? (
        <div>
          <div style={{ fontSize: 42, fontFamily: serif, color: T.spirit, fontWeight: 300, marginBottom: 8 }}>{timer}</div>
          <div style={{ fontSize: 12, color: T.textDim, fontFamily: sans }}>Take your time.</div>
        </div>
      ) : (
        <FadeIn>
          <button onClick={onComplete} style={{
            fontFamily: sans, fontSize: 13, fontWeight: 500, padding: "12px 32px", borderRadius: 28,
            border: `1.5px solid ${T.sage}40`, background: T.sageSoft, color: T.sageText, cursor: "pointer",
          }}>
            Continue
          </button>
        </FadeIn>
      )}
    </div>
  );
}

function QuestionCard({ data, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [textResponse, setTextResponse] = useState("");

  const handleSelect = (opt) => {
    setSelected(opt);
    if (data.followUp) setTimeout(() => setShowFollowUp(true), 400);
  };

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ fontSize: 11, color: T.sage, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16, fontFamily: sans, fontWeight: 500 }}>
        Check In
      </div>
      <p style={{ fontFamily: serif, fontSize: 21, lineHeight: 1.5, color: T.text, marginBottom: 24, fontWeight: 400 }}>
        {data.question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            style={{
              padding: "14px 20px",
              borderRadius: 12,
              border: `1.5px solid ${selected === opt ? T.sage + "60" : T.border}`,
              background: selected === opt ? T.sageSoft : T.bgCard,
              color: selected === opt ? T.sageText : T.textBody,
              fontFamily: sans, fontSize: 14, fontWeight: 400,
              textAlign: "left", cursor: "pointer",
              transition: "all 0.25s",
              boxShadow: selected === opt ? "0 2px 8px rgba(107,143,113,0.1)" : "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFollowUp && data.followUp && (
        <FadeIn delay={100} style={{ marginTop: 20 }}>
          <p style={{ fontFamily: serif, fontSize: 15, color: T.textMuted, fontStyle: "italic", marginBottom: 14, lineHeight: 1.6 }}>
            {data.followUp}
          </p>
          <textarea
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            placeholder="Write your thoughts..."
            style={{
              width: "100%", minHeight: 100, padding: 16, borderRadius: 12,
              border: `1.5px solid ${T.border}`, background: T.bgCard, color: T.textBody,
              fontFamily: serif, fontSize: 15, lineHeight: 1.7, resize: "vertical", outline: "none",
              boxSizing: "border-box",
            }}
          />
        </FadeIn>
      )}

      {selected && (
        <FadeIn delay={showFollowUp ? 400 : 300} style={{ marginTop: 24, textAlign: "center" }}>
          <button onClick={() => onAnswer(selected, textResponse)} style={{
            fontFamily: sans, fontSize: 13, fontWeight: 500, padding: "12px 32px", borderRadius: 28,
            border: `1.5px solid ${T.sage}40`, background: T.sageSoft, color: T.sageText, cursor: "pointer",
          }}>
            Continue
          </button>
        </FadeIn>
      )}
    </div>
  );
}

// ─── Sermon Player ───

function SermonPlayer({ segment, segmentIndex, onSegmentComplete, isPlaying, setIsPlaying, playerRef, vimeoId, pauseTimestamps }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const segmentIndexRef = useRef(segmentIndex);
  const onSegmentCompleteRef = useRef(onSegmentComplete);
  const pauseFiredRef = useRef(false);
  const isPlaceholder = !vimeoId || vimeoId.startsWith("TODO");

  useEffect(() => { segmentIndexRef.current = segmentIndex; }, [segmentIndex]);
  useEffect(() => { onSegmentCompleteRef.current = onSegmentComplete; }, [onSegmentComplete]);
  useEffect(() => { pauseFiredRef.current = false; }, [segmentIndex]);

  // Initialize Vimeo Player API (only for real videos)
  useEffect(() => {
    if (isPlaceholder) { setLoaded(true); return; }
    if (!window.Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => initPlayer();
      document.head.appendChild(script);
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (iframeRef.current && !playerRef.current) {
        const player = new window.Vimeo.Player(iframeRef.current);
        playerRef.current = player;
        player.on('loaded', () => setLoaded(true));
        player.on('timeupdate', (data) => {
          if (pauseFiredRef.current) return;
          const currentTime = data.seconds;
          const currentPause = pauseTimestamps[segmentIndexRef.current];
          if (currentPause && currentTime >= currentPause.time) {
            pauseFiredRef.current = true;
            player.pause();
            onSegmentCompleteRef.current();
          }
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isPlaceholder || !playerRef.current || !loaded) return;
    if (isPlaying) { playerRef.current.play(); } else { playerRef.current.pause(); }
  }, [isPlaying, loaded, playerRef, isPlaceholder]);

  useEffect(() => {
    if (isPlaceholder || !playerRef.current || !loaded) return;
    if (segmentIndex === 0) {
      playerRef.current.setCurrentTime(0);
    } else {
      const prevPause = pauseTimestamps[segmentIndex - 1];
      if (prevPause) { playerRef.current.setCurrentTime(prevPause.time + 1); }
    }
  }, [segmentIndex, loaded, playerRef, isPlaceholder, pauseTimestamps]);

  return (
    <div>
      <div style={{
        borderRadius: 16, overflow: "hidden", position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        background: "#1a1a1a",
      }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          {isPlaceholder ? (
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "linear-gradient(145deg, #E8E0D0 0%, #D4CBBA 50%, #C8BDA8 100%)",
            }}>
              <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontFamily: sans, fontWeight: 500 }}>
                Sermon Video
              </div>
              <div style={{ fontFamily: serif, fontSize: 20, color: T.text, fontWeight: 500, marginBottom: 4 }}>
                {segment.title}
              </div>
              <div style={{ fontSize: 12, color: T.textDim, fontFamily: sans }}>
                Video coming soon
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&transparent=0`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Sermon video"
            />
          )}
        </div>

        {!isPlaceholder && !loaded && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "linear-gradient(145deg, #E8E0D0 0%, #D4CBBA 100%)",
          }}>
            <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: sans }}>
              Loading sermon...
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: serif, fontSize: 18, color: T.text, fontWeight: 500 }}>
            {segment.title}
          </span>
          <span style={{ fontSize: 11, color: T.textDim, fontFamily: sans }}>
            {segment.duration}
          </span>
        </div>
        {segment.summary && (
          <p style={{ fontFamily: serif, fontSize: 14, color: T.textMuted, lineHeight: 1.8, fontWeight: 300 }}>
            {segment.summary}
          </p>
        )}
      </div>

      {segment.scripture && (
        <ScriptureBlock passage={segment.scripture} reference={segment.scriptureRef} />
      )}
    </div>
  );
}

// ─── Screens ───

function ModuleHomeScreen({ modules, completedModules, onSelectModule }) {
  const moduleWords = ["One", "Two", "Three", "Four", "Five"];
  return (
    <div style={{ minHeight: "100vh", padding: "48px 20px 40px", maxWidth: 560, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 3, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
            Austin Stone Community Church
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 38, fontWeight: 400, color: T.text, marginTop: 8, marginBottom: 8, letterSpacing: -0.5 }}>
            The Generous Life
          </h1>
          <p style={{ fontFamily: serif, fontSize: 16, color: T.textMuted, lineHeight: 1.7, maxWidth: 380, margin: "0 auto", fontWeight: 300 }}>
            Five modules. One journey. A transformed relationship with money and generosity.
          </p>
        </div>
      </FadeIn>

      {/* Emotional arc legend */}
      <FadeIn delay={200}>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 32, flexWrap: "wrap" }}>
          {["INSPIRED", "SOBERED", "CONVICTED", "EQUIPPED", "JOYFUL"].map((arc) => (
            <span key={arc} style={{
              fontSize: 9, letterSpacing: 1.5, fontFamily: sans, fontWeight: 500,
              color: ARC_COLORS[arc], padding: "3px 8px",
              background: ARC_COLORS[arc] + "10", borderRadius: 10,
            }}>
              {arc}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Module cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {modules.map((mod, i) => {
          const arcColor = ARC_COLORS[mod.arc];
          const isComplete = completedModules.has(mod.id);
          return (
            <FadeIn key={mod.id} delay={300 + i * 100}>
              <button
                onClick={() => onSelectModule(i)}
                style={{
                  width: "100%", textAlign: "left", cursor: "pointer",
                  background: T.bgCard, borderRadius: 16, padding: "20px 22px",
                  border: `1px solid ${T.borderLight}`,
                  borderLeft: `4px solid ${arcColor}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.2s", position: "relative",
                  display: "flex", alignItems: "flex-start", gap: 16,
                }}
              >
                {/* Module number */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: isComplete ? T.completeSoft : arcColor + "12",
                  border: `1.5px solid ${isComplete ? T.sage + "40" : arcColor + "30"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isComplete ? 16 : 14, fontFamily: sans, fontWeight: 600,
                  color: isComplete ? T.sage : arcColor, marginTop: 2,
                }}>
                  {isComplete ? "\u2713" : mod.id}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 600, color: arcColor }}>
                      Module {moduleWords[i]} &middot; {mod.subtitle}
                    </span>
                    <span style={{
                      fontSize: 8, letterSpacing: 1, fontFamily: sans, fontWeight: 600,
                      color: arcColor, padding: "2px 6px",
                      background: arcColor + "10", borderRadius: 8,
                    }}>
                      {mod.arc}
                    </span>
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 19, color: T.text, fontWeight: 500, lineHeight: 1.3, marginBottom: 4 }}>
                    {mod.title}
                  </div>
                  <div style={{ fontSize: 12, color: T.textMuted, fontFamily: sans }}>
                    {mod.speaker} &middot; {mod.scripture}
                  </div>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

function WelcomeScreen({ moduleData, onStart, onHome }) {
  const arcColor = ARC_COLORS[moduleData.arc];
  const moduleWords = ["One", "Two", "Three", "Four", "Five"];
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center" }}>
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <HomeButton onClick={onHome} />
      </div>
      <FadeIn>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 3, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          The Generous Life
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <div style={{ fontSize: 11, color: arcColor, letterSpacing: 2, textTransform: "uppercase", fontFamily: sans, fontWeight: 500, marginTop: 4 }}>
          Module {moduleWords[moduleData.id - 1]} &middot; {moduleData.subtitle}
        </div>
      </FadeIn>

      <Divider width={40} my={24} />

      <FadeIn delay={300}>
        <h1 style={{ fontFamily: serif, fontSize: 42, fontWeight: 400, color: T.text, marginBottom: 10, lineHeight: 1.15, letterSpacing: -0.5 }}>
          {moduleData.title}
        </h1>
      </FadeIn>
      <FadeIn delay={400}>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.textMuted, marginBottom: 4 }}>
          {moduleData.speaker}
        </p>
        <p style={{ fontFamily: sans, fontSize: 13, color: T.textDim }}>
          {moduleData.scripture}
        </p>
      </FadeIn>

      <Divider width={40} my={24} />

      <FadeIn delay={550}>
        <p style={{ fontFamily: serif, fontSize: 17, color: T.textMuted, maxWidth: 400, lineHeight: 1.8, marginBottom: 12, fontWeight: 300 }}>
          {moduleData.description}
        </p>
        <p style={{ fontFamily: sans, fontSize: 12, color: T.textDim, marginBottom: 28 }}>
          {moduleData.formationGoal}
        </p>
      </FadeIn>

      <FadeIn delay={700}>
        <div style={{ display: "flex", gap: 20, marginBottom: 40, fontSize: 12, color: T.textDim, fontFamily: sans, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ padding: "6px 14px", background: T.bgCard, borderRadius: 20, border: `1px solid ${T.borderLight}` }}>
            {moduleData.timeSermon} sermon
          </span>
          <span style={{ padding: "6px 14px", background: T.bgCard, borderRadius: 20, border: `1px solid ${T.borderLight}` }}>
            {moduleData.timeActivity} activity
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={850}>
        <button
          onClick={onStart}
          style={{
            fontFamily: sans, fontSize: 14, fontWeight: 500,
            padding: "14px 44px", borderRadius: 28,
            border: `1.5px solid ${arcColor}50`,
            background: arcColor, color: "#fff",
            cursor: "pointer", letterSpacing: 0.3,
            transition: "all 0.2s",
            boxShadow: `0 2px 12px ${arcColor}40`,
          }}
        >
          Begin Module
        </button>
      </FadeIn>
    </div>
  );
}

function SermonScreen({ moduleData, onComplete, onBack, onHome }) {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [showPause, setShowPause] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSegments, setCompletedSegments] = useState(new Set());
  const playerRef = useRef(null);

  const segments = moduleData.segments;
  const segment = segments[currentSegment];
  const overallProgress = Math.round(((completedSegments.size) / segments.length) * 100);

  const handleNavBack = () => {
    setShowPause(false);
    setIsPlaying(false);
    if (currentSegment > 0) {
      setCurrentSegment((s) => s - 1);
    } else {
      onBack();
    }
  };

  const handleNavNext = () => {
    setIsPlaying(false);
    setCompletedSegments((prev) => new Set([...prev, currentSegment]));
    if (!showPause && segment.pauseAfter) {
      setShowPause(true);
      return;
    }
    setShowPause(false);
    if (currentSegment < segments.length - 1) {
      setCurrentSegment((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const handleSegmentComplete = useCallback(() => {
    setIsPlaying(false);
    setCompletedSegments((prev) => new Set([...prev, currentSegment]));
    if (segment.pauseAfter) {
      setTimeout(() => setShowPause(true), 500);
    } else if (currentSegment < segments.length - 1) {
      setTimeout(() => {
        setCurrentSegment((s) => s + 1);
        setIsPlaying(true);
      }, 800);
    } else {
      setTimeout(() => onComplete(), 1000);
    }
  }, [currentSegment, segment, segments.length, onComplete]);

  const handlePauseComplete = () => {
    setShowPause(false);
    if (currentSegment < segments.length - 1) {
      setTimeout(() => {
        setCurrentSegment((s) => s + 1);
        setTimeout(() => setIsPlaying(true), 400);
      }, 300);
    } else {
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 20px 72px", maxWidth: 560, margin: "0 auto" }}>
      <HomeButton onClick={onHome} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          Module {moduleData.id} &middot; Sermon
        </div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: sans }}>
          {overallProgress}%
        </div>
      </div>

      <div style={{ height: 3, background: T.bgSubtle, borderRadius: 2, marginBottom: 28 }}>
        <div style={{ width: `${overallProgress}%`, height: "100%", background: T.sage, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      <SermonPlayer
        segment={segment}
        segmentIndex={currentSegment}
        onSegmentComplete={handleSegmentComplete}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playerRef={playerRef}
        vimeoId={moduleData.vimeoId}
        pauseTimestamps={moduleData.pauseTimestamps}
      />

      {showPause && (
        <FadeIn key={`pause-${currentSegment}`}>
          <div style={{
            background: T.bgCard, borderRadius: 16, padding: 28,
            border: `1px solid ${T.borderLight}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            marginTop: 20,
          }}>
            {segment.pauseAfter.type === "question" ? (
              <QuestionCard data={segment.pauseAfter} onAnswer={handlePauseComplete} />
            ) : (
              <PrayerCard prompt={segment.pauseAfter.prompt} duration={segment.pauseAfter.duration} onComplete={handlePauseComplete} />
            )}
          </div>
        </FadeIn>
      )}

      <ProgressDots total={segments.length} current={currentSegment} />

      <BottomNav
        label={`Segment ${currentSegment + 1} of ${segments.length}`}
        onBack={handleNavBack}
        onNext={handleNavNext}
      />
    </div>
  );
}

function HolyHabitsScreen({ moduleData, onComplete, onBack, onHome }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [definitionStep, setDefinitionStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);

  const sections = moduleData.holyHabits;
  const section = sections[currentSection];

  useEffect(() => { setDefinitionStep(0); setSelectedTier(null); }, [currentSection]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const handleNavBack = () => {
    if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
    } else {
      onBack();
    }
  };

  const handleNavNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const btnStyle = {
    fontFamily: sans, fontSize: 13, fontWeight: 500, padding: "12px 32px", borderRadius: 28,
    border: `1.5px solid ${T.gold}40`, background: T.goldSoft, color: T.gold, cursor: "pointer",
  };

  const textareaStyle = {
    width: "100%", minHeight: 110, padding: 18, borderRadius: 14,
    border: `1.5px solid ${T.border}`, background: T.bgCard, color: T.textBody,
    fontFamily: serif, fontSize: 15, lineHeight: 1.7, resize: "vertical", outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 20px 72px", maxWidth: 560, margin: "0 auto" }}>
      <HomeButton onClick={onHome} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          Module {moduleData.id} &middot; Holy Habits
        </div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: sans }}>
          {currentSection + 1}/{sections.length}
        </div>
      </div>

      <div style={{ height: 3, background: T.bgSubtle, borderRadius: 2, marginBottom: 28 }}>
        <div style={{ width: `${((currentSection + 1) / sections.length) * 100}%`, height: "100%", background: T.gold, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      <FadeIn key={`hh-${moduleData.id}-${currentSection}`}>
        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 400, color: T.text, marginBottom: 24 }}>
          {section.title}
        </h2>

        {/* Reading type (Module 1 definition layers) */}
        {section.type === "reading" && (
          <div>
            {section.content.slice(0, definitionStep + 1).map((item, i) => (
              <FadeIn key={i} delay={i === definitionStep ? 200 : 0}>
                <div style={{
                  padding: "20px 24px", marginBottom: 14, borderRadius: 14,
                  border: `1.5px solid ${i === definitionStep ? T.gold + "40" : T.borderLight}`,
                  background: i === definitionStep ? T.goldSoft : T.bgCard,
                  transition: "all 0.4s",
                  boxShadow: i === definitionStep ? "0 2px 12px rgba(196,148,58,0.06)" : "0 1px 2px rgba(0,0,0,0.02)",
                }}>
                  <p style={{ fontFamily: serif, fontSize: 17, color: T.text, fontWeight: 500, lineHeight: 1.5, marginBottom: 10 }}>
                    {item.layer}
                  </p>
                  <p style={{ fontFamily: serif, fontSize: 14, color: T.textMuted, lineHeight: 1.8, fontWeight: 300 }}>
                    {item.note}
                  </p>
                </div>
              </FadeIn>
            ))}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              {definitionStep < section.content.length - 1 ? (
                <button onClick={() => setDefinitionStep((s) => s + 1)} style={btnStyle}>Next Layer</button>
              ) : (
                <FadeIn delay={300}><button onClick={handleNext} style={btnStyle}>Continue</button></FadeIn>
              )}
            </div>
          </div>
        )}

        {/* Scripture type */}
        {section.type === "scripture" && (
          <div>
            <ScriptureBlock passage={section.passage} reference={section.ref} />
            {section.questions.map((q, i) => (
              <FadeIn key={i} delay={400 + i * 200}>
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                    {i + 1}. {q}
                  </p>
                  <textarea
                    value={responses[`${section.id}-study-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`${section.id}-study-${i}`]: e.target.value })}
                    placeholder="Write your reflection..."
                    style={textareaStyle}
                  />
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={800}>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <button onClick={handleNext} style={btnStyle}>Continue</button>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Reflect type */}
        {section.type === "reflect" && (
          <div>
            {section.questions.map((q, i) => (
              <FadeIn key={i} delay={200 + i * 200}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                    {q}
                  </p>
                  <textarea
                    value={responses[`${section.id}-reflect-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`${section.id}-reflect-${i}`]: e.target.value })}
                    placeholder="Write your reflection..."
                    style={textareaStyle}
                  />
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={600}>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={handleNext} style={btnStyle}>
                  {currentSection === sections.length - 1 ? "Complete Activity" : "Continue"}
                </button>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Journal type (Module 2) */}
        {section.type === "journal" && (
          <div>
            {section.intro && (
              <p style={{ fontFamily: serif, fontSize: 15, color: T.textMuted, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                {section.intro}
              </p>
            )}
            {section.prompts.map((prompt, i) => (
              <FadeIn key={i} delay={200 + i * 150}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                    {i + 1}. {prompt}
                  </p>
                  <textarea
                    value={responses[`${section.id}-journal-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`${section.id}-journal-${i}`]: e.target.value })}
                    placeholder="Write honestly..."
                    style={textareaStyle}
                  />
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={800}>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={handleNext} style={btnStyle}>Continue</button>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Tiered type (Module 4) */}
        {section.type === "tiered" && (
          <div>
            {section.intro && (
              <p style={{ fontFamily: serif, fontSize: 15, color: T.textMuted, lineHeight: 1.8, marginBottom: 24, fontWeight: 300 }}>
                {section.intro}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {section.tiers.map((tier, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  style={{
                    textAlign: "left", cursor: "pointer", padding: "18px 22px", borderRadius: 14,
                    border: `1.5px solid ${selectedTier === i ? T.gold + "60" : T.border}`,
                    background: selectedTier === i ? T.goldSoft : T.bgCard,
                    transition: "all 0.25s",
                    boxShadow: selectedTier === i ? "0 2px 12px rgba(196,148,58,0.1)" : "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: selectedTier === i ? T.gold : T.text, marginBottom: 4 }}>
                    {tier.label}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>
                    {tier.description}
                  </div>
                </button>
              ))}
            </div>

            {selectedTier !== null && (
              <FadeIn key={`tier-${selectedTier}`}>
                {section.tiers[selectedTier].prompts.map((prompt, i) => (
                  <div key={i} style={{ marginBottom: 24 }}>
                    <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                      {i + 1}. {prompt}
                    </p>
                    <textarea
                      value={responses[`${section.id}-tier${selectedTier}-${i}`] || ""}
                      onChange={(e) => setResponses({ ...responses, [`${section.id}-tier${selectedTier}-${i}`]: e.target.value })}
                      placeholder="Write your response..."
                      style={textareaStyle}
                    />
                  </div>
                ))}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button onClick={handleNext} style={btnStyle}>Continue</button>
                </div>
              </FadeIn>
            )}
          </div>
        )}

        {/* Commitment type (Module 5 capstone) */}
        {section.type === "commitment" && (
          <div>
            {section.intro && (
              <div style={{
                background: T.goldSoft, borderLeft: `3px solid ${T.gold}`,
                borderRadius: "0 14px 14px 0", padding: "20px 24px", marginBottom: 28,
              }}>
                <p style={{ fontFamily: serif, fontSize: 16, color: T.textBody, lineHeight: 1.8, fontWeight: 300 }}>
                  {section.intro}
                </p>
              </div>
            )}
            {section.prompts.map((prompt, i) => (
              <FadeIn key={i} delay={200 + i * 200}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                    {prompt}
                  </p>
                  <textarea
                    value={responses[`${section.id}-commit-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`${section.id}-commit-${i}`]: e.target.value })}
                    placeholder="Write your response..."
                    style={textareaStyle}
                  />
                </div>
              </FadeIn>
            ))}
            {section.closingPrompt && (
              <FadeIn delay={800}>
                <Divider width={60} my={24} color={T.gold + "40"} />
                <p style={{ fontFamily: serif, fontSize: 18, color: T.text, lineHeight: 1.5, marginBottom: 16, fontWeight: 500, textAlign: "center" }}>
                  {section.closingPrompt}
                </p>
                <textarea
                  value={responses[`${section.id}-final`] || ""}
                  onChange={(e) => setResponses({ ...responses, [`${section.id}-final`]: e.target.value })}
                  placeholder="I commit to..."
                  style={{
                    ...textareaStyle,
                    minHeight: 160, fontSize: 17, padding: 24,
                    border: `2px solid ${T.gold}40`,
                    background: T.goldSoft,
                  }}
                />
              </FadeIn>
            )}
            <FadeIn delay={1000}>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <button onClick={handleNext} style={btnStyle}>Continue</button>
              </div>
            </FadeIn>
          </div>
        )}
      </FadeIn>

      <ProgressDots total={sections.length} current={currentSection} color={T.gold} />

      <BottomNav
        label={`Activity ${currentSection + 1} of ${sections.length}`}
        onBack={handleNavBack}
        onNext={handleNavNext}
      />
    </div>
  );
}

function ClosingScreen({ moduleData, onBack, onHome, isLastModule }) {
  const arcColor = ARC_COLORS[moduleData.arc];
  const nextModule = !isLastModule ? MODULES.find(m => m.id === moduleData.id + 1) : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center" }}>
      <FadeIn>
        <div style={{
          width: isLastModule ? 88 : 72, height: isLastModule ? 88 : 72, borderRadius: "50%",
          background: T.completeSoft, border: `2px solid ${T.sage}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isLastModule ? 36 : 30, marginBottom: 28, color: T.sage,
        }}>
          {"\u2713"}
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500, marginBottom: 10 }}>
          {isLastModule ? "Course Complete" : "Module Complete"}
        </div>
        <h1 style={{ fontFamily: serif, fontSize: isLastModule ? 36 : 32, fontWeight: 400, color: T.text, marginBottom: 12 }}>
          {moduleData.title}
        </h1>
        <p style={{ fontFamily: serif, fontSize: 16, color: T.textMuted, maxWidth: 400, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
          {moduleData.completionMessage}
        </p>
      </FadeIn>

      {/* Emotional arc (show on final module) */}
      {isLastModule && (
        <FadeIn delay={450}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {MODULES.map((m, i) => (
              <React.Fragment key={m.id}>
                <span style={{
                  fontSize: 10, letterSpacing: 1, fontFamily: sans, fontWeight: 600,
                  color: ARC_COLORS[m.arc], padding: "4px 10px",
                  background: ARC_COLORS[m.arc] + "15", borderRadius: 10,
                }}>
                  {m.arc}
                </span>
                {i < MODULES.length - 1 && (
                  <span style={{ color: T.textDim, fontSize: 10 }}>&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Next module preview (or course complete message) */}
      {nextModule ? (
        <FadeIn delay={500}>
          <div style={{
            background: T.bgCard, border: `1px solid ${T.borderLight}`,
            borderRadius: 16, padding: "24px 28px", maxWidth: 380, marginBottom: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontSize: 10, color: ARC_COLORS[nextModule.arc], letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: sans, fontWeight: 500 }}>
              Coming Next &middot; Module {nextModule.id}
            </div>
            <p style={{ fontFamily: serif, fontSize: 20, color: T.text, marginBottom: 4, fontWeight: 400 }}>
              {nextModule.title}
            </p>
            <p style={{ fontSize: 13, color: T.textMuted, fontFamily: sans }}>
              {nextModule.speaker} &middot; {nextModule.scripture}
            </p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={500}>
          <p style={{ fontFamily: serif, fontSize: 15, color: T.textMuted, maxWidth: 380, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
            Your journey continues. Daily formation touchpoints will keep this work alive.
          </p>
        </FadeIn>
      )}

      <FadeIn delay={700}>
        <div style={{
          background: T.spiritSoft, borderLeft: `3px solid ${T.spirit}`,
          borderRadius: "0 14px 14px 0", padding: "20px 24px",
          maxWidth: 400, textAlign: "left",
        }}>
          <div style={{ fontSize: 10, color: T.spirit, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontFamily: sans, fontWeight: 500 }}>
            Closing Prayer
          </div>
          <p style={{ fontFamily: serif, fontSize: 16, color: T.textBody, lineHeight: 1.8, fontStyle: "italic", fontWeight: 300 }}>
            {moduleData.closingPrayer}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={900}>
        <button
          onClick={onHome}
          style={{
            fontFamily: sans, fontSize: 14, fontWeight: 500,
            padding: "12px 36px", borderRadius: 28, marginTop: 32,
            border: `1.5px solid ${arcColor}40`,
            background: arcColor + "10", color: arcColor,
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          Return to Modules
        </button>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: 12, color: T.textDim,
              padding: "6px 12px", transition: "color 0.2s",
            }}
          >
            &lsaquo; Back to Holy Habits
          </button>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [completedModules, setCompletedModules] = useState(new Set());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScreen, currentModule]);

  const handleSelectModule = (moduleIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentScreen("welcome");
  };

  const handleGoHome = () => {
    setCurrentModule(null);
    setCurrentScreen("home");
  };

  const handleModuleComplete = () => {
    if (currentModule !== null) {
      setCompletedModules((prev) => new Set([...prev, MODULES[currentModule].id]));
    }
    handleGoHome();
  };

  const moduleData = currentModule !== null ? MODULES[currentModule] : null;

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: sans }}>
      {currentScreen === "home" && (
        <ModuleHomeScreen
          modules={MODULES}
          completedModules={completedModules}
          onSelectModule={handleSelectModule}
        />
      )}
      {currentScreen === "welcome" && moduleData && (
        <WelcomeScreen
          moduleData={moduleData}
          onStart={() => setCurrentScreen("sermon")}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "sermon" && moduleData && (
        <SermonScreen
          moduleData={moduleData}
          onComplete={() => setCurrentScreen("holyhabits")}
          onBack={() => setCurrentScreen("welcome")}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "holyhabits" && moduleData && (
        <HolyHabitsScreen
          moduleData={moduleData}
          onComplete={() => setCurrentScreen("complete")}
          onBack={() => setCurrentScreen("sermon")}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "complete" && moduleData && (
        <ClosingScreen
          moduleData={moduleData}
          onBack={() => setCurrentScreen("holyhabits")}
          onHome={handleModuleComplete}
          isLastModule={moduleData.id === 5}
        />
      )}
    </div>
  );
}
