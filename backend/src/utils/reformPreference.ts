import { PatchMyPreference } from '@schemas/myProfile.schema';
export const reformPreference = (preference: PatchMyPreference) => {
  return {
    email: preference.email,
    gender: preference.gender,
    distance: parseInt(preference.distance),
    start_age: parseInt(preference.start_age),
    end_age: parseInt(preference.end_age),
  };
};
