
// index.d.ts :: 타입 정의, 선언
// 타입스크립트이지만 런타임 코드는 없고, 자바스크립트로 변환되지 않는다.

// import, export가 하나라도 있어야 모듈로 인식하고 적용이 된다.
import IUser from '../models/user.model';

declare global {
    // interface에 속성을 추가해서 적용시키려면, global로 정의해야 한다.

    // interface는 여러번 정의하면, 하나로 합쳐지는 속성을 이용해서
    // 없는 속성들을 추가해 준다.

    // 기존 interface Error {}에 status 속성이 없다.
    // error.status 속성을 사용하면 에러가 발생, status 속성을 추가
    interface Error {
        status: number;
    }

    // interface User {} 객체에 속성이 하나도 없어서
    // index.passport.ts -->  user.id를 사용하면 에러가 발생
    // User 모델에 정의된 속성들을 모두 적용시키기
    namespace Express {
        // 속성을 하나하나 적어주는 대신
        // model에 정의된 속성들을 불러야 사용한다.
        interface User extends IUser {}
    }
}