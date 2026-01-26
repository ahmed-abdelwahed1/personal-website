import React from 'react';
import { AppData } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';

interface ProfileOverviewProps {
  data: AppData;
}

const Card: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/70 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/50">
      <div className="flex items-center gap-2 border-b border-slate-200/70 px-6 py-4 dark:border-slate-800/70">
        {icon}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
};

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
    {children}
  </span>
);

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ data }) => {
  const workExperience = data.experience.filter((e) => e.type !== 'volunteer');
  const volunteerExperience = data.experience.filter((e) => e.type === 'volunteer');

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-6">
        <Card title="Experience" icon={<Briefcase className="h-4 w-4 text-slate-700 dark:text-slate-200" />}>
          <div className="space-y-5">
            {workExperience.map((exp) => (
              <div key={exp.id} className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-950/20">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{exp.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{exp.period}</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{exp.organization}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}

            {volunteerExperience.length > 0 && (
              <div className="pt-2">
                <div className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Volunteer
                </div>
                <div className="space-y-4">
                  {volunteerExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-950/20"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div className="font-semibold text-slate-900 dark:text-slate-50">{exp.title}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{exp.period}</div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{exp.organization}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Education" icon={<GraduationCap className="h-4 w-4 text-slate-700 dark:text-slate-200" />}>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-950/20"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{edu.degree}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{edu.period}</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{edu.institution}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card title="Skills" icon={<span className="font-mono text-xs text-slate-600 dark:text-slate-300">{'</>'}</span>}>
          {data.skills.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">No skills listed.</p>
          ) : (
            <div className="space-y-4">
              {data.skills.map((group) => (
                <div key={group.category}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {group.category}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Tag key={`${group.category}-${skill}`}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverview;

