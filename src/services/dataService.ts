import { AppData, BlogPost } from '../types';
// Importing directly allows Vite to bundle these JSONs.
// Decap CMS will write to these files in the repo, triggering HMR or a rebuild.
import profileData from '../content/profile.json';
import experienceData from '../content/experience.json';
import educationData from '../content/education.json';
import skillsData from '../content/skills.json';
import certificatesData from '../content/certificates.json';
import blogData from '../content/blog.json';

export const getAppData = (): AppData => {
  return {
    profile: profileData,
    experience: experienceData.experience,
    education: educationData.education,
    skills: skillsData.skills,
    certificates: certificatesData.certificates,
  };
};

export const getBlogPosts = (): BlogPost[] => {
  return blogData.posts;
};

