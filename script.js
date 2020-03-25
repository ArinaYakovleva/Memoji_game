

function clickOn() {
    // Создаем массив для карточек с эмодзи
    var emojis = ['🐱', '🐱', '🐰 ', '🐰', '🐹', '🐹', '🐸', '🐸' , '🐼', '🐼', '🐷', '🐷'];
    //Массив, куда будут попадать уже открытые карточки
    var currentEmogi = [];

    // Получаем элементы из DOM
    var cards = document.querySelector('section');
    var backCard = Array.from(cards.querySelectorAll('.backCard'));
    //Получаем таймер
    var timer = document.querySelector('.timer');
    var time;
    var isStarted = false;

    //Счетчик карточек
    var counter = 0;
    

    // Получение рандомного индекса для массива эмодзи
    function randomIndex(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
        }

    // Перемешиваем карточки
    backCard.forEach(function (item) {
        var index = randomIndex(0, emojis.length);
        item.innerText = emojis[index];
        emojis.splice(index, 1);
    });

    
    // Функции

    //Ф-я открытия карты
    function openCard(card){
        if (card.classList.contains('close'))
            card.classList.remove('close');
            card.classList.add('open');
            currentEmogi.push(card);
    }
    //Функция закрытия карты
    function closeCard(card){
        if (card.classList.contains('open'))
        card.classList.remove('open');
        card.classList.add('close');
        
    }
    // Ф-я добавления верного или нет класса

    function checkCorrect (name){
        for (var j = 1; j < 3; j++){
            currentEmogi[currentEmogi.length - j].querySelector('.backCard').classList.add(name);
        }
    }

    // Навешиваем обработчик событий и создаем функцию-обработчик
    cards.addEventListener('click', (event) => {

        if(!isStarted){
            isStarted = true;
            time = setInterval(timerOn, 1000);
        }
        if (event.target.parentElement.tagName === 'DIV') {
            var div = event.target.parentElement;
            // Если карта открыта, проверяем доступность нажать на нее
            if (div.classList.contains('open')){

                if (!div.querySelector('.backCard').classList.contains('right')
                && !div.querySelector('.backCard').classList.contains('wrong'))
                {
                    //  Удаляем из открытых
                    currentEmogi.splice(currentEmogi.length - 1, 1);
                    div.classList.remove('open');
                    div.classList.add('close');
                }
            }
            // При условии если закрыта
            else {
                // Если кол-во открытых четное 
                if ((currentEmogi.length > 0) && (currentEmogi.length % 2 === 0)) {

                    //Проверка одинаковые ли карты
                    if (currentEmogi[currentEmogi.length - 1].querySelector('.backCard').classList.contains('right')
                    && currentEmogi[currentEmogi.length - 2].querySelector('.backCard').classList.contains('right'))
                    {
                        
                        openCard(div);

                    }
                    
                    else {
                        // Закрываем, если разные
                        for (var i = 1; i < 3; i++) {
                            currentEmogi[currentEmogi.length - i].querySelector('.backCard').classList.remove('wrong');
                            currentEmogi[currentEmogi.length - i].classList.remove('open');
                            currentEmogi[currentEmogi.length - i].classList.add('close');
                        }
                        //  Удаляем неверные карты из массива открытых, чтобы можно было с ними взаимодействовать 
                        currentEmogi.splice(currentEmogi.length - 2, 2);
                        
                        openCard(div);
                    }
                }
                // Если длина не четна
                else if (currentEmogi.length % 2 !== 0){
                    // Открываем  еще одну карту
                    openCard(div);
                    // Если одинаковые
                    if (currentEmogi[currentEmogi.length - 1].querySelector('.backCard').innerText
                        === currentEmogi[currentEmogi.length - 2].querySelector('.backCard').innerText){
                        // Верный класс
                        checkCorrect('right');
                        counter += 2;
                        if (counter == 12) {
                            modalWindow('Win');
                        }
                        
                    }

                    else{
                        // В случае неверного класса
                        checkCorrect('wrong');
                        
                    }
                }
                else
                    openCard(div);
            }
        }
    });

    //Функция таймера
    function timerOn(){
       var timeOn = timer.innerHTML;
       var arr = timeOn.split(':')
       var min = arr[0];
       var sec = arr[1];
       if(sec > 0){
            sec--;
		    sec = (sec > 9) ? sec : ('0' + sec);
       }
       else{
           if(min > 0){
                min--;
                sec = 59;
            }
            else{
                modalWindow('Lose');
            }
       }

       timer.innerHTML = min + ':' + sec;

    }
    //Функция появления модального окна пр выигрыше или проигрыше
    function modalWindow(res) {
        //Обнуляем таймер
        clearInterval(time);

        //Создаем элементы в html документе
        var modal = document.createElement('div');
        modal.classList.add('modal');

        var inModal = document.createElement('div');
        inModal.classList.add('in_modal');

        var result = document.createElement('p');
        result.classList.add('result');

        var result1 = document.createElement('span');
        result1.classList.add('results');
        result1.innerHTML = res[0];

        var result2 = document.createElement('span');
        result2.classList.add('results');
        result2.innerHTML = res[1];

        var result3 = document.createElement('span');
        result3.classList.add('results');
        result3.innerHTML = res[2];

        var result4 = document.createElement('span');
        result4.classList.add('results');

        result4.innerHTML = res[3] ? res[3] : ' ';
        result.appendChild(result1);
        result.appendChild(result2);
        result.appendChild(result3);
        result.appendChild(result4);
        var buttonAgain = document.createElement('button');
        buttonAgain.classList.add('again');
        buttonAgain.innerHTML = (res == 'win') ? 'Play again' : 'Try again';

        modal.appendChild(inModal);
        inModal.appendChild(result);
        inModal.appendChild(buttonAgain);
        document.body.appendChild(modal);

        //Обраоботчик при клике на кнопку
        buttonAgain.addEventListener('click', function() {
            var card = document.querySelectorAll('.card');
            emojis = ['🐱', '🐱', '🐰 ', '🐰', '🐹','🐸', '🐹', '🐸' , '🐼', '🐼', '🐷', '🐷'];

            //Закрываем все карточки
            for (let i = 0; i < 12; i++){
                closeCard(card[i]);
            }
            backCard.forEach(function (item) {
                var index = randomIndex(0, emojis.length);
                item.innerText = emojis[index];
                emojis.splice(index, 1);
            });

            modal.remove();
            isStarted = false;
            counter = 0; 
            timer.innerHTML = "1:00";
        });
    }
    
}