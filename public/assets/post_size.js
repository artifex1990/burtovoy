const defaultDomainNames = ['.com', '.de', '.net', '.uk', '.cn', '.org', '.info', '.nl', '.eu', '.ru'];

export default function posSize(message, domains = defaultDomainNames) {
    const beginLinks = ['http://', 'https://', 'www.'];

    return clearLink(message.toLowerCase(), [...beginLinks, ...domains]).length;
}

function clearLink(message, templatesForSearch) {
    const specialChars = '!@#$%^&*()+=-[]\\\';,./{}|\":<>? ';
    let indexTemplate = 0,
        testLink = '',
        tempIndex = 0;

    while(indexTemplate != templatesForSearch.length) {
        let indexBeginLink = message.indexOf(templatesForSearch[indexTemplate], tempIndex);

        if (indexBeginLink > -1) {
            let indexEndingLink = message.indexOf(' ', indexBeginLink) > -1 
                    ? message.indexOf(' ', indexBeginLink) 
                    : message.length;  

            if (templatesForSearch[indexTemplate][0] == '.') {
                indexBeginLink = message.lastIndexOf(' ', indexBeginLink) > -1 
                    ? message.lastIndexOf(' ', indexBeginLink) + 1 
                    : 0;
            }

            let indexDot = (testLink = message.slice(indexBeginLink, indexEndingLink)).indexOf('.');

            if (indexDot > -1 
                && indexDot != 0
                && indexDot != testLink.length
                && specialChars.indexOf(testLink[indexDot - 1]) == -1
                && specialChars.indexOf(testLink[indexDot + 1]) == -1) {
                    tempIndex = indexEndingLink;
                    message = message.replace(testLink, '');
                } else {
                    tempIndex = indexEndingLink;
                }
        } else {
            indexTemplate++;
            tempIndex = 0;
        }
    }

    return message;
}