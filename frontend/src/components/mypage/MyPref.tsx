import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';


const MyPref=()=>{
  const [prefGender ,setPrefGender]=useState<"남성"|"여성">("여성")
  return (<div className="flex flex-col items-center space-y-2 justify-center"> 
    <div className="shadow-xl w-[339px] h-[86px] flex flex-col p-3">
      <span className="font-sans font-bold mb-3">상대의 성별</span>
      <div className="flex flex-row">
        <div className="text-lightgray font-sans">{prefGender}</div>
        <div className='absolute z-20 right-7 flex justify-center items-center'>
          <IoIosArrowBack className='w-6 h-6 fill-gray rotate-180' />
       </div>
      </div>
    </div>
  </div>)
}

export default MyPref