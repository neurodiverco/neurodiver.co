import { notFound } from 'next/navigation';
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamicParams = false; // Returns 404 if the MDX file doesn't exist

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Path to your MDX directory
  const postsDirectory = path.join(process.cwd(), 'content/legal');

  // Read all file names in that folder
  const filenames = await fs.readdir(postsDirectory);

  // Return the parameters array mapping filenames to slugs
  return filenames
    .filter((file) => file.endsWith('.mdx')) // Keep only .mdx files
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''), // Strip extension to extract the URL slug
    }));
}

export default async function LegalPage({ params }: PageProps) {
  // 1. Resolve the slug parameter
  const { slug } = await params;

  try {
    // 2. Check if the MDX file exists first
    const filePath = path.join(process.cwd(), 'content/legal', `${slug}.mdx`);
    await fs.access(filePath);
  } catch {
    // 3. Trigger 404 page if file doesn't exist
    notFound();
  }

  // 4. Dynamically import the MDX file based on filename
  // Note: Webpack requires a template literal with a hardcoded folder path to resolve bundles properly
  const { default: MDXContent } = await import(`../../../content/legal/${slug}.mdx`);

  // 5. Return JSX with the imported MDX content
  return (
    <article>
      <MDXContent />
    </article>
  );
}
