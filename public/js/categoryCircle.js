document.addEventListener('DOMContentLoaded', () => {
    // 데이터 배열 (JSON 응답에서 가져온다고 가정)
    const data = {
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

    // 1. "expend" 데이터 가져오기
    const allExpendDetails = data.expend.flatMap(item => item.details);

    // 2. 카테고리별 합계 계산
    const categorySums = allExpendDetails.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
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

    // 데이터 및 옵션 설정
    const expData = {
        labels: labels,
        datasets: [
            {
                data: dataPercentages, // 동적으로 계산된 비율 사용
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor: [
                    "#2141E8", // 색상은 고정 (필요시 동적 색상 설정 가능)
                    "#2447FF",
                    "#506CFF",
                    "#6C84FF",
                    "#9AAAFF",
                ],
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 기본 비율 유지하지 않음
        plugins: {
            legend: {
                display: false,
                position: "right", // 범례를 오른쪽에 배치
            },
        },
    };

    // 차트 생성
    const ctx = document.getElementById("myDoughnutChart").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: expData,
        options: options,
    });
});
