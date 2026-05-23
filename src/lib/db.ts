import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/portfolio.json');

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  resumeUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  githubUrl: string;
  demoUrl: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  list: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'Education' | 'Experience' | 'Freelance' | 'Research' | 'Internship';
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  achievements: string[];
}

// Read the complete JSON DB
export function readData(): PortfolioData {
  try {
    if (!fs.existsSync(dbPath)) {
      // Create empty folder structure if it doesn't exist
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const defaultData: PortfolioData = {
        profile: {
          name: '',
          title: '',
          email: '',
          phone: '',
          github: '',
          linkedin: '',
          bio: '',
          resumeUrl: ''
        },
        projects: [],
        skills: [],
        experience: [],
        achievements: []
      };
      fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading JSON DB', error);
    return {
      profile: {} as Profile,
      projects: [],
      skills: [],
      experience: [],
      achievements: []
    };
  }
}

// Write the complete JSON DB
export function writeData(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to JSON DB', error);
    return false;
  }
}

// Profiles API
export function getProfile(): Profile {
  return readData().profile;
}

export function updateProfile(profile: Profile): boolean {
  const data = readData();
  data.profile = profile;
  return writeData(data);
}

// Projects API
export function getProjects(): Project[] {
  return readData().projects || [];
}

export function saveProject(project: Project): boolean {
  const data = readData();
  const index = data.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    data.projects[index] = project;
  } else {
    data.projects.push(project);
  }
  return writeData(data);
}

export function deleteProject(id: string): boolean {
  const data = readData();
  const filtered = data.projects.filter((p) => p.id !== id);
  if (filtered.length === data.projects.length) return false;
  data.projects = filtered;
  return writeData(data);
}

// Skills API
export function getSkills(): SkillCategory[] {
  return readData().skills || [];
}

export function updateSkills(skills: SkillCategory[]): boolean {
  const data = readData();
  data.skills = skills;
  return writeData(data);
}

// Experiences API
export function getExperiences(): Experience[] {
  return readData().experience || [];
}

export function saveExperience(exp: Experience): boolean {
  const data = readData();
  const index = data.experience.findIndex((e) => e.id === exp.id);
  if (index >= 0) {
    data.experience[index] = exp;
  } else {
    data.experience.push(exp);
  }
  return writeData(data);
}

export function deleteExperience(id: string): boolean {
  const data = readData();
  const filtered = data.experience.filter((e) => e.id !== id);
  if (filtered.length === data.experience.length) return false;
  data.experience = filtered;
  return writeData(data);
}
