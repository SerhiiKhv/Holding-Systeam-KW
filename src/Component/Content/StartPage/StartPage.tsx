import style from "./StartPage.module.css";
import telegramLogo from "../../../Assets/img/telegram.svg.webp"
import gitHubLogo from "../../../Assets/img/gitHub.png"

export const StartPage = () => {
    return (
        <div className={style.startPage}>
            <div className={style.topPage}>StartPage</div>
            <div className={style.underPage}>
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