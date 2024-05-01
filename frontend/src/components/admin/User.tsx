interface UserProps {
  profilePictureUrl: string;
  email: string;
}

const User: React.FC<UserProps> = ({ profilePictureUrl, email }) => {
  return (
    <div className='border border-black rounded-lg p-4 flex items-center m-4'>
      <img
        src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c3f9ef29649575.55fcf0a585830.jpg'
        alt={profilePictureUrl}
        className='rounded-xl w-12 h-12 mr-4'
      />
      <div>{email}</div>
    </div>
  );
};

export default User;
