document.addEventListener('DOMContentLoaded', async () => {
    const prevDateBtn = document.getElementById('prevDateBtn');
    const nextDateBtn = document.getElementById('nextDateBtn');
    const nowDate = document.getElementById('nowDate');
    const nowMonthClass = document.getElementsByClassName('nowMonth');
    const totalIncomeAmount = document.getElementById('totalIncomeAmount');
    const totalExpendAmount = document.getElementById('totalExpendAmount');
    const incomeChangeMessage = document.getElementById('incomeChangeMessage');
    const expendChangeMessage = document.getElementById('expendChangeMessage');

    let sampleData;

    // sampleDataDivision.json 데이터 반환 함수
    const getSampleData = async () => {
        try {
            const response = await fetch('../json/sampleDataDivision.json');
            sampleData = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * 특정 월 수입/지출 총 합계 계산 함수
     */
    const calculateTotalAmount = (dataArray, year, month) => {
        let totalAmount = 0;

        dataArray.forEach(data => {
            const dataDate = String(data.yearMonth);
            const dataYear = dataDate.slice(0, 2);
            const dataMonth = dataDate.slice(2, 4);

            if (dataYear === year && dataMonth === month) {
                data.details.forEach(detail => {
                    totalAmount += detail.amount;
                });
            }
        });

        return totalAmount;
    };

    /**
     * 이전 월 수입/지출 금액 계산 함수
     */
    const calculatePreviousMonthAmounts = (year, month) => {
        const prevDate = new Date(year, month - 2);
        const prevYear = prevDate.getFullYear();
        const prevMonth = prevDate.getMonth() + 1;

        const getIncomeAmountYear = String(prevYear).slice(2, 4);
        const getIncomeAmountMonth = prevMonth < 10 ? '0' + prevMonth : prevMonth;

        const prevIncomeAmount = calculateTotalAmount(sampleData.income, getIncomeAmountYear, getIncomeAmountMonth);
        const prevExpendAmount = calculateTotalAmount(sampleData.expend, getIncomeAmountYear, getIncomeAmountMonth);

        return { prevIncomeAmount, prevExpendAmount, prevMonth };
    };

    /**
     * 금액 표시 / 포맷 함수
     */
    const displayTotalAmount = (incomeAmount, expendAmount) => {
        totalIncomeAmount.textContent = formatCurrency(incomeAmount);
        totalExpendAmount.textContent = formatCurrency(expendAmount);
    };

    const formatCurrency = (amount) => {
        return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
    };

    /**
     * 수입/지출 금액 변동 메시지 표시 함수
     */
    const showChangeMessage = (nowAmount, prevAmount, nowMonth, prevMonth, type) => {
        try {
            const changeAmount = Math.abs(nowAmount - prevAmount);
            const message = generateChangeMessage(nowAmount, prevAmount, changeAmount, prevMonth, type);
            if (type === 'income') {
                incomeChangeMessage.textContent = message;
            } else {
                expendChangeMessage.textContent = message;
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * 변동 메시지 생성 함수
     */
    const generateChangeMessage = (nowAmount, prevAmount, changeAmount, prevMonth, type) => {
        const action = type === 'income' ? (nowAmount > prevAmount ? '원 늘었어요🥰' : '원 줄었어요😢')
            : (nowAmount > prevAmount ? '더 썼어요😢' : '덜 썼어요🥰');
        return `${prevMonth}월보다 ${changeAmount.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${action}`;
    };

    /**
     * 월별 수입/지출 총 합계 계산 함수
     * - 기준 날짜 범위에 해당하는 데이터만 계산
     * - 금액 형태로 반환 (ex. 1,000원)
     */
    const getTotalAmount = (year, month) => {
        try {
            const incomeAmount = calculateTotalAmount(sampleData.income, year, month);
            const expendAmount = calculateTotalAmount(sampleData.expend, year, month);

            displayTotalAmount(incomeAmount, expendAmount);

            const {
                prevIncomeAmount,
                prevExpendAmount,
                prevMonth
            } = calculatePreviousMonthAmounts(year, month);

            showChangeMessage(incomeAmount, prevIncomeAmount, month, prevMonth, 'income');
            showChangeMessage(expendAmount, prevExpendAmount, month, prevMonth, 'expend');
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * 첫 렌더링 시 UI 초기화
     * - 현재 날짜 기준으로 총 수입/지출 금액 계산
     */
    try {
        const nowDateValue = nowDate.textContent;
        const nowDateValueArr = nowDateValue.split('.');
        const nowYear = nowDateValueArr[0];
        const nowMonth = nowDateValueArr[1];

        // sampleDataDivision.json 데이터 반환
        await getSampleData();
        console.log(sampleData);

        // 총 수입 금액 계산
        const getIncomeAmountYear = String(nowYear).slice(2,4);
        const getIncomeAmountMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
        getTotalAmount(getIncomeAmountYear, getIncomeAmountMonth);
    } catch (error) {
        console.error(error);
    }

    /**
     * 날짜 이동 버튼 클릭 이벤트
     * - 현재 날짜 이상으로는 이동되지 않는다
     * - 이동 가능 날짜: 2024.08.01 ~ 2025.01
     * - 월단위 이동 (ex. 2024.01 -> 2024.02)
     * - 날짜가 변경될 시, 총 수입/지출 금액도 변경
     */
    try {
        prevDateBtn.addEventListener('click', () => {
            const nowDateValue = nowDate.textContent;
            const nowDateValueArr = nowDateValue.split('.');
            const nowYear = nowDateValueArr[0];
            const nowMonth = nowDateValueArr[1];

            if (nowYear === '2024' && nowMonth === '08') {
                return;
            }

            const prevDate = new Date(nowYear, nowMonth - 2);
            const prevYear = prevDate.getFullYear();
            const prevMonth = prevDate.getMonth() + 1;

            // 날짜 변경
            nowDate.textContent = `${prevYear}.${prevMonth < 10 ? '0' + prevMonth : prevMonth}`;
            Array.from(nowMonthClass).forEach(month => {
                month.textContent = `${prevMonth}`;
            });

            // 총 수입/지출 금액 계산
            const getIncomeAmountYear = String(prevYear).slice(2,4);
            const getIncomeAmountMonth = prevMonth < 10 ? '0' + prevMonth : prevMonth;
            getTotalAmount(getIncomeAmountYear, getIncomeAmountMonth);
        });

        nextDateBtn.addEventListener('click', () => {
            const nowDateValue = nowDate.textContent;
            const nowDateValueArr = nowDateValue.split('.');
            const nowYear = nowDateValueArr[0];
            const nowMonth = nowDateValueArr[1];

            if (nowYear === '2025' && nowMonth === '01') {
                return;
            }

            const nextDate = new Date(nowYear, nowMonth);
            const nextYear = nextDate.getFullYear();
            const nextMonth = nextDate.getMonth() + 1;

            // 날짜 변경
            nowDate.textContent = `${nextYear}.${nextMonth < 10 ? '0' + nextMonth : nextMonth}`;
            Array.from(nowMonthClass).forEach(month => {
                month.textContent = `${nextMonth}`;
            });

            // 총 수입/지출 금액 계산
            const getIncomeAmountYear = String(nextYear).slice(2,4);
            const getIncomeAmountMonth = nextMonth < 10 ? '0' + nextMonth : nextMonth;
            getTotalAmount(getIncomeAmountYear, getIncomeAmountMonth);
        });
    } catch (error) {
        console.error(error);
    }
});