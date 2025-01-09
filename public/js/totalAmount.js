let nowYear; // ex. 2024
let nowMonth; // ex. 08
let filterType = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    const prevDateBtn = document.getElementById('prevDateBtn');
    const nextDateBtn = document.getElementById('nextDateBtn');
    const nowDate = document.getElementById('nowDate');
    const nowMonthClass = document.getElementsByClassName('nowMonth');
    const totalIncomeAmount = document.getElementById('totalIncomeAmount');
    const totalExpendAmount = document.getElementById('totalExpendAmount');
    const incomeChangeMessage = document.getElementById('incomeChangeMessage');
    const expendChangeMessage = document.getElementById('expendChangeMessage');
    const detailCounts = document.getElementById('detailCounts');
    const totalBtn = document.getElementById('totalBtn');
    const incomeBtn = document.getElementById('incomeBtn');
    const expendBtn = document.getElementById('expendBtn');
    const detailMonth = document.getElementById('detailMonth');
    const detailContentsDiv = document.getElementById('detailContentsDiv');

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
     * 상세 내역 코드 생성 함수
     */
    /**
     * 상세 내역 코드 생성 함수
     */
    const generateDetailCode = async (type) => {
        const detailContentsDiv = document.querySelector('#detailContentsDiv'); // 대상 div 선택
        detailContentsDiv.innerHTML = ''; // 초기화

        if (type === 'income') {
            sampleData.income.forEach(data => {
                if (String(data.yearMonth).slice(0, 2) === String(nowYear).slice(2, 4) && String(data.yearMonth).slice(2, 4) === nowMonth) {
                    data.details.forEach(detail => {
                        const dataymd = detail.date;
                        const category = detail.category;
                        const amount = detail.amount;
                        const title = detail.title;  // 데이터의 제목
                        const method = detail.method; // 결제 방식


                        console.log(`data:${dataymd}, title: ${title}, method: ${method}`);

                        // detailContentsDiv div 내부에 상세 내역 추가
                        detailContentsDiv.innerHTML += `
                        <div id="detailContentsDiv">
                    <div class="min-w-[675px] border-b pb-5 mb-5 font-bold">
                        <h1 class="text-base weight-500 mt-4 mb-2">${dataymd}</h1>
                        <div class="flex justify-between mt-4">
                            <ul class="flex flex-row space-x-4" >
                                <li class="text-[14px] weight-600 border-2 px-[21px] py-[5px] rounded-[8px] text-[#506CFF] border-[#506CFF]">
                                    ${category}
                                </li>
                                <li class="text-[14px] weight-600 px-[21px] py-[5px] text-center">
                                    ${title}
                                </li>
                                <li class="text-[14px] weight-600 px-[21px] py-[5px] text-[#484848]">
                                    ${method}
                                </li>
                            </ul>
                            <div class="text-[14px] weight-600 px-[21px] py-[5px] text-[#506CFF]">
                               ${amount > 0 ? '+' : ''}${amount.toLocaleString()}원
                            </div>
                        </div>`;
                    });
                }
            });

        } else if (type === 'expend') {
            detailContentsDiv.innerHTML = '';
            sampleData.expend.forEach(data => {
                if (String(data.yearMonth).slice(0, 2) === String(nowYear).slice(2, 4) && String(data.yearMonth).slice(2, 4) === nowMonth) {

                    const uniqueDetails = data.details.reduce((acc, detail) => {
                        const uniqueKey = `${detail.date}-${detail.title}-${detail.method}-${detail.category}-${detail.amount}`;

                        if (!acc.map[uniqueKey]) {
                            acc.map[uniqueKey] = true; // 고유 키 저장
                            acc.list.push(detail); // 중복이 아닌 데이터만 추가
                        }

                        return acc;
                    }, { map: {}, list: [] });
                    detailContentsDiv.innerHTML = '';

                    // 중복 제거된 데이터로 UI 업데이트
                    detailContentsDiv.innerHTML = ''; // 이전 데이터 초기화
                    uniqueDetails.list.forEach(detail => {
                        const dataymd = detail.date;
                        const title = detail.title;  // 데이터의 제목
                        const method = detail.method; // 결제 방식
                        const category = detail.category;
                        const amount = detail.amount;


                        console.log(`data:${dataymd}, title: ${title}, method: ${method}`);

                        // detailContentsDiv div 내부에 상세 내역 추가
                        detailContentsDiv.innerHTML += `
                        <div id="detailContentsDiv">
                    <div class="min-w-[675px] border-b pb-5 mb-5 font-bold">
                        <h1 class="text-base weight-500 mt-4 mb-2" >${dataymd}</h1>
                        <div class="flex justify-between mt-4">
                            <ul class="flex flex-row space-x-4" >
                                <li class="text-[14px] weight-600 border-2 px-[21px] py-[5px] rounded-[8px] text-[#D61F1F] border-[#D61F1F]">
                                    ${category}
                                </li>
                                <li class="text-[14px] weight-600 px-[21px] py-[5px] text-center">
                                    ${title}
                                </li>
                                <li class="text-[14px] weight-600 px-[21px] py-[5px] text-[#484848]">
                                    ${method}
                                </li>
                            </ul>
                            <div class="text-[14px] weight-600 px-[21px] py-[5px] text-[#D61F1F]">
                               ${amount > 0 ? '-' : ''}${amount.toLocaleString()}원
                 
                            </div> </hr>
                        </div>`;
                    });
                } else {
                    console.error('Invalid type provided. Must be "income" or "expend".');
                }

            });
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

                if (dataYear == year && dataMonth == month) {
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

            return {prevIncomeAmount, prevExpendAmount, prevMonth};
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
         * 월별 상세 내역 개수 표시 함수
         * - 전체(type:all), 수입(type: income), 지출(type:expend)별 개수 표시
         */
        const displayDetailCounts = (year, month, type) => {
            try {
                let incomeCounts = 0;
                let expendCounts = 0;

                if (year.length === 4) {
                    year = year.slice(2, 4);
                }

                sampleData.income.forEach(data => {
                    const dataDate = String(data.yearMonth);
                    const dataYear = dataDate.slice(0, 2);
                    const dataMonth = dataDate.slice(2, 4);

                    if (dataYear == year && dataMonth == month) {
                        incomeCounts += data.details.length;
                    }
                });

                sampleData.expend.forEach(data => {
                    const dataDate = String(data.yearMonth);
                    const dataYear = dataDate.slice(0, 2);
                    const dataMonth = dataDate.slice(2, 4);

                    if (dataYear == year && dataMonth == month) {
                        expendCounts += data.details.length;
                    }
                });

                console.log(`incomeCounts: ${incomeCounts}, expendCounts: ${expendCounts}`);

                if (type === 'all') {
                    detailCounts.textContent = `전체 ${incomeCounts + expendCounts}건`;
                } else if (type === 'income') {
                    detailCounts.textContent = `수입 ${incomeCounts}건`;
                } else {
                    detailCounts.textContent = `지출 ${expendCounts}건`;
                }

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
        nowYear = nowDateValueArr[0];
        nowMonth = nowDateValueArr[1];

        // sampleDataDivision.json 데이터 반환
        await getSampleData();
        console.log(sampleData);

        // 총 수입 금액 계산
        const getIncomeAmountYear = String(nowYear).slice(2, 4);
        getTotalAmount(getIncomeAmountYear, nowMonth);

        // 상세 내역 일자 초기화
        detailMonth.textContent = nowMonth;

        // 상세 내역 개수 표시
        displayDetailCounts(nowYear, nowMonth, filterType);

        // 상세 내역 초기화
        console.log("...");
        await generateDetailCode(filterType);
        console.log("......");
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
                nowYear = nowDateValueArr[0];
                nowMonth = nowDateValueArr[1];

                if (nowYear === '2024' && nowMonth === '07') {
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
                const getIncomeAmountYear = String(prevYear).slice(2, 4);
                const getIncomeAmountMonth = prevMonth < 10 ? '0' + prevMonth : prevMonth;
                getTotalAmount(getIncomeAmountYear, getIncomeAmountMonth);

                nowYear = getIncomeAmountYear;
                nowMonth = getIncomeAmountMonth;

                // 상세 내역 일자 갱신
                detailMonth.textContent = nowMonth;

                // 상세 내역 개수 갱신
                displayDetailCounts(nowYear, nowMonth, filterType);
            });

            nextDateBtn.addEventListener('click', () => {
                const nowDateValue = nowDate.textContent;
                const nowDateValueArr = nowDateValue.split('.');
                nowYear = nowDateValueArr[0];
                nowMonth = nowDateValueArr[1];

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
                const getIncomeAmountYear = String(nextYear).slice(2, 4);
                const getIncomeAmountMonth = nextMonth < 10 ? '0' + nextMonth : nextMonth;
                getTotalAmount(getIncomeAmountYear, getIncomeAmountMonth);

                nowYear = getIncomeAmountYear;
                nowMonth = getIncomeAmountMonth;

                // 상세 내역 일자 갱신
                detailMonth.textContent = nowMonth;

                // 상세 내역 개수 갱신
                displayDetailCounts(nowYear, nowMonth, filterType);
            });
        } catch (error) {
            console.error(error);
        }


        // totalBtn, incomeBtn, expendBtn 클릭시 색깔 변화
        const buttons = [totalBtn, incomeBtn, expendBtn];
        // 공통 스타일 변경 함수
        const setActiveButton = (activeBtn) => {
            buttons.forEach((btn) => {
                if (btn === activeBtn) {
                    // 선택된 버튼
                    btn.classList.remove("bg-[#EEEEEE]", "text-[#282828]");
                    btn.classList.add("bg-[rgb(47,82,255)]", "text-white");
                } else {
                    // 선택되지 않은 버튼
                    btn.classList.remove("bg-[rgb(47,82,255)]", "text-white");
                    btn.classList.add("bg-[#EEEEEE]", "text-[#282828]");
                }
            });
        };

        // 버튼 클릭 이벤트 리스너 추가
        totalBtn.addEventListener("click", () => {
            setActiveButton(totalBtn); // 전체 버튼 활성화
            filterType = 'all';
            displayDetailCounts(nowYear, nowMonth, filterType); // 상세 내역 개수 갱신
        });

        incomeBtn.addEventListener("click", () => {
            setActiveButton(incomeBtn); // 수입 버튼 활성화
            filterType = 'income';
            displayDetailCounts(nowYear, nowMonth, filterType); // 상세 내역 개수 갱신
        });

        expendBtn.addEventListener("click", () => {
            setActiveButton(expendBtn); // 지출 버튼 활성화
            filterType = 'expend';
            displayDetailCounts(nowYear, nowMonth, filterType); // 상세 내역 개수 갱신
        });

        //totalBtn 클릭 시 sampleData 필러링 -> 이게 필요한가?
        const getSamplebottondata = async () => {
            try {
                const response = await fetch('../json/sampleDataDivision.json');
                sampleData = await response.json();
                console.log("sampleData loaded:", sampleData);
            } catch (error) {
                console.error("Error loading sampleData:", error);
            }
        };
        getSamplebottondata(); // 데이터 로드


        const filterDataByYearMonthAndType = (sampleData, year, month, filterType) => {
            // 데이터 배열(dataArray)이 비어있거나 undefined/null일 경우 대비
            if (!Array.isArray(sampleData)) {
                console.error("error", sampleData);
                return [];
            }
            // 필터 조건에 따른 데이터 반환
            return sampleData.filter(data => {
                // 날짜에서 연도와 월 추출
                const [dataYear, dataMonth] = data.date.split(".").slice(0, 2); // 예: "2024.08.01" -> ["2024", "08"]
                return (
                    dataYear === year &&
                    dataMonth === month &&
                    (filterType === "all" || data.type === filterType)
                );
            });
        };


// 데이터가 로드된 후에만 필터 함수 호출
        totalBtn.addEventListener("click", async () => {
            if (sampleData) {
                const allData = filterDataByYearMonthAndType(sampleData, nowYear, nowMonth, "all");
                await generateDetailCode(filterType);
                console.log("전체 데이터:", allData);
            } else {
                console.error("sampleData가 아직 로드되지 않았습니다.");
            }
        });


        // 버튼 클릭 이벤트 리스너
        incomeBtn.addEventListener("click", async () => {
            const incomeData = filterDataByYearMonthAndType(sampleData, nowYear, nowMonth, "income");
            await generateDetailCode(filterType);
            console.log("수입 데이터:", incomeData); // 현재 월의 수입 데이터
        });

        expendBtn.addEventListener("click", async () => {
            const expendData = filterDataByYearMonthAndType(sampleData, nowYear, nowMonth, "expense");
            await generateDetailCode(filterType);
            console.log("지출 데이터:", expendData); // 현재 월의 지출 데이터
        });

});

// // 페이지가 로드되면 첫 렌더링
// document.addEventListener("DOMContentLoaded", () => {
//     const currentYear = 2025; // 현재 연도
//     const currentMonth = 1; // 현재 월
//
//     // 현재 연도와 월에 해당하는 데이터만 필터링
//     const filteredData = sampleData.filter((item) => {
//         const [itemYear, itemMonth] = item.date.split(".");
//         return parseInt(itemYear) === currentYear && parseInt(itemMonth) === currentMonth;
//     });
//
//     // 필터링된 데이터 렌더링
//     renderTransactions(filteredData);
//     const filterTransactionBtn = (type) => {
//         const transactionList = document.getElementById("transaction-list");
//         transactionList.innerHTML = ""; // 기존 데이터를 초기화
//
//         const monthData = sampleData["2408"]; // 현재 월 데이터 (예: 2408)
//         if (!monthData) return;
//
//         const filteredData =
//             type === "all"
//                 ? [...monthData.income, ...monthData.expend]
//                 : monthData[type];
//
//         filteredData.forEach((transaction) => {
//             const sign = transaction.type === "income" ? "+" : "";
//             const color = transaction.type === "income" ? "#506CFF" : "#D61F1F";
//
//             transactionList.innerHTML += `
//                   <div class="transaction-item">
//                     <h1>${transaction.date}</h1>
//                     <ul>
//                       <li>${transaction.category}</li>
//                       <li>${transaction.title}</li>
//                       <li>${transaction.method}</li>
//                       <li style="color: ${color}">${sign}${transaction.amount.toLocaleString()}원</li>
//                     </ul>
//                   </div>`;
//         });
//     };
//
//     // Example usage of the function
//     filterTransactionBtn("all"); // 기본적으로 "all" 타입 데이터 렌더링
//
//
// });











