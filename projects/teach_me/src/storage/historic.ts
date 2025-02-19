export function getHistoric(): string[] {
    const historic = localStorage.getItem('historics');

    if(historic) {
        return JSON.parse(historic)
    }

    return [];
}

export function setHistoric(item: string) {
    const historic = localStorage.getItem('historics');
    let parse: string[] = historic ? JSON.parse(historic) : [];

    parse.unshift(item);
    parse = parse.slice(0, 5);
    localStorage.setItem('historics', JSON.stringify(parse));
}