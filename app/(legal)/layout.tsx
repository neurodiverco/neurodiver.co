export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <main className="mx-auto flex-1 flex items-center justify-between px-6 sm:px-10 after:content-none">
      <div className="w-full gap-12 [align-items:start]">
        <div className="pt-0 md:pt-14 pb-8 md:pb-28 prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-lg prose-h4:text-accent prose-h5:italic prose-h6:text-accent prose-h6:italic dark:prose-headings:text-white">
        {children}
        </div>
      </div>
    </main>
  )
}
