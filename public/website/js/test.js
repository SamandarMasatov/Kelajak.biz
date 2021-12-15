  // DOM elementlari
  const card = document.querySelectorAll(".testCard_t");
  const burger = document.querySelector(".fa-arrow-circle-left");
  const leftSide = document.querySelector(".leftSide_t");
  const rightSide = document.querySelector(".rightSide_t");
  const refresh = document.getElementById("refresh"); 
  
  // Qiymati keyinchalik ma'lum bo'ladigan ma'lumotlar uchun massivlar
  let answers = [];
  let sum = [];
  let yourTrueAnswer = [];
  
  card.forEach((elem, ind, arr) => {
    elem.addEventListener("click", () => {
      const inPut = document.querySelectorAll(`#${arr[ind].id} form input`);
      const label = document.querySelectorAll(`#${arr[ind].id} form label`);
      inPut.forEach((t, index) => {
        t.addEventListener("click", () => {
          label[index].style.backgroundColor = "orange";
          for (let i = 0; i < inPut.length; i++) {
            if (inPut[i].checked !== true) {
              label[i].style.backgroundColor = "red";
            }
            if (inPut[i].value == answers[ind]) {
              label[i].style.backgroundColor = "#24b383";
            }
          }
        });
      });
    });
  });
  
  // Sidebarda yechilmagan testlarni ko'rsatish
  for (let i = 0; i < card.length; i++) {
    const round = document.createElement("div");
    round.innerHTML = i + 1;
    document.querySelector(".unresolved_t").appendChild(round);
  }
  
  //Right sidebar
  let b = 0;
  burger.addEventListener("click", () => {
    if (b % 2 == 0) {
      rightSide.style.width = "250px";
      leftSide.style.marginRight = "250px";
    } else {
      rightSide.style.width = "0";
      leftSide.style.marginRight = "0";
    }
    b++;
  });
  
  // Test belgilanganda card atrofida yashil to'siq hosil qilish
  card.forEach((e) => {
    e.children[2].addEventListener("click", () => {
      e.style.border = "5px solid #24b383";
      e.style.backgroundColor = "#f1f1f1";
      let h = e.children[0];
      document.querySelectorAll(".unresolved_t div")[
        h.childNodes[0].data - 1
      ].style.backgroundColor = "#24b383";
    });
  });
  
  // Progress bar ( natijalarni foizlarda ko'rsatish )
  let i = 0;
  let width = 0;
  function move() {
    if (i == 0 && width == 0) {
      s();
    } else {
      i = 0;
      width = 0;
      s();
    }
  }
  function s() {
    let elem = document.getElementById("myBar_t");
    width = (yourTrueAnswer.length / answers.length) * 100;
    elem.style.width = width + "%";
    function frame() {
      if (i >= width) {
        i = 0;
        width = 0;
        clearInterval(id);
      } else {
        i++;
        document.getElementById("progress_t").innerHTML = i + "%";
      }
    }
    let id = setInterval(frame, 3000 / width);
  }
  
  // Backenddan "axios" orqali ma'lumotlarni olish
  const pathNameTest = location.pathname;
  const slicePath = pathNameTest.slice(13, pathNameTest.length);
  function filter(res) {
    let filterCollection = res.data.filter(
      (item) => item.collection_ID == slicePath
    );
    for (let i = 0; i < filterCollection.length; i++) {
      answers.push(filterCollection[i].answer);
    }
  }
  axios.get(`/test_courseAll`).then(filter);
  
  refresh.addEventListener("click", () => {
    location.reload();
  });