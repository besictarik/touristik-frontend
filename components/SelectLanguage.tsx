"use client";

const SelectLanguage = ({
  lang,
  className,
}: {
  lang: string;
  className?: string;
}) => {
  // Make it functional
  const changeLocale = () => {};

  return (
    <select
      name="language"
      className={`bg-light-3 ${className}`}
      defaultValue={lang}
      onChange={changeLocale}
    >
      <option value="en">🇬🇧 English</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="hr">🇭🇷 Hrvatski</option>
    </select>
  );
};

export default SelectLanguage;
