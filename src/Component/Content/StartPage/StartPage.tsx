import style from "./StartPage.module.css";
import telegramLogo from "../../../Assets/img/telegram.svg.webp"
import gitHubLogo from "../../../Assets/img/gitHub.png"

export const StartPage = () => {
    return (
        <div className={style.startPage}>

            <div className={style.topPage}>
                <h1>Ласкаво просимо на головну сторінку нашого холдингу підприємств!</h1>
                <p>
                    Ми - великий холдинг, який об'єднує кілька успішних підприємств у різних сферах діяльності.
                    Наш холдинг зосереджений на розвитку і веденні успішного бізнесу, забезпечуючи високий рівень професійних послуг і продуктів.
                </p>
                <p>
                    На нашому веб-сайті ви знайдете інформацію про кожне з наших підприємств, ознайомитеся з їхніми послугами та продуктами.
                    Ми пропонуємо широкий спектр рішень в таких галузях, як технології, фінанси, медицина, нерухомість та багато іншого.
                </p>
                <p>
                    Наш холдинг пишається своїми досягненнями, і ми завжди прагнемо до інновацій та постійного розвитку.
                    Ми маємо сильну команду професіоналів, які працюють над створенням інноваційних рішень та наданням високоякісного обслуговування нашим клієнтам.
                </p>
                <p>
                    Запрошуємо вас дізнатися більше про наш холдинг, його цінності та вигоди, які ми пропонуємо нашим партнерам та клієнтам.
                    Приєднуйтесь до нашої успішної команди і ростіть разом з нами!
                </p>
            </div>

            <div className={style.underPage}>

                <div className={style.nameText}>
                    Написав цей сайт Хвещук Сергій
                </div>

                <div className={style.nameText}>
                    Контакти:
                </div>

                <ul className={style.footerLinks}>
                    <li>
                        <a href="https://github.com/SerhiiKhv"
                           target="_blank" rel="noopener noreferrer">
                            <img
                            src={gitHubLogo}
                            alt={'GitHub'}
                            />
                        </a>
                    </li>
                    <li>
                        <a href="https://xn--80affa3aj0al.xn--80asehdb/#@Alamay8"
                           target="_blank" rel="noopener noreferrer">
                            <img
                                src={telegramLogo}
                                alt={"Telegram"}
                            />
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
};