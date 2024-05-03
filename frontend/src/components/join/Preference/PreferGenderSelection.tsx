interface PreferGenderSelectionProps {
  setPreferGender: (preferGender: string) => void;
}

const PreferGenderSelection = ({ setPreferGender }: PreferGenderSelectionProps) => {
  return (
    <fieldset>
      <legend>선호 성별</legend>
      <div>
        <input
          type='radio'
          id='male'
          name='preferGender'
          value='male'
          onChange={(e) => setPreferGender(e.target.value)}
        />
        <label htmlFor='male'>남성</label>
        <input
          type='radio'
          id='female'
          name='preferGender'
          value='female'
          onChange={(e) => setPreferGender(e.target.value)}
        />
        <label htmlFor='female'>여성</label>
        <input
          type='radio'
          id='both'
          name='preferGender'
          value='both'
          onChange={(e) => setPreferGender(e.target.value)}
        />
        <label htmlFor='both'>상관없음</label>
      </div>
    </fieldset>
  );
};

export default PreferGenderSelection;
