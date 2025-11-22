import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Pipeline from './components/Pipeline';
import { getAppData, getBlogPosts } from './services/dataService';
import { BlogPost } from './types';

const Home = () => {
  const data = getAppData();
  
  return (
    <div className="animate-fade-in-up">
      <div className="mb-12 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
          HELLO_WORLD.
        </h1>
        <div className="p-6 border-l-8 border-black dark:border-white bg-white dark:bg-gray-900 shadow-brutal dark:shadow-brutal-dark">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            {data.profile.bio}
          </p>
        </div>
      </div>
      <Pipeline data={data} />
    </div>
  );
};

const Blog = () => {
  const posts = getBlogPosts();
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-12 border-b-4 border-black dark:border-white pb-4 inline-block">
        SYSTEM_LOGS
      </h1>
      <div className="space-y-8">
        {posts.map((post, index) => (
           <article key={index} className="border-2 border-black dark:border-white p-6 shadow-brutal dark:shadow-brutal-dark hover:translate-x-1 transition-transform bg-white dark:bg-black">
             <div className="flex justify-between items-start mb-4">
               <h2 className="text-2xl font-bold">{post.title}</h2>
               <span className="text-xs font-bold border border-black dark:border-white px-2 py-1">{post.date}</span>
             </div>
             <p className="opacity-80 mb-4 font-normal">{post.excerpt}</p>
             <button className="font-bold underline decoration-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-1 transition-colors">
               READ_FULL_LOG
             </button>
           </article>
        ))}
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
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;