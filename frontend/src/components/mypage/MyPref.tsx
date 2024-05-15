import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import PreferGenderModal from '../common/PreferGenderModal';
import DistanceInput from '../common/DistanceInput';
import AgeRangeInput from '../common/AgeRangeInput';
import { useForm } from 'react-hook-form';
import Tags from '../common/Tags';
import { useNavigate } from 'react-router-dom';



interface PreferenceFormInputs {
  gender: string;
  preferGender: string;
  distance: number;
  startAge: number;
  endAge: number;
}

const tags = ['롤토체스', '농구', '게임', '우주파괴', '취뽀']  

const MyPref=()=>{
  
  const navigate = useNavigate();
  const {setValue, getValues} = useForm<PreferenceFormInputs>();
  const [open,setOpen]=useState<boolean>(false)
  let distance=0;
  let startAge=0;
  let endAge=100;
  const openModal =()=> setOpen(true)
  const closeModal =()=> setOpen(false)
  const [selectedGender, setSelectedGender] = useState<string>("남성");
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
  <div className="flex flex-col items-center justify-center"> 
    <div className="shadow-lg w-[339px] h-[86px] flex flex-col p-3 mt-3">
      <span className="font-sans font-bold text-base mb-3" >상대의 성별</span>
      <div className="flex flex-row">
        <div className="text-lightgray font-sans">{selectedGender==="female"? "여성" : selectedGender==="male" ? "남성" : selectedGender==="both" ? "무관": null }</div>
        <div className='absolute z-20 right-7 flex justify-center items-center'>
          <IoIosArrowBack className='w-6 h-6 fill-gray rotate-180' onClick={openModal}/>
       </div>
      </div>
    </div>
    <div className="shadow-lg w-[339px] h-[86px] flex flex-col p-3 mt-3">
      <DistanceInput sliderClassName='mb-5' className='font-sans font-bold text-base' setValue={setValue} getValues={getValues} distance={distance}/>
    </div>
    <div className="shadow-lg w-[339px] h-[86px] flex flex-col p-3 mt-3">
      <AgeRangeInput className="font-sans font-bold text-base" setValue={setValue} getValues={getValues} startAge={startAge} endAge={endAge} />
    </div>
    <div className="shadow-lg w-[339px] h-[86px] flex flex-col p-3 mt-3" onClick={()=>navigate("preference")}>
      <span className="font-sans font-bold mb-3">관심사</span>
      <div className="flex flex-row">
      {tags.map((tag, i) => (
            <div key={i} className='inline-block'>
              <Tags i ={i} tag={tag} className='px-1 py-1 mx-[2px]'/>
            </div>
        ))}
      </div>
    </div>
    {open && <PreferGenderModal selectedGender={selectedGender} handleBackgroundClick={handleBackgroundClick} setSelectedGender={setSelectedGender} closeModal={closeModal}/>}
  </div>)
}

export default MyPref