document.addEventListener('DOMContentLoaded', async () => {
    // 데이터 배열 (JSON 응답에서 가져온다고 가정)
    let sampleData;

    // sampleDataDivision.json 데이터 반환 함수
    const getSampleData = async () => {
        try {
            const response = await fetch('../json/sampleMonthlyData.json');
            sampleData = await response.json();
            console.log(sampleData);
        } catch (error) {
            console.error(error);
        }
    };

    // sampleDataDivision.json 데이터 반환
    await getSampleData();
    /*const data = {
        expend: [
            {
                yearMonth: 2407,
                details: [
                    { id: 5, date: "2024.07.03", type: "expend", title: "편의점 음료 및 간식 구매", amount: 8000, method: "cash", category: "food" },
                    { id: 6, date: "2024.07.06", type: "expend", title: "친구 결혼식 축의금", amount: 300000, method: "checkCard", category: "congratulation" }
                ]
            },
            {
                yearMonth: 2408,
                details: [
                    { id: 7, date: "2024.08.05", type: "expend", title: "여름 휴가 숙박비", amount: 150000, method: "creditCard", category: "travel" },
                    { id: 8, date: "2024.08.12", type: "expend", title: "저녁 외식 - 파스타 레스토랑", amount: 60000, method: "creditCard", category: "food" }
                ]
            }
        ]
    };
    */


    // 1. "expend" 데이터 가져오기
    const allExpendDetails = sampleData.expend.flatMap(item => item.details);

    // 2. 카테고리별 합계 계산
    // 2. 카테고리별 합계 계산 (undefined 제외)
    const categorySums = allExpendDetails
        .filter(item => {
            // 현재 월 계산
            const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM 형식
            const itemMonth = item.date.slice(0, 7); // YYYY.MM 형식에서 월 추출
            return item.type === "expend" && item.category && itemMonth === currentMonth.replace("-", ".");
        })
        .reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
            return acc;
        }, {});


    // 3. 총합 계산
    const totalExpenditure = Object.values(categorySums).reduce((acc, curr) => acc + curr, 0);

    // 4. 비율 계산
    const categoryPercentages = Object.entries(categorySums)
        .map(([category, amount]) => ({
            category,
            totalAmount: amount,
            percentage: ((amount / totalExpenditure) * 100).toFixed(2)
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount); // 금액 기준 내림차순 정렬

    // 차트 데이터 생성
    // 카테고리 매핑 테이블
    const categoryMapping = {
        food: "식비",
        congratulation: "경조사",
        travel: "여행",
        shopping: "쇼핑",
        transport: "교통비",
        utilityBills: "공과금"
    };

    // 라벨 생성 (매핑 테이블을 기반으로 변환)
    const labels = categoryPercentages.map(item => categoryMapping[item.category] || item.category);

    const dataPercentages = categoryPercentages.map(item => parseFloat(item.percentage)); // 비율

    // 색상 정의
    const colors = [
        "#2141E8",
        "#2447FF",
        "#506CFF",
        "#6C84FF",
        "#9AAAFF",
    ];

    // 데이터 및 옵션 설정
    const expData = {
        labels: labels,
        datasets: [
            {
                data: dataPercentages,
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor: colors,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "right",
            },
        },
        animation: {
            duration: 3500, // 애니메이션 지속 시간 (밀리초)
            easing: "easeInOutQuart", // 애니메이션 효과
        },
        responsiveAnimationDuration: 3000, // 반응형 크기 조정 시 애니메이션 지속 시간
    };

    // 차트 생성
    const ctx = document.getElementById("myDoughnutChart").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: expData,
        options: options,
    });

    // 순위별로 렌더링
    const rankContainer = document.getElementById("category-rank");
// 기존 요소를 비우지 않고 업데이트
    while (rankContainer.firstChild) {
        rankContainer.removeChild(rankContainer.firstChild);
    }

    categoryPercentages.forEach((item, index) => {
        const rankItem = document.createElement("div");
        rankItem.className = "flex items-center w-full space-x-4 w-full"; // Flexbox 클래스 유지
        rankItem.innerHTML = `
            <div class="flex justify-center items-center rounded-md " 
                style="border-radius: 8px; background: ${colors[index]}; width: 100px; height: 35px; display: flex; align-items: center; justify-content: center;">
                <span class="text-white">${index + 1}위 ${categoryMapping[item.category] || item.category}</span>
            </div>
            <span class="text-gray-700">${item.totalAmount.toLocaleString()}원</span>
        `;
        rankContainer.appendChild(rankItem);
    });
});
