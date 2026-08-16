// src/data/blogPosts.ts

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  featured?: boolean;
  intro: string;
  sections: ContentSection[];
  takeaway: string;
}

export const categories = ["All", "ADHD & Focus", "Workplace", "Wellbeing", "Tools & Strategies"];

export const posts: BlogPost[] = [
  {
    slug: "why-traditional-productivity-advice-doesnt-work-for-adhd",
    title: "Why Traditional Productivity Advice Doesn't Work for ADHD",
    excerpt:
      "Most productivity systems assume a brain that plans linearly and stays motivated by deadlines alone. Here's why that model fails ADHD brains — and what actually helps instead.",
    category: "ADHD & Focus",
    image: "/images/blog/traditional-productivity-adhd.jpg",
    readTime: "7 min read",
    date: "2026-06-02",
    featured: true,
    intro:
      "Time-blocking. Eat the frog. Two-minute rule. Most mainstream productivity advice shares a hidden assumption: that motivation follows importance, that willpower is a renewable resource, and that a plan made on Sunday will still make sense on Wednesday. For an ADHD brain, none of those assumptions reliably hold — which is why so many people try system after system and conclude the problem is them, when it's actually the system.",
    sections: [
      {
        heading: "The interest-based nervous system",
        paragraphs: [
          "Neurologically, ADHD motivation runs on interest, challenge, novelty, and urgency — not on importance. A task can be genuinely important and still generate zero internal drive to start it, while a low-stakes distraction lights up the brain instantly. Traditional productivity advice treats motivation as something you summon through discipline. For ADHD brains, discipline isn't the missing ingredient; the right kind of stimulation is.",
          "This is why deadlines often work better than to-do lists: urgency is one of the few reliable levers. It's also why the same person can be intensely productive in a crisis and unable to start a routine task the next day. That isn't inconsistency — it's the same mechanism producing different outcomes depending on the input.",
        ],
      },
      {
        heading: "Planning tools assume working memory that isn't always available",
        paragraphs: [
          "Most planners ask you to hold a plan in mind, break it into steps, sequence those steps, and then execute in order — all without external prompts. That's a working-memory-heavy pipeline. ADHD commonly involves working memory that's inconsistent rather than absent, meaning a plan can be perfectly clear when you write it and completely inaccessible an hour later, not because you forgot it existed but because it silently dropped out of active attention.",
          "This is also why a task can feel 'out of sight, out of mind' even when it's written down in a notebook two feet away. The plan needs to interrupt your attention, not just exist somewhere you could theoretically look.",
        ],
      },
      {
        heading: "What tends to work better",
        paragraphs: [
          "Instead of systems built around willpower and long-range planning, ADHD-friendly approaches usually lean on external structure: visual or physical cues that don't depend on memory, tasks broken small enough that starting takes less activation energy, and built-in novelty or accountability — like body doubling — that supplies motivation the brain isn't generating on its own.",
          "The goal isn't to try harder inside a system that wasn't built for you. It's to swap the system for one that matches how your attention actually behaves.",
        ],
      },
    ],
    takeaway:
      "If a productivity method keeps failing you, that's rarely a discipline problem — it's usually a mismatch between the method's assumptions and how your brain generates motivation and holds a plan in mind.",
  },
  {
    slug: "executive-dysfunction-vs-laziness",
    title: "Executive Dysfunction vs Laziness: Understanding the Difference",
    excerpt:
      "\"Just do it\" doesn't work when the barrier isn't motivation. A closer look at what executive dysfunction actually is, and why it's so often mistaken for a character flaw.",
    category: "ADHD & Focus",
    image: "/images/blog/executive-dysfunction-vs-laziness.jpg",
    readTime: "6 min read",
    date: "2026-05-20",
    intro:
      "Laziness implies a choice: the ability to act, paired with an unwillingness to. Executive dysfunction is closer to the opposite — genuine willingness paired with a brain that can't currently execute the sequence of steps required to act. The two can look identical from the outside, which is exactly why executive dysfunction gets so consistently misread as a motivation problem.",
    sections: [
      {
        heading: "What executive function actually does",
        paragraphs: [
          "Executive function is the set of cognitive processes that let you initiate a task, hold a goal in mind while ignoring distractions, sequence steps, monitor progress, and shift when a plan stops working. It's the brain's project manager. When that project manager is impaired — as it commonly is in ADHD, autism, depression, and after burnout — none of the downstream steps happen reliably, even when the desire to complete the task is completely intact.",
          "This is why someone can care deeply about a deadline, feel real anxiety about missing it, and still not be able to start. The caring isn't the bottleneck. The initiation step is.",
        ],
      },
      {
        heading: "The tell that separates the two",
        paragraphs: [
          "Laziness, in the colloquial sense, tends to come with an absence of concern — the task doesn't get done and it doesn't particularly bother the person. Executive dysfunction almost always comes paired with distress: frustration, shame, or anxiety about the task sitting there undone, often for hours while the person tries and fails to start. If someone is visibly agonizing over a task they 'should' be able to just do, that's a strong signal the barrier isn't willingness.",
          "It's also common for executive dysfunction to be task-specific and situational rather than global — someone might start a passion project instantly but sit paralyzed in front of a two-line email. A consistent motivation problem would show up everywhere. Executive dysfunction is famously inconsistent.",
        ],
      },
      {
        heading: "Why the mislabel causes real harm",
        paragraphs: [
          "Treating executive dysfunction as laziness usually leads to the wrong intervention: more pressure, more willpower-based advice, more shame. Shame doesn't restore executive function — if anything, the added stress makes initiation harder, creating a loop where the person tries harder, still can't start, and concludes something is deeply wrong with their character rather than their brain's task-initiation system.",
          "The more useful response is structural: lower the activation energy required to start (breaking a task down further than seems necessary), add external accountability (body doubling, a check-in, a visible timer), and remove the assumption that trying harder is the fix.",
        ],
      },
    ],
    takeaway:
      "If someone wants to do something and still can't start, that's a strong sign the issue is executive function, not effort — and it responds to structure, not pressure.",
  },
  {
    slug: "adhd-friendly-daily-routine",
    title: "How to Build an ADHD-Friendly Daily Routine",
    excerpt:
      "Rigid schedules tend to collapse fast. A practical guide to building routines with enough structure to help, and enough flexibility to survive a bad day.",
    category: "ADHD & Focus",
    image: "/images/blog/adhd-friendly-routine.jpg",
    readTime: "8 min read",
    date: "2026-05-08",
    intro:
      "A routine that only works on your best days isn't a routine — it's a plan that's one bad night's sleep away from collapsing entirely. The most durable ADHD-friendly routines are built around flexible anchors rather than a fixed timetable, which means they can bend on hard days without breaking completely.",
    sections: [
      {
        heading: "Anchor points instead of a fixed schedule",
        paragraphs: [
          "Instead of scheduling every hour, pick two or three non-negotiable anchor points in the day — a wake-up window, a specific check-in time, a wind-down cue — and let everything else flex around them. Anchors give the day shape without requiring the kind of precise time-tracking that ADHD's time blindness makes unreliable.",
          "A morning anchor might simply be: out of bed, water, five minutes outside. It doesn't need to be elaborate to work — it just needs to be consistent enough that your body starts to expect it.",
        ],
      },
      {
        heading: "Match tasks to energy, not to the clock",
        paragraphs: [
          "Most schedules assume energy is flat across the day. It usually isn't. Tracking your energy for even a week tends to reveal a pattern — a window where focus comes easier, and a window where it reliably doesn't. Once you know that pattern, the highest-leverage move is simple: put demanding tasks in the high-energy window and put low-effort, low-stakes tasks in the low window, instead of fighting your energy on its worst hours.",
          "This is the entire logic behind energy tracking tools — not to optimize every minute, but to stop scheduling important work during the hours you already know don't work for you.",
        ],
      },
      {
        heading: "Build in a real recovery block",
        paragraphs: [
          "ADHD routines that leave no room for recovery tend to run fine for a few days and then fall apart entirely, often written off as 'falling off the routine' when the real cause was never budgeting for rest. A short recovery block after a demanding period — even 15–20 minutes of doing nothing that requires output — reduces the odds of the kind of full-day shutdown that undoes a week of consistency.",
        ],
      },
      {
        heading: "Design for restart, not perfection",
        paragraphs: [
          "The routines that last aren't the ones that never break — they're the ones with an easy way back in. Decide in advance what 'getting back on track' looks like after a missed day, so a single skip doesn't spiral into abandoning the whole system. A specific, small restart step ('just do the morning anchor, skip the rest') is far more sustainable than an all-or-nothing routine.",
        ],
      },
    ],
    takeaway:
      "A routine that survives a bad day is more valuable than a routine that only works on a perfect one. Build around a few flexible anchors, match tasks to your real energy pattern, and always leave a clear way back in.",
  },
  {
    slug: "what-is-neurodiversity-in-the-workplace",
    title: "What Is Neurodiversity in the Workplace?",
    excerpt:
      "A plain-language introduction to neurodiversity at work — what it means, why it matters for hiring and retention, and where most companies get it wrong.",
    category: "Workplace",
    image: "/images/blog/neurodiversity-workplace.jpg",
    readTime: "6 min read",
    date: "2026-04-27",
    intro:
      "Neurodiversity is the idea that variation in brain function — including ADHD, autism, dyslexia, and other cognitive differences — is a normal part of human diversity, not a set of deficits to be corrected. In a workplace context, it shifts the question from 'how do we accommodate a disorder' to 'how do we design work that doesn't assume only one kind of brain.'",
    sections: [
      {
        heading: "Why this framing matters practically",
        paragraphs: [
          "Most workplace processes — open-plan offices, back-to-back meetings, vague verbal instructions, rigid 9-to-5 focus expectations — were designed around an unstated 'default' brain. For neurodivergent employees, those defaults aren't neutral; they're actively harder to work within, regardless of the person's skill or effort.",
          "Framing this as neurodiversity rather than individual dysfunction changes where the fix lives. Instead of asking an employee to mask their way through an environment that doesn't fit them, the workplace itself becomes the thing under review.",
        ],
      },
      {
        heading: "The business case, briefly",
        paragraphs: [
          "Neurodivergent employees often bring pattern-recognition, hyperfocus, and creative problem-solving that's genuinely differentiated — but only in environments that don't burn that capacity out through friction and masking. Companies that build neuro-inclusive practices tend to see this less as a compliance requirement and more as removing barriers to work their employees were already capable of doing.",
          "Retention is the clearest signal. Neurodivergent employees frequently leave not because the job was wrong for them, but because the environment made an otherwise good fit unsustainable.",
        ],
      },
      {
        heading: "Where companies commonly get it wrong",
        paragraphs: [
          "The most common mistake is treating neurodiversity support as a single accommodation request handled quietly by HR, rather than a set of defaults that benefit everyone — written instructions in addition to verbal ones, meeting agendas shared in advance, quiet workspace options. These changes rarely cost much, but they require actually asking what's causing friction instead of assuming.",
          "The second mistake is expecting neurodivergent employees to self-identify and request support in a system that wasn't built with them in mind — which puts the burden of adaptation entirely on the person least equipped to navigate an unclear process while already managing extra cognitive load.",
        ],
      },
    ],
    takeaway:
      "Neurodiversity at work isn't a diversity initiative bolted onto existing processes — it's a design question about who those processes were built for in the first place.",
  },
  {
    slug: "how-employers-can-support-neurodivergent-employees",
    title: "How Employers Can Better Support Neurodivergent Employees",
    excerpt:
      "Beyond accommodations checklists — concrete, low-cost changes to communication, meetings, and workflow that make a measurable difference.",
    category: "Workplace",
    image: "/images/blog/employers-support-neurodivergent.jpg",
    readTime: "9 min read",
    date: "2026-04-14",
    intro:
      "Most guidance on supporting neurodivergent employees stops at a formal accommodations list — a quiet room, noise-canceling headphones, flexible hours. Those matter, but they treat support as an exception process rather than something built into how a team actually operates day to day.",
    sections: [
      {
        heading: "Fix communication defaults first",
        paragraphs: [
          "Verbal-only instructions, meetings without agendas, and decisions made in hallway conversations disproportionately disadvantage employees who rely on written processing or need time to formulate a response. Sending a brief written agenda before meetings, following up verbal decisions with a written summary, and giving people advance notice of what will be discussed costs almost nothing and helps far more people than the neurodivergent employees it was designed for.",
        ],
      },
      {
        heading: "Redesign meetings around actual need",
        paragraphs: [
          "Back-to-back meetings with no buffer are exhausting for anyone, but especially disruptive for employees managing sensory load or needing recovery time between contexts. Default to shorter meetings, build in five-minute buffers, and normalize cameras-off or async updates where a live meeting isn't actually necessary. The goal isn't fewer meetings for their own sake — it's fewer meetings that exist out of habit rather than need.",
        ],
      },
      {
        heading: "Make flexibility the default, not the exception",
        paragraphs: [
          "When flexible hours or remote work require a formal accommodation request, only employees who've already self-identified — and are comfortable disclosing — get access to them. Offering flexibility as a standard option for the whole team, where the role allows it, means neurodivergent employees benefit without having to disclose anything at all.",
        ],
      },
      {
        heading: "Train managers to spot friction, not just monitor output",
        paragraphs: [
          "A manager who only tracks whether deadlines are hit will miss early signs of burnout, overload, or a mismatch between someone's strengths and their current tasks. Training managers to notice patterns — someone consistently working late to compensate, a sudden drop in communication, repeated missed check-ins — creates room to intervene before performance actually suffers, rather than after.",
        ],
      },
    ],
    takeaway:
      "The highest-impact changes are rarely the formal accommodations list — they're the everyday defaults around communication, meetings, and flexibility that determine whether an employee has to fight the environment just to do their job.",
  },
  {
    slug: "recognizing-early-signs-of-burnout",
    title: "Recognizing the Early Signs of Burnout",
    excerpt:
      "Burnout rarely arrives all at once. The subtle early signals — and why neurodivergent adults are often at higher risk of missing them.",
    category: "Wellbeing",
    image: "/images/blog/early-signs-of-burnout.jpg",
    readTime: "5 min read",
    date: "2026-04-01",
    intro:
      "By the time burnout is undeniable — exhaustion that sleep doesn't fix, dread about tasks you used to handle easily — it's usually been building for weeks or months. The earlier signals are quieter, and for neurodivergent adults who are often already compensating for extra cognitive load, they're easy to mistake for a normal bad stretch.",
    sections: [
      {
        heading: "The signals that show up before exhaustion does",
        paragraphs: [
          "Before full exhaustion sets in, burnout tends to show up as small efficiency losses: tasks that used to take twenty minutes now take an hour, decision-making that feels unusually effortful, or a growing need to re-read the same instructions several times. Irritability over minor things and a shrinking tolerance for sensory input — noise, screens, conversation — are also common early markers, often before someone consciously registers feeling 'burnt out' at all.",
        ],
      },
      {
        heading: "Why masking delays recognition",
        paragraphs: [
          "Many neurodivergent adults have spent years developing coping strategies to appear consistent and functional regardless of internal state — a skill that's genuinely useful, but that also masks the early data that would normally prompt someone to slow down. The result is that burnout often isn't caught until it's severe, because the outward signals that would typically tip someone off were suppressed by the same compensating behavior that's usually praised as resilience.",
        ],
      },
      {
        heading: "What to actually track",
        paragraphs: [
          "Rather than waiting to 'feel burnt out,' tracking a few concrete markers over time — how long routine tasks take, how often you need to re-read something, how you're sleeping, how much recovery time you need after a normal day — surfaces the trend line before it becomes a crisis. A single bad day tells you very little. A two-week decline in the same three or four markers tells you a great deal.",
        ],
      },
    ],
    takeaway:
      "Burnout is easier to catch as a trend than as a moment. Watching a few concrete markers over time — rather than waiting to consciously feel exhausted — gives you a real chance to intervene early.",
  },
  {
    slug: "body-doubling-explained",
    title: "Body Doubling Explained: Why It Works",
    excerpt:
      "Just having someone else in the room can make starting a task easier. The psychology behind body doubling, and how to use it effectively.",
    category: "Tools & Strategies",
    image: "/images/blog/body-doubling-explained.jpg",
    readTime: "6 min read",
    date: "2026-03-19",
    intro:
      "Body doubling is the practice of working alongside another person — in person or virtually — without necessarily collaborating on the same task. No coaching, no accountability check-ins required. Just shared presence. For a lot of people, especially those with ADHD, it measurably lowers the barrier to starting and sustaining a task that would otherwise stall out entirely.",
    sections: [
      {
        heading: "What's actually happening cognitively",
        paragraphs: [
          "Another person's presence introduces mild, ambient accountability and a small amount of external structure — even if that person never says a word. It's thought to tap into the same urgency mechanism that makes deadlines effective for ADHD brains: the social context makes 'not working' slightly more effortful than working, which is often enough to tip the balance on a task where the internal motivation alone wasn't sufficient.",
          "It's not about pressure or judgment. Most people who use body doubling effectively report that the other person barely needs to be paying attention to them at all — the presence itself, not any active interaction, is what helps.",
        ],
      },
      {
        heading: "Why it particularly helps with task initiation",
        paragraphs: [
          "Body doubling tends to help most with the specific moment of starting a task, rather than sustaining focus over a long stretch. If executive dysfunction is primarily a task-initiation problem, then a low-effort intervention that specifically targets initiation — 'we're both starting now' — addresses the actual bottleneck rather than a downstream symptom.",
        ],
      },
      {
        heading: "How to use it well",
        paragraphs: [
          "Virtual body doubling sessions work as well as in-person ones for most people, and often better, since they remove commute friction and social pressure to make conversation. The most effective setups tend to have a clear start and end time, minimal chat, and cameras optional — the goal is parallel presence, not performance. Trying it for a specific stuck task — the one you've been avoiding for days — is usually a better first test than using it for routine work you'd do anyway.",
        ],
      },
    ],
    takeaway:
      "Body doubling works because presence itself lowers the activation energy to start, particularly for the task-initiation friction that's common in ADHD — no coaching or conversation required.",
  },
  {
    slug: "understanding-time-blindness",
    title: "Understanding Time Blindness",
    excerpt:
      "Why an hour can feel like ten minutes — or three. A look at time blindness, how it shows up day to day, and practical ways to work around it.",
    category: "ADHD & Focus",
    image: "/images/blog/understanding-time-blindness.jpg",
    readTime: "7 min read",
    date: "2026-03-05",
    intro:
      "Time blindness is the difficulty of accurately sensing how much time has passed, or how much remains, without an external reference. It's not a metaphor for being bad at scheduling — it's a genuine perceptual difference, commonly linked to ADHD, where internal time-tracking is unreliable in a way that clocks and calendars don't fully fix on their own.",
    sections: [
      {
        heading: "How it shows up day to day",
        paragraphs: [
          "Time blindness explains a specific, recognizable pattern: sitting down to 'quickly check' something and looking up two hours later with no sense of where the time went, or conversely, feeling certain that thirty minutes have passed when it's only been five. It also shows up as chronic lateness that isn't about disrespect for other people's time — it's a genuine miscalculation of how long getting ready, or getting somewhere, actually takes.",
          "The 'now versus not now' framing common in ADHD research captures this well: anything not happening in the immediate present tends to feel abstract and distant, which makes planning around a deadline that's three days away functionally similar to planning around one that's three weeks away, until the urgency finally arrives.",
        ],
      },
      {
        heading: "Why willpower doesn't fix it",
        paragraphs: [
          "Because time blindness is a perceptual issue rather than a motivation issue, telling someone to 'just be more aware of the time' doesn't address the actual mechanism — it's asking someone to use a sense that isn't reliably available to them. The more effective fixes are external: visible, ambient time cues that don't require remembering to check a clock.",
        ],
      },
      {
        heading: "Practical workarounds that actually help",
        paragraphs: [
          "Visual timers that show time passing (rather than a static number) tend to work better than standard digital clocks, since they make elapsed time visible without requiring active recall. Setting alarms for transitions rather than just end-times — a reminder at the midpoint of a task, not just at the deadline — helps catch the drift before it becomes a full hour lost. Building in deliberately generous time buffers, especially before anything with a hard external deadline, reduces the cost of the estimate being wrong, which it very often will be.",
        ],
      },
    ],
    takeaway:
      "Time blindness is a perception gap, not a discipline gap — the fix is external, visible time cues, not trying harder to feel time pass.",
  },
  {
    slug: "why-generic-wellness-programs-fail",
    title: "Why Generic Employee Wellness Programs Often Fail",
    excerpt:
      "Free yoga classes and step challenges rarely move the needle for neurodivergent staff. What most wellness programs miss, and what to build instead.",
    category: "Workplace",
    image: "/images/blog/generic-wellness-programs-fail.jpg",
    readTime: "6 min read",
    date: "2026-02-20",
    intro:
      "Most corporate wellness programs share the same shape: a meditation app subscription, an occasional yoga class, a step-count challenge. Usage is usually low, and the employees who most need support are often the least likely to engage — not because they don't care about wellbeing, but because the program was never built around what's actually driving their stress.",
    sections: [
      {
        heading: "The one-size-fits-all problem",
        paragraphs: [
          "Generic wellness perks assume a fairly uniform source of stress — general busyness, a need to relax — and offer a fairly uniform fix. But for neurodivergent employees, the actual drivers of strain are frequently structural: sensory overload from the office environment, the cognitive cost of masking all day, meetings that don't accommodate different processing styles, or executive-function friction with how tasks are assigned and tracked. A meditation app doesn't touch any of that.",
        ],
      },
      {
        heading: "Why low engagement isn't a communication problem",
        paragraphs: [
          "When a wellness benefit goes unused, the common response is to communicate it more — more emails, more reminders. But if the benefit doesn't address the actual friction someone experiences at work, no amount of promotion will change engagement. Low usage is often useful data pointing at a mismatch between the program and the real problem, not a sign that people simply forgot the perk exists.",
        ],
      },
      {
        heading: "What tends to work instead",
        paragraphs: [
          "Programs that show measurable engagement tend to target specific, named friction points rather than offering generic relaxation: structured focus time protected from meetings, manager training on recognizing early burnout signals, clear and predictable communication norms, and tools that help employees understand their own patterns rather than being told generically to 'manage stress better.'",
          "The through-line is specificity. A wellness initiative that could apply to literally any company, in any industry, for any role, is unlikely to address the particular pressures any one team is actually under.",
        ],
      },
    ],
    takeaway:
      "Wellness programs fail when they treat stress as generic. The ones that work start by identifying the specific structural friction a team faces, rather than offering the same relaxation perk to everyone.",
  },
  {
    slug: "ai-tools-for-neurodivergent-adults",
    title: "AI Tools That Can Help Neurodivergent Adults Stay Organized",
    excerpt:
      "From task breakdown to inbox triage — a practical look at where AI tools genuinely help neurodivergent adults, and where they fall short.",
    category: "Tools & Strategies",
    image: "/images/blog/ai-tools-neurodivergent.jpg",
    readTime: "8 min read",
    date: "2026-02-05",
    intro:
      "AI tools are frequently pitched as a blanket productivity fix, but for neurodivergent adults, the value is much more specific: they're often genuinely useful for tasks that involve breaking things down or reducing ambiguity, and much less useful — sometimes actively unhelpful — for tasks that require sustained motivation or emotional regulation.",
    sections: [
      {
        heading: "Where AI genuinely helps",
        paragraphs: [
          "Task breakdown is one of the strongest use cases: turning a vague, overwhelming goal ('finish the report') into a concrete list of small, ordered steps addresses exactly the kind of planning friction that makes executive dysfunction so paralyzing. Similarly, using AI to draft a first pass of a difficult email or document lowers the activation energy of a blank page, which is often the actual barrier, not the writing itself.",
          "Inbox and message triage is another strong fit — having a tool summarize a long thread or flag what actually needs a response cuts down on the working-memory load of tracking many open loops at once.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "AI tools don't generate motivation, and they don't replace the accountability that comes from another person's presence — which is why they tend to help with planning far more than with actually starting. A perfectly broken-down task list doesn't help if initiation is still the bottleneck; that's a body-doubling or external-structure problem, not an information problem.",
          "They can also introduce a new kind of friction: choosing between tools, tuning prompts, and managing yet another app can become its own source of overwhelm, especially for someone whose actual need was fewer decisions, not more options.",
        ],
      },
      {
        heading: "A practical way to evaluate any AI tool",
        paragraphs: [
          "Before adopting a new AI tool, it's worth asking specifically what type of friction it addresses: is it reducing ambiguity (planning, breakdown, drafting), or is it expecting you to supply motivation and consistency it can't provide? Tools aimed at the first category tend to deliver real value quickly. Tools that quietly assume the second are likely to become one more abandoned app within a few weeks.",
        ],
      },
    ],
    takeaway:
      "AI tools are strongest at reducing ambiguity — breaking down tasks, drafting first passes, summarizing information — and weakest at supplying motivation or accountability, which still needs a different kind of solution.",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(current: BlogPost, limit = 3) {
  return posts
    .filter((post) => post.slug !== current.slug && post.category === current.category)
    .slice(0, limit);
}