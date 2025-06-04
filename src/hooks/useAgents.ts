
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LegacyAgent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'busy' | 'offline';
  description?: string;
  last_activity?: string;
  tasks_count: number;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export function useAgents() {
  const { user } = useAuth();

  const { data: agents = [], isLoading, error } = useQuery({
    queryKey: ['legacy-agents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('agents_legacy')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LegacyAgent[];
    },
    enabled: !!user,
  });

  const queryClient = useQueryClient();

  const createAgent = useMutation({
    mutationFn: async (agentData: Omit<LegacyAgent, 'id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('agents_legacy')
        .insert([{ ...agentData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-agents'] });
    },
  });

  const updateAgent = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<LegacyAgent> & { id: string }) => {
      const { data, error } = await supabase
        .from('agents_legacy')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-agents'] });
    },
  });

  const deleteAgent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('agents_legacy')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-agents'] });
    },
  });

  return {
    agents,
    isLoading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
  };
}
