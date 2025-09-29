import { useState, FormEvent } from 'react';
import { HeaderEditdNav } from '../../../shared/components/Header/Header';
import ProfileEditContainer from '../../../features/profile/components/ProfileEditContainer';

export default function ProfileEditPage() {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSave = () => {
    // TODO: Container에서 폼 제출 로직을 호출하도록 개선 필요
    console.log('Save clicked');
  };

  return (
    <>
      <HeaderEditdNav
        content="저장"
        isFormValid={isFormValid}
        handleSave={handleSave}
      />
      <ProfileEditContainer />
    </>
  );
}
