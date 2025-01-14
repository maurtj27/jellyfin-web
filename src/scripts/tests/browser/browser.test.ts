import { beforeEach, describe, expect, test, afterEach, vi } from 'vitest';
import { allIndicators, webVersionIndicators } from './testData';
import { web0sVersion, isTv, isWeb0s, isMobile } from '../../browser';
import type { Browser } from '../../../types/browser';

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

describe.each(webVersionIndicators)('WebVersion - $browser', ({ agent, browser, value }) => {
    const originalNavigator = window.navigator;
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
            value: originalNavigator
        });
    });

    test('web0sVersion', () => {
        expect(web0sVersion(browser)).toBe(value);
    });
});

