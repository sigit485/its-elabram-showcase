export const CATEGORIES = [
  { name: 'Web App', color: '#3b82f6', icon: '🌐' },
  { name: 'Mobile App', color: '#10b981', icon: '📱' },
  { name: 'API & Backend', color: '#8b5cf6', icon: '⚙️' },
  { name: 'Data & Analytics', color: '#f59e0b', icon: '📊' },
  { name: 'AI & ML', color: '#ec4899', icon: '🤖' },
  { name: 'DevOps & Tools', color: '#06b6d4', icon: '🔧' },
  { name: 'Security', color: '#ef4444', icon: '🛡️' },
  { name: 'Automation', color: '#6366f1', icon: '⚡' },
  { name: 'Internal Tools', color: '#84cc16', icon: '🎯' },
];

export const TAG_COLOR_MAP = {
  react: 'tag-blue', python: 'tag-blue', ai: 'tag-red', ml: 'tag-red', llm: 'tag-red',
  flutter: 'tag-green', mobile: 'tag-green', security: 'tag-red', devops: 'tag-purple',
  kubernetes: 'tag-purple', docker: 'tag-purple', nextjs: 'tag-blue', typescript: 'tag-blue',
  laravel: 'tag-orange', vuejs: 'tag-green', analytics: 'tag-orange', hr: 'tag-green',
  automation: 'tag-purple', featured: 'tag-red', chatbot: 'tag-red', sso: 'tag-red',
  elk: 'tag-orange', kafka: 'tag-orange', 'ci-cd': 'tag-purple', monitoring: 'tag-orange',
};

export const STATUS_MAP = {
  live: { icon: '🟢', label: 'Live' },
  beta: { icon: '🟡', label: 'Beta' },
  dev: { icon: '🔵', label: 'Dev' },
};

export const AVATAR_COLORS = [
  '#3b82f6','#10b981','#8b5cf6','#f59e0b','#ef4444',
  '#ec4899','#06b6d4','#6366f1','#84cc16',
];

export function getAvatarColor(name) {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function getTagClass(tag) {
  return TAG_COLOR_MAP[tag] || 'tag-blue';
}

export function getInitials(name) {
  return name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
}

export const EMOJIS = ['🚀','⚡','🛡️','📊','🤖','🌐','📱','🔧','💡','🎯','📦','🔍'];
