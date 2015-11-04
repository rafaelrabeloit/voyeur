(function (root) {
    "use strict";

    // If the app namespace is not set, set it.
    /* istanbul ignore next */
    root.app = root.app || {};

    var language = navigator.language,
        strings = {
            labelList: [],
            translationList: [
                {
                    key: 'KEY_CURRENCY_SYMBOL',
                    pt: 'R$',
                    en: '€'
                },
                {
                    key: 'KEY_CURRENCY',
                    pt: 'BRL',
                    en: 'EUR'
                },
                {
                    key: 'KEY_CURRENCY_DIRECTION',
                    pt: 'ltr',
                    en: 'rtl'
                },
                {
                    key: 'KEY_CURRENCY_SEPARATOR',
                    pt: ',',
                    en: '.'
                },

                /* Home */
                {
                    key: 'KEY_HOME_TTL',
                    pt: 'Inicio',
                    en: 'Home'
                },
                {
                    key: 'KEY_MESSAGE',
                    pt: 'Isso é uma mensagem traduzivel',
                    en: 'This is a translatable message'
                },
                {
                    key: 'KEY_HOME_MESSAGE',
                    pt: 'Outra mensagem traduzivel',
                    en: 'Another translatable message'
                }
            ],
            load: function (language) {
                var i = 0;

                // English is fallback
                for (i = 0; i < this.translationList.length; i++) {
                    this.labelList[this.translationList[i].key] = this.translationList[i][language] || this.translationList[i][language.substr(0, 2)] || this.translationList[i].en;
                }
            }
        };

    // Sets the mediator object on the app namespace
    root.app.strings = strings;

    // Load the specified language from translationList
    root.app.strings.load(language);

}(window));