interface PersonalInformationProps {
  setPage: (page: number) => void;
  setPicture: (picture: string) => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setTown: (town: string) => void;
  setAddressDetail: (addressDetail: string) => void;
}

const PersonalInformation = ({
  setPage,
  setPicture,
  setYear,
  setMonth,
  setDay,
  setState,
  setCity,
  setTown,
  setAddressDetail,
}: PersonalInformationProps) => {
  return <div>PersonalInformation</div>;
};

export default PersonalInformation;
