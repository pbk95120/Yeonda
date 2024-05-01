interface InterestProps {
  setPage: (page: number) => void;
  setGender: (gender: string) => void;
  setPreferGender: (preferGender: string) => void;
  setDistance: (distance: number) => void;
  setStartAge: (startAge: number) => void;
  setEndAge: (endAge: number) => void;
  setTags: (tags: string[]) => void;
}

const Interest = () => {
  return <div>Interest</div>;
};
//   {
//   setPage,
//   gender,
//   setGender,
//   preferGender,
//   setPreferGender,
//   distance,
//   setDistance,
//   startAge,
//   setStartAge,
//   endAge,
//   setEndAge,
//   tags,
//   setTags,
// }: InterestProps) => {

export default Interest;
