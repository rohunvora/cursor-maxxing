export interface PromptData {
  id: string
  title: string
  description: string
  category: 'coding' | 'writing' | 'analysis' | 'creative' | 'system'
  modelTag: string
  prompt: string
}

export const prompts: PromptData[] = [
  {
    id: '1',
    title: 'Zoom Out, Zoom In',
    description: "Simon Willison's technique for code refinement—explain, implement, then verify in cycles.",
    category: 'coding',
    modelTag: 'Claude / GPT-4',
    prompt: `Help me with [task]. Work in three phases:

**ZOOM OUT:** Explain your approach in 2-3 sentences. What's the strategy? What could go wrong?

**ZOOM IN:** Write the code.

**ZOOM OUT:** Now explain why this works. What are the tradeoffs? What would break it?

Don't skip phases. I need to understand, not just copy-paste.`
  },
  {
    id: '2',
    title: 'Think Step by Step',
    description: 'The legendary Chain of Thought prompt that dramatically improves reasoning accuracy.',
    category: 'coding',
    modelTag: 'Any model',
    prompt: `Before writing any code, think through this step by step:

1. What are the inputs and expected outputs?
2. What are the edge cases?
3. What's the simplest approach that could work?
4. What could go wrong with that approach?
5. Now write the code.

After the code, verify: does this actually handle the edge cases you listed?

Task: [describe what you need]`
  },
  {
    id: '3',
    title: 'The Refactoring Partner',
    description: 'Transforms messy code into clean code while explaining the why behind each change.',
    category: 'coding',
    modelTag: 'Claude / Cursor',
    prompt: `Refactor this code. For each change you make, explain:
- WHAT you changed
- WHY it's better
- WHAT could break (if anything)

Priorities: readability > cleverness, explicit > implicit.

Don't refactor for the sake of it. If something is fine, say "this is fine" and explain why.

\`\`\`
[paste code]
\`\`\``
  },
  {
    id: '4',
    title: 'The Terse Expert',
    description: 'Anthropic-recommended system prompt for concise, senior-level responses.',
    category: 'system',
    modelTag: 'Claude / GPT-4',
    prompt: `You are a terse senior engineer. You:
- Answer in the fewest words that fully address the question
- Skip preamble. No "Great question!" or "I'd be happy to help"
- Use code blocks generously
- Say "I don't know" immediately when uncertain
- Give the answer first, then explain if needed
- Never apologize

If I need more detail, I'll ask.`
  },
  {
    id: '5',
    title: 'ELI5',
    description: 'The viral "Explain Like I\'m 5" technique that makes complex topics instantly understandable.',
    category: 'analysis',
    modelTag: 'Any model',
    prompt: `Explain [topic] like I'm 5 years old.

Rules:
- Use simple words only
- Use a concrete analogy from everyday life
- No jargon, no acronyms
- If you must use a technical term, immediately explain it with an example
- Keep it under 100 words

Then, after the simple explanation, give me the "grown-up version" in one paragraph.`
  },
  {
    id: '6',
    title: 'The De-Slopper',
    description: 'Removes AI-speak and transforms robotic text into natural human writing.',
    category: 'writing',
    modelTag: 'Claude / GPT-4',
    prompt: `Rewrite this to sound like a real human wrote it.

BANNED WORDS: delve, tapestry, landscape, leverage, robust, streamline, cutting-edge, game-changing, synergy, ecosystem, paradigm, holistic, seamless

BANNED PATTERNS:
- "In today's [anything]..."
- "It's important to note..."
- "In conclusion..."
- Starting any sentence with "This"

RULES:
- Vary sentence length (some short. Some longer with multiple clauses.)
- Use contractions
- Be specific, not vague
- Cut word count by 30%
- One idea per paragraph

Text: [paste here]`
  },
  {
    id: '7',
    title: 'Steel Man My Position',
    description: 'Forces the model to find the strongest counterargument before analyzing—essential for clear thinking.',
    category: 'analysis',
    modelTag: 'Claude / GPT-4',
    prompt: `I'll share my position. Before responding:

1. Steel man the opposition: What's the STRONGEST argument against my view? (Not a straw man—the version a smart opponent would actually make)
2. What might they know that I don't?
3. Where is my position weakest?
4. NOW give your analysis

Be adversarial. I need to stress-test this idea.

My position: [your take]`
  },
  {
    id: '8',
    title: 'Cinematic Photo Prompt',
    description: 'The battle-tested structure for photorealistic AI images: subject first, then style, then technical details.',
    category: 'creative',
    modelTag: 'Midjourney / DALL-E',
    prompt: `[SUBJECT], [ACTION/POSE], [SETTING]. [LIGHTING TYPE] lighting. Shot on [CAMERA] with [LENS], [APERTURE]. [COLOR PALETTE]. [MOOD]. --ar 16:9 --v 6

Example:
A weathered fisherman mending nets on a wooden dock, early morning golden hour in a small Portuguese village. Soft directional lighting. Shot on Sony A7IV with 85mm f/1.4, shallow depth of field. Warm ochre and deep blue tones. Nostalgic, intimate. --ar 16:9 --v 6`
  },
  {
    id: '9',
    title: 'The Socratic Tutor',
    description: 'Guides you to understanding through questions instead of giving answers—how experts actually learn.',
    category: 'system',
    modelTag: 'Claude',
    prompt: `You're a Socratic tutor. Never give me the answer directly.

When I ask something:
1. First ask what I already know about it
2. Ask questions that expose gaps in my understanding
3. Give hints, not solutions
4. When I figure something out, confirm and build on it
5. Only explain directly if I say "just tell me"

Start every response with a question.

I want to learn about: [topic]`
  },
  {
    id: '10',
    title: 'The Viral Thread',
    description: 'Transforms content into Twitter/X threads optimized for engagement and readability.',
    category: 'writing',
    modelTag: 'Any model',
    prompt: `Turn this into a 10-tweet thread:

HOOK (Tweet 1): Start with the most surprising insight. No "I've been thinking about..." or "Thread:". Just the insight.

MEAT (Tweets 2-8):
- One idea per tweet max
- Line breaks for readability
- Specific > vague (use numbers, names, examples)
- Tweet 2-3 must deliver massive value (that's where drop-off happens)

CLOSE (Tweet 9-10): Actionable takeaway. No "follow for more" cringe.

NO hashtags. NO emojis in every tweet.

Content: [paste here]`
  },
  {
    id: '11',
    title: 'Pre-Mortem',
    description: "Amazon's technique for identifying failure modes before they happen—essential for planning.",
    category: 'analysis',
    modelTag: 'Claude / GPT-4',
    prompt: `It's 6 months from now. This project failed completely.

Project: [describe it]

Tell me:
1. The 3 most likely causes of failure (be specific, not generic)
2. The "black swan"—one catastrophic failure mode we're probably not considering
3. Early warning signs for each failure mode
4. The single most important thing to do differently

Be brutally honest. Assume I have blind spots—that's why I'm asking.`
  },
  {
    id: '12',
    title: 'The Naming Gauntlet',
    description: 'Systematic approach to naming—the hardest problem in engineering and product.',
    category: 'creative',
    modelTag: 'Any model',
    prompt: `I need to name a [type: product/feature/company/variable].

What it does: [description]
Who it's for: [audience]
Vibe: [serious/playful/technical/friendly]

Generate 20 options across these categories:
- LITERAL (3): Says exactly what it does
- METAPHOR (4): Evokes what it does through comparison
- COMPOUND (4): Two words smashed together
- INVENTED (3): Made-up words that sound right
- ABBREVIATION (3): If it makes sense
- WILDCARD (3): Surprise me

For each: note pronunciation issues, potential domain conflicts, and any unfortunate meanings in other languages.`
  }
]

