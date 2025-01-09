// 데이터 및 옵션 설정
const expData = {
    labels: ["식비", "쇼핑", "공과금", "교통비", "경조사"],
    datasets: [
        {
            data: [40, 25, 15, 10, 10], // 각 카테고리의 비율
            borderWidth: 2,
            hoverBorderWidth: 3,
            backgroundColor: [
                "#2141E8", // 식비
                "#2447FF", // 쇼핑
                "#506CFF", // 공과금
                "#6C84FF", // 교통비
                "#9AAAFF", // 경조사
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
