const tvIndicators = [
    { agent: 'oculusbrowser', value: false },
    { agent: 'tv', value: true },
    { agent: 'samsungbrowser', value: true },
    { agent: 'viera', value: true }
];

const web0sIndicators = [
    { agent: 'netcast', value: true },
    { agent: 'web0s', value: true }
];

const mobileIndicators = [
    { agent: 'mobi', value: true },
    { agent: 'ipad', value: true },
    { agent: 'iphone', value: true },
    { agent: 'ipod', value: true },
    { agent: 'silk', value: true },
    { agent: 'gt-p1000', value: true },
    { agent: 'nexus 7', value: true },
    { agent: 'kindle fire', value: true },
    { agent: 'opera mini', value: true }
];

const otherIndicators = [
    { agent: 'playstation 4', value: true },
    { agent: 'xbox', value: true },
    { agent: 'hisense', value: true },
    { agent: 'tizen', value: true },
    { agent: 'vidaa', value: true }
];

export const webVersionIndicators = [
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36 NetCast',
        value: undefined,
        browser: { chrome: true, versionMajor: 94 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36 web0s',
        value: 23,
        browser: { chrome: true, versionMajor: 94 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36 web0s',
        value: 22,
        browser: { chrome: true, versionMajor: 87 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Mobile Safari/537.36 web0s',
        value: 6,
        browser: { chrome: true, versionMajor: 79 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.91 Mobile Safari/537.36 web0s',
        value: 5,
        browser: { chrome: true, versionMajor: 68 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36 web0s',
        value: 4,
        browser: { chrome: true, versionMajor: 53 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.102 Mobile Safari/537.36 web0s',
        value: 3,
        browser: { chrome: true, versionMajor: 38 }
    }, {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/26.0.0.0 Mobile Safari/537.36 web0s',
        value: 1,
        browser: { chrome: true, versionMajor: 26 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.0.0 Mobile Safari/537.36 web0s',
        value: 2,
        browser: { chrome: true, versionMajor: 34 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 web0s',
        value: 2,
        browser: { chrome: false, versionMajor: 538 }
    },
    {
        agent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 web0s',
        value: 1,
        browser: { chrome: false, versionMajor: 537 }
    }
];

export const allIndicators = [
    { name: 'TV', indicators: tvIndicators },
    { name: 'Web0s', indicators: web0sIndicators },
    { name: 'Mobile', indicators: mobileIndicators },
    { name: 'Other', indicators: otherIndicators }
] as const;

