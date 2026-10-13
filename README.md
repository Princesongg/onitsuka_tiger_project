# Onitsuka Tiger HTML 사이트

기존 React 사이트를 HTML, CSS, JavaScript로 변환했습니다. 별도의 설치나 빌드 없이 루트의 `index.html`을 브라우저에서 열면 됩니다. VS Code의 Live Server로도 실행할 수 있습니다.

## 파일 구조

```text
index.html          메인 랜딩 화면 HTML
css/reset.css       기본 스타일 초기화
css/main.css        전체 섹션 스타일과 반응형 스타일
js/main.js          카드 드래그, 좌우 이동, 스크롤 애니메이션
js/data.js          상품별 색상 이미지와 공식 상품 링크
js/vendor/          GSAP와 ScrollTrigger 원본 라이브러리
images/             이미지, SVG, 로컬 폰트, 파비콘
video/              캠페인 영상
scripts/            이미지 마스크 생성 보조 도구
```

## 수정 방법

화면 문구와 상품 카드는 `index.html`에서 수정합니다. 레이아웃과 디자인은 `css/main.css`에서 수정합니다. 포트폴리오용 메인 랜딩 페이지로 상품 팝업은 제거했습니다.

이미지와 영상은 상대 경로를 사용하므로 폴더 전체를 함께 옮겨야 합니다. Pretendard는 CDN에서 불러오며, 연결되지 않으면 시스템 글꼴을 사용합니다. 기존 SUITE·Bevan 글꼴은 로컬 파일을 유지했습니다.

## 유지한 기능

- BEST SELLERS 스크롤 애니메이션과 건너뛰기
- 카드 좌우 이동, 마우스 드래그, 터치 스크롤
- 캠페인 영상 자동 재생 및 TRAIRINA 영상 동기화
- 맨 위로 이동과 키보드 본문 바로가기

검색 입력란과 상단 메뉴는 기존 작업물과 동일한 표시용 UI입니다.

## 배포

`index.html`, `css`, `js`, `images`, `video`를 정적 웹 호스팅에 올리면 됩니다. Vercel용 `vercel.json`은 빌드 없이 프로젝트 루트를 제공하도록 설정했습니다. 실제 배포는 별도로 진행해야 합니다.