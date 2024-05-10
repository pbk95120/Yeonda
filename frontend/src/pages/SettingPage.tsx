
import MyInfo from "@/components/mypage/MyInfo";
import MyPref from "@/components/mypage/MyPref";
import { cls } from "@/utils/cls";
import { useState } from "react";

const SettingPage = () => {
  const [pageState, setPageState] = useState<"myInfo"|"myPref">("myInfo")
  const toMyInfo =()=> setPageState("myInfo")
  const toMyPref =()=> setPageState("myPref")
  return (
  <div id="settingContainer">
    <div id="component-selector" className="flex flex-row justify-center items-center border-t-[1px] border-lightgray">
      <div className={cls("w-full h-16 font-sans text-center  border-lightgray py-4 border-r-[1px]",pageState==="myInfo" ? "":"border-b-[1px]")} onClick={toMyInfo}>내 정보 수정</div>
      <div className={cls("w-full h-16 font-sans text-center  border-lightgray py-4 ",pageState==="myPref" ? "":"border-b-[1px]")} onClick={toMyPref}>내 취향 수정</div>
    </div>
      {pageState==="myInfo" ? <MyInfo/>:null}
      {pageState==="myPref" ? <MyPref/>:null}
  </div>)
};

export default SettingPage;
