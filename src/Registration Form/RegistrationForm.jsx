import { useEffect, useState, useCallback } from "react";
import { Eye, EyeClosed } from "lucide-react";
import "./registrationForm.css";

export default function RegistrationForm() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const validatePass = (pass) => {
        const requirements = {
            length: pass.length >= 8,
            hasUpper: /[A-Z]/.test(pass),
            hasNumber: /[0-9]/.test(pass),
            hasSpecial: /[!@#$%^&*]/.test(pass),
        };
        return requirements;
    }
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (!showPassword) return;
        let timer;
        const resetTimer = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => setShowPassword(false), 20000);
        }
        resetTimer();
        const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
        events.forEach(event => window.addEventListener(event, resetTimer));
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) setShowPassword(false);
        });

        return () => {
            if (timer) clearTimeout(timer);
            events.forEach(event => window.removeEventListener(event, resetTimer));
            document.removeEventListener("visibilitychange", () => {
                if (document.hidden) setShowPassword(false);
            });
        }
    }, [showPassword]);

    return (
        <section id="regMain">
            <h1>Registration</h1>
            <div id="EmailField">
                <label htmlFor="emailEnter">email</label>
                <input autoComplete="email" type="email" id="emailEnter" placeholder="example@gmail.com" />
            </div>
            <div id="PassField">
                <label htmlFor="passwordEnter">password</label>
                <div className="inputWrapper">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" type={!showPassword ? "password" : "text"} id="passwordEnter" placeholder="********" />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} id="passToggle">{showPassword ? <EyeClosed /> : <Eye />}</button>
                </div>
            </div>
        </section>
    );
}