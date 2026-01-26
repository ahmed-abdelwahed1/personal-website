import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Github, Instagram, Linkedin } from 'lucide-react';
import Layout from './components/Layout';
import ProfileOverview from './components/ProfileOverview';
import { ThemeToggle } from './components/ThemeToggle';
import { CredlyBadges } from './components/CredlyBadges';
import { getAppData, getBlogPosts } from './services/dataService';

const Home = () => {
  const data = getAppData();
  const latestPosts = getBlogPosts()
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const socialBaseClass =
    'inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-sm font-semibold text-slate-900 hover:bg-slate-100 ' +
    'dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-50 dark:hover:bg-slate-900 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ' +
    'dark:focus-visible:ring-offset-slate-950';

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <p className="font-mono text-xs tracking-wide text-slate-500 dark:text-slate-400">
              {data.profile.title}
            </p>
            <ThemeToggle className="self-start" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Hi, I’m{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              {data.profile.name}
            </span>
            .
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-justify text-slate-600 dark:text-slate-300 sm:text-lg">
            {data.profile.bio}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/Ahmed%20Abdelwahed%20-%20CV.pdf"
              download
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:opacity-95 dark:bg-slate-50 dark:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              Download CV
            </a>
            <a
              href={`mailto:${data.profile.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              Contact me
            </a>
          </div>

          {/* Socials (icons on mobile, labels on >= sm) */}
          <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible">
            {data.profile.linkedin && (
              <a
                href={`https://${data.profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className={`${socialBaseClass} h-11 w-11 flex-none p-0 sm:h-auto sm:w-auto sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5`}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}

            {data.profile.github && (
              <a
                href={`https://${data.profile.github}`}
                target="_blank"
                rel="noreferrer"
                className={`${socialBaseClass} h-11 w-11 flex-none p-0 sm:h-auto sm:w-auto sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5`}
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={18} />
                <span className="sr-only">GitHub</span>
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}

            {data.profile.instagram && (
              <a
                href={`https://${data.profile.instagram}`}
                target="_blank"
                rel="noreferrer"
                className={`${socialBaseClass} h-11 w-11 flex-none p-0 sm:h-auto sm:w-auto sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5`}
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
                <span className="hidden sm:inline">Instagram</span>
              </a>
            )}

            {data.profile.x && (
              <a
                href={`https://${data.profile.x}`}
                target="_blank"
                rel="noreferrer"
                className={`${socialBaseClass} h-11 w-11 flex-none p-0 sm:h-auto sm:w-auto sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5`}
                aria-label="X"
                title="X"
              >
                <span className="font-mono text-sm leading-none">𝕏</span>
                <span className="sr-only">X</span>
                <span className="hidden sm:inline">X</span>
              </a>
            )}

            {data.profile.medium && (
              <a
                href={`https://${data.profile.medium}`}
                target="_blank"
                rel="noreferrer"
                className={`${socialBaseClass} h-11 w-11 flex-none p-0 sm:h-auto sm:w-auto sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5`}
                aria-label="Medium"
                title="Medium"
              >
                <BookOpen size={18} />
                <span className="sr-only">Medium</span>
                <span className="hidden sm:inline">Medium</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="profile" className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            Profile
          </h2>
          <p className="text-slate-600 dark:text-slate-300">Experience, education, and skills.</p>
        </div>
        <ProfileOverview data={data} />
      </section>

      {data.profile.credlyBadges && data.profile.credlyBadges.length > 0 && (
        <section
          id="badges"
          className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
                Badges
              </h2>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Verified badges from Credly.
              </p>
            </div>
            {data.profile.credly && (
              <a
                href={`https://${data.profile.credly}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-50 dark:hover:bg-slate-900 sm:mt-0"
              >
                View all on Credly
              </a>
            )}
          </div>

          <div className="mt-6">
            <CredlyBadges badgeIds={data.profile.credlyBadges} iframeWidth={160} iframeHeight={285} />
          </div>
        </section>
      )}

      <section
        id="latest-posts"
        className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
              Latest blog posts
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              Recent notes on data engineering and automation.
            </p>
          </div>
          <Link
            to="/blog"
            className="mt-3 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:opacity-95 dark:bg-slate-50 dark:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 sm:mt-0"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="h-full rounded-2xl border border-slate-200/70 bg-white/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800/70 dark:bg-slate-950/20"
            >
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{post.date}</div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  Read
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const Blog = () => {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          ← Back to home
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          Blog
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Notes on data engineering, automation, and things I’m learning.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  {post.title}
                </Link>
              </h2>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {post.excerpt}
            </p>
            <div className="mt-4">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
              >
                Read post
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          ← Back to blog
        </Link>
        <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Post not found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            This blog post doesn’t exist (or the slug is wrong).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
      >
        ← Back to blog
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{post.date}</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {post.title}
          </h1>
        </div>

        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

