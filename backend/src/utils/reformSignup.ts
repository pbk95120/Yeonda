import { RawSignupPicUrl, RawSignupSchema, Signup } from '@schemas/signup.schema';

export const reformSignup = (data: RawSignupPicUrl): [Signup, Error] => {
  const { error } = RawSignupSchema.validate(data);
  if (error) return [null, error];

  return [
    {
      user: {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        password_check: data.password_check,
        gender: data.gender as 'Male' | 'Female',
        picture_url: data.picture_url,
        birth: data.birth,
      },
      address: data.address,
      preference: {
        gender: data.prefer_gender as 'Male' | 'Female' | 'Neutral',
        distance: parseInt(data.distance),
        start_age: parseInt(data.start_age),
        end_age: parseInt(data.end_age),
      },
      user_tag: {
        tags: data.tags.split(',').map((s) => Number(s)),
      },
    },
    null,
  ];
};
