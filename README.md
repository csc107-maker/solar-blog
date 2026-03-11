# ☀️ 태양광 지붕임대 블로그

> 공장·창고 지붕을 빌려주고 전기요금 20년 동결하는 법  
> RE100 수출 중소기업을 위한 태양광 지붕임대 완전 가이드

## 🛠️ 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (인터랙티브 주가 차트)
- **GitHub Pages** (정적 배포)

---

## 🚀 GitHub Pages 배포 방법 (처음 사용자용)

### 1단계 — GitHub 계정 만들기
1. [https://github.com](https://github.com) 접속
2. **Sign up** 클릭 → 이메일·비밀번호·사용자명 입력
3. 이메일 인증 완료

### 2단계 — 새 저장소(Repository) 만들기
1. GitHub 로그인 후 우측 상단 `+` → **New repository** 클릭
2. Repository name: `solar-blog` (또는 원하는 이름)
3. **Public** 선택 (GitHub Pages 무료 사용 조건)
4. **Create repository** 클릭

### 3단계 — Git 설치 & 초기 설정
```bash
# Git 설치 여부 확인
git --version

# 설치 안 됐으면 → https://git-scm.com 에서 다운로드

# 최초 1회 사용자 정보 설정
git config --global user.name "본인이름"
git config --global user.email "본인이메일@example.com"
```

### 4단계 — Node.js 설치
1. [https://nodejs.org](https://nodejs.org) 접속
2. **LTS 버전** 다운로드 & 설치
3. 설치 확인: `node -v` / `npm -v`

### 5단계 — 프로젝트 업로드
```bash
# 이 폴더(solar-blog)로 이동
cd solar-blog

# npm 패키지 설치
npm install

# 로컬에서 미리 보기 (선택)
npm run dev
# → 브라우저에서 http://localhost:3000 접속

# Git 초기화 & 커밋
git init
git add .
git commit -m "첫 번째 블로그 배포"

# GitHub 저장소와 연결 (YOUR_USERNAME을 본인 GitHub 아이디로 교체)
git remote add origin https://github.com/YOUR_USERNAME/solar-blog.git
git branch -M main
git push -u origin main
```

### 6단계 — GitHub Pages 활성화
1. GitHub 저장소 페이지 → **Settings** 탭
2. 좌측 메뉴 **Pages** 클릭
3. **Source** → **GitHub Actions** 선택
4. 저장하면 자동으로 배포 시작!

### 7단계 — 배포 확인
- 약 2~3분 후 `https://YOUR_USERNAME.github.io/solar-blog` 접속
- 저장소 → **Actions** 탭에서 배포 진행 상황 실시간 확인 가능

---

## 📁 프로젝트 구조

```
solar-blog/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # SEO 메타데이터, 전역 레이아웃
│   │   ├── page.tsx        # 메인 페이지 진입점
│   │   └── globals.css     # 전역 스타일
│   └── components/
│       ├── BlogContent.tsx  # 블로그 전체 내용 (메인 컴포넌트)
│       └── StockChart.tsx   # 인터랙티브 주가 차트
├── .github/
│   └── workflows/
│       └── deploy.yml       # 자동 GitHub Pages 배포 설정
├── next.config.js           # Next.js 설정 (정적 내보내기)
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## ✏️ 블로그 내용 수정하기

`src/components/BlogContent.tsx` 파일을 열어 원하는 내용을 수정한 뒤:
```bash
git add .
git commit -m "내용 수정"
git push
```
push하면 GitHub Actions가 자동으로 재배포합니다.

---

## 📞 도움이 필요하다면

- GitHub 공식 문서: [https://docs.github.com/ko](https://docs.github.com/ko)
- Next.js 공식 문서: [https://nextjs.org/docs](https://nextjs.org/docs)
