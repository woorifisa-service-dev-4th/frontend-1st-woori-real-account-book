document.addEventListener('DOMContentLoaded', async () => {
    const buttons = document.querySelectorAll('button');
    const defaultColor = 'bg-[#EEEEEE]';
    const activeColor = 'bg-[#506CFF]';
    const activeTextColor = 'text-white';

    let activeButton = document.getElementById('food'); // 기본 활성 버튼
    let sampleData;

    // sampleData.json 데이터를 가져오기
    const getSampleData = async () => {
        try {
            const response = await fetch('../json/sampleData.json');
            sampleData = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    await getSampleData(); // 데이터 로드

    // 현재 월의 데이터를 필터링
    function getCurrentMonthData(data) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        return data.filter(item => {
            const itemDate = new Date(item.date);
            return (
                itemDate.getFullYear() === currentYear &&
                itemDate.getMonth() === currentMonth
            );
        });
    }

    // 특정 달 기준 주차 계산
    function getMonthWeekNumber(dateString) {
        const date = new Date(dateString);
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const dayOfMonth = date.getDate();
        return Math.ceil((dayOfMonth + dayOfWeek) / 7);
    }

    // 주차별 합계 계산
    function calculateWeeklySums(filteredData) {
        const weeklySums = {};

        filteredData.forEach(item => {
            const weekNumber = getMonthWeekNumber(item.date);
            if (!weeklySums[weekNumber]) {
                weeklySums[weekNumber] = 0;
            }
            weeklySums[weekNumber] += item.amount;
        });

        return weeklySums;
    }

    // UI 업데이트
    function updateWeeklyDataDisplay(category) {
        const currentMonthData = getCurrentMonthData(sampleData);
        const filteredData = currentMonthData.filter(item => item.category === category && item.type === 'expend');
        const weeklySums = calculateWeeklySums(filteredData);

        const weekContainers = document.querySelector('.flex-row.justify-center.gap-6');
        weekContainers.innerHTML = '';

        const maxBarHeight = 130;
        const maxAmount = Math.max(...Object.values(weeklySums), 0);

        for (let week = 1; week <= 5; week++) {
            const amount = weeklySums[week] || 0;
            const barHeight = amount > 0 ? (amount / maxAmount) * maxBarHeight : 6;

            const weekContainer = document.createElement('div');
            weekContainer.className = 'flex flex-col items-center gap-1';

            const amountText = document.createElement('p');
            amountText.className = amount > 0 ? 'text-[#506CFF] text-[14px] weight-600' : 'text-[14px] weight-500';
            amountText.textContent = `${amount.toLocaleString()} 원`;

            const bar = document.createElement('div');
            bar.style.height = `${barHeight}px`;
            bar.className = 'h-[20px] w-[35px] rounded-[4px]';
            bar.style.backgroundColor = amount > 0 ? '#506CFF' : '#B6B6B6';

            const weekText = document.createElement('p');
            weekText.className = 'weight-500 text-[14px]';
            weekText.textContent = `${new Date().getMonth() + 1}월 ${week}째주`;

            weekContainers.appendChild(weekContainer);
            weekContainer.appendChild(amountText);
            weekContainer.appendChild(bar);
            weekContainer.appendChild(weekText);
        }
    }

    // 버튼 상태 업데이트 함수
    function updateButtonState(button) {
        buttons.forEach(btn => {
            btn.classList.remove(activeColor, activeTextColor);
            btn.classList.add(defaultColor);
        });
        button.classList.remove(defaultColor);
        button.classList.add(activeColor, activeTextColor);
    }

    // 버튼 클릭 이벤트 리스너
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            activeButton = button; // 현재 활성 버튼 업데이트
            updateButtonState(button);

            const category = button.id;
            updateWeeklyDataDisplay(category);
        });

        button.addEventListener('mouseenter', () => {
            if (button !== activeButton) {
                button.classList.remove(defaultColor);
                button.classList.add(activeColor, activeTextColor);
            }
        });

        button.addEventListener('mouseleave', () => {
            if (button !== activeButton) {
                button.classList.remove(activeColor, activeTextColor);
                button.classList.add(defaultColor);
            }
        });
    });

    // 페이지 로드 시 기본 카테고리 표시 및 활성화
    updateWeeklyDataDisplay('food');
    updateButtonState(activeButton);
});
