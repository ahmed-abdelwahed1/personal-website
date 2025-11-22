import { AppData, BlogPost } from '../types';
// Importing directly allows Vite to bundle these JSONs. 
// Decap CMS will write to these files in the repo, triggering HMR or a rebuild.
import profileData from '../src/content/profile.json';
import experienceData from '../src/content/experience.json';
import educationData from '../src/content/education.json';
import skillsData from '../src/content/skills.json';
import certificatesData from '../src/content/certificates.json';
import blogData from '../src/content/blog.json';

export const getAppData = (): AppData => {
  return {
    profile: profileData,
    experience: experienceData,
    education: educationData,
    skills: skillsData,
    certificates: certificatesData
  };
};

export const getBlogPosts = (): BlogPost[] => {
  return blogData.posts;
};