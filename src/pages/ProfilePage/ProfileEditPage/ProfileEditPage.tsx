import { useState, useRef } from 'react';
import { HeaderEditdNav } from '../../../shared/components/Header/Header';
import ProfileEditContainer from '../../../features/profile/components/ProfileEditContainer';

export default function ProfileEditPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const submitRef = useRef<() => void>();

  const handleSave = () => {
    if (submitRef.current) {
      submitRef.current();
    }
  };

  return (
    <>
      <HeaderEditdNav
        content="저장"
        isFormValid={isFormValid}
        handleSave={handleSave}
      />
      <ProfileEditContainer
        onValidityChange={setIsFormValid}
        onSubmitRef={(fn) => { submitRef.current = fn; }}
      />
    </>
  );
}
