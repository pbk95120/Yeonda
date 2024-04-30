interface InterestProps {
  setPage: (page: number) => void;
  gender: string;
  setGender: (gender: string) => void;
  preferGender: string;
  setPreferGender: (preferGender: string) => void;
  distance: number;
  setDistance: (distance: number) => void;
  startAge: number;
  setStartAge: (startAge: number) => void;
  endAge: number;
  setEndAge: (endAge: number) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const Interest = ({
  setPage,
  gender,
  setGender,
  preferGender,
  setPreferGender,
  distance,
  setDistance,
  startAge,
  setStartAge,
  endAge,
  setEndAge,
  tags,
  setTags,
}: InterestProps) => {
  return <div>Interest</div>;
};

export default Interest;
