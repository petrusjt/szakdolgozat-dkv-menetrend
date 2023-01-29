import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {toggleTheme} from "src/util/theme-helper";
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip} from "@mui/material";
import {Brightness6Outlined} from "@mui/icons-material";
import {getPreferredLanguage, setPreferredLanguage} from "src/util/language-helper";
import {useState} from "react";

export function Header() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation()
    const [lang, setLang] = useState(getPreferredLanguage())

    const handleLangChange = (event: SelectChangeEvent) => {
        setLang(event.target.value)
        setPreferredLanguage(event.target.value)
    }

    return (
        <div className="flex w-full dark:bg-slate-900 bg-gray-300 h-16">
            <div className="header-button">
                <Link to="/" className="w-full h-full flex justify-center items-center">{t("backToIndex").toString()}</Link>
            </div>
            <div className="header-button"
                 onClick={(e) => toggleTheme()}>
                <Tooltip title={t("theme.toggle").toString()}>
                    <IconButton>
                        <Brightness6Outlined className="mui-color-override" />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="header-button !border-r-0">
                <FormControl size="small">
                    <InputLabel id="langSelect-label" className="mui-color-override">
                        {t("langSelect.language").toString()}
                    </InputLabel>
                    <Select id="langSelect"
                            label={t("langSelect.language").toString()}
                            labelId="langSelect-label"
                            value={lang}
                            onChange={handleLangChange}
                            sx={{
                                color: 'black',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#999'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#999'
                                }
                            }}
                            className="mui-color-override dark:!border-white">
                        <MenuItem value="hu">{t("langSelect.hungarian").toString()}</MenuItem>
                        <MenuItem value="en">{t("langSelect.english").toString()}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}