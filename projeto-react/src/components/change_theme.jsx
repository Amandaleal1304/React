const ChangeTheme = ({ theme, setTheme }) => {
    const manipulaRadioTheme = (e) => {
        setTheme(e.target.value);
    };

    return (
        <form>
            {/* Duas possíveis formas de mostrar o radio */}
            {/* <label htmlFor="dark">Theme: </label> */}
            <label>Theme:  </label>
            <input type="radio" name="theme" id="dark" value="dark"
                onChange={manipulaRadioTheme}
                checked={theme == 'dark' ? true : false} />
            <label htmlFor="dark"> Dark </label>
            <label><input type="radio" name="theme" value="light"
                onChange={manipulaRadioTheme}
                checked={theme == 'light' ? true : false} />Light
                </label>
        </form>
    );
};

export default ChangeTheme;


