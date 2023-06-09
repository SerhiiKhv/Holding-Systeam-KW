import style from "./StartPage.module.css";
import telegramLogo from "../../../Assets/img/telegram.svg.webp"
import instagramLogo from "../../../Assets/img/Instagram.webp"
import gitHubLogo from "../../../Assets/img/gitHub.png"
import phoneImg from "../../../Assets/img/phone.svg"
import emailImg from "../../../Assets/img/email.svg"
import LinkedInLogo from "../../../Assets/img/LinkedIn_icon_circle.svg.png"
import holdingImg from "../../../Assets/img/stock-illustration-isometric-concept-for-big-business.jpg"

export const StartPage = () => {
    return (
        <div className={style.startPage}>

            <div className={style.topPage}>
                <h1>Ласкаво просимо на головну сторінку нашого холдингу підприємств!</h1>
                <p>
                    Ми - великий холдинг, який об'єднує кілька успішних підприємств у різних сферах діяльності.
                    Наш холдинг зосереджений на розвитку і веденні успішного бізнесу, забезпечуючи високий рівень
                    професійних послуг і продуктів.
                </p>
                <p>
                    На нашому веб-сайті ви знайдете інформацію про кожне з наших підприємств, ознайомитеся з їхніми
                    послугами та продуктами.
                    Ми пропонуємо широкий спектр рішень в таких галузях, як технології, фінанси, медицина, нерухомість
                    та багато іншого.
                </p>
                <p>
                    Наш холдинг пишається своїми досягненнями, і ми завжди прагнемо до інновацій та постійного розвитку.
                    Ми маємо сильну команду професіоналів, які працюють над створенням інноваційних рішень та наданням
                    високоякісного обслуговування нашим клієнтам.
                </p>
                <p>
                    Запрошуємо вас дізнатися більше про наш холдинг, його цінності та вигоди, які ми пропонуємо нашим
                    партнерам та клієнтам.
                    Приєднуйтесь до нашої успішної команди і ростіть разом з нами!
                </p>
            </div>

            <div className={style.imgHolding}>
                <img src={holdingImg} alt={'img'}/>
            </div>

            <div className={style.underPage}>

                <div className={style.nameText}>
                    <p>Написав цей сайт Хвещук Сергій</p>
                </div>

                <div className={style.nameText}>
                    <p>Соцмережі:</p>
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
                    <li>
                        <a href="https://www.instagram.com/alamay_._/"
                           target="_blank" rel="noopener noreferrer">
                            <img
                                src={instagramLogo}
                                alt={"Instagram"}
                            />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/serhii-khveshchuk-7b38b5251/"
                           target="_blank" rel="noopener noreferrer">
                            <img
                                src={LinkedInLogo}
                                alt={"LinkedIn"}
                            />
                        </a>
                    </li>
                </ul>

                <div className={style.nameText}>
                    <p>Контакти:</p>
                </div>

                <div className={style.contact}>
                    <div>
                        <div className={style.contactItem}>
                            <img src={phoneImg} alt="phone"/>
                            <a href="tel:+380684300807">+38 (068) 43 008 07</a>
                        </div>
                        <div className={style.contactItem}>
                            <img src={emailImg} alt="email"/>
                            <a href="mailto:khvechuksergiyko@gmail.com">
                                khvechuksergiyko@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};