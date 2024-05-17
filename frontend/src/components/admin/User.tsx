interface UserProps {
  profilePictureUrl: string;
  email: string;
}

const User = ({ profilePictureUrl, email }: UserProps) => {
  return (
    <div className='m-4 flex items-center rounded-lg border border-black p-4'>
      <img src={profilePictureUrl} alt={profilePictureUrl} className='mr-4 h-12 w-12 rounded-xl' />
      <div>{email}</div>
    </div>
  );
};

export default User;
