import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getUserToken } from '../lib/userToken';

export function useVotes() {
  const [votedSet, setVotedSet] = useState(new Set());
  const userToken = getUserToken();

  useEffect(() => {
    async function loadVoted() {
      const { data } = await supabase
        .from('votes')
        .select('project_id')
        .eq('user_token', userToken);

      if (data) {
        setVotedSet(new Set(data.map(v => v.project_id)));
      }
    }
    loadVoted();
  }, [userToken]);

  const toggleVote = useCallback(async (projectId, currentVotes, onOptimisticUpdate) => {
    const hasVoted = votedSet.has(projectId);

    // Optimistic update
    const newSet = new Set(votedSet);
    if (hasVoted) {
      newSet.delete(projectId);
      onOptimisticUpdate(projectId, currentVotes - 1);
    } else {
      newSet.add(projectId);
      onOptimisticUpdate(projectId, currentVotes + 1);
    }
    setVotedSet(newSet);

    try {
      if (hasVoted) {
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('project_id', projectId)
          .eq('user_token', userToken);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('votes')
          .insert([{ project_id: projectId, user_token: userToken }]);
        if (error && error.code === '23505') {
          // Already voted, treat as already in set
          return { alreadyVoted: true };
        }
        if (error) throw error;
      }
    } catch {
      // Rollback optimistic update
      setVotedSet(votedSet);
      onOptimisticUpdate(projectId, currentVotes);
    }

    return { voted: !hasVoted };
  }, [votedSet, userToken]);

  return { votedSet, toggleVote };
}
