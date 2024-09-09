import * as React from 'react';

import { useSelectedLanguage } from '@/core';
import type { Language } from '@/core/i18n/resources';
import type { OptionType } from '@/ui';
import { Options, useModal } from '@/ui';

import { Item } from './item';

export const LanguageItem = () => {
    const { language, setLanguage } = useSelectedLanguage();
    const modal = useModal();
    const onSelect = React.useCallback(
        (option: OptionType) => {
            setLanguage(option.value as Language);
            modal.dismiss();
        },
        [setLanguage, modal],
    );

    const langs = React.useMemo(
        () => [
            { label: 'English', value: 'en' },
            { label: 'عربي', value: 'ar' },
        ],
        [],
    );

    const selectedLanguage = React.useMemo(
        () => langs.find((lang) => lang.value === language),
        [language, langs],
    );

    return (
        <>
            <Item
                text="settings.language"
                value={selectedLanguage?.label}
                onPress={modal.present}
            />
            <Options
                ref={modal.ref}
                options={langs}
                onSelect={onSelect}
                value={selectedLanguage?.value}
            />
        </>
    );
};
