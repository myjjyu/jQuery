// 로딩 이미지를 표시하기 위한 div 생성
const loader = $("<img>")
    .css({
        width: "24px",
        height: "24px",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        "z-index": 9999,
        display: "none",
    })
    .attr("src", "loading.gif");

$("body").append(loader);

/** jQuery Ajax 함수에 대한 전역 설정 */
$.ajaxSetup({
    /** ajax 기본 옵션 */
    cache: false, // 캐쉬 사용 금지 처리
    dataType: "json", // 읽어올 내용 형식 (html,xml,json)
    timeout: 30000, // 타임아웃 (30초)
    beforeSend: () => loader.show(),
    error: (err) => {
        console.log(err);

        const data = err.responseJSON;

        const e = new Error(data?.message || err.statusText || "An error occurred in the Axios.");
        e.status = data?.status || err?.status || 0;
        e.statusText = data?.message || err?.statusText || "Unknown Error";
        e.trace = data?.trace || "No trace information";

        console.error(e.trace);

        //throw e;
        alert(`[${e.status}] Error\n${e.statusText}`);
    },
    complete: () => loader.hide(),
});
