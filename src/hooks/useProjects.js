import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects_with_stats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = useCallback(async (projectData) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    await fetchProjects();
    return data;
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects, addProject };
}

export function applyFilters(projects, filter) {
  let list = [...projects];

  if (filter.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      (p.tech || []).join(' ').toLowerCase().includes(q)
    );
  }

  if (filter.category !== 'all') {
    list = list.filter(p => p.category === filter.category);
  }

  if (filter.status !== 'all') {
    list = list.filter(p => p.status === filter.status);
  }

  if (filter.sort === 'votes') {
    list.sort((a, b) => (b.votes || 0) - (a.votes || 0));
  } else if (filter.sort === 'newest') {
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (filter.sort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}
