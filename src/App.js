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

// ─── Sermon Segments ───
const SERMON_SEGMENTS = [
  {
    id: "intro",
    title: "Welcome & Introduction",
    duration: "3 min",
    summary: "Manning introduces the Holy Habits series and the invitation to explore biblical generosity — not as a financial strategy, but as a pathway to knowing God more deeply.",
    progress: 0,
  },
  {
    id: "definition",
    title: "Defining Generosity",
    duration: "6 min",
    summary: "Walking through the four-layer definition from the Holy Habits guidebook: willing, sacrificial, joyful, and without expecting anything in return. Each layer builds on the last.",
    progress: 10,
    pauseAfter: {
      type: "question",
      question: "Which of these four qualities of generosity feels most challenging to you right now?",
      options: ["Willing", "Sacrificial", "Joyful", "Selfless"],
    },
  },
  {
    id: "macedonians",
    title: "The Macedonian Church",
    duration: "5 min",
    summary: "A church in severe affliction and extreme poverty whose abundance of joy overflowed in a wealth of generosity. They begged Paul for the chance to give more.",
    scripture: "We want you to know, brothers, about the grace of God that has been given among the churches of Macedonia, for in a severe test of affliction, their abundance of joy and their extreme poverty have overflowed in a wealth of generosity on their part.",
    scriptureRef: "2 Corinthians 8:1–2",
    progress: 22,
    pauseAfter: {
      type: "question",
      question: "People in extreme poverty, begging for the chance to give. What's your honest first reaction?",
      options: ["Inspiring — I want that kind of heart", "Confusing — how is that even possible?", "Convicting — I have so much more and give so much less", "All of the above"],
    },
  },
  {
    id: "gospel",
    title: "God's Generosity Through the Gospel",
    duration: "8 min",
    summary: "Creation → Fall → Redemption → Restoration. God is the most generous being in the universe. We give because He first gave. Common grace — every breath, every meal, every sunrise — is a gift.",
    progress: 36,
    pauseAfter: {
      type: "prayer",
      prompt: "Take a moment. Thank God for three specific things He's given you today that you didn't earn.",
      duration: "30 seconds",
    },
  },
  {
    id: "shifts",
    title: "Three Shifts",
    duration: "7 min",
    summary: "Ownership → Stewardship. Scarcity → Abundance. Believing → Treasuring. \"What is your ultimate treasure? If you want to know what your heart treasures, follow the money.\"",
    progress: 52,
    pauseAfter: {
      type: "question",
      question: "Where does your money flow most effortlessly?",
      options: ["Lifestyle & comfort", "Savings & security", "Giving & kingdom", "I honestly don't know"],
    },
  },
  {
    id: "scarcity",
    title: "Scarcity vs. Abundance",
    duration: "5 min",
    summary: "The Macedonians had an abundance mindset in extreme poverty. Manning says changing your mindset is not about changing your circumstances — it's about changing where you look.",
    progress: 66,
    pauseAfter: {
      type: "question",
      question: "Do you tend toward a scarcity mindset or an abundance mindset with money?",
      options: ["Scarcity — I worry there won't be enough", "Abundance — I trust God will provide", "It depends on the season", "I've never really thought about it"],
    },
  },
  {
    id: "story",
    title: "Manning's Personal Story",
    duration: "6 min",
    summary: "From a $100K home theater and BMW to giving away 50% of his income. His wife Julie's challenge: \"I need to know that you can walk away from all of this.\" Generosity as a pathway to intimacy with God.",
    progress: 80,
    pauseAfter: {
      type: "question",
      question: "Is there someone in your life with enough relational trust to challenge you about your money?",
      options: ["Yes — and they have", "Yes — but they haven't yet", "No — I don't have that person", "I'm not sure I'd want that"],
      followUp: "If not, why not? What would it take to invite someone into that level of honesty?",
    },
  },
  {
    id: "closing",
    title: "Closing & Commission",
    duration: "3 min",
    summary: "Manning points to the God & Money series for deeper study and commissions the church to pursue the generous life — not out of guilt, but out of joy.",
    progress: 94,
    pauseAfter: {
      type: "prayer",
      prompt: "God, show me where my relationship with money stands. I'm not asking you to fix it all today — I'm asking you to help me see clearly. Where have I forgotten that everything I have comes from you? Where am I holding on too tightly? Open my eyes. Amen.",
      duration: "60 seconds",
    },
  },
];

// Holy Habits Activity Data
const HOLY_HABITS_SECTIONS = [
  {
    id: "definition",
    title: "The Generosity Definition",
    type: "reading",
    content: [
      { layer: "Generosity is a willingness to give.", note: "It is not driven by guilt or compulsion. It does not give from obligation or pressure. Generosity springs from the heart of someone who holds their possessions loosely, knowing God has willingly given us life, breath, and everything." },
      { layer: "Generosity is a willingness to give sacrificially.", note: "If our giving isn't at least a little bit painful, it isn't generous. True generosity is costly, where the sacrifice is significant and our hearts declare that Jesus — not money — is our treasure." },
      { layer: "Generosity is a willingness to give sacrificially and joyfully.", note: "It is the joyful overflow of a heart so satisfied in Christ that it gladly sacrifices for the sake of others. The generous heart knows that the greatest treasure is not what is given up, but what is gained in Christ." },
      { layer: "Generosity is a willingness to give sacrificially and joyfully without expecting anything in return.", note: "Generosity gives freely. It does not seek repayment. It mirrors the selfless grace of God, who lavishly gives from His unconditional love, not for what He can gain." },
    ],
  },
  {
    id: "scripture-study",
    title: "Study: 2 Corinthians 8:1–5",
    type: "scripture",
    passage: "We want you to know, brothers, about the grace of God that has been given among the churches of Macedonia, for in a severe test of affliction, their abundance of joy and their extreme poverty have overflowed in a wealth of generosity on their part. For they gave according to their means, as I can testify, and beyond their means, of their own accord, begging us earnestly for the favor of taking part in the relief of the saints — and this, not as we expected, but they gave themselves first to the Lord and then by the will of God to us.",
    ref: "2 Corinthians 8:1–5",
    questions: [
      "Describe the surprising generosity of the Macedonian church. Why do you think Paul describes their actions as a \"wealth of generosity\"?",
      "What do you think was going on in the hearts of the people in that church?",
    ],
  },
  {
    id: "reflect",
    title: "Reflect & Respond",
    type: "reflect",
    questions: [
      "In what ways has God modeled sacrificial, joyful, selfless generosity in sending His own Son?",
      "Who has demonstrated generosity in your own life? How did their generosity affect you?",
    ],
  },
];

// ─── Utility Components ───

function ProgressDots({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "16px 0" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 28 : 7,
            height: 7,
            borderRadius: 4,
            background: i === current ? T.sage : i < current ? T.sage + "50" : T.bgSubtle,
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
          — {reference}
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
          Begin · {duration}
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

// ─── Vimeo Sermon Player ───
// Pause-point timestamps (in seconds) — these correspond to the sermon segments
// TODO: Update these timestamps to match the actual sermon video timecodes
// For now these are estimated based on the sermon structure
const PAUSE_TIMESTAMPS = [
  { time: 180, segmentIndex: 0 },    // ~3 min — end of intro
  { time: 540, segmentIndex: 1 },    // ~9 min — end of definition section
  { time: 840, segmentIndex: 2 },    // ~14 min — end of Macedonians
  { time: 1320, segmentIndex: 3 },   // ~22 min — end of gospel section
  { time: 1740, segmentIndex: 4 },   // ~29 min — end of three shifts
  { time: 2040, segmentIndex: 5 },   // ~34 min — end of scarcity/abundance
  { time: 2400, segmentIndex: 6 },   // ~40 min — end of Manning's story
  { time: 2580, segmentIndex: 7 },   // ~43 min — end of closing
];

const VIMEO_VIDEO_ID = "1071145301";

function SermonPlayer({ segment, segmentIndex, onSegmentComplete, isPlaying, setIsPlaying, playerRef }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const segmentIndexRef = useRef(segmentIndex);
  const onSegmentCompleteRef = useRef(onSegmentComplete);
  const pauseFiredRef = useRef(false);

  // Keep refs current so the timeupdate closure always sees latest values
  useEffect(() => { segmentIndexRef.current = segmentIndex; }, [segmentIndex]);
  useEffect(() => { onSegmentCompleteRef.current = onSegmentComplete; }, [onSegmentComplete]);

  // Reset the pause-fired guard whenever the segment changes
  useEffect(() => { pauseFiredRef.current = false; }, [segmentIndex]);

  // Initialize Vimeo Player API
  useEffect(() => {
    // Load Vimeo Player API script if not already loaded
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

        // Monitor time for pause points — uses refs to avoid stale closures
        player.on('timeupdate', (data) => {
          if (pauseFiredRef.current) return;
          const currentTime = data.seconds;
          const currentPause = PAUSE_TIMESTAMPS[segmentIndexRef.current];
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

  // Control play/pause from parent
  useEffect(() => {
    if (!playerRef.current || !loaded) return;
    if (isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isPlaying, loaded, playerRef]);

  // When segment changes, seek to the right spot
  useEffect(() => {
    if (!playerRef.current || !loaded) return;
    if (segmentIndex === 0) {
      playerRef.current.setCurrentTime(0);
    } else {
      const prevPause = PAUSE_TIMESTAMPS[segmentIndex - 1];
      if (prevPause) {
        playerRef.current.setCurrentTime(prevPause.time + 1);
      }
    }
  }, [segmentIndex, loaded, playerRef]);

  return (
    <div>
      <div style={{
        borderRadius: 16, overflow: "hidden", position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        background: "#1a1a1a",
      }}>
        {/* Vimeo embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&transparent=0`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="John Manning — Generosity (Holy Habits)"
          />
        </div>

        {/* Loading overlay */}
        {!loaded && (
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

      {/* Segment info below video */}
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

function WelcomeScreen({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center" }}>
      <FadeIn>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 3, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          The Generous Life
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <div style={{ fontSize: 11, color: T.sage, letterSpacing: 2, textTransform: "uppercase", fontFamily: sans, fontWeight: 500, marginTop: 4 }}>
          Module One
        </div>
      </FadeIn>

      <Divider width={40} my={24} />

      <FadeIn delay={300}>
        <h1 style={{ fontFamily: serif, fontSize: 42, fontWeight: 400, color: T.text, marginBottom: 10, lineHeight: 1.15, letterSpacing: -0.5 }}>
          What Is Generosity?
        </h1>
      </FadeIn>
      <FadeIn delay={400}>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.textMuted, marginBottom: 4 }}>
          John Manning
        </p>
        <p style={{ fontFamily: sans, fontSize: 13, color: T.textDim }}>
          2 Corinthians 8:1–5, 9:6–8
        </p>
      </FadeIn>

      <Divider width={40} my={24} />

      <FadeIn delay={550}>
        <p style={{ fontFamily: serif, fontSize: 17, color: T.textMuted, maxWidth: 400, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
          Explore what biblical generosity looks like through the story of the Macedonian church and one man's journey from comfort to radical giving.
        </p>
      </FadeIn>

      <FadeIn delay={700}>
        <div style={{ display: "flex", gap: 20, marginBottom: 40, fontSize: 12, color: T.textDim, fontFamily: sans, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ padding: "6px 14px", background: T.bgCard, borderRadius: 20, border: `1px solid ${T.borderLight}` }}>
            🎬 ~43 min sermon
          </span>
          <span style={{ padding: "6px 14px", background: T.bgCard, borderRadius: 20, border: `1px solid ${T.borderLight}` }}>
            📖 ~15 min activity
          </span>
          <span style={{ padding: "6px 14px", background: T.bgCard, borderRadius: 20, border: `1px solid ${T.borderLight}` }}>
            🙏 Prayer throughout
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={850}>
        <button
          onClick={onStart}
          style={{
            fontFamily: sans, fontSize: 14, fontWeight: 500,
            padding: "14px 44px", borderRadius: 28,
            border: `1.5px solid ${T.sage}50`,
            background: T.sage, color: "#fff",
            cursor: "pointer", letterSpacing: 0.3,
            transition: "all 0.2s",
            boxShadow: "0 2px 12px rgba(107,143,113,0.25)",
          }}
        >
          Begin Module
        </button>
      </FadeIn>
    </div>
  );
}

function SermonScreen({ onComplete, onBack }) {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [showPause, setShowPause] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSegments, setCompletedSegments] = useState(new Set());
  const playerRef = useRef(null);

  const segment = SERMON_SEGMENTS[currentSegment];
  const overallProgress = Math.round(((completedSegments.size) / SERMON_SEGMENTS.length) * 100);

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
    setShowPause(false);
    setIsPlaying(false);
    setCompletedSegments((prev) => new Set([...prev, currentSegment]));
    if (currentSegment < SERMON_SEGMENTS.length - 1) {
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
    } else if (currentSegment < SERMON_SEGMENTS.length - 1) {
      setTimeout(() => {
        setCurrentSegment((s) => s + 1);
        setIsPlaying(true);
      }, 800);
    } else {
      setTimeout(() => onComplete(), 1000);
    }
  }, [currentSegment, segment, onComplete]);

  const handlePauseComplete = () => {
    setShowPause(false);
    if (currentSegment < SERMON_SEGMENTS.length - 1) {
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
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          Module 1 · Sermon
        </div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: sans }}>
          {overallProgress}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: T.bgSubtle, borderRadius: 2, marginBottom: 28 }}>
        <div style={{ width: `${overallProgress}%`, height: "100%", background: T.sage, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      {/* Always keep the player mounted so the iframe/Vimeo instance persists */}
      <SermonPlayer
        segment={segment}
        segmentIndex={currentSegment}
        onSegmentComplete={handleSegmentComplete}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playerRef={playerRef}
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

      <ProgressDots total={SERMON_SEGMENTS.length} current={currentSegment} />

      <BottomNav
        label={`Segment ${currentSegment + 1} of ${SERMON_SEGMENTS.length}`}
        onBack={handleNavBack}
        onNext={handleNavNext}
      />
    </div>
  );
}

function HolyHabitsScreen({ onComplete, onBack }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [definitionStep, setDefinitionStep] = useState(0);

  const section = HOLY_HABITS_SECTIONS[currentSection];

  const handleNext = () => {
    if (currentSection < HOLY_HABITS_SECTIONS.length - 1) {
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
    if (currentSection < HOLY_HABITS_SECTIONS.length - 1) {
      setCurrentSection((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const btnStyle = {
    fontFamily: sans, fontSize: 13, fontWeight: 500, padding: "12px 32px", borderRadius: 28,
    border: `1.5px solid ${T.gold}40`, background: T.goldSoft, color: T.gold, cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 20px 72px", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500 }}>
          Module 1 · Holy Habits
        </div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: sans }}>
          {currentSection + 1}/{HOLY_HABITS_SECTIONS.length}
        </div>
      </div>

      <div style={{ height: 3, background: T.bgSubtle, borderRadius: 2, marginBottom: 28 }}>
        <div style={{ width: `${((currentSection + 1) / HOLY_HABITS_SECTIONS.length) * 100}%`, height: "100%", background: T.gold, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      <FadeIn key={`hh-${currentSection}`}>
        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 400, color: T.text, marginBottom: 24 }}>
          {section.title}
        </h2>

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
                <button onClick={() => setDefinitionStep((s) => s + 1)} style={btnStyle}>
                  Next Layer
                </button>
              ) : (
                <FadeIn delay={300}>
                  <button onClick={handleNext} style={btnStyle}>Continue to Study</button>
                </FadeIn>
              )}
            </div>
          </div>
        )}

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
                    value={responses[`study-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`study-${i}`]: e.target.value })}
                    placeholder="Write your reflection..."
                    style={{
                      width: "100%", minHeight: 110, padding: 18, borderRadius: 14,
                      border: `1.5px solid ${T.border}`, background: T.bgCard, color: T.textBody,
                      fontFamily: serif, fontSize: 15, lineHeight: 1.7, resize: "vertical", outline: "none",
                    }}
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

        {section.type === "reflect" && (
          <div>
            {section.questions.map((q, i) => (
              <FadeIn key={i} delay={200 + i * 200}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: serif, fontSize: 16, color: T.text, lineHeight: 1.5, marginBottom: 12, fontWeight: 400 }}>
                    {q}
                  </p>
                  <textarea
                    value={responses[`reflect-${i}`] || ""}
                    onChange={(e) => setResponses({ ...responses, [`reflect-${i}`]: e.target.value })}
                    placeholder="Write your reflection..."
                    style={{
                      width: "100%", minHeight: 110, padding: 18, borderRadius: 14,
                      border: `1.5px solid ${T.border}`, background: T.bgCard, color: T.textBody,
                      fontFamily: serif, fontSize: 15, lineHeight: 1.7, resize: "vertical", outline: "none",
                    }}
                  />
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={600}>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={handleNext} style={btnStyle}>Complete Activity</button>
              </div>
            </FadeIn>
          </div>
        )}
      </FadeIn>

      <ProgressDots total={HOLY_HABITS_SECTIONS.length} current={currentSection} />

      <BottomNav
        label={`Activity ${currentSection + 1} of ${HOLY_HABITS_SECTIONS.length}`}
        onBack={handleNavBack}
        onNext={handleNavNext}
      />
    </div>
  );
}

function ClosingScreen({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center" }}>
      <FadeIn>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: T.completeSoft, border: `2px solid ${T.sage}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, marginBottom: 28, color: T.sage,
        }}>
          ✓
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: sans, fontWeight: 500, marginBottom: 10 }}>
          Module Complete
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 32, fontWeight: 400, color: T.text, marginBottom: 12 }}>
          What Is Generosity?
        </h1>
        <p style={{ fontFamily: serif, fontSize: 16, color: T.textMuted, maxWidth: 400, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
          You've taken the first step. Manning said generosity is a pathway to intimacy with God. Let that settle in this week.
        </p>
      </FadeIn>

      <FadeIn delay={500}>
        <div style={{
          background: T.bgCard, border: `1px solid ${T.borderLight}`,
          borderRadius: 16, padding: "24px 28px", maxWidth: 380, marginBottom: 28,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: 10, color: T.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: sans, fontWeight: 500 }}>
            Coming Next · Module 2
          </div>
          <p style={{ fontFamily: serif, fontSize: 20, color: T.text, marginBottom: 4, fontWeight: 400 }}>
            Everything Belongs to God
          </p>
          <p style={{ fontSize: 13, color: T.textMuted, fontFamily: sans }}>
            Ross Lester · Luke 12:15–34
          </p>
        </div>
      </FadeIn>

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
            God, show me where my relationship with money stands. I'm not asking you to fix it all today — I'm asking you to help me see clearly. Where have I forgotten that everything I have comes from you? Where am I holding on too tightly? Open my eyes. Amen.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={900}>
        <p style={{ fontSize: 12, color: T.textDim, marginTop: 32, fontFamily: sans }}>
          Daily formation touchpoints begin tomorrow.
        </p>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: sans, fontSize: 12, color: T.textDim, marginTop: 16,
            padding: "6px 12px", transition: "color 0.2s",
          }}
        >
          &lsaquo; Back to Holy Habits
        </button>
      </FadeIn>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [screen, setScreen] = useState("welcome");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: sans }}>
      {screen === "welcome" && <WelcomeScreen onStart={() => setScreen("sermon")} />}
      {screen === "sermon" && <SermonScreen onComplete={() => setScreen("holyhabits")} onBack={() => setScreen("welcome")} />}
      {screen === "holyhabits" && <HolyHabitsScreen onComplete={() => setScreen("complete")} onBack={() => setScreen("sermon")} />}
      {screen === "complete" && <ClosingScreen onBack={() => setScreen("holyhabits")} />}
    </div>
  );
}
