import React, { useRef, useEffect, useState } from 'react';
import { AppData } from '../types';
import { Database, Server, Cpu, ArrowRight } from 'lucide-react';

interface PipelineProps {
  data: AppData;
}

const PipelineNode: React.FC<{ 
  title: string; 
  subtitle: string; 
  details?: string; 
  icon?: React.ReactNode;
  type: 'source' | 'transform' | 'load';
}> = ({ title, subtitle, details, icon, type }) => {
  const typeStyles = {
    source: 'border-black dark:border-white bg-white dark:bg-black',
    transform: 'border-black dark:border-white bg-white dark:bg-black border-dashed',
    load: 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black'
  };

  return (
    <div className={`relative group p-4 border-2 ${typeStyles[type]} shadow-brutal dark:shadow-brutal-dark transition-transform hover:-translate-y-1 w-full mb-6 md:mb-0`}>
      <div className="absolute -top-3 -right-3 bg-white dark:bg-black border-2 border-black dark:border-white p-1">
        {icon}
      </div>
      <h3 className="font-bold text-lg uppercase mb-1">{title}</h3>
      <p className="text-sm font-bold opacity-80 mb-2">{subtitle}</p>
      {details && <p className="text-xs font-normal opacity-70 leading-relaxed">{details}</p>}
    </div>
  );
};

const Pipeline: React.FC<PipelineProps> = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mb-12 border-b-4 border-black dark:border-white pb-6">
        <h2 className="text-4xl md:text-6xl font-black mb-4">ETL_PIPELINE</h2>
        <p className="text-lg md:text-xl font-bold">DATA LINEAGE VISUALIZATION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* SVG Connectors Background (Desktop Only) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full stroke-black dark:stroke-white stroke-2" style={{ overflow: 'visible' }}>
            {/* Source to Transform */}
            <line x1="33%" y1="20%" x2="66%" y2="20%" markerEnd="url(#arrow)" />
            <line x1="33%" y1="60%" x2="66%" y2="60%" markerEnd="url(#arrow)" />
            
            {/* Transform to Load */}
            <line x1="66%" y1="20%" x2="90%" y2="50%" markerEnd="url(#arrow)" />
            <line x1="66%" y1="60%" x2="90%" y2="50%" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" className="fill-black dark:fill-white" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* COLUMN 1: SOURCE (Education) */}
        <div className="space-y-8 z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="w-6 h-6" />
            <h3 className="text-xl font-black bg-black text-white dark:bg-white dark:text-black px-2 py-1 inline-block">SOURCE (EXTRACT)</h3>
          </div>
          
          {data.education.map((edu) => (
            <PipelineNode 
              key={edu.id}
              type="source"
              title={edu.degree}
              subtitle={edu.institution}
              details={edu.period}
              icon={<Server size={14}/>}
            />
          ))}
          
          <div className="mt-8 pt-8 border-t-2 border-black dark:border-white border-dashed">
             <h4 className="font-bold mb-4">INTERNSHIPS</h4>
             {data.experience.filter(e => e.type !== 'volunteer').map(exp => (
                <PipelineNode 
                  key={exp.id}
                  type="source"
                  title={exp.title}
                  subtitle={exp.organization}
                  details={exp.description}
                  icon={<Server size={14}/>}
                />
             ))}
          </div>
        </div>

        {/* COLUMN 2: TRANSFORM (Skills & Certs) */}
        <div className="space-y-8 z-10 md:mt-24">
           <div className="flex items-center space-x-2 mb-6">
            <Cpu className="w-6 h-6" />
            <h3 className="text-xl font-black bg-black text-white dark:bg-white dark:text-black px-2 py-1 inline-block">TRANSFORM</h3>
          </div>

          <div className="p-4 border-2 border-dashed border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <h4 className="font-bold border-b-2 border-black dark:border-white mb-2 pb-1">SKILL_SET</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills[0].items.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 text-xs font-bold border border-black dark:border-white bg-gray-100 dark:bg-gray-900">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 border-2 border-dashed border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <h4 className="font-bold border-b-2 border-black dark:border-white mb-2 pb-1">CERTIFICATES</h4>
            <ul className="text-sm space-y-2">
              {data.certificates.map(cert => (
                <li key={cert.id} className="flex items-start">
                   <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
                   <span>
                     <span className="font-bold">{cert.name}</span>
                     <br/>
                     <span className="text-xs opacity-70">{cert.issuer}</span>
                   </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COLUMN 3: LOAD (Output/Experience) */}
        <div className="space-y-8 z-10 md:mt-48">
           <div className="flex items-center space-x-2 mb-6">
            <Server className="w-6 h-6" />
            <h3 className="text-xl font-black bg-black text-white dark:bg-white dark:text-black px-2 py-1 inline-block">LOAD (OUTPUT)</h3>
          </div>

          <div className="bg-black text-white dark:bg-white dark:text-black border-4 border-black dark:border-white p-6 shadow-brutal dark:shadow-brutal-dark">
             <h4 className="text-2xl font-black mb-2">ENGINEER_STATUS</h4>
             <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold opacity-70">CURRENT ROLE</label>
                  <p className="text-lg font-bold">{data.profile.title}</p>
               </div>
               <div>
                  <label className="text-xs font-bold opacity-70">VOLUNTEER WORK</label>
                   {data.experience.filter(e => e.type === 'volunteer').map(exp => (
                     <div key={exp.id} className="mt-1">
                       <p className="font-bold">{exp.title}</p>
                       <p className="text-sm">{exp.organization}</p>
                     </div>
                   ))}
               </div>
               <div className="pt-4 border-t border-white dark:border-black flex gap-4">
                 <a href={`mailto:${data.profile.email}`} className="underline hover:no-underline font-bold">EMAIL</a>
                 <a href={`https://${data.profile.linkedin}`} target="_blank" rel="noreferrer" className="underline hover:no-underline font-bold">LINKEDIN</a>
                 <a href={`https://${data.profile.github}`} target="_blank" rel="noreferrer" className="underline hover:no-underline font-bold">GITHUB</a>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pipeline;