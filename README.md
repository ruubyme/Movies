# 🎬 영화 리뷰 사이트
> 영화 인기 순위 or 영화에 대한 상세 정보 확인, 간단한 리뷰를 자유롭게 남길 수 있는 사이트




## 💡 기술 스택
**1. Frontend** :
   * React (Functional components, Hooks)
   * Next.js (Server Side Rendering, Routing)
   * TypeScript (Static type checking)
   * Tailwind CSS (Styling)
   * Swiper.js (Carousel/slider effects)
   
**2. Backend** :
   * Flask (API server)
   * MySQL (Database)




## 💡 주요 기능

1. 카카오 API를 활용한 사용자 인증
2. 영화 목록 및 검색
3. 장르별 영화 검색
4. 주간 인기 영화 순위 표시
5. 영화 좋아요 기능
6. 영화 리뷰 작성, 표시 및 삭제
7. 영화 상세 페이지, 영화 예고편 
8. 사용자 마이 페이지 


## 🖥️ 기술 세부사항

**1. Frontend** :
   * Next.js를 사용한 서버 사이드 렌더링으로 SEO 및 초기 페이지 로딩 성능 향상
   * Next.js의 동적 라우팅을 활용하여 개별 영화 상세 페이지 처리
   * React의 useState, useEffect 훅을 이용한 상태관리
   * IntersectionObserver API를 활용하여 무한 스크롤 구현
   * 외부 클릭 감지, 동적 옵션 설정, 및 커스텀 스타일링을 지원하는 재사용 가능한 Dropdown 컴포넌트 구현
   * axios를 사용하여 Flask 백엔드 API에서 데이터 가져오기
   * Tailwind CSS유틸리티를 활용한 디자인 적용
   * react-youtube 라이브러리를 활용하여 영화 미리보기 동영상을 웹 사이트에 임베드
   * Swiper 라이브러리를 활용하여 영화 이미지를 스와이프 방식으로 브라우징, 동적이고 직관적인 영화 탐색 경험 제공
     
   
**2. Backend** :
   * Flask의 blueprint 객체를 사용하여 모듈식 및 조직화된 route 관리를 구현, 코드의 명확한 구분과 더 나은 유지 관리를 가능하게 함
   * RESTful 원칙을 준수하여 API 설계
   * 사용자 정보, review, likes 등의 데이터 저장을 위한 Mysql Database 작업, 데이터 무결성과 신뢰할 수 있는 쿼리 성능 보장
   * 카카오 login API 를 활용하여 사용자의 카카오 계정 정보를 받아와 로그인 서비스에 연동
   * 로그인 성공 시 JWT 토큰을 생성하여 사용자 인증 정보를 안전하게 전송하고, 이후의 요청에서도 해당 토큰을 통해 사용자를 식별하여 로그인 유지 기능을 구현 


## 📂 Database 구조

![image](https://github.com/ruubyme/Movies/assets/66954232/d75b57e5-d21b-4286-be67-fdcd8608844e)



> `users` 
> 사용자 정보를 저장하는 테이블

>`reviews`
>영화 리뷰 정보를 저장하는 테이블

>`likes`
>사용자들이 `좋아요`를 누른 영화 정보를 저장하는 테이블


## 🌐 API Endpoints
### Kakao Login
* **POST /login/kakao**: 카카오를 통한 사용자 로그인<br>
  * **Required Parameters**: `code`: 인증 코드 

### Movie Reviews
* **GET /movie/reviews**: 영화에 대한 리뷰 조회<br>
  * **Required Parameters**: `movieId`: 조회하려는 영화의 ID 

### Likes
* **GET /user/likes**: 사용자가 특정 영화를 좋아하는지 조회<br>
  * **Required Parameters**: `movieId`: 조회하려는 영화의 ID, `userId`: 사용자 ID
* **POST /user/likes**: 영화 좋아요 추가<br>
  * **Required JSON Body**: `movieId`: 영화의 ID, `userId`: 사용자 ID
* **DELETE /user/likes**: 영화 좋아요 삭제<br>
  * **Required JSON Body**: `movieId`: 영화의 ID, `userId`: 사용자 ID
* **GET /user/likes/all**: 사용자가 좋아요한 모든 영화 목록 조회<br>
  * **Required Parameters**: `userId`: 사용자 ID
 

   

### User Reviews
* **GET /user/reviews** : 사용자가 작성한 모든 리뷰 조회
  * **Required Parameters** : `userId`: 리뷰를 조회하려는 사용자 ID
    
* **POST /user/reviews**: 사용자의 영화 리뷰 작성
  * **Required JSON Body**: `movieId`: 리뷰를 작성하려는 영화의 ID, `userId`: 사용자 ID, `rating`: 평점, `comment`: 리뷰 내용
 
* **DELETE /user/reviews**: 사용자의 영화 리뷰 삭제
  * **Required JSON Body**: `reviewId`: 삭제하려는 리뷰 ID, `userId`: 사용자 ID



## overview
* likes toggle    
![movies_likes](https://github.com/ruubyme/Movies/assets/66954232/c9a77a48-e9e9-4449-97ac-4d6e744ff85c)

* add reviews    
![movies_reveiws](https://github.com/ruubyme/Movies/assets/66954232/e8f7843b-017f-4bf7-add7-87561dee9301)

* genreSearch / infinite scroll   
![movies_genresearch](https://github.com/ruubyme/Movies/assets/66954232/c6f6ff14-ad86-4ee2-9a9b-350a57620d78)

  

## Project 기록

블로그 – [@더 자세한 기록 보러가기](https://joo-jjang.tistory.com/category/Project/Movies)





