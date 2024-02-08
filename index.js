// document.body.style.height = window.innerHeight + 'px';
// window.addEventListener('resize', function () {
//   document.body.style.height = window.innerHeight + 'px';
// });
let prev_h = window.innerHeight;
setInterval(function(){
  // if(document.body.style.height != window.innerHeight + 'px'){
    prev_h = window.innerHeight;

    document.body.style.height = window.innerHeight + 10 + 'px';
  // }
},500)

var isMobile;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {

    isMobile = true;

} else {
  isMobile = false;
}


// focus после паузы
function onFocusGame() {
  document.getElementById('unity-canvas').focus();
};

function startGame(elem) {
  elem.closest('.screen').classList.add('hidden');
  if(authorization === false ) {
    document.querySelector('.authorization').classList.remove('hidden');
  } else if(+life.textContent > 0) {
    UIAPI.RotateScreen.onPlayGame();
  } else {
    if(authorization === false) {
      document.querySelector('.game_none_lifes').classList.remove('hidden');
    } else if(authorization === true &&  +coin.textContent >= 1000) {
      document.querySelector('.game_none_lifes_coin').classList.remove('hidden');
    } else if(authorization === true &&  +coin.textContent < 1000) {
      document.querySelector('.game_none_lifes_non_coin').classList.remove('hidden');
    }
  }
}


function scipAuth(elem) {
    if(+life.textContent === 0 && +coin.textContent >= 1000) {
      elem.closest('.screen').classList.add('hidden');
      document.querySelector('.question_exchange').classList.remove('hidden');
    } else if (+life.textContent === 0 && +coin.textContent < 1000) {
      elem.closest('.screen').classList.add('hidden');
      document.querySelector('.game_none_lifes_non_coin').classList.remove('hidden');
      authorization = true;
    } else {
      UIAPI.RotateScreen.onPlayGame();
      next(elem,'.game_go');
      registration(false, true);
    }
}

function loadGame() {
  const loadItems = document.querySelectorAll('.load_bar__item');
  let index = 0;
  const interval = setInterval(() => {
    loadItems[index].classList.add('active_item');
    index++;
    if (index >= loadItems.length) {
      loadItems.forEach(load => { load.classList.remove('active_item') })
      loadGame();
      clearInterval(interval);
    }
  }, 200);
}
setInterval(loadGame(), 10000);

// за игру монеты
function updateWinCoins(num) {
  document.querySelectorAll('.win_coin').forEach(life => {
    life.innerHTML = num;
  })
}

//обнова жизней
function updateLifeApp(lifeItem) {
  document.querySelectorAll('.life').forEach(life => {
    life.innerHTML = lifeItem;
  })
}

//обнова монет
function updateCoinApp(coinItem) {
  document.querySelectorAll('.coin').forEach(coin => {
    coin.innerHTML = coinItem;
  })
}
//enter заново играть 
function keyEnter(event) {
  if (event.keyCode === 13) {
      document.querySelector('.btn_again_game').click();
  }
}

//копирование промо 
function copyPromo() {
  let promo = document.getElementById('promo_code').textContent;

  navigator.clipboard.writeText(promo)
    .then(() => {

    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
}

// склоенение "монет" 
const countWord = document.getElementById('count_word')
function wordCount(count) {
  let lastInt = count % 10
  if(lastInt == 1) {
    countWord.innerHTML = 'монета'
  } else if(lastInt > 1 && lastInt < 5) {
    countWord.innerHTML = 'монеты'
  } else {
    countWord.innerHTML = 'монет'
  }
}

function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
  }
}
let pageUrl;
// клик на скачивание 
function goClickedLink(e) {
  if(isIOS) {
    pageUrl = 'https://apps.apple.com/ru/app/mybox-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%B5%D0%B4%D1%8B-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D1%8B/id1167100370'
  } else {
    pageUrl = 'https://play.google.com/store/apps/details?id=ru.mybox.app&hl=ru&gl=US'
  }
  window.location.href = pageUrl;
}
//промо код добавление 
function getPromoCode(even) {
  document.querySelectorAll('.shop_card').forEach(card => card.classList.remove('choise'));
  document.getElementById('promo_code').innerHTML = even;
}


// активные карточки

const shopCards = document.querySelectorAll('.shop_card');
function getActiveCards(boolArray) {
  //console.log(boolArray)
  boolArray.forEach((value, index) => {
    shopCards[index].classList.remove('card_active');
    if (value) {
      if (index < shopCards.length) {
        shopCards[index].classList.add('card_active');
      } 
    }
  });
}
function getPriceCards(priceArray) {
  priceArray.forEach((value, index) => {
    if (value) {
      if (index < shopCards.length) {
        shopCards[index].querySelector('.price_card').innerHTML = priceArray[index];
      } 
    }
  });
}


let selectedCardIndex = null;

function buyCard() {
  switch (selectedCardIndex) {
    case 0:
      UIAPI.EndGame.onItem1();
      selectedCardIndex = null;
      break;
    case 1:
      UIAPI.EndGame.onItem2()
      selectedCardIndex = null;
      break;
    case 2:
      UIAPI.EndGame.onItem3()
      selectedCardIndex = null;
      break;
    case 3:
      UIAPI.EndGame.onItem4()
      selectedCardIndex = null;
      break;
    default:
      break;
  }

}

// выбор из активных карточек
shopCards.forEach((card, index )=> {
  card.addEventListener('click', () => {
    if (card.classList.contains('card_active')) {
      let coins = document.getElementById('coin_shop').textContent;
      card.classList.add("choise");
      selectedCardIndex = index;
      //активация кнопки обмена
      if (+coins >= 1000) {
        document.querySelector('.btn_trade').classList.add('trade_active');
        document.querySelector('.btn_trade').addEventListener("click", () => {
          if (authorization === false) {

            document.querySelector('.authorization').classList.remove("hidden");

            let autorizationScreen = document.querySelector('.authorization');
            autorizationScreen.querySelector('.header').style.display = 'none';

            let registrationScreen = autorizationScreen.nextElementSibling;

            registrationScreen.querySelector('.header').style.display = 'none';

          }
        })
      } else {
        document.querySelector('.btn_trade').classList.remove('trade_active');
      }
      shopCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove("choise");
        }
      });
    }

  })
})

function nextShop(close, open) {
  
  close.closest('.screen').classList.add('hidden');

  if (authorization === false) {

    document.querySelector('.authorization').classList.remove("hidden");

    let autorizationScreen = document.querySelector('.authorization');
    autorizationScreen.querySelector('.header').style.display = 'none';

    let registrationScreen = autorizationScreen.nextElementSibling;

    registrationScreen.querySelector('.header').style.display = 'none';

  } else {
    if(+coin.textContent < 1000) {
      document.querySelector('.game_none_lifes_non_coin').classList.remove('hidden');
    } else {
      document.querySelector(open).classList.remove('hidden');
    }
    
  }
}


// переключение
function next(close, open) {
  close.closest('.screen').classList.add('hidden');
  document.querySelector(open).classList.remove('hidden');

}
function next(close, open, bool) {
  close.closest('.screen').classList.add('hidden');
  document.querySelector(open).classList.remove('hidden');

  if (bool === true) {
    setTimeout(function () {
      document.querySelector(open).classList.add('hidden');
      document.querySelector(".question_exchange").classList.remove('hidden');

    }, 4000);
  }
}
function againGame(elem) {
  elem.closest('.screen').classList.add('hidden')
  
  if (document.querySelector('.life').textContent > 0) {
    UIAPI.RotateScreen.onPlayGame();
    document.querySelector('.game_go').classList.remove('hidden');
  } else {
    if(authorization === false) {
      document.querySelector('.game_none_lifes').classList.remove('hidden');
    } else if(authorization === true &&  +coin.textContent >= 1000) {
      document.querySelector('.game_none_lifes_coin').classList.remove('hidden');
    } else if(authorization === true &&  +coin.textContent <= 1000) {
      document.querySelector('.game_none_lifes_non_coin').classList.remove('hidden');
    }
  }

}

function closeBtn(elem) {
  elem.style.display = 'none';
}


function gamePaused(element) {
  element.style.opacity = "0";
  element.closest(".screen").classList.add("game_play_paused");
  document.querySelector('.game_paused').style.display = "block";
}

function gamePlayGo(element) {
  element.style.display = 'none';
  element.closest(".screen").classList.remove("game_play_paused");
  document.querySelector('.paused').style.opacity = '1';
}

// клик на крестик мыслей осткрывается экран с игрой (а если жизней нет, то открыватся окно "лимит жизней")





let input = document.getElementById('phone');
let btnNext = document.getElementById('btn_next');




// авторизация


function registration(e, a) {
  authorization = e;
  scipAuthorization = a;
}
//mask телефона
document.addEventListener("DOMContentLoaded", function () {
  var eventCalllback = function (e) {
    var el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7__________",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");
    
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }
  var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
});



// добавил onInputPhone
function checkPhoneNumber() {
  let phoneNumber = document.getElementById('phone').value;
  phoneNumber = phoneNumber.replace(/\s+/g, '');
  let button = document.getElementById('btn_next');
  let input = document.getElementById('phone');

  const keydownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      UIAPI.Auth.onInputPhone(phoneNumber.replace(/^\+7/, '')); //c app
      input.blur();
    }
  };
  const clickHandler = (event) => {
    UIAPI.Auth.onInputPhone(phoneNumber.replace(/^\+7/, '')); //c app
    button.classList.remove("active_btn");
    input.blur();
  };


  if (phoneNumber.length > 11) {
    button.classList.add("active_btn");
    input.addEventListener("keydown", keydownHandler);
    button.onclick = clickHandler;
    input.blur();
  } else {

    input.removeEventListener("keydown", keydownHandler);
    button.onclick = "";
    button.classList.remove("active_btn");
  }
}

let phoneNumberSave;

function nextRegistration() {
  document.querySelector('.screen.authorization').classList.add('hidden');
  document.querySelector('.screen.authorization.registration').classList.remove('hidden');
  startTimer();
  phoneNumberSave = document.getElementById('phone').value;
  document.getElementById('tel_spam').innerHTML = phoneNumberSave;

}
// повторная отправка кода
function againCode() {
  UIAPI.Auth.onInputPhone(phoneNumberSave.replace(/^\+7/, ''));
}

// добавил onInputcode
let inputs = document.querySelectorAll(".input");
let unlocked = false;
let pinSet = false;
let nums_pin = [];

for (let i = 0; i < inputs.length; i++) {
  setInputFilter(inputs[i], function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9);
  });
  inputs[i].addEventListener('input', function () {
    if (unlocked) { return }
    if (inputs[i].value.length > 0) {
      inputs[i].value = inputs[i].value.slice(0, 1);
      nums_pin[i] = inputs[i].value;
      if (i < inputs.length - 1) {
        inputs[i + 1].focus();
      } else if (i === inputs.length - 1) {

        document.querySelector('.btn_next.registration').classList.add('active_btn');

        inputs[i].blur();
        UIAPI.Auth.onInputCode(nums_pin.join(''));  //с апп
        inputs.forEach((input) => {
          input.value = '';
        });
        document.querySelector('.screen.authorization').classList.add('hidden');
      }
    }
  })
  inputs[i].addEventListener('keydown', function (e) {
    if (unlocked) { return }
    let key = e.which || e.keyCode || 0;
    if (key === 8) {
      this.value = '';
      if ((i - 1) < 0) { return }
      else {
        inputs[i - 1].focus();
      }
    }
  });
}
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}



var timerText = document.getElementById('timerText');
var timerValueElement = document.getElementById('timerValue');
var resendLink = document.getElementById('resendLink');
var resendButton = document.getElementById('resendButton');

var timer;

function startTimer() {
  timerValue = 120;

  timerText.style.display = 'block';
  resendLink.style.display = 'none';

  timer = setInterval(function () {
    timerValue--;
    timerValueElement.textContent = timerValue;

    if (timerValue === 0) {
      clearInterval(timer);
      timerText.style.display = 'none';
      resendLink.style.display = 'block';
    }
  }, 1000);
}
resendButton.addEventListener('click', function (event) {
  event.preventDefault();
  startTimer();
});

