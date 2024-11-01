// breathing.ts
import { type BunFile } from "bun";

class BreathingExercise {
	private static readonly MINDFUL_QUOTES = [
		{
			text: "Breathing in, I calm body and mind. Breathing out, I smile.",
			author: "Thich Nhat Hanh",
		},
		{
			text: "The only way to live is by accepting each minute as an unrepeatable miracle.",
			author: "Tara Brach",
		},
		{
			text: "Be where you are; otherwise you will miss your life.",
			author: "Buddha",
		},
		{
			text: "When you own your breath, nobody can steal your peace.",
			author: "Unknown",
		},
		{
			text: "Smile, breathe, and go slowly.",
			author: "Thich Nhat Hanh",
		},
		{
			text: "Breathing is the greatest pleasure in life.",
			author: "Giovanni Papini",
		},
		{
			text: "Your breath is your anchor to the present moment.",
			author: "Sharon Salzberg",
		},
		{
			text: "The breath is the bridge which connects life to consciousness.",
			author: "Thich Nhat Hanh",
		},
		{
			text: "Peace begins with a smile.",
			author: "Mother Teresa",
		},
		{
			text: "Within you there is a stillness and sanctuary to which you can retreat at any time.",
			author: "Hermann Hesse",
		},
		{
			text: "Life is not measured by the breaths we take, but by the moments that take our breath away.",
			author: "Maya Angelou",
		},
		{
			text: "Let go of the thoughts that don't make you strong.",
			author: "Karen Salmansohn",
		},
	];

	// Adjusted visualizations to ensure consistent width and alignment
	private static readonly VISUALIZATIONS = {
		circle: [
			" ○ ", // Empty
			" ◔ ", // Quarter
			" ◑ ", // Half
			" ◕ ", // Three quarters
			" ● ", // Full
			" ◕ ", // Three quarters
			" ◑ ", // Half
			" ◔ ", // Quarter
		],
		wave: [
			" ▁ ", // Lowest
			" ▂ ",
			" ▃ ",
			" ▄ ",
			" ▅ ",
			" ▆ ",
			" ▇ ",
			" █ ", // Highest
			" ▇ ",
			" ▆ ",
			" ▅ ",
			" ▄ ",
			" ▃ ",
			" ▂ ",
		],
		lotus: [
			" ✾ ", // Closed
			" ✿ ", // Opening
			" ❀ ", // Full bloom
			" ✿ ", // Closing
		],
		zen: [
			" ☯️  ", // Yin yang
			" 🕉️  ", // Om
			" ☸️  ", // Dharma wheel
			" ⚛️  ", // Unity
		],
	};

	private static readonly BREATH_PATTERNS = {
		square: [4, 4, 4, 4], // Equal inhale, hold, exhale, pause
		relaxed: [4, 7, 8, 0], // 4-7-8 breathing technique
		zen: [6, 0, 6, 0], // Simple zen breathing
		energy: [2, 0, 2, 0], // Quick energizing breath
	};

	private static readonly COLORS = {
		cyan: "\x1b[36m",
		yellow: "\x1b[33m",
		reset: "\x1b[0m",
		italic: "\x1b[3m",
	};

	private isRunning = false;

	private static getRandomQuote(): (typeof BreathingExercise.MINDFUL_QUOTES)[0] {
		return BreathingExercise.MINDFUL_QUOTES[
			Math.floor(Math.random() * BreathingExercise.MINDFUL_QUOTES.length)
		];
	}

	private static formatQuote(
		quote: (typeof BreathingExercise.MINDFUL_QUOTES)[0],
	): string {
		const maxWidth = 50; // Maximum width for quote display
		const words = quote.text.split(" ");
		const lines: string[] = [];
		let currentLine = "";
		// Word wrap the quote
		for (const word of words) {
			if ((currentLine + word).length > maxWidth) {
				lines.push(currentLine.trim());
				currentLine = "";
			}
			currentLine = `${currentLine}${word} `;
		}
		lines.push(currentLine.trim());

		// Center each line and build the quote box
		const longestLine = Math.max(...lines.map((line) => line.length));
		const boxWidth = longestLine + 6;
		const horizontalBorder = "─".repeat(boxWidth);

		let formattedQuote = `    ╭${horizontalBorder}╮\n`;

		for (const line of lines) {
			const padding = " ".repeat(Math.floor((boxWidth - line.length) / 2));
			formattedQuote += `    │ ${padding}${line}${padding}${(boxWidth - line.length) % 2 ? " " : ""} │\n`;
		}

		// Add author with different styling
		const author = `- ${quote.author}`;
		const authorPadding = " ".repeat(
			Math.floor((boxWidth - author.length) / 2),
		);
		formattedQuote += `    │ ${authorPadding}${BreathingExercise.COLORS.italic}${author}${BreathingExercise.COLORS.reset}${authorPadding}${(boxWidth - author.length) % 2 ? " " : ""} │\n`;
		formattedQuote += `    ╰${horizontalBorder}╯\n`;

		return formattedQuote;
	}
	async start(
		duration = 180,
		pattern: keyof typeof BreathingExercise.BREATH_PATTERNS = "square",
		style: keyof typeof BreathingExercise.VISUALIZATIONS = "circle",
	): Promise<void> {
		const breathingPattern = BreathingExercise.BREATH_PATTERNS[pattern];
		const visualization = BreathingExercise.VISUALIZATIONS[style];
		const startTime = Date.now();
		this.isRunning = true;

        console.clear();

        // Display random quote
        const quote = BreathingExercise.getRandomQuote();
        console.log(`\n${BreathingExercise.COLORS.cyan}${BreathingExercise.formatQuote(quote)}${BreathingExercise.COLORS.reset}`);
        
        // Pause to let the user read the quote
        console.log("    Take a moment to reflect on these words...");
        await Bun.sleep(5000);
        
        // Clear and show exercise header
		console.clear();

		// Center-aligned header
		const header = `
    ╭──────────────────────────────╮
    │   🧘 Mindful Breathing 🧘    │
    │   Duration: ${duration.toString().padStart(3, " ")} seconds      │
    │   Pattern: ${pattern.padEnd(7, " ")}           │
    │   Style: ${style.padEnd(7, " ")}             │
    ╰──────────────────────────────╯
    `;

		console.clear();
		console.log(
			BreathingExercise.COLORS.cyan + header + BreathingExercise.COLORS.reset,
		);
		console.log("    Press Ctrl+C to end early\n");

		while (this.isRunning && Date.now() - startTime < duration * 1000) {
			// Inhale phase
			await this.animatePhase(
				"Inhale",
				breathingPattern[0],
				visualization,
				0,
				visualization.length / 2,
			);

			// Hold after inhale
			if (breathingPattern[1] > 0) {
				await this.animatePhase(
					"Hold  ",
					breathingPattern[1],
					[visualization[Math.floor(visualization.length / 2)]],
					0,
					1,
				);
			}

			// Exhale phase
			await this.animatePhase(
				"Exhale",
				breathingPattern[2],
				visualization,
				Math.floor(visualization.length / 2),
				visualization.length,
			);

			// Hold after exhale
			if (breathingPattern[3] > 0) {
				await this.animatePhase(
					"Rest  ",
					breathingPattern[3],
					[visualization[0]],
					0,
					1,
				);
			}

			// Show remaining time with consistent spacing
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			const remaining = duration - elapsed;
			process.stdout.write(
				`\r${BreathingExercise.COLORS.yellow}Remaining: ${remaining.toString().padStart(3, " ")}s ${BreathingExercise.COLORS.reset}`,
			);
		}

		console.log("\n\n    🙏 Breathing exercise completed 🙏\n");
	}

	private async animatePhase(
		phase: string,
		duration: number,
		frames: string[],
		start: number,
		end: number,
	): Promise<void> {
		const phaseFrames = frames.slice(start, end);
		const frameTime = (duration * 1000) / phaseFrames.length;

		for (const frame of phaseFrames) {
			if (!this.isRunning) break;
			// Consistent spacing for phase labels and frames
			process.stdout.write(
				`\r    ${BreathingExercise.COLORS.cyan}${phase}: ${frame}${BreathingExercise.COLORS.reset}`,
			);
			await Bun.sleep(frameTime);
		}
		process.stdout.write("\n");
	}

	stop(): void {
		this.isRunning = false;
	}
}

// Command line argument handling with better error messages
const args = process.argv.slice(2);
const validPatterns = ["square", "relaxed", "zen", "energy"] as const;
const validStyles = ["circle", "wave", "lotus", "zen"] as const;

// Parse duration with validation
const duration = Number.parseInt(args[0]) || 180;
if (duration < 10 || duration > 3600) {
	console.log("Duration must be between 10 and 3600 seconds");
	process.exit(1);
}

// Parse pattern with validation
const pattern = (args[1] as (typeof validPatterns)[number]) || "square";
if (args[1] && !validPatterns.includes(pattern)) {
	console.log(`Invalid pattern. Choose from: ${validPatterns.join(", ")}`);
	process.exit(1);
}

// Parse style with validation
const style = (args[2] as (typeof validStyles)[number]) || "circle";
if (args[2] && !validStyles.includes(style)) {
	console.log(`Invalid style. Choose from: ${validStyles.join(", ")}`);
	process.exit(1);
}

// Start the breathing exercise
const exercise = new BreathingExercise();

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
	exercise.stop();
	console.log("\n\n    🙏 Breathing exercise ended early 🙏\n");
	process.exit(0);
});

// Display help if requested
if (args.includes("--help") || args.includes("-h")) {
	console.log(`
Usage: bun run breathing.ts [duration] [pattern] [style]

  duration: Time in seconds (10-3600, default: 180)
  pattern:  ${validPatterns.join(", ")} (default: square)
  style:    ${validStyles.join(", ")} (default: circle)

Examples:
  bun run breathing.ts                  # 3 minutes, square pattern, circle style
  bun run breathing.ts 300 zen wave     # 5 minutes, zen pattern, wave style
  bun run breathing.ts 60 energy lotus  # 1 minute, energy pattern, lotus style
`);
	process.exit(0);
}

// Run the exercise
exercise.start(duration, pattern, style);


