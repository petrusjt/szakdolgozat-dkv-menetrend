import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


export function CustomError() {
    const [t, ] = useTranslation()
    return (
        <div className="card">
            <div>{t("router.error").toString()}</div>
            <Link to="/" className="underline text-blue-700">{t("backToIndex").toString()}</Link>
        </div>
    )
}