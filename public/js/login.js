document.addEventListener('DOMContentLoaded', async () => {
    const loginBtn = document.getElementById('loginBtn');
    const idInput = document.getElementById('idInput');
    const pwInput = document.getElementById('pwInput');
    const idGuideMessage = document.getElementById('idGuideMessage');
    const pwGuideMessage = document.getElementById('pwGuideMessage');

    loginBtn.disabled = true;

    /**
     * 로그인 버튼 활성화 조건
     * - 아이디, 비밀번호 입력 시
     * - 아이디 4자리 이상 입력 시
     * - 비밀번호 8자리 이상 입력 시
     */
    try {
        idInput.addEventListener('input', () => {
            loginBtnActive(idInput, pwInput, loginBtn);
            showIdGuideMessage(idInput, idGuideMessage);
        });

        pwInput.addEventListener('input', () => {
            loginBtnActive(idInput, pwInput, loginBtn);
            showPwGuideMessage(pwInput, pwGuideMessage);
        });
    } catch (error) {
        console.error(error);
    }
});

/**
 * 입력폼 안내창 표시/숨김 함수
 */
// 아이디 입력폼 안내창 표시/숨김
export const showIdGuideMessage = (idInput, idGuideMessage) => {
    if (idInput.value.length >= 4) {
        idGuideMessage.style.display = 'none';
    } else {
        idGuideMessage.style.display = 'block';
    }
};

// 비밀번호 입력폼 안내창 표시/숨김
export const showPwGuideMessage = (pwInput, pwGuideMessage) => {
    if (pwInput.value.length >= 8) {
        pwGuideMessage.style.display = 'none';
    } else {
        pwGuideMessage.style.display = 'block';
    }
};

/**
 * 로그인 버튼 활성화/비활성화 함수
 */
const loginBtnActive = (idInput, pwInput, loginBtn) => {
    if (idInput.value.length >= 4 && pwInput.value.length >= 8) {
        loginBtn.style.backgroundColor = '#506CFF';
        loginBtn.disabled = false;
    } else {
        loginBtn.style.backgroundColor = '#b6b6b6';
        loginBtn.disabled = true;
    }
}