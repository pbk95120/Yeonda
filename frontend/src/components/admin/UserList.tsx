import { DormantUser } from '@/pages/AnalysisPage';
import User from './User';

interface Props {
  title: string;
  dormantUser: DormantUser[];
}
const UserList = ({ title, dormantUser }: Props) => {
  return (
    <div className='flex h-full flex-col font-bold '>
      <h1 className='p-2 text-xl font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='h-60 flex-1 overflow-y-scroll'>
        {dormantUser.map((user) => {
          return <User profilePictureUrl={user.picture_url} email={user.email} />;
        })}
      </div>
    </div>
  );
};

export default UserList;
