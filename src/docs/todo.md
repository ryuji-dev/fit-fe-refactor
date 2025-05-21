# TODO 리스트

## 1. FSD 리팩토링

- [x] fit-fe repo를 FSD 폴더 구조로 리팩토링 (fit-fe → fit-fe-refactor)

## 2. 배포 및 CI/CD

- [x] fit-fe-refactor 레포를 개인 깃허브 레포로 fork/복제
- [ ] 개인 레포를 Vercel에 연결 (무료 플랜)
- [ ] 환경 변수(.env.local, .env.production 등) Vercel에 등록
  - [ ] 민감 정보는 깃허브에 올리지 않고 Vercel 환경 변수로 관리
- [ ] 도메인 연결(필요 시)
  - [ ] Vercel에서 custom domain 연결 및 HTTPS 적용
- [ ] GitHub Actions로 CI/CD 파이프라인 구성
  - [ ] PR/merge 시 빌드 및 테스트 자동화
  - [ ] 필요 시 Vercel 배포 트리거 (Vercel GitHub 앱 연동 또는 webhook)
- [ ] 배포 후 정상 동작 및 환경별 분리 확인
  - [ ] production, preview 환경 구분
  - [ ] 에러 및 로그 모니터링 설정

<!-- ## 3. 인증 관련

- [ ] 소셜 로그인 구현
- [ ] 회원가입 프로세스
- [ ] 프로필 설정

## 4. 매치 관련

- [ ] 매치 생성 프로세스
- [ ] 매치 필터링
- [ ] 매치 결과 페이지

## 5. 채팅 관련

- [ ] 채팅방 구현
- [ ] 실시간 메시지
- [ ] 알림 기능

## 6. 공통 기능

- [ ] 디바운스 유틸리티
- [ ] 에러 처리
- [ ] 로딩 상태 관리

## 7. 성능 최적화

- [ ] 이미지 최적화
- [ ] 코드 스플리팅
- [ ] 캐싱 전략

## 8. 테스트

- [ ] 단위 테스트
- [ ] 통합 테스트
- [ ] E2E 테스트 -->
