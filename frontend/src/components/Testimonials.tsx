import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

type Testimonial = {
	name: string;
	role: string;
	company: string;
	quote: string;
};

const testimonials: Testimonial[] = [
	{
		name: "Aina Rahman",
		role: "Operations Lead",
		company: "BrightLoop Studio",
		quote:
			"The toolkit helped me notice burnout earlier and make tiny changes before everything collapsed. It feels designed by people who actually get it.",
	},
	{
		name: "Daniel Lim",
		role: "Product Designer",
		company: "Northstar Labs",
		quote:
			"I used to think productivity apps were all the same. This one gives me structure without making me feel like I am failing at work.",
	},
	{
		name: "Siti Nor",
		role: "Freelance Copywriter",
		company: "Self-employed",
		quote:
			"The energy tracking and strategy suggestions make it much easier to plan my week when my brain is not cooperating.",
	},
	{
		name: "Arun Venkatesh",
		role: "Community Manager",
		company: "Kindspace Co.",
		quote:
			"It feels calm, steady, and practical. I do not have to pretend to be more organised than I am to use it well.",
	},
	{
		name: "Mira Tan",
		role: "Marketing Specialist",
		company: "Bloom & Anchor",
		quote:
			"The waitlist and early access experience already feels thoughtful. The product makes me feel supported instead of corrected.",
	},
];

export default function Testimonials() {
	const [activeIndex, setActiveIndex] = useState(0);
	const activeTestimonial = testimonials[activeIndex];

	function goToPrevious() {
		setActiveIndex((current) =>
			current === 0 ? testimonials.length - 1 : current - 1,
		);
	}

	function goToNext() {
		setActiveIndex((current) =>
			current === testimonials.length - 1 ? 0 : current + 1,
		);
	}

	return (
		<section className="min-h-svh bg-cream px-6 py-20 md:py-24 flex items-center">
			<div className="w-full max-w-5xl mx-auto">
				<div className="text-center space-y-4 mb-10 md:mb-14">
					<p className="text-orange text-sm font-semibold uppercase tracking-widest">
						Testimonials
					</p>
					<h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight">
						What people are saying about their journey
					</h1>
					<p className="text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
						Real experiences from people who wanted a calmer, clearer, and more practical way to work.
					</p>
				</div>

				<div className="flex justify-center">
					<article className="relative w-full max-w-6xl overflow-hidden rounded-4xl border border-primary/10 bg-white shadow-[0_24px_60px_rgba(45,90,61,0.12)] p-8 md:p-10 flex flex-col justify-between min-h-96">
						<Quote className="h-10 w-10 text-orange/50" />

						<div className="mt-6 space-y-6">
							<blockquote className="font-sans text-xl md:text-2xl text-primary leading-relaxed">
								&ldquo;{activeTestimonial.quote}&rdquo;
							</blockquote>

							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-semibold text-lg">
									{activeTestimonial.name
										.split(" ")
										.map((part) => part[0])
										.join("")}
								</div>
								<div>
									<p className="text-primary font-semibold text-lg">
										{activeTestimonial.name}
									</p>
									<p className="text-primary/60 text-sm md:text-base">
										{activeTestimonial.role} · {activeTestimonial.company}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-8 flex items-center justify-between gap-3">
							<button
								type="button"
								onClick={goToPrevious}
								className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-cream px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
							>
								<ArrowLeft className="h-4 w-4" />
								Back
							</button>

							<div className="flex items-center gap-2">
								{testimonials.map((_, index) => (
									<button
										key={index}
										type="button"
										onClick={() => setActiveIndex(index)}
										aria-label={`Go to testimonial ${index + 1}`}
										className={`h-2.5 rounded-full transition-all ${
											index === activeIndex
												? "w-8 bg-orange"
												: "w-2.5 bg-primary/20 hover:bg-primary/35"
										}`}
									/>
								))}
							</div>

							<button
								type="button"
								onClick={goToNext}
								className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-cream px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
							>
								Next
								<ArrowRight className="h-4 w-4" />
							</button>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}
