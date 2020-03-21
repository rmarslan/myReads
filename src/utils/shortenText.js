function shortenText(text, limit) {
    if(text.length <= limit)
        return text;
    let string = '';
    const words = text.split(' ');

    for(let i = 0; i < words.length; i++) {
        if(string.length + words[i].length < limit)
            string = string.concat(words[i] + " ");
        else
            break;
    }

    return string + "...";
}

export default shortenText;