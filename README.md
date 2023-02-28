# lost-2d-platformer
---
## 2D Game Lost
В разработке принимали участие:
* [Елена](https://github.com/webkwondo)
* [Данил](https://github.com/kostili-tec)
* [Саша](https://github.com/Lex-pineapple)

**Внимание!** Поскольку данное приложение - игра, а она требовательна к ресурсам, а также из-за недостаточной скорости бесплатного хостинга, огромная просьба при проверке игры, при логине и регистрации и при переключении между страницами - дать время ресурсам загрузиться.

---

## Функционал приложения

**Максимальный балл за задание** - *620*.

### Frontend

* Приложение представляет собой SPA - реализован роутинг (без перезагрузки страницы приложения), +15

#### Приложение имеет 5 страниц

1. Основная страница с игрой (максимальный балл - 20):
    * Имеется основное окно с игрой и короткий текст-описание игры, +10
    * Игру можно переключить в полноэкранный режим нажатием кнопки в углу окошка игры, +10
2. Страница Рекордов, High Score (максимальный балл - 10):
    * Отображается таблица рекордов игры с именем игрока и его общим скором, +10
3. Страница Об авторах, About (максимальный балл - 5):
    * Имеются аватарки участников проекта с коротким описанием вклада в проект, +5
4. Страница 404 (максимальный балл - 5):
    * Отображается при попытке перехода на несуществующую страницу, +5
5. Страница логина/регистрации (максимальный балл - 10):
    * Отображается при посещении приложения без учетных данных, +10

#### Реализованы логин и регистрация

1. Реализован функционал логина и регистрации, страница логина/регистрации, переключение между формами логина и регистрации, +10

2. Реализован функционал создания уникальных пользователей, +5

3. Формы и валидация, +15
    * Форма регистрации с полями для ввода имени игрока, электронной почты и пароля (обязательные поля)
    * Форма логина с полями для ввода электронной почты и пароля (обязательные поля)
    * Проверка на корректность ввода электронной почты
    * Проверка на корректность ввода пароля
    * Проверка длины пароля
    * Если пользователь уже существует, выдается ошибка
    * Если пользователь не зарегистрирован, выдается ошибка
    * При отправке формы проверяется корректность заполнения всех полей. В случае успешной регистрации, пользователю предлагается залогиниться. В случае успешного логина, выписывается токен, авторизация сохраняется.

4. Есть возможность разлогиниться, +5

#### Frontend, oбщие требования

1. Светлая/темная тема с переключением, +2

2. В шапке отображается имя пользователя, +5

3. Данные игрока хранятся в базе данных и постоянно синхронизируются, +10

4. Реализованы регистрация, авторизация, аутентификация пользователя, сохранение JWT-токена в LocalStorage для удобной аутентификации/верификации пользователя, +5

#### Игра

1. Действие игры происходит на трёх разных уровнях, имеются состояния победы и поражения (максимальный балл - 55):
    * Имеются три уровня угры с различным дизайном карт, +15
    * При переходе между уровнями реализовано затемнение экрана, +5
    * При отображении нового уровня в верху экрана игры появляется текст с названием локации, +5
    * После прохождения игры реализовано состояние победы - появляется экран победы и демострируется общий скор игры с предложением перейти на главное меню, +15
    * При потере всех жизей появляется экран поражения с предложением выйти в главное меню/начать игру с начала, +15

2. Настройки игры (максимальный балл - 15):
    * Имеется слайдер уровня общей громкости, +5
    * Имеется слайдер уровня громкости музыки, +5
    * Имеется слайдер уровня громкости эффектов, +5

3. Противники и пикап-объекты (максимальный балл - 45):
    * Имеются враги  - у врагов имеется анимация, враги движутся относительно заданного пути, +15
    * При соприкосновении с врагом у игрока уменбшается количество жизней, и игрока отбрасывает в сторону (если игрок находится не на стене), +10
    * Имеются ямы (3-й уровень) при падении в которые у игрока уменьшается количество жизней и положение игрока восстанавливается в начале уровня, +10
    * Имеются пикап-объекты разного вида (растения/банки) - в зависимости от вида объекта скор увеличивается по-разному, +10

4. Обучение игрока (максимальный балл - 20):
    * Имеется последовательное введение игрока в игру при поможи обучающих табличек, +10
    * При прохождении мимо обучающей таблички на экране появляется текст объясняющий основные принципы игры и особенности управления, +10

5. Управление игрой с клавиатуры (максимальный балл - 10):
    * Для управления игрой используются 6 клавиш (A, S, D, R, F & Space), +10

6. Игровой мир (максимальный балл - 40):
    * На каждом уровне имеются неигровые персонажи, с которыми можно взаимодействовать, +10
    * При инициировании диалога появляется модальное окно, в котором последовательно появляется текст диалога; имеется несколько фраз, сменяющих друг друга в модальном окне, +10
    * Реализованы:
        * сюжетный диалог - несколько фраз идут последовательно, после окончания основного диалога модальное окно закрывается, +10
        * несюжетный диалог - после окончания сюжетного диалога при взаимодействии с неигровым персонажем модальное окно отображается только для одной фразы; несюжетный диалог повторяется бесконечно, +10

7. Стилизация игры (максимальный балл - 10):
    * Игра выполнена в едином стиле pixel-art, имеется определенный дизайн, уникальные персонажы и заставки, +10

8. Технические особенности (максимальный балл - 45):
    * Игра адаптивна - работает при разных разрешениях экрана, +15
    * Для сборки использовался Webpack, +10
    * Для отображения игры используется WebGL, +5
    * Игра написана на TypeScript, +15

9. Сохранение игры (максимальный балл - 25):
    * Для сохранения игры используется localStorage, +10
    * При нажатии кнопки "save" сохраняется текузий уровень игрока, при нажатии в главном меню "load game" игра загружается с сохраненного уровня, +15

10. Меню и неигровые компоненты (максимальный балл - 60):
    * В самой игре имеется HUD (heads-up display) в котором отображено общее количество очков и количество оставшихся жизней игрока, +15
    * Имеется экран загрузки компонентов игры, на котором есть полоса прогресса и процент загрузки игры, +15
    * Имеется главное меню игры, появляющееся при первой загрузке игры, в меню имеются 3 пункта: "start game" - запускается новая игра, "load game" - если имеется созраненная игра она загружается, "options" - переход к настройкам игры, +15
    * При нажатии на кнопку TAB открывается меню паузы, в меню имеется 4 пункта: "resume" - меню закрывается, игра возобновляется, "save" - игра сохраняется, "options" - открывается меню с настройками игры, "quit" - возвращение в главное меню игры, +15

11. "Физика" и особенности игры (максимальный балл - 80):
    * Игрок может перемещаться взад-перед, прыгать вверх, при соприкосновении с большими стенами "прилипать" к ним, съезжать со стен, +10
    * Отктытие двери на следующий уровень только при помощи ключа - если не подоюрать ключ дверь не открывается, +15
    * Имеются разрушаемые блоки (уровень 2) - при взаимодействии игрока с ними (подойти вплотную и нажать R) проигрывается анимация и блок уничтожаетмя, освобождая проход, +15
    * Возможность разрушать блоки появляется только после подбирания определенного пикап-объекта (синяя банка ранее на этом же уровне), +10
    * В игре имеются двигающиеся платформы 2-х видов, движутся в соответствии с заданными путями; у каждой платформы - свой собствунный путь, +15
    * Имеются двигающиеся платформы, активирующие движение при взаимодействии с ними (конец 1-го уровня), +10
    * Состоянеи побуды имеет несколько этапов: при подбирании финального пикап-объекта он исчезает, появляется неигровой персоонаж, который инициализирует финальный диалог, после чено присходит затемнение экрана и переход к состоянию победы, +5

12. Саунд-дизайн (максимальный балл - 40):
    * У каждого уровня имеется своя музыка, +10
    * В зависимости от вида пикап-объекта пригрываются различные звуковые эффекты, +10
    * При получении урона врага проигрывается эффект урона, +5
    * При взаимодействии с дверью проигрывается звук открываюзейся двери, +5
    * При диалоге, последовательное отображение линий диалога сопровоюдается звуковыми эффектами, +5
    * При нажатии на кнопку в меню проигрывается эффект кнопки, +5

Footer (не оценивается)

В футере приложения есть ссылка на гитхаб авторов, год создания приложения, логотип курса со ссылкой на курс

### Backend

1. Написан своими руками с нуля и имеет историю коммитов

2. Использован JS стек TS/NodeJS/NestJS (Express)

3. Backend-приложение задеплоено и отвечает на запросы POSTman (примеры запросов в документации https://lost-2d-platformer-server.onrender.com/api/docs)
    * Backend-приложение построено на MVC архитектуре (models, controllers, services, routes), +10
    * Backend-приложение и все его маршруты полностью задокументированы в Swagger API docs https://lost-2d-platformer-server.onrender.com/api/docs +10
    * Реализован REST API, +5
    * Настроена и подключена БД PostgreSQL (для деплоя подключена удаленная БД, при разработке подключается локальная БД, в настройках приложения можно выставить локальную или удаленную БД). Смоделированы объекты базы данных и контроллеры для работы с ними, определены маршруты, +15
    * Пароли игроков хранятся в БД в зашифрованном виде, +5
    * Используется ORM (Sequelize), +15
    * Реализована регистрация, аутентификация, авторизация с генерацией и верификацией JWT-токена на основе секретного ключа и стратегии Passportjs, +15
    * Реализованы публичные и приватные маршруты для разграничения доступа без аутентификации и с ней. Для примера от свободного доступа закрыт один маршрут (чтобы у проверяющих была возможность свободно проверить остальные маршруты). Закрытый для неавторизованных пользователей маршрут: GET /players, доступ к которому можно получить только передав в Headers, Authorization, Bearer JWT-token, +10
    * Реализованы маршруты для работы с игроками (получение всех игроков, одного игрока, создание, изменение, удаление игрока). Маршруты для авторизации (регистрация, логин, верификация). Маршруты для работы с рекордами (создание, чтение, изменение), +10
    * Настроена CORS политика. CORS политика не препятствует доступу к ресурсам из разрешенных источников, +2
    * Frontend-приложение отображает статистику (таблицу) рекордов игры, данные для этого приложение получает от бэкенда, +10
    * Backend-приложение отдает корректные ответы, отдает HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи, +10
