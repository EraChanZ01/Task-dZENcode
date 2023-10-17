
module.exports.replaceBBCode = async (req, res, next) => {
    try {
        const { textWithOutTags } = req.body
        const tagReplacements = {
            "\\[b\\](.*?)\\[\\/b\\]": "<b>$1</b>",
            "\\[code\\](.*?)\\[\\/code\\]": "<code>$1</code>",
            "\\[i\\](.*?)\\[\\/i\\]": "<i>$1</i>",
            "\\[a\\](.*?)\\[\\/a\\]": "<a>$1</a>",
            "\\[a\\s+href=([^\\]]+?)\\s+title=([^\\]]+?)\\](.+?)\\[\\/a\\]": '<a href="$1" title="$2">$3</a>',
            "\\[a\\s+href=([^\\]]+?)\\](.+?)\\[\\/a\\]": '<a href="$1">$2</a>'
        };
        let validText = textWithOutTags.slice()
        for (const tag in tagReplacements) {
            const regex = new RegExp(tag, 'g');
            validText = validText.replace(regex, tagReplacements[tag]);
        }
        req.body.validText = validText
        next()
    } catch (err) {
        res.status(500).send('Failed Fetch')
    }
}

module.exports.checkSequence = async (req, res, next) => {

    const { text } = req.body

    try {
        const options = {
            'a': '/a',
            'b': '/b',
            'i': '/i',
            'code': '/code'
        }

        let textWithOutTags = text.replace(/<[^>]*>/g, '');

        const closeTag = Object.values(options)
        const tagRegex = /\[([^\]]+)\]/g
        const stack = [];
        let match;

        while ((match = tagRegex.exec(textWithOutTags)) !== null) {
            const arrTag = match[1].split(' ')
            const tagName = arrTag[0]
            if (options[tagName]) {
                stack.push(tagName)
                continue
            }
            if (stack.isEmpty && closeTag.includes(tagName)) {
                throw new Error('syntax error')
            }
            const correctCloseTag = options[stack[stack.length - 1]]
            if (correctCloseTag === tagName) {
                stack.pop()
            }
            else {
                throw new Error('syntax error')
            }
        }
        req.body.textWithOutTags = textWithOutTags

        if (stack.length === 0) {
            next();
        } else {
            throw new Error('syntax error')
        }

    } catch (e) {
        res.status(500).send('Failed Fetch')
    }

}