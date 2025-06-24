import { supabase } from '../supabase';
import type { Task } from '../../types';

export async function getTasks(teamId?: string) {
  const query = supabase
    .from('tasks')
    .select(`
      *,
      assignee:users!assignee_id(*),
      team:teams(*),
      comments(*)
    `);

  if (teamId) {
    query.eq('team_id', teamId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}