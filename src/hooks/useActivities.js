import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) setActivities(data);
    }

    fetchActivities();

    const channel = supabase
      .channel('activities-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activities' }, (payload) => {
        setActivities(prev => [payload.new, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return { activities };
}
