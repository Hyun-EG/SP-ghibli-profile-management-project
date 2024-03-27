## 지브리 프로필관리 사이트를 소개합니다.

### DEMO : https://delightful-mermaid-df4e3a.netlify.app/

![](https://velog.velcdn.com/images/codiee/post/39d015ad-a794-4bd9-babe-53859ffa56a3/image.PNG)

**캐릭터들의 프로필 관리를 위한 사이트입니다.**

<hr/>

## 📌 구현 사항
- 프로필 페이지를 개발
- 스크롤이 가능한 형태의 리스팅 페이지
- 사진등록, 수정, 삭제기능
- 유저 플로우
- 직원 검색 기능
- LocalStorage
- 상대수치 사용(rem, em)
- JavaScript
- DOM event 조작

<hr/>

## 동작

### 신상정보 입력창 열기/닫기

캐릭터추가 버튼을 클릭하면 신상정보 입력창이 나옵니다. 닫기를 누르면 창이 사라집니다.
![](https://velog.velcdn.com/images/codiee/post/236d99f2-65c2-4c1a-813c-7e2b1d806736/image.gif)

<hr/>

### 🙍🏻‍♂️ 캐릭터 생성

신상정보를 입력하고 저장버튼을 클릭하면 아래 테이블에 데이터가 출력됩니다.

![](https://velog.velcdn.com/images/codiee/post/2c55ea67-873a-4d9f-8bb6-389179234fd3/image.gif)

<hr/>

### ✂️ 캐릭터 편집/삭제

캐릭터프로필을 편집할 수 있습니다. 변경할 프로필 설정란에 편집버튼을 클릭하고 기입한뒤 수정버튼을 누르면 캐릭터프로필이 변경되는 것을 확인할 수 있습니다.

많은 캐릭터의 프로필을 편집할때 모달창에 따로 입력하는 방식보다 속도를 높여 편집이 가능합니다.

![](https://velog.velcdn.com/images/codiee/post/5df3d7ad-2a23-4b6c-a1c7-d2e1d6bbc807/image.gif)

캐릭터프로필을 삭제할 수 있습니다. 삭제할 프로필 설정란에 삭제버튼을 클릭하면,
해당 캐릭터프로필이 삭제됩니다.

![](https://velog.velcdn.com/images/codiee/post/4d4e51f8-41bb-4891-9226-03fece866116/image.gif)

<hr/>

### 🔎 캐릭터 검색

캐릭터검색이 가능합니다. 검색창에 해당 캐릭터의 이름을 기입하면, 해당 글자가 포함된 캐릭터들만 테이블에 출력합니다. 검색버튼 없이 입력하면 유동적으로 바뀌기 때문에 편리합니다.

![](https://velog.velcdn.com/images/codiee/post/dfbc47b3-e261-41c9-a21e-d99973814a61/image.gif)

<hr/>

### Localstorage

자신이 사용한 기기에서 새로고침이나 사이트를 나갔다와도 추가한 프로필은 삭제버튼을 누르지 않는한 사라지지않습니다.

<hr/>

### Userflow

*흐름선이 하얀색 선이라 하얀배경에서는 안보일 수 있습니다.
링크: https://github.com/KDT1-FE/KDT8-M2/assets/106307387/00446829-8ed5-4acd-a452-0122d60cab4f

![](https://velog.velcdn.com/images/codiee/post/91551f7b-29e0-47df-806d-65df525a5490/image.png)
