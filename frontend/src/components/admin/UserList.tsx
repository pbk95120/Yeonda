import User from './User';

interface Props {
  title: string;
}

const UserList = ({ title }: Props) => {
  return (
    <div className='flex flex-col h-full font-bold '>
      <h1 className='text-xl p-2 font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='flex-1 overflow-y-scroll h-60'>
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
        <User profilePictureUrl='url' email='email' />
      </div>
    </div>
  );
};

export default UserList;
