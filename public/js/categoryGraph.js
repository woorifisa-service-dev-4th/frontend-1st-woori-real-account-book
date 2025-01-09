document.addEventListener('DOMContentLoaded', async () => {
    const buttons = document.querySelectorAll('button');
    const defaultColor = 'bg-[#EEEEEE]';
    const activeColor = 'bg-[#506CFF]';
    const activeTextColor = 'text-white';

    let data;

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
        const now = new Date(); // 현재 날짜
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0부터 시작 (1월: 0, 2월: 1, ...)

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
            weeklySums[weekNumber] += item.amount; // 주차별 금액 합산
        });

        return weeklySums; // 주차별 합계 반환
    }

    // UI 업데이트
    function updateWeeklyDataDisplay(category) {
        const currentMonthData = getCurrentMonthData(sampleData);
        const filteredData = currentMonthData.filter(item => item.category === category && item.type === 'expend');
        const weeklySums = calculateWeeklySums(filteredData);

        const weekContainers = document.querySelector('.flex-row.justify-center.gap-6');
        weekContainers.innerHTML = ''; // 기존 내용을 비움

        const maxBarHeight = 130; // 최대 막대 높이
        const maxAmount = Math.max(...Object.values(weeklySums), 0); // 최대 값 계산

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

    // 버튼 클릭 이벤트 리스너
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove(activeColor, activeTextColor);
                btn.classList.add(defaultColor);
            });
            button.classList.remove(defaultColor);
            button.classList.add(activeColor, activeTextColor);

            const category = button.id; // 버튼의 id가 카테고리 이름
            updateWeeklyDataDisplay(category); // UI 업데이트
        });
    });

    // 페이지 로드 시 기본 카테고리 표시
    updateWeeklyDataDisplay('food'); // 기본값: 식비
});
