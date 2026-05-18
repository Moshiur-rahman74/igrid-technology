import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { BlogPost } from '@/types/supabase';
import Link from 'next/link';

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Industrial Automation',
    slug: 'future-of-industrial-automation',
    excerpt: 'Exploring emerging technologies and their impact on manufacturing efficiency and productivity.',
    content: 'Industrial automation is rapidly evolving with new technologies...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Getting Started with PLC Programming',
    slug: 'getting-started-with-plc-programming',
    excerpt: 'A comprehensive guide for beginners in industrial automation and PLC systems.',
    content: 'PLC programming is a fundamental skill for industrial automation...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cost-Efficient Automation Solutions',
    slug: 'cost-efficient-automation-solutions',
    excerpt: 'How to implement automation without breaking the budget using multi-brand hardware.',
    content: 'Cost-effective automation is achievable with the right strategy...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Multi-Brand Automation Hardware Integration',
    slug: 'multi-brand-automation-hardware',
    excerpt: 'Best practices for integrating automation hardware from different manufacturers.',
    content: 'Multi-brand integration offers flexibility and cost savings...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Factory Automation Best Practices',
    slug: 'factory-automation-best-practices',
    excerpt: 'Essential guidelines for implementing successful factory automation systems.',
    content: 'Factory automation requires careful planning and execution...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Machining Process Automation',
    slug: 'machining-process-automation',
    excerpt: 'Optimizing machining processes through intelligent automation solutions.',
    content: 'Machining automation can significantly improve production efficiency...',
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
];

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return SAMPLE_BLOGS;
    }

    return data;
  } catch {
    return SAMPLE_BLOGS;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Section background="light">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-[#0a192f] mb-6 tracking-tight">Blog & Knowledge Center</h1>
            <p className="text-xl text-[#0a192f]/70 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and industry news on industrial automation, PLC programming, and cost-efficient automation solutions.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-premium-lg transition-all duration-300 hover-lift cursor-pointer">
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-6">
                    {post.author && (
                      <div className="text-sm font-semibold text-[#00a8cc] mb-3">By {post.author}</div>
                    )}
                    <h3 className="text-xl font-bold text-[#0a192f] mb-3 tracking-tight">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-[#0a192f]/70 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}
                    {post.created_at && (
                      <p className="text-sm text-[#0a192f]/50 font-medium">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#00a8cc] mt-4 hover:underline">Read More →</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
