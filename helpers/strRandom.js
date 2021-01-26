module.exports = {
    /**
     * Return Str Random
     * @param {number} lenght - Number of random characters requested
     */
    generate: (lenght) => {
        let result = '';
        let reg = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < lenght; i++) {
            result += reg.charAt(Math.floor(Math.random() * reg.length));
        };
        return result;
    }
}