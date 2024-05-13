import { PatchMyPreference } from '@schemas/myProfile.schema';
export const reformPreference = (preference: PatchMyPreference) => {
  return {
    user_id: preference.user_id,
    email: preference.email,
    gender: preference.gender,
    distance: parseInt(preference.distance),
    start_age: parseInt(preference.start_age),
    end_age: parseInt(preference.end_age),
  };
};
