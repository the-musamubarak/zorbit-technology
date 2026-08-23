# Zorbit Technology — Design Direction

## Three stylistic approaches

### Theme Name: Signal Foundry
Very dark editorial technology with burnt-orange signal marks, amber data highlights, and warm-white typography. It feels precise, premium, and built for serious decisions.

**Probability:** 0.03

### Theme Name: Abuja Modernist
A sunlit, architectural identity inspired by Abuja's geometry: mineral neutrals, terracotta accents, generous white space, and modular editorial compositions. It feels civic, assured, and locally grounded.

**Probability:** 0.07

### Theme Name: Quiet Systems
A calm, monochrome interface with soft graphite surfaces, moss-green indicators, restrained linework, and documentary-style writing. It feels trustworthy, analytical, and deliberately unflashy.

**Probability:** 0.02

## Selected approach: Signal Foundry

### Design Movement
Contemporary editorial brutalism blended with information-design aesthetics: hard alignment, visible structure, strong typographic contrast, and a disciplined industrial palette.

### Core Principles
The page should make complex capability feel legible, not loud. Every section uses a clear visual hierarchy, asymmetrical composition, and small signals of motion. Surfaces stay mostly flat and architectural, with borders and grid lines used as intentional scaffolding rather than decoration. Orange is reserved for action, proof, and emphasis.

### Color Philosophy
Deep charcoal creates a controlled field where information can be read without glare. Burnt orange is the brand's owned signal color: energetic, warm, and decisive without copying Mastercard. Amber gold marks active data points and measurable outcomes, while warm white avoids the sterile feel of pure white on black.

### Layout Paradigm
Use a left-anchored editorial system with offset columns, oversized section indices, and horizontal rules. Hero content sits against an asymmetric node field; service cards form a staggered matrix; the About section uses a wide statement beside a narrow credential rail; portfolio cards use varying heights rather than identical tiles.

### Signature Elements
A small orange circular Z mark with a diagonal cut. Fine orange grid lines and connecting data nodes. Repeated micro-labels such as `01 / CAPABILITY` and `ABUJA · NIGERIA` to create a technical field-notes language.

### Interaction Philosophy
Interactions should feel like instruments responding to input: quick, direct, and legible. Buttons compress subtly on press, cards lift by a few pixels, and hover states reveal a single additional layer of information. Motion never obscures reading or delays access.

### Animation
The hero network drifts slowly with low-opacity lines and pulsing nodes. Section reveals use short upward opacity transitions with a stagger of 40–60ms. Stats count once when entering the viewport. Hover transforms remain under 220ms and rely on translate/opacity rather than layout shifts. Non-essential animation is disabled under `prefers-reduced-motion`.

### Typography System
Use Space Grotesk for display and body text, with IBM Plex Mono for metadata, labels, tags, and figures. Headlines are tight, heavy, and sentence case; body text is compact with generous line-height; metadata is uppercase, tracked, and never used for long passages.

### Brand Essence
Zorbit turns scattered information into useful decisions and dependable digital products for ambitious teams in Nigeria and beyond.

**Personality:** Decisive, exacting, warm.

### Brand Voice
Headlines are concise and confident. CTAs are active and human. Microcopy should sound like a clear operator explaining the next move, never like generic startup filler.

Example lines: “Make the next decision with better evidence.” “Bring us the messy part. We’ll make it usable.”

### Wordmark & Logo
The logo is a geometric Z built from two offset orange bars inside a circular field, suggesting a path from raw input to clear output. The wordmark uses a custom-spaced uppercase treatment of `ZORBIT` with `TECHNOLOGY` as a smaller mono baseline.

### Signature Brand Color
Burnt Orange `#E8571A` — the signal that marks movement, action, and proof.

## Implementation reminders

All page files should begin with a short comment reminding the editor of the Signal Foundry direction. Avoid purple gradients, fake testimonials, generic lorem ipsum, excessive rounded cards, and fully centered compositions. The testimonials requirement is represented as a client-perspective invitation rather than fabricated endorsements until real quotes are supplied.

## Style Decisions

Service visuals act as subdued technical signal fields beneath Space Grotesk headlines and IBM Plex Mono metadata, rather than introducing a second poster-typography system. Burnt Orange `#E8571A` is reserved for action, proof, active nodes, and key emphasis; large orange fields are avoided unless they are deliberately controlled. Portfolio language should describe the clearer decisions, cleaner operations, and more usable systems created by each project.

Dashboard imagery is treated as a curated evidence plate: raw product colours are desaturated and framed by a restrained charcoal-and-orange technical scaffold, while the actual dashboards remain legible as proof of work.
