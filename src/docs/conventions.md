# Feature-Sliced Design 구조

## 1. Entities (비즈니스 모델)

- 순수한 비즈니스 모델 정의
- 재사용 가능한 기본 데이터 구조
- UI와 독립적인 데이터 로직

### 예시

- `user`: 사용자 정보, 프로필
- `match`: 매치 정보, 상태
- `chat`: 채팅방, 메시지
- `notification`: 알림 정보

## 2. Features (비즈니스 기능)

- 특정 비즈니스 기능 구현
- UI 컴포넌트 포함
- 여러 entities를 조합

### 예시

- `auth`: 로그인, 회원가입
- `match-filter`: 매치 필터링
- `chat`: 채팅 기능
- `notification`: 알림 기능

## 3. Widgets (UI 블록)

- 여러 features의 컴포넌트를 조합한 큰 UI 블록
- 페이지의 특정 섹션을 구성
- 재사용 가능한 복합 컴포넌트

### 예시

- `header`: 네비게이션, 로고, 사용자 메뉴
- `product-list`: 상품 카드, 필터, 정렬
- `order-table`: 주문 목록, 상태 표시
- `dashboard-charts`: 통계 차트, 요약 정보

## 4. Processes (비즈니스 프로세스)

- 여러 features와 entities를 조합한 복잡한 프로세스
- 전체적인 흐름 제어
- 상태 관리와 라우팅 연동

### 예시

- `match-process`: 매치 생성 → 필터링 → 매칭 → 결과 확인
- `auth-process`: 로그인 → 소셜 연동 → 프로필 설정
- `chat-process`: 채팅방 생성 → 메시지 전송 → 알림 처리
- `profile-process`: 기본 정보 → 추가 정보 → 설정 완료

## 5. Shared (공유 자원)

- 여러 레이어에서 공유하는 유틸리티
- 재사용 가능한 컴포넌트
- 공통 타입과 상수

### 예시

- `lib`: 유틸리티 함수
- `components`: 공통 UI 컴포넌트
- `hooks`: 공통 React Hooks
- `types`: 공통 타입 정의
- `api`: API 클라이언트 설정
