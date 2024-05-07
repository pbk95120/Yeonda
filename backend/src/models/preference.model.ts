export interface Preference {
  id: number;
  user_id: number;
  gender: 'Male' | 'Female' | 'Neutral';
  distance: number;
  start_age: number;
  end_age: number;
}
