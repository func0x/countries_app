import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getLanguageFromBrowser } from "../utils/helpers";

enum LanguageEnum {
    english = "en",
    germany = "de",
    spanish = "es",
    french = "fr",
    polish = "pl"
  }

interface IFormInput {
    language: LanguageEnum;
  }

function LanguageForm({ onSelectLanguage } : { onSelectLanguage: any }): JSX.Element {
    const { register, handleSubmit } = useForm<IFormInput>();
    const initialLanguage = () => window.localStorage.getItem('calendar-language') || getLanguageFromBrowser();
    const [language, setLanguage] = useState<string>(initialLanguage);
    const onSubmit: SubmitHandler<IFormInput> = data => {
        setLanguage(data.language)
        return onSelectLanguage(data.language)
    };

    useEffect(() => {
        window.localStorage.setItem('calendar-language', language)
    })

    return (
         <form onSubmit={handleSubmit(onSubmit)}>
            <label>Language Selection</label> 
            <select {...register("language")} defaultValue={language}>
                <option value="en">english</option>
                <option value="de">germany </option>
                <option value="es">spanish</option>
                <option value="fr">french</option>
                <option value="pl">polish</option>
                <option value="xx">xx</option>
            </select>
            <input type="submit" />
        </form>
    );
}

export default LanguageForm;