export const createLink : (str: string) => string = (str: string) => {
    return str.split(' ').join('_');
}
export default createLink;
