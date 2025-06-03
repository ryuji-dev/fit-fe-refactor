// 서버에서 내려온 정적 HTML에 클라이언트 상태와 동작을 입히는 과정,
// 클라이언트 상태 관리 라이브러리에서 저장소에서 상태를 복원하는 과정을 hydration이라고 함
// 페이지 초기 렌더링 시 데이터 로딩 중인 상태를 방지하기 위해 사용

import { useEffect, useState } from 'react';

const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
};

export default useHydrated;
