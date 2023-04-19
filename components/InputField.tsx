import { useState } from "react";

export default function InputField({ label, type, icon }: any) {
  const [hasText, setHasText] = useState(false);
  const [inputFocuses, setInputFocuses] = useState(false);

  function handleType(event: any) {
    const inputValue = event.target.value;
    setHasText(inputValue.length > 0);
  }

  const handleFocusEmail = (isFocused: "t" | "f") => {
    setInputFocuses(isFocused === "t" ? true : false);
  };

  return (
    <div className="input-container">
      <img src={icon} alt="" />
      {(hasText ) ? null : <label className={inputFocuses ? 'email-focus' : ''} htmlFor={type}>{label}</label>}
      <input
        onFocus={() => handleFocusEmail("t")}
        onBlur={() => handleFocusEmail("f")}
        type={type}
        name={type}
        onChange={handleType}
      />
    </div>
  );
}
