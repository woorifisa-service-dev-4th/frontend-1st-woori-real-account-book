import {showIdGuideMessage, showPwGuideMessage} from "./login.js";

document.addEventListener('DOMContentLoaded', async () => {
    const nameInput = document.getElementById('nameInput');
    const idInput = document.getElementById('idInput');
    const pwInput = document.getElementById('pwInput');
    const pwCheckInput = document.getElementById('pwCheckInput');
    const nameGuideMessage = document.getElementById('nameGuideMessage');
    const idGuideMessage = document.getElementById('idGuideMessage');
    const pwGuideMessage = document.getElementById('pwGuideMessage');
    const pwCheckGuideMessage = document.getElementById('pwCheckGuideMessage');
    const signupBtn = document.getElementById('signupBtn');

    signupBtn.disabled = true;

    /**
     * 회원가입 버튼 활성화 조건
     * - 이름, 아이디, 비밀번호, 비밀번호 확인 입력 시
     * - 이름 2자리 이상 입력 시
     * - 아이디 4자리 이상 입력 시
     * - 비밀번호 8자리 이상 입력 시
     * - 비밀번호와 비밀번호 확인이 일치할 시
     */
    try {
        nameInput.addEventListener('input', () => {
            signupBtnActive(nameInput, idInput, pwInput, pwCheckInput, signupBtn);
            showNameGuideMessage(nameInput, nameGuideMessage);
        });

        idInput.addEventListener('input', () => {
            signupBtnActive(nameInput, idInput, pwInput, pwCheckInput, signupBtn);
            showIdGuideMessage(idInput, idGuideMessage);
        });

        pwInput.addEventListener('input', () => {
            signupBtnActive(nameInput, idInput, pwInput, pwCheckInput, signupBtn);
            showPwGuideMessage(pwInput, pwGuideMessage);
        });

        pwCheckInput.addEventListener('input', () => {
            signupBtnActive(nameInput, idInput, pwInput, pwCheckInput, signupBtn);
            showPwCheckGuideMessage(pwInput, pwCheckInput, pwCheckGuideMessage);
        });
    } catch (error) {
        console.error(error);
    }
});

/**
 * 입력폼 안내창 표시/숨김 함수
 */
// 이름 입력폼 안내창 표시/숨김
const showNameGuideMessage = (nameInput, nameGuideMessage) => {
    if (nameInput.value.length >= 2) {
        nameGuideMessage.style.display = 'none';
    } else {
        nameGuideMessage.style.display = 'block';
    }
};

// 비밀번호 확인 입력폼 안내창 표시/숨김
const showPwCheckGuideMessage = (pwInput, pwCheckInput, pwCheckGuideMessage) => {
    if (pwInput.value === pwCheckInput.value) {
        pwCheckGuideMessage.style.display = 'none';
    } else {
        pwCheckGuideMessage.style.display = 'block';
    }
};

/**
 * 회원가입 버튼 활성화/비활성화 함수
 */
const signupBtnActive = (nameInput, idInput, pwInput, pwCheckInput, signupBtn) => {
    if (nameInput.value.length >= 2 && idInput.value.length >= 4 && pwInput.value.length >= 8 && pwCheckInput.value === pwInput.value) {
        signupBtn.style.backgroundColor = '#506CFF';
        signupBtn.disabled = false;
    } else {
        signupBtn.style.backgroundColor = '#b6b6b6';
        signupBtn.disabled = true;
    }
};