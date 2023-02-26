const defaultDomainNames = ['com', 'de', 'net', 'uk', 'cn', 'org', 'info', 'nl', 'eu', 'ru'];

export default function posSize(message, domains = defaultDomainNames) {
    message = message.toLowerCase();
    message = clearLink(message, domains);

    return message.length;
}

function clearLink(message, domains) {
    const howBeginLink = ['http://', 'https://', 'www.'];
    const specialChars = '!@#$%^&*()+=-[]\\\';,./{}|\":<>? ';

    let startLink = -1;
    let indexDomain = -1;
    let i = 0;
    let tempIndex = 0;

    while (i != howBeginLink.length - 1) {
        startLink = message.indexOf(howBeginLink[i], tempIndex);

        if (startLink > -1) { 
            let endLink = message.indexOf(' ', startLink) > -1 
                ? message.indexOf(' ', startLink) 
                : message.length;
    
            let tempLink = message.slice(startLink, endLink);
            const indexDot = tempLink.indexOf('.');
    
            if (indexDot > -1 
                && indexDot != tempLink.length
                && specialChars.indexOf(tempLink[indexDot - 1]) == -1
                && specialChars.indexOf(tempLink[indexDot + 1]) == -1) {
                message = message.replace(tempLink, '');
            } else {
                tempIndex = endLink;
            }
        } else {
            tempIndex = 0;
            i++;
        }
    }

    i = 0;
    tempIndex = 0;
    while (i != domains.length - 1) {
        indexDomain = message.indexOf(`.${domains[i]}`, tempIndex); 
        if (indexDomain > -1) {
            let startLink = message.lastIndexOf(' ', indexDomain) > -1 
                ? message.lastIndexOf(' ', indexDomain) + 1 
                : 0;

            let endLink = message.indexOf(' ', indexDomain) > -1 
                ? message.indexOf(' ', indexDomain) 
                : message.length;

            let tempLink = message.slice(startLink, endLink);

            if (indexDomain != 0
                && specialChars.indexOf(message[indexDomain - 1]) == -1) {
                tempIndex = endLink;
                message = message.replace(tempLink, '');
            } else {
                tempIndex = endLink;
            }
        } else {
            tempIndex = 0;
            i++;
        }
    }

    return message;
}

posSize('Привет! https://github.com');