// app.js : 영화 배열을 다루는 함수들과 렌더링 / 김정희(2651017) / 11주차

// 1. average : 영화 배열 ⇒ 평균 평점(숫자)
const average = (list) => {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}

// 2. best: 영화 배열 ⇒ 평점이 가장 높은 영화 객체
const best = (list) => {
    let top = list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }
    return top;
}

// 3. filterByRating: 영화 배열, 최소 평점 ⇒ 그 이상인 영화만 담은 새 배열
const filterByRating = (list, min) => {
    return list.filter(m => m.rating >= min);
}

// 4. sortByRating: 영화 배열 ⇒ 평점 높은 순으로 정렬한 새 배열(원본은 그대로)
const sortByRating = (list) => {
    return [...list].sort((a, b) => b.rating - a.rating);
}

// 5. yearsSince: 날짜 문자열 ⇒ 올해까지 몇 년(숫자)
const yearsSince = (dateStr) => {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

// 6. posterUrl: 포스터 경로, 크기 ⇒ TMDB 이미지 주소(문자열)
const posterUrl = (path, size) => {
    return "https://image.tmdb.org/t/p/" + size + path;
}

// renderCards : 영화 배열 ⇒ 보드에 카드 생성 및 개수 표시 (3, 4단계)
function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) { 
            card.classList.add("hot"); 
        }
        card.innerHTML = `
            <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
            <span class="badge">${m.rating}</span>
            <div class="info">
                <h2>${m.title}</h2>
                <p class="year">${m.year}</p>
            </div>
        `;
        board.appendChild(card);
    }
    // 개수 표시 (#count)
    document.getElementById("count").textContent = list.length + "편";
}

// sortBy: 영화 배열, 키 이름, 내림차순 여부 정렬한 새 배열 (5단계)
function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}

// applySort: 선택 상자 값으로 정렬해서 다시 그리기 (6단계)
function applySort() {
    const key = document.getElementById("sort").value;
    renderCards(sortBy(movies, key, key !== "title"));
}

// 처음 실행 시 평점순으로 정렬해서 카드 그리기 (6단계)
applySort();