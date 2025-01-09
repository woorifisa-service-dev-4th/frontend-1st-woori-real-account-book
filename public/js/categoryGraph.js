document.addEventListener('DOMContentLoaded', async () => {

    const buttons = document.querySelectorAll('button');
    const defaultColor = 'bg-[#EEEEEE]';
    const activeColor = 'bg-[#506CFF]';
    const activeTextColor = 'text-white';

    document.getElementById("food").addEventListener("click", () => {
        updateWeeklyDataDisplay("food");
    });

    document.getElementById("shopping").addEventListener("click", () => {
        updateWeeklyDataDisplay("shopping");
    });

    document.getElementById("transport").addEventListener("click", () => {
        updateWeeklyDataDisplay("transport");
    });

    document.getElementById("events").addEventListener("click", () => {
        updateWeeklyDataDisplay("events");
    });


    function calculateCategoryWeeklySums(sampleData, category) {
        const weeklySums = {}; // 주별 합계를 저장할 객체

        sampleData.forEach((item) => {
            if (item.category === category) {
                // 항목이 주어진 카테고리와 일치할 경우
                const weekStart = getWeekStart(item.date);
                // 해당 항목의 날짜가 속한 주의 시작일 계산

                if (!weeklySums[weekStart]) {
                    // 해당 주의 합계가 아직 초기화되지 않았으면 0으로 초기화
                    weeklySums[weekStart] = 0;
                }

                weeklySums[weekStart] += item.amount;
                // 해당 주의 합계에 금액 추가
            }
        });

        return weeklySums; // 주별 합계를 반환
    }






    let sampleData;

    // sampleDataDivision.json 데이터 반환 함수
    const getSampleData = async () => {
        try {
            const response = await fetch('../json/sampleData.json');
            sampleData = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    // sampleDataDivision.json 데이터 반환
    await getSampleData();
    // console.log(sampleData);

    // filterDataByCategory 함수 외부로 이동
    function filterDataByCategory(category, sampleData) {
        const filteredData = sampleData.filter(item => item.category === category && item.type === 'expend'); // category와 type이 'expend'인 항목 필터링
        console.log(filteredData); // 필터링된 데이터 출력
        displayFilteredData(filteredData); // 주차별 합계 계산 함수 호출
    }
    // 각 버튼에 클릭 이벤트 리스너 추가
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove(activeColor, activeTextColor);
                btn.classList.add(defaultColor);
            });
            button.classList.remove(defaultColor);
            button.classList.add(activeColor, activeTextColor);

            const category = button.id;
            filterDataByCategory(category, sampleData);
        });
    });

    // 주차별 합계 계산
    function calculateWeeklySums(filteredData) {
        // 주차별 합계 초기화
        const weeklySums = {};

        filteredData.forEach(item => {
            const weekNumber = getWeekNumber(item.date); // 주차 계산
            if (!weeklySums[weekNumber]) {
                weeklySums[weekNumber] = 0;
            }
            weeklySums[weekNumber] += item.amount; // 해당 주차의 합계 계산
        });

        // 주차별 합계 출력
        console.log(weeklySums);
    }

    // 주차 계산 함수 (1일부터 시작하는 기준)
    function getWeekNumber(dateString) {
        const date = new Date(dateString);
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    }

    // displayFilteredData 함수 정의
    function displayFilteredData(filteredData) {
        // 필터링된 데이터를 HTML로 출력하는 예시
        const resultDiv = document.getElementById('result'); // 결과를 출력할 div
        if (!resultDiv) {
            console.error("결과를 출력할 div 요소가 존재하지 않습니다.");
            return; // 요소가 없다면 처리하지 않고 종료
        }
        resultDiv.innerHTML = ''; // 기존 내용을 비움

        filteredData.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('filtered-item');
            itemDiv.innerText = `${item.date} - ${item.amount} - ${item.category}`;
            resultDiv.appendChild(itemDiv);
        });
    }
});
