import { beforeEach, describe, expect, test, afterEach } from 'vitest';
import { isMobile, isTv, isWeb0s } from '../browser';

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

const allIndicators = [
    { name: 'TV', indicators: tvIndicators },
    { name: 'Web0s', indicators: web0sIndicators },
    { name: 'Mobile', indicators: mobileIndicators },
    { name: 'Other', indicators: otherIndicators }
];
describe.each(allIndicators)('$name', ({ name, indicators }) => {
    describe.each(indicators)('isTV - $agent', ({ agent, value }) => {
        const { userAgent } = window.navigator;
        beforeEach(() => {
            Object.defineProperty(window, 'navigator', {
                configurable: true,
                writable: true,
                value: { userAgent: agent }
            });
        });
        afterEach(() => {
            Object.defineProperty(window, 'navigator', {
                configurable: true,
                value: userAgent
            });
        });

        test.runIf(name === 'TV')('isTV', () => {
            expect(isTv()).toBe(value);
        });
        test.runIf(name === 'Web0s')('isWeb0s', () => {
            expect(isWeb0s()).toBe(value);
        });
        test.runIf(name === 'Mobile')('isMobile', () => {
            expect(isMobile(agent)).toBe(value);
        });
    });
});

