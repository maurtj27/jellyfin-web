import { Browser } from '../types/browser';

export const isTv = () => {
    // This is going to be really difficult to get right
    const userAgent = navigator.userAgent.toLowerCase();
    const tvIndicators = {
        // The OculusBrowsers userAgent also has the samsungbrowser defined but is not a tv.
        oculusbrowser: false,
        tv: true,
        samsungbrowser: true,
        viera: true
    };

    for (const indicator in tvIndicators) {
        if (userAgent.includes(indicator)) {
            return tvIndicators[indicator as keyof typeof tvIndicators];
        }
    }

    return isWeb0s();
};

export const isWeb0s = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('netcast') || userAgent.includes('web0s');
};

export const isMobile = (userAgent: string) => {
    const terms = [
        'mobi',
        'ipad',
        'iphone',
        'ipod',
        'silk',
        'gt-p1000',
        'nexus 7',
        'kindle fire',
        'opera mini'
    ];

    const lower = userAgent.toLowerCase();

    return terms.some(term => lower.includes(term));
};

function hasKeyboard(browser: Browser) {
    if (browser.touch) {
        return true;
    }

    if (browser.xboxOne) {
        return true;
    }

    if (browser.ps4) {
        return true;
    }

    if (browser.edgeUwp) {
        // This is OK for now, but this won't always be true
        // Should we use this?
        // https://gist.github.com/wagonli/40d8a31bd0d6f0dd7a5d
        return true;
    }

    return !!browser.tv;
}

const iOSversion = () => {
    // MacIntel: Apple iPad Pro 11 iOS 13.1
    if (/iP(hone|od|ad)|MacIntel/.test(navigator.userAgent)) {
        /* The first test gets the full iOS version number in iOS 2.0+,
	  *  the second test is for iPads running iOS 13+ which only get the major OS version
	  */
        const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?|Version\/(\d+)/);
        if (match) {
            return [
                Number(match[1] || match[4]),
                Number(match[2] || 0),
                Number(match[3] || 0)
            ];
        }
    }
    return [];
};

export const web0sVersion = (browser: Browser) => {
    // Detect webOS version by web engine version

    if (!browser.chrome && browser.versionMajor) {
        if (browser.versionMajor >= 538) return 2; // webOS 2 app
        if (browser.versionMajor >= 537) return 1; // webOS 1 app
        console.error('Unable to detect webOS version');
        return undefined;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('netcast')) {
        // The built-in browser (NetCast) may have a version that doesn't correspond to the actual web engine
        // Since there is no reliable way to detect webOS version, we return an undefined version
        console.warn('Unable to detect webOS version - NetCast');
        return undefined;
    }

    // The versionMap is only valid for the app
    const versionMap: { [key: number]: number } = {
        94: 23,
        87: 22,
        79: 6,
        68: 5,
        53: 4,
        38: 3,
        34: 2, // webOS 2 browser
        26: 1 // webOS 1 browser
    };

    return versionMap[browser.versionMajor as keyof typeof versionMap] || undefined;
};

// TODO: Assess if this is still needed, as all of our targets should natively support CSS animations.
const supportsCssAnimation = (() => {
    let _supportsCssAnimation: boolean | null = null;
    let _supportsCssAnimationWithPrefix: boolean | null = null;

    return (allowPrefix: boolean): boolean => {
        if (allowPrefix) {
            if (_supportsCssAnimationWithPrefix !== null) {
                return _supportsCssAnimationWithPrefix;
            }
        } else if (_supportsCssAnimation !== null) {
            return _supportsCssAnimation;
        }

        const elm = document.createElement('div');
        let animation = elm.style.animationName !== undefined;

        if (!animation && allowPrefix) {
            const domPrefixes = ['Webkit', 'O', 'Moz'];
            for (const domPrefix of domPrefixes) {
                if (elm.style[domPrefix + 'AnimationName' as keyof typeof elm.style] !== undefined) {
                    animation = true;
                    break;
                }
            }
        }

        if (allowPrefix) {
            _supportsCssAnimationWithPrefix = animation;
        } else {
            _supportsCssAnimation = animation;
        }

        return animation;
    };
})();

type Match = 'edg' | 'edga' | 'edgios' | 'edge' | 'opera' | 'opr' | 'chrome' | 'safari' | 'firefox' | 'mozilla';
type PlatformMatch = 'ipad' | 'iphone' | 'windows' | 'android';
const uaMatch = (ua: string) => {
    ua = ua.toLowerCase().replace(/(motorola edge)/, '').trim();

    const match = /(edg|edga|edgios|edge|opera|opr|chrome|safari|firefox|mozilla(?:.*? rv:([\w.]+)|))/.exec(ua) || [];

    const versionMatch = /(version)[ /]([\w.]+)/.exec(ua) || [];

    const platformMatch = /(ipad|iphone|windows|android)/.exec(ua) || [];

    let browser: Match = match[1] as Match || '';

    if (browser === 'edge') {
        platformMatch[0] = '';
    }

    if (browser === 'opr') {
        browser = 'opera';
    }

    const version = versionMatch[2] || match[2] || '0';

    let versionMajor = parseInt(version.split('.')[0], 10);

    if (isNaN(versionMajor)) {
        versionMajor = 0;
    }

    return {
        browser,
        version,
        platform: platformMatch[0] as PlatformMatch || '',
        versionMajor
    };
};

const userAgent = navigator.userAgent.toLowerCase();

const matched = uaMatch(userAgent);
const browser: Browser = {};

if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionMajor = matched.versionMajor;
}

if (matched.platform) {
    browser[matched.platform] = true;
}

browser.edgeChromium = browser.edg || browser.edga || browser.edgios;
browser.safari = !browser.chrome && !browser.edgeChromium && !browser.edge && !browser.opera && userAgent.indexOf('webkit') !== -1;
browser.osx = userAgent.indexOf('mac os x') !== -1;
// This is a workaround to detect iPads on iOS 13+ that report as desktop Safari
// This may break in the future if Apple releases a touchscreen Mac
// https://forums.developer.apple.com/thread/119186
// eslint-disable-next-line compat/compat
browser.ipad = browser.osx && !browser.iphone && !browser.ipod && navigator.maxTouchPoints > 1;
browser.ps4 = userAgent.indexOf('playstation 4') !== -1;
browser.tv = browser.ps4 || userAgent.indexOf('xbox') !== -1 || isTv();
browser.xboxOne = userAgent.indexOf('xbox one') !== -1;
browser.mobile = isMobile(userAgent);
browser.animate = typeof document !== 'undefined' && document.documentElement.animate != null;
browser.hisense = userAgent.includes('hisense');
browser.tizen = userAgent.indexOf('tizen') !== -1 || ('tizen' in window && window.tizen != null);
browser.vidaa = userAgent.includes('vidaa');
browser.web0s = isWeb0s();
browser.edgeUwp = browser.edge && (userAgent.indexOf('msapphost') !== -1 || userAgent.indexOf('webview') !== -1);

if (browser.web0s || browser.tizen) {
    // UserAgent string contains 'Chrome' and 'Safari', but we only want 'web0s' to be true
    delete browser.chrome;
    delete browser.safari;
    if (browser.web0s) {
        browser.web0sVersion = web0sVersion(browser);
    } else {
        const v = (navigator.appVersion).match(/Tizen (\d+).(\d+)/);
        browser.tizenVersion = parseInt(v?.[1] ?? '', 10);
    }
} else {
    browser.orsay = userAgent.indexOf('smarthub') !== -1;
}

browser.edge = browser.edgeUwp || browser.edge;
browser.operaTv = browser.tv && userAgent.indexOf('opr/') !== -1;
browser.slow = browser.mobile || browser.tv;
/* eslint-disable-next-line compat/compat */
browser.touch = typeof document !== 'undefined' && ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
browser.keyboard = hasKeyboard(browser);
browser.supportsCssAnimation = true;
browser.iOS = browser.ipad || browser.iphone || browser.ipod;

if (browser.iOS) {
    browser.iOSVersion = iOSversion();
    if (browser.iOSVersion && browser.iOSVersion.length >= 2) {
        browser.iOSVersion = browser.iOSVersion[0] + (browser.iOSVersion[1] / 10);
    }
}

export default browser;
